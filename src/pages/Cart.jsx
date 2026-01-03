import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Minus, Plus, ChevronRight, ShoppingBag, ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

const CartPage = () => {
  const { cart, removeItem, addToCart, fetchCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) fetchCart();
  }, [isLoggedIn]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = async (item, delta) => {
    await addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: delta
    });
  };

  // 1. EMPTY/UNAUTHENTICATED STATES (Themed)
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-white dark:bg-zinc-950 transition-colors">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
          <Lock size={32} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Secure Checkout</h2>
        <p className="text-gray-500 dark:text-zinc-400 mt-2 max-w-xs">Please login to view your saved items and proceed.</p>
        <button onClick={() => navigate('/login')} className="mt-8 w-full max-w-xs bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-95">Login Now</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-zinc-950">
        <div className="bg-orange-50 dark:bg-orange-500/10 p-10 rounded-full mb-6">
          <ShoppingBag size={64} className="text-orange-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-zinc-400 mt-2">Looks like you haven't added anything yet.</p>
        <button onClick={() => navigate('/menu')} className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs mt-10 w-full max-w-xs shadow-xl active:scale-95 transition-all">
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen pb-40 lg:pb-12 transition-colors duration-300">
      
      {/* 📱 Mobile Top Header */}
      <div className="lg:hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900 dark:text-white"><ArrowLeft size={24}/></button>
        <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Cart ({cart.length})</h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 🛒 Items List */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="hidden lg:block text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8">Your Basket</h2>
            {cart.map((item) => (
              <div key={item.productId} className="bg-white dark:bg-zinc-900/50 rounded-[2rem] p-4 flex gap-4 border border-gray-100 dark:border-zinc-800/50 shadow-sm transition-all hover:border-indigo-100 dark:hover:border-indigo-900/30">
                <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl bg-gray-50 dark:bg-zinc-800" />
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-black text-gray-900 dark:text-zinc-100 leading-tight sm:text-lg">{item.name}</h4>
                    <button onClick={() => removeItem(item.productId)} className="text-gray-300 dark:text-zinc-600 hover:text-red-500 transition-colors p-1"><Trash2 size={18} /></button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-50 dark:bg-zinc-800 rounded-xl p-1 border border-gray-100 dark:border-zinc-700">
                      <button 
                        onClick={() => handleQuantityChange(item, -1)} 
                        className="p-1.5 text-gray-500 dark:text-zinc-400 hover:text-indigo-600" 
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="px-3 font-black text-sm text-gray-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item, 1)} 
                        className="p-1.5 text-gray-500 dark:text-zinc-400 hover:text-indigo-600"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                    <p className="font-black text-gray-900 dark:text-white sm:text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🧾 Desktop Summary Section */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-50 dark:border-zinc-800 sticky top-24">
              <h3 className="text-xl font-black mb-8 text-gray-900 dark:text-white uppercase tracking-widest">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-zinc-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-500" : "text-gray-900 dark:text-white"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                
                <div className="pt-6 mt-6 border-t border-dashed border-gray-200 dark:border-zinc-700">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Total Amount</p>
                      <span className="text-4xl font-black text-gray-900 dark:text-white">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/payment')} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-100 dark:shadow-none"
              >
                Proceed to Payment <ChevronRight size={18} />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 dark:text-zinc-500">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure encrypted checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE STICKY CHECKOUT BAR (Themed) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-5 border-t border-gray-100 dark:border-zinc-800 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] z-[100] pb-safe">
        <div className="flex items-end justify-between mb-4 px-1">
          <div>
            <p className="text-[9px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-[0.2em] leading-none mb-1.5">Grand Total</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">₹{total.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 uppercase tracking-tighter">
            <ShieldCheck size={12} strokeWidth={3} /> Secure
          </div>
        </div>
        <button 
          onClick={() => navigate('/payment')}
          className="w-full bg-indigo-600 text-white py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none active:scale-[0.96] transition-all"
        >
          Checkout Now <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartPage;