import React, { useContext, useEffect, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; 
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Items({ title, products }) {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [title]);

  const handleAddToCart = (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isLoggedIn) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to add items to your cart.',
        icon: 'info',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fafafa' : '#18181b',
        iconColor: '#f97316',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    // Explicitly package product metadata so CartContext accepts it smoothly
    const productData = {
      productId: product._id, 
      name: product.name,
      price: product.price,
      image: product.image, // Ensure image is attached explicitly
      quantity: 1
    };

    addToCart(productData);
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  const flowBgStyle = {
    backgroundImage: `
      radial-gradient(at 0% 0%, rgba(249, 115, 22, 0.08) 0, transparent 50%),
      repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(249, 115, 22, 0.05) 36px, rgba(249, 115, 22, 0.05) 37px, transparent 38px)
    `,
  };

  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 dark:text-zinc-50 mb-4 transition-colors">
            {title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-12 bg-orange-200 dark:bg-orange-900/50"></div>
            <Sparkles className="text-orange-400" size={20} />
            <div className="h-[2px] w-12 bg-orange-200 dark:bg-orange-900/50"></div>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible py-4"
        >
          {products.map((product, index) => (
            <div 
              key={product._id} 
              className={`min-w-[300px] md:min-w-0 snap-center ${index === 0 ? 'ml-4 md:ml-0' : ''}`}
            >
              <div 
                style={flowBgStyle}
                className="group relative flex flex-col items-center p-6 rounded-[3rem] bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-none transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(249,115,22,0.1)] overflow-hidden"
              >
                {/* Visual Decoration */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20">
                  <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,100 C150,200 350,0 500,100 L500,0 L0,0 Z" fill="url(#orange-grad)" className="transition-all duration-700 group-hover:fill-orange-500/20" />
                    <defs>
                      <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.15 }} />
                        <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Product Image */}
                <div className="relative w-full z-10 mb-6 px-4">
                  <div className="aspect-square overflow-hidden rounded-full border-[6px] border-white dark:border-zinc-800 shadow-xl transition-all duration-700 group-hover:rounded-3xl group-hover:rotate-3 group-hover:scale-105">
                    <img
                      alt={product.name}
                      src={product.image} 
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 right-6 bg-orange-500 dark:bg-orange-600 text-white px-4 py-1.5 rounded-xl font-black text-sm shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform">
                    ₹{product.price}
                  </div>
                </div>

                <div className="relative z-10 text-center flex-1">
                  <h3 className="text-xl font-black text-gray-900 dark:text-zinc-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 px-2 italic">
                    {product.description || "Fresh ingredients, traditionally prepared for an authentic taste."}
                  </p>
                </div>

                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="relative z-10 mt-8 w-full overflow-hidden rounded-2xl bg-gray-900 dark:bg-zinc-100 transition-all active:scale-95 group/btn"
                >
                  <div className="absolute inset-0 bg-orange-500 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />
                  <div className="relative flex items-center justify-center gap-3 py-3.5 text-xs font-black text-white dark:text-zinc-900 group-hover/btn:text-white uppercase tracking-widest">
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}