import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isLoggedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Unified Base URL (Update this to your actual working Vercel URL)
  const API_BASE_URL = 'https://beachstall-server.vercel.app/api/cart';

  const clearCart = () => {
    setCart([]);
  };

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) fetchCart();
      else setCart([]);
    }
  }, [isLoggedIn, loading]);

 const addToCart = async (product, showToast = true) => {
    const token = localStorage.getItem('token');

    if (!token) {
      handleUnauthorized(); 
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/add`, product, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart(res.data.items);
      if (showToast) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Added to cart',
          showConfirmButton: false,
          timer: 1500,
          background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
          color: document.documentElement.classList.contains('dark') ? '#fafafa' : '#18181b',
        });
      }

    } catch (err) {
      console.error("Error adding to cart", err);
      // We usually want to show errors regardless
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update cart.',
        confirmButtonColor: '#f97316',
      });
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.delete(`${API_BASE_URL}/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("Remove item error", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};