import axios from 'axios';

// 1. Create the instance
const api = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://beach-stall-server-gezy.vercel.app',
  withCredentials: true, // Crucial for sending/receiving HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend returns 401 (Unauthorized), it means the cookie is invalid or expired
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or unauthorized. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default api;