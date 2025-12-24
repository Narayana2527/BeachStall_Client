import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Minus, Plus, ChevronRight, ShoppingBag, ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const { cart, removeItem, addToCart, fetchCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Define base URL for images
  const API_BASE_URL = "https://beachstall-server.vercel.app/";

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
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Please login to view your cart</h2>
        <button onClick={() => navigate('/login')} className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg">Login Now</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-orange-50 p-8 rounded-full mb-6">
          <ShoppingBag size={64} className="text-orange-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Your cart is hungry!</h2>
        <p className="text-gray-500 mt-2 mb-8 max-w-xs">Fill it with the finest seafood and coastal delicacies.</p>
        <button onClick={() => navigate('/')} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl">
          Start Ordering
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
            <div>
                <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">Review Order</span>
                <h1 className="text-4xl font-serif italic text-gray-900">Shopping Cart</h1>
            </div>
            <p className="text-gray-500 font-medium">{cart.length} Items Selected</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => {
              // Construct full image URL
              const imageUrl = `${API_BASE_URL}${item.image?.replace(/\\/g, "/")}`;

              return (
                <div key={item.productId} className="bg-white rounded-[2rem] p-5 flex items-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <img 
                    src={imageUrl} 
                    alt={item.name} 
                    className="w-28 h-28 object-cover rounded-2xl shadow-inner bg-gray-50" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                  />
                  <div className="ml-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                          <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-400">Coastal Special</p>
                      </div>
                      <button onClick={() => removeItem(item.productId)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button 
                          onClick={() => handleQuantityChange(item, -1)} 
                          className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition disabled:opacity-30" 
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-5 font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item, 1)} 
                          className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-black text-xl text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Total Bill</h3>
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Cart Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-500" : ""}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
                  <span className="text-gray-900 font-bold text-lg">Amount to Pay</span>
                  <span className="text-3xl font-black text-orange-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/payment')}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-lg"
              >
                Proceed to Payment <ChevronRight size={20} />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs font-medium">
                <ShieldCheck size={14} className="text-green-500" />
                100% Safe & Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;