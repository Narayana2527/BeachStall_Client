import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderServices';
import { Package, Calendar, ChevronRight, ShoppingBag, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchOrders();
  }, []);

  // 🌀 Loading State (Skeleton UI feel)
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 dark:bg-zinc-950">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing History...</p>
    </div>
  );

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'processing': return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
      case 'cancelled': return 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300 pb-24 sm:pb-10">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
        
        {/* 🏷️ Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Package size={20} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">VIP Accounts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Purchase History</h2>
          </div>
          <div className="h-[2px] w-12 bg-indigo-500 rounded-full hidden sm:block mb-3"></div>
        </div>

        {orders.length === 0 ? (
          /* 🛒 Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-zinc-800 transition-all">
            <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-950 rounded-[2rem] flex items-center justify-center mb-6 text-gray-300 dark:text-zinc-700">
              <ShoppingBag size={40} />
            </div>
            <p className="text-sm font-bold text-gray-500 dark:text-zinc-400">No orders found in your vault.</p>
            <button className="mt-4 text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600">Start Shopping</button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800/50 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 overflow-hidden"
              >
                {/* 💳 Order Header */}
                <div className="bg-gray-50/50 dark:bg-zinc-800/30 px-6 py-5 flex flex-wrap justify-between items-center gap-4 border-b dark:border-zinc-800/50">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-black">Placed On</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-zinc-200 flex items-center gap-1.5">
                        <Calendar size={13} className="text-indigo-500" /> 
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-gray-200 dark:border-zinc-700 pl-6">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-black">Investment</span>
                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                        ₹{order.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyles(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="hidden sm:block text-[10px] text-gray-400 dark:text-zinc-600 font-mono font-bold">
                      ID: {order._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* 📦 Order Items */}
                <div className="p-6 divide-y divide-gray-100 dark:divide-zinc-800">
                  {order.orderItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0 group/item">
                      <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 h-20 w-20 flex-shrink-0">
                        <img 
                          src={item.productId?.image || item.image || '/assets/images/placeholder.png'} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black text-gray-900 dark:text-white text-sm truncate uppercase tracking-tight">
                            {item.name}
                          </h4>
                          {item.productId?.category && (
                            <span className="text-[8px] bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-gray-500 dark:text-zinc-400 font-bold uppercase">
                              {item.productId.category}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                          Quantity: <span className="text-gray-900 dark:text-zinc-200 font-bold">{item.quantity}</span>
                          <span className="mx-2 text-gray-300 dark:text-zinc-700">•</span> 
                          Unit Price: <span className="text-gray-900 dark:text-zinc-200 font-bold">₹{item.price}</span>
                        </p>
                      </div>

                      <button className="p-3 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-300 dark:text-zinc-700 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl transition-all">
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* 📝 Footer (Quick Actions) */}
                <div className="px-6 py-4 bg-gray-50/30 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800/50 flex justify-end">
                   <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500 hover:text-indigo-500 transition-colors flex items-center gap-2">
                     View Invoice Details <ChevronRight size={14} />
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