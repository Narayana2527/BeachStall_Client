import { useState, useEffect } from "react";
import axios from "axios";
import Items from "./products";
import { Loader2, Utensils, Fish, Leaf, Drumstick, ChevronRight } from "lucide-react";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Seafood"); // Default tab

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

  // Filter Logic
  const categories = {
    "Seafood": products.filter(item => item.category === 'Coastal Curries' || (item.category === 'Biryani' && item.name.toLowerCase().includes('fish' || 'prawn'))).slice(0, 6),
    "Non-Veg": products.filter(item => item.category === 'Biryani' || item.category === 'Main Course').slice(0, 6),
    "Veg Curries": products.filter(item => item.category === 'Veg Curries').slice(0, 6),
    "Veg Biryani": products.filter(item => item.category === 'Veg Biryani').slice(0, 6),
  };

  const tabs = [
    { id: "Seafood", label: "Coastal SeaFood Curries", icon: <Fish className="w-4 h-4" /> },
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full mb-4">
        <Utensils className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{error}</h3>
      <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-sm">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <header className="pt-20 pb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-orange-500/30" />
          <span className="text-orange-500 dark:text-orange-400 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
            Handcrafted Menu
          </span>
          <div className="h-[1px] w-8 bg-orange-500/30" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-serif italic text-gray-900 dark:text-zinc-50 tracking-tight">
          The Seafood Stall
        </h1>
      </header>

      {/* 🏷️ TABS NAVIGATION */}
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-center items-center gap-2 sm:gap-8 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "text-gray-500 hover:text-orange-500 dark:text-zinc-400"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 🍱 MENU CONTENT */}
      <main className="max-w-7xl mx-auto py-12">
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {categories[activeTab].length > 0 ? (
            <>
              <Items 
                title={`${activeTab} Highlights`}
                products={categories[activeTab]} 
              />
              
              {/* Optional: View More Button if there's more data */}
              <div className="mt-12 text-center">
                <a href="/menu" className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">
                  Full Menu Details <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </>
          ) : (
            <div className="py-24 text-center text-gray-400">
              No items found in this category.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductItems;