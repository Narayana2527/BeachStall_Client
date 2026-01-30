import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../axios/axios';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Silent Auth: Check user status on mount
  const checkUser = useCallback(async () => {
    try {
      // Ensure this route matches your backend (e.g., /api/user/check-auth)
      const res = await api.get('/api/auth/check-auth'); 
      
      // Based on your backend 'checkAuth' code, it returns { isLoggedIn: true, user: ... }
      if (res.data && res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      // Silence 401s on refresh for guest users
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Login Handler
  const login = async (email, password) => {
    try {
      const res = await api.post('/api/user/login', { email, password });
      // Your sendTokenResponse backend helper returns { success, user }
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  // 3. Logout Handler
  const logout = async () => {
    try {
      await api.get('/api/user/logout');
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Logged out successfully',
        showConfirmButton: false,
        timer: 2000,
        background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fafafa' : '#18181b',
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const value = {
    user,
    login,
    logout,
    isLoggedIn: !!user,
    loading,
    checkUser // Exported so you can re-verify after a password reset
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        // High-quality loading state to prevent route flickers
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-300">
          <div className="relative flex items-center justify-center">
             <div className="h-16 w-16 animate-spin rounded-full border-4 border-orange-500/20 border-t-orange-500" />
             <div className="absolute h-8 w-8 animate-pulse rounded-full bg-orange-500/20" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-orange-500/60 animate-pulse">
            Verifying Session
          </p>
        </div>
      )}
    </AuthContext.Provider>
  );
};