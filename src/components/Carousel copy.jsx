import React, { useState, useEffect } from "react";
import { Link } from 'react-scroll';
// If you want to use icons, you might use a library like lucide-react or react-icons
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

// --- SLIDE DATA ---
const CAROUSEL_SLIDES = [
  {
    title: "Ocean's Finest Catch",
    
    description: "Fresh, daily seafood cooked to perfection—from grill to pan.",
    stats: [
      { count: "6+", label: "Training Programs" },
      { count: "500+", label: "Students Trained" },
      { count: "95%", label: "Success Rate" },
    ],
    bgImagePath: "/assets/images/online-class-banner.jpeg", // Replace with your first image path
  },
  {
    title: "UPGRADE YOUR",
    
    description: "Specialized courses in Web Development, Cloud Computing, and Data Science. Get certified and stay ahead of the curve.",
    stats: [
      { count: "10+", label: "Certified Instructors" },
      { count: "25+", label: "Industry Partnerships" },
      { count: "90%", label: "Job Placement Support" },
    ],
    bgImagePath: "/assets/images/online-class-banner.jpeg", // Replace with your second image path
  },
  {
    title: "FUTURE-PROOF",
    
    description: "Join a community of successful professionals. Flexible schedules and hands-on projects designed for real-world impact.",
    stats: [
      { count: "100+", label: "Corporate Clients" },
      { count: "24/7", label: "Dedicated Support" },
      { count: "Top Tier", label: "Curriculum" },
    ],
    bgImagePath: "/assets/images/online-class-banner.jpeg", // Replace with your third image path
  },
];

function StallCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  // Auto-play feature
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, [currentSlide]); // Re-create interval when slide changes

  const slide = CAROUSEL_SLIDES[currentSlide];

  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
      
      {/* --- Image and Transition Container --- */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          // Apply background image of the current slide
          backgroundImage: `url(${slide.bgImagePath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay (must be inside the image container) */}
        <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
      </div>

      {/* --- Content Overlay (Always Visible) --- */}
      <div className="absolute inset-0 flex items-center justify-center p-3 z-20">
        <div className="container mx-auto text-white text-center px-4">
          
          {/* Title and Subtitle */}
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl mb-0">
            {slide.title}
          </h1>
          <h1 className="font-extrabold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-yellow-400 mb-6">
            {slide.description}
          </h1>

          

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            {/* <Link
              to="courses"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 transition cursor-pointer text-base sm:text-lg"
            >
              Explore Us
            </Link> */}

            <Link
              to='contact'
              smooth={true}
              duration={500}
              offset={-70}
              className="px-6 py-3 border border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition cursor-pointer text-base sm:text-lg"
            >
              Contact Us
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {slide.stats.map((stat, statIndex) => (
              <div key={statIndex} className="p-2">
                <h2 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white">
                  {stat.count}
                </h2>
                <p className="m-0 text-sm sm:text-base opacity-90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* --- Carousel Controls (Arrows) --- */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition z-30"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition z-30"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* --- Indicators (Dots) --- */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? "bg-yellow-400 scale-125" : "bg-white opacity-50 hover:opacity-80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default StallCarousel;