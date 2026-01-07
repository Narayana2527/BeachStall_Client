import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Search, Leaf, Flame, ShoppingBag, Loader2, ChefHat } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';

const ModernMenu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('coastal-curries');
  const [searchQuery, setSearchQuery] = useState('');

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // AUTH CHECK: Replace this with your actual auth logic (e.g., from an AuthContext)
  const isLoggedIn = !!localStorage.getItem('token'); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://beachstall-server.vercel.app/api/product/getProducts");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please check your connection.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 'coastal-curries', name: 'Coastal Curries', filter: (p) => p.category === 'Coastal Curries' },
    { id: 'non-veg-biryani', name: 'Non-Veg Biryani', filter: (p) => p.category === 'Biryani' || p.category === 'Main Course' },
    { id: 'veg-biryani', name: 'Veg Biryani', filter: (p) => p.category === 'Veg Biryani' },
    { id: 'veg-curries', name: 'Veg Curries', filter: (p) => p.category === 'Veg Curries' },
    { id: 'catering', name: 'Catering', filter: (p) => p.category === 'Catering' },
  ];

  const filteredItems = useMemo(() => {
    const activeCategory = categories.find(c => c.id === activeTab);
    if (!activeCategory) return [];

    const categoryItems = products.filter(item => {
      const isVisible = item.isFeatured === true || item.isFeatured === 'true';
      return isVisible && activeCategory.filter(item);
    });

    if (!searchQuery) return categoryItems;
    return categoryItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery, products]);

  const handleAddToCart = (item) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to add items to your cart.',
        icon: 'info',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#18181b', // matching dark:bg-zinc-900
        color: '#fafafa',
        iconColor: '#f97316', // orange-500
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const productData = {
      productId: item.id || item._id,
      name: item.name,
      price: item.price,
      image: item.image || "https://via.placeholder.com/400?text=Delicious+Food",
      quantity: 1
    };
    addToCart(productData);
    
    // Optional success toast
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500,
      background: '#18181b',
      color: '#fafafa'
    });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-white dark:bg-zinc-950">
      <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Loading Menu...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* SEARCH BAR */}
      <div className="fixed top-[80px] left-0 right-0 z-[47] h-[70px] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-center px-6">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600" size={18} />
          <input 
            type="text" 
            placeholder="Search specialties..."
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 📱 RESPONSIVE TABS NAV */}
      <nav className="fixed top-[150px] left-0 right-0 z-[40] bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex overflow-x-auto no-scrollbar py-4 px-4 gap-2 sm:gap-3 w-full justify-start md:justify-center scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveTab(cat.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`px-4 sm:px-6 py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all border whitespace-nowrap flex-shrink-0 ${
                  activeTab === cat.id 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:text-orange-500'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-[180px] pb-24 relative z-0">
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-6 sm:w-8 bg-orange-500" />
            <span className="text-orange-500 font-mono text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold">
              {activeTab === 'catering' ? 'Bulk Order Services' : "Chef's Special"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
            {categories.find(c => c.id === activeTab)?.name}
          </h2>
        </div>

        {filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-zinc-400 italic">No items available in this category right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16">
            {filteredItems.map((item) => (
              <div key={item._id || item.id} className="group flex flex-col justify-between border-t border-zinc-100 dark:border-zinc-900 pt-8 transition-all duration-500 hover:-translate-y-2">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      {activeTab === 'catering' ? <ChefHat size={14} className="text-orange-500" /> : (item.category?.toLowerCase().includes('veg') && !item.category?.toLowerCase().includes('non') ? <Leaf size={14} className="text-green-600" /> : <Flame size={14} className="text-orange-600" />)}
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.category}</span>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-black italic text-orange-600">
                        ₹{item.price}{activeTab === 'catering' && <span className="text-xl font-black italic text-orange-600 ml-1">/pp</span>}
                      </span>
                      {activeTab === 'catering' && (
                        <span className="text-[8px] uppercase font-bold text-zinc-400 tracking-tighter">Min. 20 plates</span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-orange-500 transition-colors">{item.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium italic line-clamp-2">{item.description || "Authentic coastal preparation."}</p>
                </div>
                
                <button onClick={() => handleAddToCart(item)} className="relative mt-8 overflow-hidden rounded-xl bg-gray-900 dark:bg-zinc-100 transition-all active:scale-95 group/btn">
                  <div className="absolute inset-0 bg-orange-500 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />
                  <div className="relative flex items-center justify-center gap-3 py-3 text-xs font-black text-white dark:text-zinc-900 group-hover/btn:text-white uppercase tracking-widest">
                    <ShoppingBag size={16} />
                    <span>{activeTab === 'catering' ? 'Book Catering' : 'Add To Cart'}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ModernMenu;