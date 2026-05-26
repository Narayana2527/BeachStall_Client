import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Gift, CheckCircle2, 
  Lightbulb, Landmark, Scissors, Layers, Zap, X, Maximize2, Sparkles
} from 'lucide-react';

const EVENT_DATA = {
  weddings: {
    id: 'weddings',
    label: 'Weddings',
    icon: <Heart size={16} />,
    description: "Architectural floral mandaps and coastal luxury.",
    specialty: "High-tier floral engineering & VVIP guest flow management.",
    requirements: ["Custom Mandap", "Baraat Logistics", "Vedi Setup", "Coastal Catering", "Drone Cinematography", "Floral Carpeting"],
    images: [
      "./assets/images/bdays/beachArt.jfif",
      "./assets/images/bdays/beachArt2.jfif",
      "./assets/images/bdays/beachArt3.jfif",
      "./assets/images/bdays/beachArt4.jfif",
      "./assets/images/bdays/wedding.jfif",
      "./assets/images/bdays/wedding1.jfif",
      "./assets/images/bdays/wedding2.jfif",
      "./assets/images/bdays/wedding3.jfif",
      "./assets/images/bdays/wedding4.jfif",
      "./assets/images/bdays/wedding5.jfif",
      "./assets/images/bdays/wedding6.jfif",
      "./assets/images/bdays/wedding7.jfif",
      "./assets/images/bdays/wedding9.jfif",
      "./assets/images/bdays/weddingmandapam1.jfif",
    ],
    prototypes: [
      { name: "Mandap Scale Model", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=400", type: "Paper Board" },
      { name: "Entry Arch Draft", img: "https://images.unsplash.com/photo-1617363020293-62faac14ad8f?q=80&w=400", type: "Miniature Lighting" },
      { name: "Stage Layout 3D", img: "https://images.unsplash.com/photo-1520127873599-281566453669?q=80&w=400", type: "Cardboard Art" },
      { name: "Aisle Lighting Mini", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=400", type: "Fiber Optics" }
    ]
  },
  birthdays: {
    id: 'birthdays',
    label: 'Birthdays',
    icon: <Gift size={16} />,
    description: "Neon sundowners and themed beach adventures.",
    specialty: "Immersive theme creation & interactive lighting tech.",
    requirements: ["Neon Decor", "Sound Engineering", "Custom Cakes", "Themed Props", "Activity Zones", "LED Dancefloor"],
    images: [
      "./assets/images/bdays/bday1.jpg",
      "./assets/images/bdays/bday2.jpg",
      "./assets/images/bdays/bday3.jfif",
      "./assets/images/bdays/bday4.jfif",
      "./assets/images/bdays/bday5.jfif",
      "./assets/images/bdays/bday6.jfif",
      "./assets/images/bdays/bday7.jfif",
      "./assets/images/bdays/bday8.jfif",
      "./assets/images/bdays/bday9.jfif",
      "./assets/images/bdays/bday10.jfif",
      "./assets/images/bdays/bday11.jfif",
      "./assets/images/bdays/bday12.jfif",
      "./assets/images/bdays/bday13.jfif",
    ],
    prototypes: [
      { name: "Neon Tent Concept", img: "https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?q=80&w=400", type: "Color Board" },
      { name: "Kid's Zone Blueprint", img: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=400", type: "Paper Cutting" },
      { name: "Cake Table Spotlight", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=400", type: "Mini Lighting" },
      { name: "Party Wall Mockup", img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=400", type: "Board Work" }
    ]
  },
  anniversaries: {
    id: 'anniversaries',
    label: 'Anniversaries',
    icon: <Sparkles size={16} />,
    description: "Romantic candlelight setups on the Ramapuram tides.",
    specialty: "Atmospheric lighting & private luxury dining experiences.",
    requirements: ["Private Cabana", "Violinist", "Custom Menu", "Fairy Light Canopy", "Photo Timeline", "Floral Path"],
    images: [
      "./assets/images/bdays/engagement.jfif",
      "./assets/images/bdays/engagement2.jfif",
      "./assets/images/bdays/engagement3.jfif",
      "./assets/images/bdays/engagement4.jfif",
      "./assets/images/bdays/engagement5.jfif",
      "./assets/images/bdays/engagement6.jfif",
    ],
    prototypes: [
      { name: "Cabana Mini-Model", img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400", type: "Cloth & Wire" },
      { name: "Table Scape Draft", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=400", type: "Paper Board" },
      { name: "Mood Lighting Study", img: "https://images.unsplash.com/photo-1533285907942-75885c71d33b?q=80&w=400", type: "LED Miniature" },
      { name: "Pathway Design", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", type: "Hand Painted" }
    ]
  }
};

export default function EventPlanning() {
  const [activeTab, setActiveTab] = useState('weddings');
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'unset';
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* --- MOBILE/DESKTOP LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/98 backdrop-blur-md p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white/50 hover:text-white z-10 p-2"
            >
              <X size={32} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                alt="Detailed view"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-50">
           <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Luxury Setup" />
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500 rounded-full mb-8"
          >
            <Lightbulb size={14} className="text-white fill-current" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Architectural Event Design</span>
          </motion.div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter mb-6 leading-[0.85] uppercase">
            Beyond <br/> <span className="text-orange-500">Decor.</span>
          </h1>
          <p className="text-zinc-300 max-w-3xl mx-auto text-lg md:text-2xl font-medium leading-relaxed">
            Physical **Scale Prototyping** for resort-ready luxury.
          </p>
        </div>
      </section>

      {/* --- TAB NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 overflow-x-auto no-scrollbar">
          {Object.values(EVENT_DATA).map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shrink-0 ${
                activeTab === type.id ? 'text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500'
              }`}
            >
              {activeTab === type.id && (
                <motion.div 
                  layoutId="tab-bg" 
                  className="absolute inset-0 bg-orange-500 rounded-2xl shadow-xl shadow-orange-500/20" 
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {type.icon} {type.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* --- GALLERY & STRATEGY --- */}
      <main className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-6">
            <span className="text-orange-500 font-black uppercase text-[10px] tracking-widest">Our Specialty</span>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none">The {activeTab} Strategy</h2>
            <p className="text-zinc-500 font-medium leading-relaxed italic border-l-4 border-orange-500 pl-6">
              "{EVENT_DATA[activeTab].specialty}"
            </p>
            <div className="space-y-3">
              {EVENT_DATA[activeTab].requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200 font-bold text-sm">
                  <CheckCircle2 size={18} className="text-orange-500" /> {req}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {EVENT_DATA[activeTab].images.map((img, i) => (
                <motion.div 
                  key={img}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 group relative cursor-pointer active:scale-95 transition-transform ${
                    i === 0 ? 'col-span-2 row-span-2 h-72 md:h-[500px]' : 'h-32 md:h-60'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700" alt="Portfolio" />
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* --- PROTOTYPE SECTION --- */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-24 px-6 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 text-orange-500 mb-4">
                <Scissors size={24} /> <Layers size={24} /> <Zap size={24} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-[0.85]">Concept <br/> Miniature Models.</h2>
            </div>
            <p className="max-w-md text-zinc-500 font-medium text-sm md:text-right">
              We present our ideas to resort managers using **physical scale models**.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {EVENT_DATA[activeTab].prototypes.map((proto, i) => (
              <motion.div 
                key={proto.name}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedImage(proto.img)}
                className="bg-white dark:bg-zinc-900 p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] border dark:border-zinc-800 shadow-xl cursor-pointer"
              >
                <div className="aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 md:mb-6 relative">
                  <img src={proto.img} className="w-full h-full object-cover" alt="Prototype" />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-orange-500 text-white text-[7px] md:text-[8px] font-black px-2 md:px-3 py-1 rounded-full uppercase">
                      {proto.type}
                    </span>
                  </div>
                </div>
                <h4 className="text-center font-black uppercase text-[10px] md:text-xs dark:text-white tracking-widest">{proto.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <footer className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-zinc-900 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Landmark size={200} className="text-white" />
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight relative z-10">
            Resort <span className="text-orange-500">Manager?</span> <br/> Get The Concept Kit.
          </h3>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95">
              Request Concept Demo
            </button>
            <button className="bg-white hover:bg-zinc-100 text-zinc-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95">
              Download Catalog
            </button>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}