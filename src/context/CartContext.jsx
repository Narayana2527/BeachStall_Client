import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import api from '../axios/axios'; 
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isLoggedIn, loading } = useContext(AuthContext);

  const CART_API_PATH = '/api/cart';

  const clearCart = () => {
    setCart([]);
  };

  // 1. Fetch Cart (No headers needed, cookies handle auth)
  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get(CART_API_PATH);
      // Backend should return { items: [...] }
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Cart fetch error", err);
      // If unauthorized, ensure local cart is cleared
      if (err.response?.status === 401) setCart([]);
    }
  }, []);

  // 2. Sync Cart with Login State
  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        fetchCart();
      } else {
        setCart([]);
      }
    }
  }, [isLoggedIn, loading, fetchCart]);

  // 3. Add to Cart
  const addToCart = async (product, showToast = true) => {
    if (!isLoggedIn) {
      Swal.fire({
        title: 'Please Login',
        text: 'You need an account to add items to your cart.',
        icon: 'info',
        confirmButtonColor: '#f97316',
      });
      return;
    }

    try {
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Failed to update cart.',
        confirmButtonColor: '#f97316',
      });
    }
  };

  // 4. Remove Item
  const removeItem = async (productId) => {
    try {
      const res = await api.delete(`${CART_API_PATH}/remove/${productId}`);
      setCart(res.data.items);
    } catch (err) {
      console.error("Remove item error", err);
    }
  };

  // --- THE FIX: Change AuthContext.Provider to CartContext.Provider ---
  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};