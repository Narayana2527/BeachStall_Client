import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChefHat, Users, ArrowLeft, ShoppingBag, Info, CheckCircle2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';

const CateringPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const product = location.state?.product;
  const [memberCount, setMemberCount] = useState(20);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <button onClick={() => navigate('/menu')} className="text-orange-500 flex items-center gap-2">
          <ArrowLeft size={20} /> Return to Menu
        </button>
      </div>
    );
  }

  const totalPrice = product.price * memberCount;

  const handleConfirmCatering = () => {
    const cateringData = {
      productId: product._id || product.id,
      name: `${product.name} (Catering for ${memberCount})`,
      price: product.price,
      totalPrice: totalPrice,
      image: product.image || "https://via.placeholder.com/400?text=Catering",
      quantity: memberCount, 
      isCatering: true
    };

    addToCart(cateringData);

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `Your bulk order for ${memberCount} members is ready.`,
      background: '#18181b',
      color: '#fafafa',
      confirmButtonColor: '#f97316'
    }).then(() => navigate('/cart'));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors mb-8 group uppercase text-xs font-black tracking-widest">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* PRODUCT INFO */}
          <div>
            <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-8 shadow-2xl">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <ChefHat className="text-orange-500" size={24} />
              <span className="text-xs font-black text-orange-500 uppercase tracking-[0.3em]">Premium Catering</span>
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-6">{product.name}</h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 italic leading-relaxed mb-8">
              {product.description || "Our signature coastal preparation scaled for your large events. Authentic spices and fresh ingredients guaranteed."}
            </p>
            
            <div className="space-y-4">
               {['Professional Servers', 'Standard Buffet Setup', 'Eco-friendly Cutlery', 'Live Temperature Control'].map(feature => (
                 <div key={feature} className="flex items-center gap-3 text-sm font-bold text-zinc-600 dark:text-zinc-400">
                   <CheckCircle2 size={18} className="text-green-500" /> {feature}
                 </div>
               ))}
            </div>
          </div>

          {/* CONFIGURATOR */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-10 h-fit shadow-xl">
            <h3 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3">
              <Users className="text-orange-500" /> Customize Order
            </h3>

            <div className="space-y-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Number of Members</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(num => (
                    <button 
                      key={num}
                      onClick={() => setMemberCount(num)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all ${
                        memberCount === num 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                        : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-orange-500'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl space-y-4 border border-zinc-100 dark:border-zinc-700">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-zinc-500">Price per plate</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-zinc-500">Total Plates</span>
                  <span>{memberCount}</span>
                </div>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-700 flex justify-between items-end">
                  <span className="font-black uppercase text-xs tracking-widest">Grand Total</span>
                  <span className="text-4xl font-black text-orange-500 italic">₹{totalPrice}</span>
                </div>
              </div>

              <button 
                onClick={handleConfirmCatering}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.97] shadow-xl shadow-orange-500/20 uppercase tracking-widest text-sm"
              >
                <ShoppingBag size={20} />
                Add Catering to Cart
              </button>
              <p className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
                * Prices include standard delivery and setup within city limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CateringPage;