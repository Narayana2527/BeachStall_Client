import React, { useState, useEffect, useContext, useTransition, useDeferredValue, useOptimistic } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Search, ShoppingBag, Loader2, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';
import api from '../axios/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ModernMenu = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Check if user is logged in
  const { addToCart, cartItems } = useContext(CartContext);

  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // REACT 18: Handle heavy UI updates without freezing the screen
  const [isPending, startTransition] = useTransition();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // REACT 18: Delay search query processing to keep input field smooth
  const deferredSearch = useDeferredValue(searchQuery);

  const [selectedCats, setSelectedCats] = useState([]);
  const [price, setPrice] = useState(2000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // REACT 19: Instantly update UI as if the item is already in the cart
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartItems,
    (state, newItem) => [...state, newItem]
  );

  const categories = ["Coastal Curries", "Biryani", "Veg Biryani", "Veg Curries", "Catering"];

  const toggleCategory = (name) => {
    startTransition(() => {
      setCurrentPage(1);
      setSelectedCats(prev => 
        prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
      );
    });
  };

  // --- USEEFFECT: DATA FETCHING + CLEANUP (CORE CONCEPTS) ---
  useEffect(() => {
    // TYPE 4: Cleanup via AbortController to stop "Zombie" requests
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

        const res = await api.get(`/api/product/getProducts?${params}`, {
          signal: controller.signal
        });

        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
        setError(null);
      } catch (err) {
        if (err.name !== 'CanceledError') {
            setError("Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };

    // DEBOUNCING: Wait 400ms after user stops typing/clicking before calling API
    const debounceTimer = setTimeout(fetchFilteredData, 400);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort(); // Cancel request if component unmounts or deps change
    };
  }, [selectedCats, price, deferredSearch, currentPage]);

  // --- AUTH-GUARDED HANDLER ---
  const handleAddToCart = async (item) => {
    // 1. Auth Check
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Aapko pehle login karna hoga. Redirecting...',
        icon: 'warning',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          navigate('/login');
        }
      });
      return;
    }

    // 2. React 19 Optimistic UI Update
    setOptimisticCart(item);
    
    // 3. Backend Sync
    try {
      await addToCart({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
      
      // Success Feedback
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Added to order!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire('Error', 'Could not add item', 'error');
    }
  };

  // --- SUB-COMPONENT: FILTER ---
  const FilterContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-orange-500" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] dark:text-white">Refine Menu</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-zinc-400">
          <X size={20} />
        </button>
      </div>

      <div className="mb-10">
        <p className="text-[10px] font-black uppercase text-zinc-400 mb-6 tracking-widest">Category</p>
        <div className="space-y-4">
          {categories.map(cat => (
            <label key={cat} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedCats.includes(cat)}
                className="w-4 h-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500 mr-3 cursor-pointer"
                onChange={() => toggleCategory(cat)}
              />
              <span className={`text-sm font-bold transition-colors ${selectedCats.includes(cat) ? 'text-orange-500' : 'text-zinc-600 dark:text-zinc-400'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between mb-4">
          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Max Price</p>
          <span className="text-sm font-black text-orange-600 italic">₹{price}</span>
        </div>
        <input 
          type="range" min="100" max="5000" step="50"
          value={price}
          onChange={(e) => { setPrice(e.target.value); setCurrentPage(1); }}
          className="w-full accent-orange-500 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      {isPending && <p className="text-[10px] text-orange-500 animate-pulse">Filtering items...</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex pt-[80px] relative font-sans">
      
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed md:sticky top-0 md:top-[80px] left-0 h-full md:h-[calc(100vh-80px)] w-72 bg-white dark:bg-zinc-950 z-50 p-8 border-r border-zinc-100 dark:border-zinc-900 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <FilterContent />
      </aside>

      <main className="flex-1 p-4 md:p-12 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input 
                type="text"
                placeholder="Search menu..."
                className="w-full pl-14 pr-6 py-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/5 border border-transparent focus:border-orange-500/20 transition-all dark:text-white"
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden flex items-center justify-center gap-2 py-4 px-6 bg-zinc-100 dark:bg-zinc-900 rounded-2xl font-bold text-sm dark:text-white">
              <Filter size={18} /> Filters
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-orange-500" size={32} />
              <p className="text-zinc-400 text-sm animate-pulse">Fetching fresh food...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {products.map((item) => (
                  <div key={item._id} className="group bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">{item.category}</span>
                        <h3 className="text-lg md:text-xl font-bold mt-1 uppercase dark:text-zinc-100">{item.name}</h3>
                        <p className="text-sm text-zinc-500 mt-2 line-clamp-2 italic">{item.description}</p>
                      </div>
                      <p className="text-xl md:text-2xl font-black italic text-zinc-900 dark:text-white">₹{item.price}</p>
                    </div>

                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="mt-6 w-full py-3 bg-zinc-900 dark:bg-white dark:text-black text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
                    >
                      <ShoppingBag size={14} /> Add to Order
                    </button>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-16">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 dark:text-white">
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-xs md:text-sm font-bold dark:text-zinc-400">{currentPage} / {totalPages}</span>
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 dark:text-white">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModernMenu;