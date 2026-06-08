import React, { useEffect, useState } from 'react';
import { getMyOrders, cancelOrder } from '../services/orderServices';
import {
  Package, ChevronRight, ShoppingBag,
  XCircle, RefreshCw
} from 'lucide-react';
import Swal from 'sweetalert2';

const statusConfig = {
  'Pending':          { label: 'Pending',           cls: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
  'Order Preparing':  { label: 'Order Preparing',   cls: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' },
  'Order Ready':      { label: 'Order Ready',        cls: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' },
  'Out for Delivery': { label: 'Out for Delivery',   cls: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' },
  'Succeeded':        { label: 'Delivered',          cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  'Cancelled':        { label: 'Cancelled',          cls: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' },
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getMyOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Cancel this order?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'Keep order',
      background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fafafa' : '#18181b',
    });
    if (!result.isConfirmed) return;

    setCancellingId(orderId);
    try {
      const res = await cancelOrder(orderId);
      if (res.success) {
        setOrders(prev =>
          prev.map(o => o._id === orderId ? { ...o, status: 'Cancelled' } : o)
        );
        Swal.fire({
          toast: true, position: 'top-end', icon: 'success',
          title: 'Order cancelled', showConfirmButton: false, timer: 2000,
          background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
          color: document.documentElement.classList.contains('dark') ? '#fafafa' : '#18181b',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error', title: 'Could not cancel',
        text: err.response?.data?.message || 'Please try again.',
        confirmButtonColor: '#f97316',
      });
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 dark:bg-zinc-950">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading your orders...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Package size={20} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">My Account</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
              Order History
            </h2>
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
            <ShoppingBag size={40} className="text-gray-300 mb-4" />
            <p className="text-sm font-bold text-gray-500 dark:text-zinc-400">No orders yet.</p>
            <a href="/menu" className="mt-4 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest hover:underline">
              Browse Menu →
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const sc = statusConfig[order.status] || statusConfig['Pending'];
              const isExpanded = expandedId === order._id;
              const canCancel = ['Pending', 'Order Preparing'].includes(order.status);
              const isCancelling = cancellingId === order._id;

              return (
                <div
                  key={order._id}
                  className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800/50 shadow-sm overflow-hidden transition-all hover:shadow-md"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50/50 dark:bg-zinc-800/30 px-6 py-5 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-black">Status</span>
                        <span className={`mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${sc.cls}`}>
                          {sc.label}
                        </span>
                      </div>
                      <div className="flex flex-col border-l border-gray-200 dark:border-zinc-700 pl-6">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-black">Total Bill</span>
                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                          ₹{order.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col border-l border-gray-200 dark:border-zinc-700 pl-6">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-black">Date</span>
                        <span className="text-[11px] font-bold text-gray-600 dark:text-zinc-400">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {canCancel && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={isCancelling}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-colors disabled:opacity-50"
                        >
                          {isCancelling
                            ? <div className="w-3 h-3 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" />
                            : <XCircle size={14} />
                          }
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 divide-y divide-gray-100 dark:divide-zinc-800">
                    {(isExpanded ? order.orderItems : order.orderItems.slice(0, 2)).map((item, idx) => (
                      <div key={item._id || idx} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                        <img
                          src={item.productId?.image || item.image || '/placeholder.png'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl bg-gray-100 dark:bg-zinc-800"
                        />
                        <div className="flex-1">
                          <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase">{item.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-zinc-400">
                            Qty: {item.quantity} × ₹{item.price}
                            <span className="ml-2 font-bold text-gray-700 dark:text-zinc-300">
                              = ₹{(item.quantity * item.price).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}

                    {order.orderItems.length > 2 && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : order._id)}
                        className="w-full pt-4 text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center justify-center gap-1"
                      >
                        {isExpanded
                          ? 'Show less'
                          : `+${order.orderItems.length - 2} more item${order.orderItems.length - 2 > 1 ? 's' : ''}`}
                        <ChevronRight size={14} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-gray-50/30 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                    <span className="text-[9px] text-gray-400 font-mono truncate max-w-[180px]">
                      ID: {order._id}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-zinc-500 font-bold">
                      {order.paymentMethod} · {order.isPaid ? '✓ Paid' : 'Pending payment'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;