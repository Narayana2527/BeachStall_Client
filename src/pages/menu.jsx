import React, { useState, useEffect, useContext, useTransition, useDeferredValue, useOptimistic } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Search, ShoppingBag, Loader2, Filter, ChevronLeft, ChevronRight, X, PartyPopper } from 'lucide-react';
import api from '../axios/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ModernMenu = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart, cartItems } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearch = useDeferredValue(searchQuery);

  const [selectedCats, setSelectedCats] = useState([]);
  const [price, setPrice] = useState(5000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartItems,
    (state, newItem) => [...state, newItem]
  );

  const categories = ["Coastal Curries", "Biryani", "Veg Biryani", "Family Buckets", "Event Catering"];

  const toggleCategory = (name) => {
    startTransition(() => {
      setCurrentPage(1);
      setSelectedCats(prev => 
        prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
      );
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: 12,
          maxPrice: price,
          ...(selectedCats.length > 0 && { category: selectedCats.join(',') }),
          ...(deferredSearch && { search: deferredSearch })
        });
        const res = await api.get(`/api/product/allProducts?${params}`, { signal: controller.signal });
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        if (err.name !== 'CanceledError') console.error("Load failed");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchFilteredData, 400);
    return () => { clearTimeout(debounceTimer); controller.abort(); };
  }, [selectedCats, price, deferredSearch, currentPage]);

  const handleAddToCart = async (item) => {
    if (!user) {
      Swal.fire({ title: 'Welcome!', text: 'Please login to start your beach order.', icon: 'info', confirmButtonColor: '#f97316' });
      navigate('/login');
      return;
    }
    setOptimisticCart(item);
    try {
      await addToCart({ productId: item._id, name: item.name, price: item.price, quantity: 1 });
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Added to your selection', showConfirmButton: false, timer: 1500 });
    } catch (err) {
      Swal.fire('Error', 'Could not add item', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex pt-[80px] font-sans">
      {/* Sidebar Filter */}
      <aside className={`fixed md:sticky top-0 md:top-[80px] left-0 h-full md:h-[calc(100vh-80px)] w-72 bg-white dark:bg-zinc-900 z-50 p-8 border-r dark:border-zinc-800 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest dark:text-white">Refine Feast</h2>
            <X className="md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
          </div>
          <div className="mb-10">
            <p className="text-[10px] font-black uppercase text-zinc-400 mb-6">Menu Type</p>
            {categories.map(cat => (
              <label key={cat} className="flex items-center mb-4 cursor-pointer group">
                <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCategory(cat)} className="hidden" />
                <span className={`text-sm font-bold ${selectedCats.includes(cat) ? 'text-orange-500' : 'text-zinc-500 hover:text-orange-400'}`}>{cat}</span>
              </label>
            ))}
          </div>
          <div className="mb-10">
             <p className="text-[10px] font-black uppercase text-zinc-400 mb-4">Budget: ₹{price}</p>
             <input type="range" min="100" max="5000" step="100" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full accent-orange-500" />
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Search bar */}
          <div className="flex gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input type="text" placeholder="Search coastal delicacies..." className="w-full pl-14 pr-6 py-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all dark:text-white" onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>

          {loading ? (
             <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-orange-500" size={40} /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) => (
                <div key={item._id} className="group bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all">
                  <div className="relative h-60 overflow-hidden">
                    <img src={item.image || 'https://images.unsplash.com/photo-1589187151003-0dd3c63b47e9?q=80&w=500'} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black uppercase text-orange-600">{item.category}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-black uppercase dark:text-white leading-tight">{item.name}</h3>
                      <p className="text-xl font-black text-orange-600">₹{item.price}</p>
                    </div>
                    <p className="text-xs text-zinc-500 italic mb-6 line-clamp-2">{item.description}</p>
                    <button onClick={() => handleAddToCart(item)} className="w-full py-3 bg-zinc-900 dark:bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-500 transition-all">
                      <ShoppingBag size={14} /> Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default ModernMenu;