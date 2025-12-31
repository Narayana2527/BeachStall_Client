import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function Items({ title, products }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const productData = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    addToCart(productData);
  };

  const flowBgStyle = {
    backgroundColor: '#ffffff',
    backgroundImage: `
      radial-gradient(at 0% 0%, rgba(249, 115, 22, 0.08) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 255, 255, 0) 0, rgba(249, 115, 22, 0.02) 100%),
      repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(249, 115, 22, 0.1) 36px, rgba(249, 115, 22, 0.1) 37px, transparent 38px)
    `,
  };

  return (
    <div className="md:bg-[#fcfaf8] lg:bg-[#fcfaf8] bg-[#755b7e] py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-4">
            {title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-12 bg-orange-200"></div>
            <Sparkles className="text-orange-400" size={20} />
            <div className="h-[2px] w-12 bg-orange-200"></div>
          </div>
        </div>

        {/* Horizontal Mobile Slider / Desktop Grid */}
        <div className="
          flex overflow-x-auto gap-10 snap-x snap-mandatory 
          ms-overflow-style-none scrollbar-width-none [&::-webkit-scrollbar]:hidden 
          md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible pb-12
        ">
          {products.map((product, index) => (
            <div 
              key={product._id} 
              className={`
                min-w-[320px] md:min-w-0 snap-center
                ${index === 0 ? 'ml-6 md:ml-0' : ''} 
              `}
            >
              {/* Premium Sculpted Card */}
              <div 
                style={flowBgStyle}
                className="group relative flex flex-col items-center p-8 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white transition-all duration-700 hover:shadow-[0_40px_80px_rgba(249,115,22,0.12)] hover:-translate-y-4 overflow-hidden"
              >
                
                {/* Visual Accent: The Animated Wave Curve */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                  <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="w-full h-full">
                    <path 
                      d="M0,100 C150,200 350,0 500,100 L500,0 L0,0 Z" 
                      fill="url(#orange-grad)" 
                      className="transition-all duration-700 group-hover:fill-orange-500/10"
                    />
                    <defs>
                      <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.1 }} />
                        <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* 1. Image Layer */}
                <div className="relative w-full z-10 mb-8">
                  <div className="aspect-square overflow-hidden rounded-full border-[8px] border-white shadow-2xl transition-all duration-700 group-hover:rounded-[2.5rem] group-hover:rotate-3">
                    <img
                      alt={product.name}
                      src={product.image} 
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Food"; }}
                    />
                  </div>
                  <div className="absolute -bottom-2 right-4 bg-orange-500 text-white px-5 py-2 rounded-2xl font-black text-sm shadow-xl transform rotate-6">
                    ₹{product.price}
                  </div>
                </div>

                {/* 2. Content Layer */}
                <div className="relative z-10 text-center flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed line-clamp-2 px-4 italic">
                    {product.description || "Crafted with passion using heritage recipes."}
                  </p>
                </div>

                {/* 3. CTA Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="relative z-10 mt-10 w-full overflow-hidden rounded-2xl bg-gray-900 group/btn"
                >
                  <div className="absolute inset-0 bg-orange-500 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />
                  <div className="relative flex items-center justify-center gap-3 py-4 text-sm font-bold text-white uppercase tracking-tighter">
                    <ShoppingBag size={18} />
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