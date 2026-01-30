import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../axios/axios';
import Swal from 'sweetalert2'; // Assuming you use this for feedback

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check user status on mount (Silent Auth)
  const checkUser = useCallback(async () => {
    try {
      // Cookies are sent automatically if withCredentials is true in axios.js
      const res = await api.get('/api/auth/me');
      if (res.data) {
        setUser(res.data);
      }
    } catch (err) {
      // 401 errors are expected if the user isn't logged in, so we just reset user
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Login Handler
  const login = async (email, password) => {
    try {
      const res = await api.post('/api/user/login', { email, password });
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      // Pass the error back to the login component to show a message
      throw err.response?.data?.message || "Login failed";
    }
  };

  // 3. Logout Handler
  const logout = async () => {
    try {
      await api.get('/api/user/logout');
      setUser(null);
      
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Logged out successfully',
        showConfirmButton: false,
        timer: 2000
      });
    } catch (err) {
      console.error("Logout failed", err);
      // Even if the server request fails, clear local state
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoggedIn: !!user, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};