import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderServices';
import axios from 'axios';
import { 
  Package, Calendar, ChevronRight, ShoppingBag, 
  Clock, CheckCircle2, AlertCircle, XCircle 
} from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🟢 Cancellation Handler
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      // 🟢 Get token from localStorage (assuming that's where you store it)
      const token = localStorage.getItem('token'); 

      const response = await axios.put(
        `https://beach-stall-server-gezy.vercel.app/api/orders/${orderId}/cancel`,
        {}, // Empty body
        {
          headers: { Authorization: `Bearer ${token}` } // 🟢 MUST include this
        }
      );
      
      if (response.data.success) {
        setOrders(prev => prev.map(order => 
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        ));
        alert("Order cancelled successfully.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order.");
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Succeeded': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'Order Preparing': return 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400';
      case 'Order Ready': return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400';
      case 'Cancelled': return 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400';
      default: return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 dark:bg-zinc-950">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing History...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* 🏷️ Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Package size={20} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">VIP Accounts</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Purchase History</h2>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-gray-200">
            <ShoppingBag size={40} className="text-gray-300 mb-4" />
            <p className="text-sm font-bold text-gray-500">No orders found in your vault.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800/50 shadow-sm overflow-hidden transition-all hover:shadow-md">
                
                {/* 💳 Order Header */}
                <div className="bg-gray-50/50 dark:bg-zinc-800/30 px-6 py-5 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-black">Status</span>
                      <span className={`mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${getStatusStyles(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-gray-200 pl-6">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-black">Total Bill</span>
                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                        ₹{order.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 🟢 Conditional Cancel Button */}
                  {['Pending', 'Order Preparing'].includes(order.status) && (
                    <button 
                      onClick={() => handleCancelOrder(order._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-colors"
                    >
                      <XCircle size={14} /> Cancel Order
                    </button>
                  )}
                </div>

                {/* 📦 Order Items */}
                <div className="p-6 divide-y divide-gray-100 dark:divide-zinc-800">
                  {order.orderItems.map((item) => (
                    <div key={item._id || item.productId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <img 
                        src={item.productId?.image || item.image || '/assets/images/placeholder.png'}  
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-xl bg-gray-100" 
                      />
                      <div className="flex-1">
                        <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 📝 Footer */}
                <div className="px-6 py-4 bg-gray-50/30 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                   <span className="text-[9px] text-gray-400 font-mono">ID: {order._id}</span>
                   <button className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-1">
                     Details <ChevronRight size={14} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
