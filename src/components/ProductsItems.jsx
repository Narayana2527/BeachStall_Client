import React, { useState, useEffect } from "react";
// Renamed to 'api' to clarify this is your custom instance
import api from '../axios/axios'; 
import Items from "./products";
import { Loader2, Utensils, Fish, Leaf, Drumstick, ChevronRight, AlertCircle } from "lucide-react";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Seafood");

  useEffect(() => {
    // AbortController cancels the request if the user navigates away
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/product/allProducts", {
          signal: controller.signal
        });

        // Robust check: Ensure we are setting an array even if the API structure varies
        const data = Array.isArray(response.data) ? response.data : response.data.products || [];
        setProducts(data);
        setError(null);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err.response?.data?.message || "Failed to load products. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort(); // Cleanup
  }, []);

  // Filter logic remains the same but added a fallback to empty array
  const visibleItems = (products || []).filter(item => 
    item.isFeatured === true || item.isFeatured === 'true'
  );

  const categories = {
    "Seafood": visibleItems.filter(item => item.category === 'Coastal Curries').slice(0, 6),
    "Non-Veg": visibleItems.filter(item => item.category === 'Biryani' || item.category === 'Main Course').slice(0, 6),
    "Veg Curries": visibleItems.filter(item => item.category === 'Veg Curries').slice(0, 6),
    "Veg Biryani": visibleItems.filter(item => item.category === 'Veg Biryani').slice(0, 6),
  };

  const tabs = [
    { id: "Seafood", label: "Coastal Seafood", icon: <Fish className="w-4 h-4" /> },
    { id: "Non-Veg", label: "Meat & Poultry", icon: <Drumstick className="w-4 h-4" /> },
    { id: "Veg Curries", label: "Veg Curries", icon: <Leaf className="w-4 h-4" /> },
    { id: "Veg Biryani", label: "Veg Biryani", icon: <Utensils className="w-4 h-4" /> },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      <p className="text-gray-500 dark:text-zinc-400 font-medium tracking-widest uppercase text-xs">Preparing Menu...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-6">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-gray-800 dark:text-zinc-200 font-medium">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 text-orange-500 font-bold hover:underline"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <header className="pt-20 pb-10 md:pt-28 md:pb-14 text-center px-6">
        <div className="inline-flex items-center gap-4 mb-5">
          <div className="h-[1px] w-8 sm:w-12 bg-orange-500/20" />
          <span className="text-orange-600 dark:text-orange-400 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs">
            Handcrafted Menu
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-orange-500/20" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-gray-900 dark:text-zinc-50 tracking-tight leading-tight">
          The Seafood Stall
        </h1>
      </header>

      <nav className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b border-gray-100 dark:border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-6 py-4 overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer active:scale-95 border ${
                  activeTab === tab.id
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "text-gray-500 dark:text-zinc-400 border-transparent hover:bg-gray-50 dark:hover:bg-zinc-900"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          {categories[activeTab]?.length > 0 ? (
            <div className="space-y-12">
              <Items 
                title={`${activeTab} Highlights`}
                products={categories[activeTab]} 
              />
              <div className="flex justify-center pt-8">
                <a href="/menu" className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border-2 border-orange-500/10 text-sm font-black uppercase tracking-widest text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-500">
                  Full Menu Details 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ) : (
            <div className="py-32 text-center bg-gray-50/50 dark:bg-zinc-900/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-zinc-800">
              <Utensils className="w-16 h-16 text-gray-200 dark:text-zinc-800 mx-auto mb-6" />
              <p className="text-gray-400 dark:text-zinc-500 text-lg italic">Our chefs are currently curating these flavors.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductItems;