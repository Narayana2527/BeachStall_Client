import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderServices';
import { Package, Calendar, ChevronRight } from 'lucide-react';

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

  if (loading) return <div className="p-10 text-center">Loading your orders...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Package className="text-orange-500" size={28} />
        <h2 className="text-3xl font-bold text-gray-900">Purchase History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden transition-hover hover:shadow-md">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order Date</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col border-l pl-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total Amount</span>
                    <span className="text-sm font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">#{order._id.slice(-6)}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 divide-y divide-gray-50">
                {order.orderItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    {/* If you used .populate() in backend, access via item.productId.image */}
                    <img 
                      src={item.productId?.image || item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-2xl bg-gray-100" 
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} <span className="mx-2">•</span> Price: ₹{item.price}
                      </p>
                      {/* Example of showing product category from populated data */}
                      {item.productId?.category && (
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 mt-1 inline-block">
                          {item.productId.category}
                        </span>
                      )}
                    </div>
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                      <ChevronRight size={20} className="text-gray-300" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;