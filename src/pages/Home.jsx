import React from 'react'
import { useNavigate } from 'react-router-dom';
import StallCarousel from '../components/Carousel'
import { ArrowRight, Sparkles, Utensils, CalendarDays, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-zinc-950 overflow-x-hidden">
      {/* 1. HERO - Ensure the Carousel component handles internal responsiveness */}
      <StallCarousel />

      {/* 2. CULINARY TEASER */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <Utensils size={14} className="text-orange-500" />
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">The Menu</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-zinc-900 dark:text-white">
              Coastal <br className="hidden md:block"/> 
              <span className="text-orange-500 italic font-serif lowercase">gastronomy</span>
            </h2>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              From our famous Dum Biryanis to the daily fresh sea-catch, explore a menu designed for the beach lifestyle.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/menu')}
                className="flex items-center gap-4 text-zinc-900 dark:text-white font-black uppercase text-[10px] md:text-xs tracking-widest group"
              >
                Explore Full Menu <ArrowRight className="group-hover:translate-x-2 transition-transform text-orange-500" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl order-1 lg:order-2">
             <img 
               src="https://images.unsplash.com/photo-1551739440-5dd934d3a94a?auto=format&fit=crop&q=80" 
               alt="Food teaser" 
               className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" 
             />
          </div>
        </div>
      </section>

      {/* 3. EVENT DIVISION TEASER */}
      <section className="bg-zinc-900 py-20 md:py-32 px-6 overflow-hidden relative">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image with Glow */}
          <div className="order-2 lg:order-1 relative px-4 md:px-0">
             <div className="absolute -top-10 -left-10 w-32 md:w-40 h-32 md:h-40 bg-orange-500/20 rounded-full blur-3xl" />
             <img 
               src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80" 
               alt="Event teaser" 
               className="rounded-[2rem] md:rounded-[3rem] relative z-10 w-full object-cover aspect-[4/3] md:aspect-auto" 
             />
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8 text-center lg:text-left">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px]">Event Management</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Bespoke <br className="hidden md:block"/>
              <span className="text-orange-500 italic font-serif lowercase">celebrations</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              We handle end-to-end event production for Chirala's most exclusive resorts. Weddings, corporate retreats, and private beach parties.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/events')}
                className="w-full sm:w-auto px-10 py-4 border-2 border-white/20 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all active:scale-95"
              >
                View Event Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOOKING QUICK-LINK */}
      <section className="py-20 md:py-32 px-6 text-center relative">
        {/* Seashore Pattern Placeholder */}
        {/* <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none flex items-center justify-center">
            <Sparkles size={400} />
        </div> */}

        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10 relative z-10">
          <div className="flex justify-center">
            <div className="p-4 md:p-6 bg-orange-500/10 rounded-full animate-pulse">
              <CalendarDays className="text-orange-500" size={32} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black dark:text-white uppercase tracking-tighter leading-tight px-4">
            Reserve Your Seashore <br className="hidden md:block"/>
            <span className="text-orange-500 italic">Experience</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-lg mx-auto px-6">
            Avoid the wait. Book your table or inquire about event catering in just a few clicks.
          </p>
          <div className="px-6">
            <button 
              onClick={() => navigate('/booktable')}
              className="w-full sm:w-auto px-12 py-5 md:py-6 bg-zinc-900 dark:bg-orange-600 text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              Open Booking Portal <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home