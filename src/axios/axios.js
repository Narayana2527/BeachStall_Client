import axios from 'axios';
 
const api = axios.create({
  // Falls back to the live Vercel URL so the app always works,
  // even if someone forgets to set the env variable.
  baseURL: import.meta.env.VITE_API_URL || 'https://beach-stall-server-gezy.vercel.app',
  withCredentials: true,   // keeps JWT cookie working for auth/cart routes
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// Optional: surface API errors clearly in the console during development
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error(
        `[API] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        error.response?.status,
        error.response?.data
      );
    }
    return Promise.reject(error);
  }
);
 
export default api;