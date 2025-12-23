import React, { useState, useEffect } from "react";
import { Link } from 'react-scroll';
import { ChevronLeft, ChevronRight, Utensils, Calendar, Star } from 'lucide-react'; 

const CAROUSEL_SLIDES = [
  {
    title: "Ocean's Finest Catch",
    subtitle: "FRESH FROM THE COAST",
    description: "Experience our daily selection of sustainably sourced seafood, flame-grilled with signature coastal spices.",
    primaryCTA: { label: "View Menu", to: "menu" },
    secondaryCTA: { label: "Book a Table", to: "booktable" },
    stats: [
      { icon: <Utensils size={18} />, count: "Daily", label: "Fresh Catch" },
      { icon: <Star size={18} />, count: "4.9", label: "Guest Rating" },
      { icon: <Calendar size={18} />, count: "100%", label: "Organic" },
    ],
    bgImagePath: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "The Golden Hour Grill",
    subtitle: "PREMIUM STEAKS",
    description: "Dry-aged for 28 days and cooked over cherry-wood embers for a flavor that defines the beachside experience.",
    primaryCTA: { label: "Order Online", to: "order" },
    secondaryCTA: { label: "Our Story", to: "about" },
    stats: [
      { icon: <Utensils size={18} />, count: "28", label: "Day Aged" },
      { icon: <Star size={18} />, count: "Top", label: "Tier Cuts" },
      { icon: <Calendar size={18} />, count: "7 days", label: "Open" },
    ],
    bgImagePath: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000",
  },
];

function StallCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    const nextIndex = currentSlide === 0 ? CAROUSEL_SLIDES.length - 1 : currentSlide - 1;
    handleSlideChange(nextIndex);
  };

  const nextSlide = () => {
    const nextIndex = currentSlide === CAROUSEL_SLIDES.length - 1 ? 0 : currentSlide + 1;
    handleSlideChange(nextIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 6000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const slide = CAROUSEL_SLIDES[currentSlide];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
      
      {/* --- Background Layer --- */}
      {CAROUSEL_SLIDES.map((s, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${s.bgImagePath})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transitionProperty: "opacity, transform",
          }}
        />
      ))}

      {/* --- Content Overlay --- */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="container mx-auto px-6 text-center">
          
          {/* Subtitle with Tracking */}
          <p className={`text-yellow-400 font-bold tracking-[0.3em] uppercase text-sm mb-4 transition-all duration-700 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {slide.subtitle}
          </p>
          
          {/* Main Title - Serif style */}
          <h1 className={`text-white font-serif italic text-5xl md:text-7xl lg:text-8xl mb-6 transition-all duration-700 delay-100 ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            {slide.title}
          </h1>

          {/* Description */}
          <p className={`max-w-2xl mx-auto text-gray-200 text-lg md:text-xl mb-10 transition-all duration-700 delay-200 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {slide.description}
          </p>

          {/* Elegant Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center gap-6 mb-16 transition-all duration-700 delay-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <Link
              to={slide.primaryCTA.to}
              smooth={true}
              className="px-10 py-4 bg-yellow-500 text-gray-900 font-bold rounded-full hover:bg-white transition-all duration-300 cursor-pointer shadow-xl"
            >
              {slide.primaryCTA.label}
            </Link>

            <Link
              to={slide.secondaryCTA.to}
              smooth={true}
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 cursor-pointer"
            >
              {slide.secondaryCTA.label}
            </Link>
          </div>

          {/* Refined Stats - Glassmorphism */}
          <div className={`grid grid-cols-3 max-w-3xl mx-auto border-t border-white/20 pt-8 transition-all duration-1000 delay-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {slide.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-yellow-400 mb-2">{stat.icon}</div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.count}</h2>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* --- Controls --- */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 p-4 border border-white/30 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 z-30 hidden md:block"
      >
        <ChevronLeft size={28} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 p-4 border border-white/30 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 z-30 hidden md:block"
      >
        <ChevronRight size={28} />
      </button>

      {/* --- Progress Bars (Modern Indicators) --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-30">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className="group py-4"
          >
            <div className={`h-[2px] w-12 transition-all duration-500 ${
              index === currentSlide ? "bg-yellow-400 w-20" : "bg-white/40 group-hover:bg-white/80"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default StallCarousel;