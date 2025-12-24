// context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Fetching fresh data from MongoDB via your Backend
      const res = await axios.get('https://beachstall-server.vercel.app/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data) {
        setUser(res.data); // Data from MongoDB: { name, email, etc. }
      }
    } catch (err) {
      console.error("Auth Error:", err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isLoggedIn: !!user, 
      checkUser, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};