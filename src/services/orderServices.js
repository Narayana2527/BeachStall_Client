import axios from 'axios';

const API_URL = 'https://beachstall-server.vercel.app/api/orders';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const placeOrder = async (orderData) => {
  // If this fails, the catch block in your component will trigger
  const response = await axios.post(`${API_URL}/create`, orderData, getAuthHeaders());
  return response.data; 
};
export const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/myorders`, getAuthHeaders());
  return response.data;
};