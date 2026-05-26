import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Filter, ChevronLeft, 
  ChevronRight, X, Star, Flame, Waves, Info 
} from 'lucide-react';

// STATIC DATA FOR CHIRALA COASTAL EVENTS
const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "Ramapuram Jumbo Prawns",
    category: "Sea Food Starters",
    price: 850,
    image: "https://images.unsplash.com/photo-1559739511-e930211752aa?auto=format&fit=crop&q=80&w=800",
    description: "Butter-garlic tossed giant prawns sourced directly from local Chirala fishermen.",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Coastal Nellore Chapala Pulusu",
    category: "Coastal Curries",
    price: 1200,
    image: "https://images.unsplash.com/photo-1589187151003-bdd42917f4e6?auto=format&fit=crop&q=80&w=800",
    description: "Traditional tangy fish curry, a favorite for beach-side wedding receptions.",
    badge: "Wedding Choice"
  },
  {
    id: 3,
    name: "Spicy Crab Masala",
    category: "Sea Food Starters",
    price: 950,
    image: "https://images.unsplash.com/photo-1551443874-897c8801d01e?auto=format&fit=crop&q=80&w=800",
    description: "Fresh blue crab tossed in local Guntur spices and curry leaves.",
    badge: "Hot"
  },
  {
    id: 4,
    name: "Bamboo Chicken Biryani",
    category: "Biryani",
    price: 450,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
    description: "A unique tribal preparation that adds a smoky theater to your live event counters.",
    badge: "Live Counter"
  }
];

const StaticMenu = () => {
  const [viewMode, setViewMode] = useState('ala-carte');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex pt-[80px] font-sans">
      
      {/* --- STATIC SIDEBAR --- */}
      <aside className={`fixed md:sticky top-[80px] left-0 h-[calc(100vh-80px)] w-80 bg-white dark:bg-zinc-900 z-50 p-8 border-r border-zinc-200 dark:border-zinc-800 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="space-y-10">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">Service Type</h2>
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl">
              <button 
                onClick={() => setViewMode('ala-carte')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'ala-carte' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-400'}`}
              >Menu Items</button>
              <button 
                onClick={() => setViewMode('packages')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'packages' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-400'}`}
              >Catering Deals</button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase text-zinc-400 mb-6 tracking-widest">Filters</p>
            <div className="space-y-4">
              {["Coastal Curries", "Sea Food Starters", "Biryani", "Live Counters"].map(cat => (
                <div key={cat} className="flex items-center gap-3 text-sm font-bold text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-orange-500 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-zinc-300" /> {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-[2rem] border border-orange-100 dark:border-orange-800">
            <Info size={18} className="text-orange-600 mb-3" />
            <p className="text-xs font-bold text-orange-800 dark:text-orange-300 leading-relaxed">
              Resort Partnership Note: Prices are inclusive of transport to any resort in Ramapuram Beach area.
            </p>
          </div>
        </div>
      </aside>

      {/* --- MAIN MENU FEED --- */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Waves className="text-blue-500" size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Chirala Shoreline Catering</span>
              </div>
              <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">THE COASTAL CATALOG</h1>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input type="text" placeholder="Search Fresh Catch..." className="w-full pl-14 pr-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {STATIC_PRODUCTS.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl transition-all overflow-hidden flex flex-col sm:flex-row h-full">
                
                {/* Image Section */}
                <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase text-orange-600 flex items-center gap-1 shadow-sm">
                      <Flame size={10} /> {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="sm:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white mt-1 tracking-tight uppercase leading-tight">{item.name}</h3>
                    <p className="text-sm text-zinc-500 mt-4 italic leading-relaxed line-clamp-3">"{item.description}"</p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Rate Per Plate</p>
                      <p className="text-2xl font-black italic text-zinc-900 dark:text-white">₹{item.price}</p>
                    </div>
                    <button className="p-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl hover:bg-orange-600 transition-colors shadow-lg">
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 py-10 border-t border-dashed border-zinc-300 dark:border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm font-medium">Ready to discuss bulk dealership rates for your resort?</p>
            <button className="mt-6 px-10 py-4 bg-orange-500 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-xl shadow-orange-200 dark:shadow-none">
              Download Full Price List (PDF)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaticMenu;