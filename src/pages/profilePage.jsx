// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderService';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Order History</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl">
           <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase">Order ID</span>
                  <p className="text-sm font-mono text-gray-600">{order._id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="border-t border-gray-50 pt-4">
                {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                        <span className="text-gray-600">{item.quantity}x {item.name}</span>
                        <span className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
              </div>

                <div className="border-t border-gray-50 mt-4 pt-4 flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="text-lg font-black text-orange-600">Total: ₹{order.totalPrice.toLocaleString()}</span>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};