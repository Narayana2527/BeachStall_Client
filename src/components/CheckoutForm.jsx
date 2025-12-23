// components/CheckoutForm.jsx
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { placeOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // State for form fields
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      orderItems: cart,
      shippingAddress: formData, // Data from the form state
      totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      paymentMethod: "COD"
    };

    try {
      await placeOrder(orderData);
      alert("Order Successful!");
      // Logic to clear cart should go here
      navigate('/profile'); 
    } catch (err) {
      alert("Error placing order");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            required
            name="address"
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
            placeholder="e.g. 123 Beach Side"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              required
              name="city"
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              required
              name="phone"
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all mt-4"
        >
          Confirm Order
        </button>
      </div>
    </form>
  );
};