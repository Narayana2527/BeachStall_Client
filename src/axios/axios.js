import axios from 'axios';

const api = axios.create({
  // Empty baseURL in dev = requests go to same origin (localhost:5173)
  // Vite proxy then forwards /api/* to localhost:5000
  // In production (Netlify), VITE_API_URL is set to the Vercel server URL
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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