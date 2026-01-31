import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import api from '../axios/axios'; 
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isLoggedIn, loading: authLoading } = useContext(AuthContext);

  const CART_API_PATH = '/api/cart';

  // Helper to clear local state
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // 1. Fetch Cart (Cookies handle auth)
  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get(CART_API_PATH);
      // Ensure we set the items array correctly based on your controller response
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setCart([]);
      }
    }
  }, []);

  // 2. Sync Cart with Login State
  useEffect(() => {
    if (!authLoading) {
      if (isLoggedIn) {
        fetchCart();
      } else {
        clearCart();
      }
    }
  }, [isLoggedIn, authLoading, fetchCart, clearCart]);

  // 3. Add to Cart / Update Quantity
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
      /**
       * NORMALIZATION FIX:
       * Your backend controller expects: { productId, name, price, image, quantity }
       * Some frontend components might pass 'item._id' instead of 'productId'.
       */
      const cartPayload = {
        productId: product._id || product.productId,
        name: product.name,
        price: product.price,
        image: product.image || (product.images && product.images[0]),
        quantity: product.quantity || 1 // Defaults to 1 for new additions
      };

      const res = await api.post(`${CART_API_PATH}/add`, cartPayload);
      
      // Update local state with the new items list returned from backend
      setCart(res.data.items || []);
      
      if (showToast) {
        const isDark = document.documentElement.classList.contains('dark');
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Cart Updated',
          showConfirmButton: false,
          timer: 1500,
          background: isDark ? '#18181b' : '#fff',
          color: isDark ? '#fafafa' : '#18181b',
        });
      }
    } catch (err) {
      console.error("Add to cart error:", err);
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
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  const value = {
    cart,
    addToCart,
    removeItem,
    fetchCart,
    clearCart,
    cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
    cartTotal: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};