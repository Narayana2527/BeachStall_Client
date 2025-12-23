import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CreditCard, Smartphone, Globe, Lock, CheckCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/orderServices';
import { Toaster, toast } from 'react-hot-toast';

const PaymentPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [method, setMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  // --- Shipping Address State ---
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  // --- Calculation Logic ---
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const gst = subtotal * 0.05; // 5% GST
  const total = subtotal + deliveryFee + gst;

  const handlePayment = async () => {
    // Validation
    if (cart.length === 0) return toast.error("Your cart is empty");
    if (!shippingDetails.address || !shippingDetails.city || !shippingDetails.phone) {
      return toast.error("Please fill all shipping details");
    }

    try {
      setLoading(true);
      
      const orderData = {
        orderItems: cart,
        shippingAddress: shippingDetails, // Integrated from state
        totalPrice: total,
        paymentMethod: method.toUpperCase(),
        // Optional: you can send subtotal, gst, and delivery separately if your backend schema supports it
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
    <div className="bg-[#fcfcfc] min-h-screen py-12">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-full">
                <Lock size={16} /> Secure Encrypted
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* --- Section 1: Shipping Address --- */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-orange-500" />
                <h3 className="text-xl font-bold text-gray-800">Shipping Details</h3>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" name="address" placeholder="Flat / House No / Street"
                  value={shippingDetails.address} onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" name="city" placeholder="City"
                    value={shippingDetails.city} onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                  <input 
                    type="text" name="phone" placeholder="Phone Number"
                    value={shippingDetails.phone} onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* --- Section 2: Payment Methods --- */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-gray-700 uppercase tracking-widest text-xs">Payment Method</span>
                </div>
                <div className="divide-y divide-gray-50">
                   <div onClick={() => setMethod('upi')} className={`p-6 cursor-pointer flex items-center gap-5 transition-all ${method === 'upi' ? 'bg-orange-50/50' : ''}`}>
                      <Smartphone className={method === 'upi' ? 'text-orange-500' : 'text-gray-400'} />
                      <div className="flex-1"><p className="font-bold text-gray-900">UPI (GPay, PhonePe)</p></div>
                      {method === 'upi' && <CheckCircle className="text-orange-500" />}
                   </div>
                   <div onClick={() => setMethod('card')} className={`p-6 cursor-pointer flex items-center gap-5 transition-all ${method === 'card' ? 'bg-orange-50/50' : ''}`}>
                      <CreditCard className={method === 'card' ? 'text-orange-500' : 'text-gray-400'} />
                      <div className="flex-1"><p className="font-bold text-gray-900">Credit / Debit Card</p></div>
                      {method === 'card' && <CheckCircle className="text-orange-500" />}
                   </div>
                </div>
            </div>
          </div>

          {/* --- Right Column: Order Summary --- */}
          <div className="lg:col-span-5">
            <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-8 border-b border-gray-800 pb-4">Billing Summary</h3>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>GST (5%)</span>
                  <span className="text-white">₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-400" : "text-white"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-black text-orange-400">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-lg transition-all active:scale-95 disabled:bg-gray-700"
              >
                {loading ? "PLACING ORDER..." : `PLACE ORDER`}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentPage;