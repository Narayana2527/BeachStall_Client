import { useState, useEffect } from "react";
import axios from "axios";
import Items from "./products";
import { Loader2, Utensils } from "lucide-react";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const biryaniItems = products.filter(item => item.category === 'Biryani' || item.category === 'Main Course');
  const curryItems = products.filter(item => item.category === 'Coastal Curries');

  // 1. Loading State (UX: Use a Spinner or Skeleton instead of plain text)
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-gray-500 dark:text-zinc-400 font-medium tracking-widest uppercase text-xs">Preparing Menu...</p>
    </div>
  );

  // 2. Error State (UX: Visual feedback for failure)
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full mb-4">
        <Utensils className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{error}</h3>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-6 py-2 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-sm transition-transform active:scale-95"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* 🏛️ HEADER HIERARCHY: High-end typography */}
      <header className="pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-orange-500/30" />
          <span className="text-orange-500 dark:text-orange-400 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
            Our Specialty
          </span>
          <div className="h-[1px] w-8 bg-orange-500/30" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-serif italic text-gray-900 dark:text-zinc-50 tracking-tight">
          The Seafood Stall
        </h1>
        
        <p className="mt-4 text-gray-500 dark:text-zinc-400 max-w-md mx-auto text-sm sm:text-base px-6">
          Fresh catches and authentic coastal flavors, served daily from the heart of the beach.
        </p>
      </header>

      {/* 🍱 MENU SECTIONS */}
      <main className="pb-24 space-y-16 sm:space-y-24">
        
        {/* Signature Biryanis */}
        <section className="relative">
          <Items 
            title="Signature Biryanis"
            products={biryaniItems}  
          />
        </section>
        
        {/* Divider with subtle depth */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent" />
        </div>

        {/* Coastal Curries */}
        <section className="relative">
          <Items 
            title="Coastal Curries"
            products={curryItems}  
          />
        </section>

      </main>
    </div>
  );
};

export default ProductItems;