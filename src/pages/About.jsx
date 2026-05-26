import React from 'react';
import { Anchor, Waves, MapPin, Star, Utensils, Award, Sunset, Shell, Briefcase, Users, Sparkles, ChevronRight } from 'lucide-react';

const AboutPage = () => {
  const ourPillars = [
    {
      title: "Sea-to-Table Gastronomy",
      desc: "Our 'Fresh Catch' isn't a slogan. We source directly from the Chirala morning boats to serve the district's most authentic coastal flavors.",
      icon: <Utensils className="text-orange-500" size={24} />
    },
    {
      title: "Event Dealership",
      desc: "We bridge the gap between luxury resorts and bespoke celebrations, acting as the premier dealership for beach weddings and corporate retreats.",
      icon: <Briefcase className="text-indigo-500" size={24} />
    },
    {
      title: "Chirala Heritage",
      desc: "Rooted in the weaving culture of Prakasam, we craft hospitality experiences with the same precision as our world-famous handlooms.",
      icon: <Award className="text-amber-500" size={24} />
    }
  ];

  const stats = [
    { label: "Daily Catch", value: "100%", sub: "Fresh Sourced" },
    { label: "Events Managed", value: "50+", sub: "Premium Production" },
    { label: "Guest Rating", value: "4.9", sub: "Five Star Reviews" },
    { label: "Community", value: "Local", sub: "Fishermen Support" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-x-hidden">
      
      {/* 🌊 Hero Section */}
      <section className="relative min-h-[70vh] flex items-center py-20 md:py-40 px-6 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80" 
              alt="Chirala Beach Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/40 to-zinc-900" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-full mb-6 md:mb-8 animate-fade-in">
            <Sparkles size={14} className="text-white" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">The New Standard in Chirala</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9] md:leading-[0.85] mb-6 md:mb-8">
            More Than A <span className="text-orange-500 italic font-serif lowercase">Stall</span>. <br className="hidden md:block" />
            An <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Experience Hub</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-base md:text-xl font-medium leading-relaxed italic px-4">
            "We are Chirala’s first coastal hospitality dealership—merging authentic seafaring flavors with premium event production at Ramapuram Sands."
          </p>
        </div>
      </section>

      {/* 📊 The Impact Numbers - Responsive Grid */}
      <section className="py-8 md:py-12 bg-orange-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white md:border-r last:border-0 border-white/20 px-2">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-1">{stat.value}</h3>
                <p className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛠️ Core Business Pillars */}
      <section className="py-20 md:py-24 px-6 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
                Our Three-Tier <br className="hidden md:block" /> <span className="text-indigo-600 italic">Ecosystem</span>
            </h2>
            <div className="h-1.5 w-20 bg-indigo-600 mt-6 mx-auto md:mx-0 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {ourPillars.map((pillar, idx) => (
              <div key={idx} className="p-8 md:p-10 bg-white dark:bg-zinc-800 rounded-[2.5rem] border dark:border-zinc-700 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-500">
                <div className="mb-6 w-14 h-14 md:w-16 md:h-16 bg-zinc-100 dark:bg-zinc-700 rounded-2xl flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter dark:text-white mb-4 leading-tight">{pillar.title}</h3>
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌊 The Story Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group px-4 md:px-0">
            <div className="absolute -inset-4 bg-orange-500/10 rounded-[4rem] blur-2xl group-hover:bg-orange-500/20 transition-all" />
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80" 
              alt="Beach Event Set-up" 
              className="relative rounded-[2.5rem] md:rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full"
            />
          </div>

          <div className="space-y-8 md:space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs block">The Vision</span>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
                Bridging the <br className="hidden md:block" /> <span className="text-indigo-600 italic font-serif lowercase">shoreline gap</span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-zinc-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              The Beach Stall was born from a simple observation: Chirala's coast had amazing food, but lacked high-end production at the resort level.
            </p>

            <div className="grid gap-6 text-left max-w-md mx-auto lg:mx-0">
              {[
                { label: "Community First", text: "We empower 20+ local families through direct sourcing.", icon: <Users size={18}/> },
                { label: "Resort Dealership", text: "We manage exclusive coastal venues for VIP events.", icon: <Anchor size={18}/> },
                { label: "Sustainability", text: "Zero-plastic initiatives to protect Ramapuram sands.", icon: <Shell size={18}/> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-zinc-900 dark:text-white uppercase text-[10px] tracking-widest">{item.label}</h4>
                    <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1 leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✉️ Final CTA - Responsive Actions */}
      <section className="py-20 md:py-32 px-6 bg-zinc-900 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Waves size={800} className="text-white absolute -bottom-40 -left-40" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-8 md:space-y-12">
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none px-2">
            Be Part of Our <br className="hidden sm:block" /> <span className="text-orange-500 italic font-serif">Coastal Journey</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 px-6">
            <a href='/booktable' className="w-full sm:w-auto px-10 py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-zinc-900 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2">
              Book Your Table <ChevronRight size={14} />
            </a>
            <a href='/events' className="w-full sm:w-auto px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-zinc-900 transition-all active:scale-95 flex items-center justify-center gap-2">
              Plan an Event
            </a>
          </div>
        </div>
      </section>

      {/* Signature Footer */}
      <footer className="py-8 md:py-12 text-center bg-white dark:bg-zinc-950 border-t dark:border-zinc-900 px-6">
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] text-zinc-400 leading-relaxed">
          The Beach Stall © 2026 • Ramapuram Sands • Chirala • Bapatla District
        </p>
      </footer>

    </div>
  );
};

export default AboutPage;