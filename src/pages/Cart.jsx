import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Minus, Plus, ChevronRight, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={40} className="text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Secure Checkout</h2>
        <p className="text-gray-500 mt-2">Please login to view your saved items and proceed.</p>
        <button onClick={() => navigate('/login')} className="mt-8 w-full max-w-xs bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg">Login Now</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-orange-50 p-10 rounded-full mb-6">
          <ShoppingBag size={64} className="text-orange-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold mt-10 w-full max-w-xs">
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-40 lg:pb-12">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ArrowLeft size={24}/></button>
        <h1 className="text-xl font-bold text-gray-900">Cart ({cart.length})</h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div key={item.productId} className="bg-white rounded-3xl p-4 flex gap-4 border border-gray-100 shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl bg-gray-50" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                    <button onClick={() => removeItem(item.productId)} className="text-gray-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button onClick={() => handleQuantityChange(item, -1)} className="p-1" disabled={item.quantity <= 1}><Minus size={14} /></button>
                      <span className="px-3 font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item, 1)} className="p-1"><Plus size={14} /></button>
                    </div>
                    <p className="font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Summary Section */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-500"><span>Delivery</span><span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
                <div className="border-t border-dashed pt-5 flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-3xl font-black text-indigo-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button onClick={() => navigate('/payment')} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3">
                Proceed to Payment <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE STICKY CHECKOUT BAR (Visible now) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] z-[100]">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Total Payable</p>
            <p className="text-2xl font-black text-gray-900">₹{total.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <ShieldCheck size={12} /> SECURE
          </div>
        </div>
        <button 
          onClick={() => navigate('/payment')}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
        >
          Proceed to Payment <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartPage;