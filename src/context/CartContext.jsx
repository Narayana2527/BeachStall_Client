import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import api from '../axios/axios'; // Import your pre-configured axios instance
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isLoggedIn, loading } = useContext(AuthContext);

  // Use a relative path or the api instance's baseURL logic
  const CART_API_PATH = '/api/cart';

  const clearCart = () => {
    setCart([]);
  };

  const fetchCart = useCallback(async () => {
    // We no longer check for a token string here. 
    // If we are logged in, the cookie exists in the browser.
    try {
      const res = await api.get(CART_API_PATH);
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Cart fetch error", err);
      if (err.response?.status === 401) setCart([]);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) fetchCart();
      else setCart([]);
    }
  }, [isLoggedIn, loading, fetchCart]);

  const addToCart = async (product, showToast = true) => {
    if (!isLoggedIn) {
      Swal.fire({
        title: 'Please Login',
        text: 'You need to be logged in to add items to your cart.',
        icon: 'info',
        confirmButtonColor: '#f97316',
      });
      return;
    }

    try {
      // Cookies are sent automatically by 'api'
      const res = await api.post(`${CART_API_PATH}/add`, product);
      
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Failed to update cart.',
        confirmButtonColor: '#f97316',
      });
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await api.delete(`${CART_API_PATH}/remove/${productId}`);
      setCart(res.data.items);
    } catch (err) {
      console.error("Remove item error", err);
    }
  };

  return (
    <AuthContext.Provider value={{ cart, addToCart, removeItem, fetchCart, clearCart }}>
      {children}
    </AuthContext.Provider>
  );
};