import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://beach-stall-server-gezy.vercel.app',
  withCredentials: true, // Required for HTTP-only cookies
});

export default api;