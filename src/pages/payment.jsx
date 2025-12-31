import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CreditCard, Smartphone, Lock, CheckCircle, MapPin, ArrowLeft } from 'lucide-react';
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
    <div className="bg-[#fcfcfc] min-h-screen pb-32 lg:py-12">
      <Toaster position="top-center" />
      
      {/* 📱 Mobile Header */}
      <div className="lg:hidden bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ArrowLeft size={24} className="text-gray-700"/></button>
        <h1 className="text-lg font-bold text-gray-900">Payment</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 lg:mt-0">
        <div className="hidden lg:flex mb-10 items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-full">
            <Lock size={16} /> Secure Encrypted
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            {/* Shipping Section */}
            <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-indigo-500" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Delivery Address</h3>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" name="address" placeholder="Flat / House No / Street"
                  value={shippingDetails.address} onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" name="city" placeholder="City"
                    value={shippingDetails.city} onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                  <input 
                    type="text" name="phone" placeholder="Phone Number"
                    value={shippingDetails.phone} onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 bg-gray-50/50 border-b border-gray-100">
                  <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Select Payment Method</span>
                </div>
                <div className="divide-y divide-gray-50">
                   <div onClick={() => setMethod('upi')} className={`p-5 cursor-pointer flex items-center gap-5 transition-all ${method === 'upi' ? 'bg-indigo-50/50' : ''}`}>
                      <div className={`p-2 rounded-lg ${method === 'upi' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <Smartphone size={20} />
                      </div>
                      <div className="flex-1"><p className="font-bold text-gray-900">UPI (GPay, PhonePe, Paytm)</p></div>
                      {method === 'upi' && <CheckCircle className="text-indigo-600" size={20} />}
                   </div>
                   <div onClick={() => setMethod('card')} className={`p-5 cursor-pointer flex items-center gap-5 transition-all ${method === 'card' ? 'bg-indigo-50/50' : ''}`}>
                      <div className={`p-2 rounded-lg ${method === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <CreditCard size={20} />
                      </div>
                      <div className="flex-1"><p className="font-bold text-gray-900">Credit / Debit Card</p></div>
                      {method === 'card' && <CheckCircle className="text-indigo-600" size={20} />}
                   </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gray-900 text-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-8 border-b border-gray-800 pb-4">Bill Details</h3>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-gray-400 font-medium"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-400 font-medium"><span>GST (5%)</span><span>₹{gst.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-400 font-medium"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="text-green-400">FREE</span> : `₹${deliveryFee}`}</span></div>
                <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-lg font-bold">Total Payable</span>
                  <span className="text-3xl font-black text-indigo-400">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading}
                className="hidden lg:block w-full bg-indigo-500 hover:bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg transition-all active:scale-95 disabled:bg-gray-700"
              >
                {loading ? "PLACING ORDER..." : `PLACE ORDER NOW`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE STICKY PLACE ORDER BUTTON */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-100 z-[100] shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
        <button 
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
        >
          {loading ? "Placing Order..." : `Pay ₹${total.toLocaleString()}`}
          {!loading && <CheckCircle size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;