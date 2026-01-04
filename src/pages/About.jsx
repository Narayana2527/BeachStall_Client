import React from 'react';
import { Anchor, Waves, MapPin, Star, Utensils, Award, Sunset, Shell } from 'lucide-react';

const AboutPage = () => {
  const chiralaSpirit = [
    {
      title: "Ramapuram Sands",
      desc: "Inspired by the raw, untouched beauty of Chirala's most iconic coastline.",
      icon: <Sunset className="text-orange-500" size={20} />
    },
    {
      title: "Handloom Heritage",
      desc: "Just like our famous textiles, our recipes are woven with patience and tradition.",
      icon: <Shell className="text-indigo-500" size={20} />
    },
    {
      title: "Prakasam Flavors",
      desc: "Bold, fiery, and authentic spices sourced directly from the heart of the district.",
      icon: <Star className="text-amber-500" size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* 🌊 Hero Section: Chirala Narrative */}
      <section className="relative py-20 sm:py-32 px-6 overflow-hidden border-b dark:border-zinc-900">
        <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 pointer-events-none">
          <Waves size={400} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 dark:text-indigo-400 mb-4 block">
            The Pride of Prakasam
          </span>
          <h1 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-gray-900 dark:text-white leading-none">
            Chirala's Premier <br /> Coastal Escape
          </h1>
          <p className="mt-8 text-sm sm:text-lg text-gray-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto italic">
            "From the golden looms to the golden sands, we bring a new era of luxury dining to the shores of Ramapuram."
          </p>
        </div>
      </section>

      {/* 🗺️ Local Inspiration Section */}
      <section className="py-20 px-6 bg-gray-50/50 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {chiralaSpirit.map((vibe, idx) => (
              <div key={idx} className="space-y-4 group text-center md:text-left">
                <div className="mx-auto md:mx-0 w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm border dark:border-zinc-700 transition-transform group-hover:-translate-y-2">
                  {vibe.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white">{vibe.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-500 font-bold leading-relaxed">
                  {vibe.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🕯️ The Specification: Chirala's Coastal High-End Stall */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-6">
                Chirala's New <br /> Signature Landmark
              </h2>
              <div className="h-1.5 w-20 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 text-indigo-600 dark:text-indigo-400"><Utensils size={20} /></div>
                <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium">
                  <span className="font-black text-gray-900 dark:text-white uppercase tracking-wide">The Fresh Catch:</span> Sourcing daily from the Chirala fishing harbor, ensuring our seafood curries carry the true essence of the Bay of Bengal.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 text-indigo-600 dark:text-indigo-400"><MapPin size={20} /></div>
                <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium">
                  <span className="font-black text-gray-900 dark:text-white uppercase tracking-wide">Destination Dining:</span> Strategically located to offer the best sunset views in Bapatla district, blending rustic beach charm with VIP comfort.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 text-indigo-600 dark:text-indigo-400"><Anchor size={20} /></div>
                <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium">
                  <span className="font-black text-gray-900 dark:text-white uppercase tracking-wide">Local Soul, Global Standard:</span> We are elevating the 'Beach Stall' concept to match international shorefronts, putting Chirala on the map for luxury coastal tourism.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Visual Element */}
          <div className="relative aspect-square bg-gray-100 dark:bg-zinc-900 rounded-[4rem] overflow-hidden group">
             <div className="absolute inset-0 flex items-center justify-center">
                <Waves size={100} className="text-gray-200 dark:text-zinc-800 transition-transform duration-700 group-hover:scale-150" />
             </div>
             <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-3xl border dark:border-zinc-700">
                <Award className="text-indigo-600 mb-2" size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coastal Excellence</p>
                <h4 className="text-lg font-black dark:text-white uppercase tracking-tighter leading-tight">Chirala's Top Rated Beach Destination</h4>
             </div>
          </div>
        </div>
      </section>

      {/* ✉️ Footer Call to Action */}
      <section className="py-20 px-6 bg-[#c2dcc7d9] dark:bg-indigo-500 text-center text-white">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">Visit the Pearl <br /> of the East Coast</h2>
          <a href='/booktable' className="px-10 py-5 bg-white text-indigo-600 rounded-full font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all active:scale-95 shadow-xl">
            Reserve Your Spot
          </a>
        </div>
      </section>

      {/* Minimal Footer Signature */}
      <div className="py-8 text-center bg-white dark:bg-zinc-950">
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-zinc-600">
          The Beach Stall © 2026 • Ramapuram • Chirala • Andhra Pradesh
        </p>
      </div>

    </div>
  );
};

export default AboutPage;