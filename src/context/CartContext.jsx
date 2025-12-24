import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isLoggedIn, loading } = useContext(AuthContext);
  const clearCart = () => {
    setCart([]); // Clears local state
  };
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('https://beachstall-server.vercel.app/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => {
  if (!loading) { // Only fetch when auth check is finished
    if (isLoggedIn) fetchCart();
    else setCart([]);
  }
}, [isLoggedIn, loading]);

  const addToCart = async (product) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Please login to add items to cart");
    return;
  }
  try {
    const res = await axios.post('https://beachstall-server.vercel.app/api/cart/add', product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // The backend returns the updated cart object
    setCart(res.data.items); 
  } catch (err) {
    console.error("Error adding to cart", err);
  }
};

  const removeItem = async (productId) => {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`https://beachstall-server.vercel.app/api/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCart(res.data.items);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};