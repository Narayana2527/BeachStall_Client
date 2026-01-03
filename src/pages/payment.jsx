import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CreditCard, Smartphone, Lock, CheckCircle, MapPin, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/orderServices';
import { Toaster, toast } from 'react-hot-toast';

const PaymentPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [method, setMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const gst = subtotal * 0.05;
  const total = subtotal + deliveryFee + gst;

  const handlePayment = async () => {
    if (cart.length === 0) return toast.error("Your cart is empty");
    if (!shippingDetails.address || !shippingDetails.city || !shippingDetails.phone) {
      return toast.error("Please fill all shipping details");
    }

    try {
      setLoading(true);
      const orderData = {
        orderItems: cart,
        shippingAddress: shippingDetails,
        totalPrice: total,
        paymentMethod: method.toUpperCase(),
      };

      const result = await placeOrder(orderData);
      if (result && result._id) {
        toast.success("Order Placed Successfully! 🎉");
        clearCart(); 
        setTimeout(() => navigate('/profile/orders'), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen pb-32 lg:py-12 transition-colors duration-300">
      <Toaster position="top-center" />
      
      {/* 📱 Mobile Header */}
      <div className="lg:hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black uppercase tracking-tight text-gray-900 dark:text-white">Checkout</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 lg:mt-0">
        {/* 💻 Desktop Header Hierarchy */}
        <div className="hidden lg:flex mb-12 items-center justify-between">
          <div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Finalize Order</h2>
            <p className="text-gray-500 dark:text-zinc-400 font-medium">Complete your details to enjoy the meal.</p>
          </div>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black text-[10px] uppercase tracking-widest bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-xl">
            <ShieldCheck size={16} /> Secure Encrypted
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-7 space-y-8">
            
            {/* 📍 Shipping Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <MapPin className="text-orange-500" size={20} />
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Delivery Address</h3>
              </div>
              
              <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 space-y-4">
                <input 
                  type="text" name="address" placeholder="Flat / House No / Street"
                  value={shippingDetails.address} onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" name="city" placeholder="City"
                    value={shippingDetails.city} onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                  <input 
                    type="text" name="phone" placeholder="Phone Number"
                    value={shippingDetails.phone} onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </section>

            {/* 💳 Payment Method Selector */}
            <section className="space-y-4">
               <div className="flex items-center gap-3 px-2">
                <Smartphone className="text-orange-500" size={20} />
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Payment Method</h3>
              </div>
              
              <div className="bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {/* UPI Option */}
                  <div 
                    onClick={() => setMethod('upi')} 
                    className={`p-6 cursor-pointer flex items-center gap-5 transition-all ${method === 'upi' ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50'}`}
                  >
                    <div className={`p-3 rounded-2xl transition-all ${method === 'upi' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400'}`}>
                      <Smartphone size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-gray-900 dark:text-white uppercase tracking-tight">UPI Transfer</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-500">Google Pay, PhonePe, or Paytm</p>
                    </div>
                    {method === 'upi' && <CheckCircle className="text-indigo-600 dark:text-indigo-400" size={24} fill="currentColor" fillOpacity={0.1} />}
                  </div>

                  {/* Card Option */}
                  <div 
                    onClick={() => setMethod('card')} 
                    className={`p-6 cursor-pointer flex items-center gap-5 transition-all ${method === 'card' ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50'}`}
                  >
                    <div className={`p-3 rounded-2xl transition-all ${method === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400'}`}>
                      <CreditCard size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-gray-900 dark:text-white uppercase tracking-tight">Cards</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-500">Credit, Debit, or ATM Cards</p>
                    </div>
                    {method === 'card' && <CheckCircle className="text-indigo-600 dark:text-indigo-400" size={24} fill="currentColor" fillOpacity={0.1} />}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 🧾 Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-gray-900 dark:bg-zinc-900 text-white p-8 lg:p-10 rounded-[3rem] shadow-2xl sticky top-24 border border-zinc-800">
              <h3 className="text-xs font-black mb-10 border-b border-zinc-800 pb-6 uppercase tracking-[0.3em] text-zinc-500">Bill Summary</h3>
              
              <div className="space-y-5 mb-12">
                <div className="flex justify-between text-zinc-400 font-bold text-sm italic">
                  <span>Subtotal</span>
                  <span className="text-white not-italic font-black text-lg">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400 font-bold text-sm italic">
                  <span>Taxes (GST 5%)</span>
                  <span className="text-white not-italic font-black text-lg">₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400 font-bold text-sm italic">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <span className="text-green-400 font-black tracking-widest text-xs uppercase">Free</span> : <span className="text-white not-italic font-black text-lg">₹{deliveryFee}</span>}</span>
                </div>
                
                <div className="pt-8 mt-8 border-t border-zinc-800">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Total Payable Amount</p>
                  <span className="text-5xl font-black text-white tracking-tighter">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading}
                className="hidden lg:flex w-full bg-indigo-500 hover:bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 disabled:bg-zinc-800 disabled:text-zinc-600 items-center justify-center gap-3 shadow-xl shadow-indigo-500/10"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : "Place Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE STICKY FOOTER (Themed) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl p-5 border-t border-gray-100 dark:border-zinc-800 z-[100] pb-safe">
        <button 
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:bg-zinc-800 disabled:text-zinc-600"
        >
          {loading ? "Placing Order..." : `Pay ₹${total.toLocaleString()}`}
          {!loading && <CheckCircle size={18} strokeWidth={3} />}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;