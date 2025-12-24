import React,{useContext} from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, Plus } from 'lucide-react';

export default function Items({ title, products }) {
  const { addToCart } = useContext(CartContext);
  
  // Define your server base URL
  const API_BASE_URL = "https://beachstall-server.vercel.app/";

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

  return (
    <div className="bg-[#fcfaf8] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10 border-b border-orange-100 pb-4">
          <h2 className="text-3xl font-serif italic text-gray-900 tracking-tight">
            {title}
          </h2>
          <div className="h-px flex-1 bg-orange-100 mx-8 hidden md:block"></div>
          <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Freshly Prepared
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            // FIX: Construct the full image URL and handle Windows backslashes
            const imageUrl = `${API_BASE_URL}${product.image?.replace(/\\/g, "/")}`;

            return (
              <div key={product._id} className="group flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                  <img
                    alt={product.name}
                    src={imageUrl} // Updated Source
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=No+Image"; }}
                  />
                  
                  {/* Floating Price Tag */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                  </div>

                  {/* Hover Quick Add Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 right-4 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-orange-500 text-white p-3 rounded-xl shadow-lg hover:bg-orange-600 active:scale-95"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-5 text-center">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 italic leading-relaxed">
                    {product.description || `Authentic spices blended with premium coastal flavors.`}
                  </p>
                  
                  {/* Mobile Add to Cart */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 transition hover:bg-orange-50 lg:hidden"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}