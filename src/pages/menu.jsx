import React, { useState } from 'react';
import { Leaf, Flame, Users, UtensilsCrossed } from 'lucide-react';

const menuData = [
  {
    id: 'veg-biryani',
    name: 'Veg Biryanis',
    items: [
      { name: 'Paneer Tikka Biryani', price: 280, desc: 'Aromatic basmati rice layered with charcoal-grilled paneer.' },
      { name: 'Hyderabadi Veg Dum Biryani', price: 240, desc: 'Authentic slow-cooked vegetables with saffron infusion.' },
      { name: 'Mushroom Malai Biryani', price: 260, desc: 'Creamy mushroom chunks with mild spices.' },
    ]
  },
  {
    id: 'non-veg-biryani',
    name: 'Non-Veg Biryanis',
    items: [
      { name: 'Special Chicken Dum Biryani', price: 320, desc: 'Chef’s special marinated chicken with long-grain basmati.' },
      { name: 'Mutton Ghee Roast Biryani', price: 450, desc: 'Tender mutton pieces roasted in pure ghee.' },
    ]
  },
  {
    id: 'veg-curries',
    name: 'Veg Curries',
    items: [
      { name: 'Butter Paneer Masala', price: 220, desc: 'Creamy tomato-based gravy with soft paneer cubes.' },
      { name: 'Dal Makhani', price: 180, desc: 'Overnight slow-cooked black lentils with white butter.' },
    ]
  },
  {
    id: 'non-veg-curries',
    name: 'Non-Veg Curries',
    items: [
      { name: 'Nawabi Chicken Curry', price: 340, desc: 'Rich cashew-based gravy with succulent chicken.' },
      { name: 'Prawns Masala', price: 420, desc: 'Coastal style spicy prawns curry with coconut milk.' },
    ]
  },
  {
    id: 'catering',
    name: 'Catering Specials',
    items: [
      { name: 'Grand Wedding Feast', price: 'POA', desc: 'Full-course meal including starters, main, and desserts.' },
      { name: 'Corporate Lunch Box', price: 'POA', desc: 'Hygienically packed premium meals for offices.' },
    ]
  }
];

const SimpleMenu = () => {
  const [activeTab, setActiveTab] = useState('veg-biryani');

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* 🧭 Minimalist Category Nav */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b dark:border-zinc-900">
        <div className="max-w-4xl mx-auto flex overflow-x-auto no-scrollbar px-6 py-5 gap-8">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap relative pb-1 ${
                activeTab === cat.id 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-400 dark:text-zinc-600 hover:text-gray-600'
              }`}
            >
              {cat.name}
              {activeTab === cat.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 🍽️ Menu List */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {menuData.filter(c => c.id === activeTab).map((category) => (
          <div key={category.id} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            
            <div className="space-y-10">
              {category.items.map((item, idx) => (
                <div key={idx} className="group">
                  {/* Title & Price Row */}
                  <div className="flex items-end gap-2 mb-1.5">
                    <h4 className="text-sm sm:text-base font-black text-gray-900 dark:text-zinc-100 uppercase tracking-tight group-hover:text-indigo-500 transition-colors">
                      {item.name}
                    </h4>
                    
                    {/* Dotted Connector */}
                    <div className="flex-1 border-b-2 border-dotted border-gray-200 dark:border-zinc-800 mb-1" />
                    
                    <span className="text-sm sm:text-base font-black text-gray-900 dark:text-white">
                      {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-500 font-medium leading-relaxed italic">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* End of Category Ornament */}
            <div className="mt-16 flex items-center justify-center gap-4 opacity-20">
              <div className="h-[1px] w-12 bg-gray-400 dark:bg-zinc-600" />
              <UtensilsCrossed size={16} className="dark:text-white" />
              <div className="h-[1px] w-12 bg-gray-400 dark:bg-zinc-600" />
            </div>
          </div>
        ))}
      </div>

      {/* 📝 Footer Section */}
      <footer className="max-w-3xl mx-auto px-6 py-12 border-t dark:border-zinc-900 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-zinc-600">
          The Beach Stall • Culinary Excellence
        </p>
      </footer>
    </div>
  );
};

export default SimpleMenu;