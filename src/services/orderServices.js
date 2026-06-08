import api from '../axios/axios';

export const placeOrder = async (orderData) => {
  const response = await api.post('/api/orders/create', orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/api/orders/myorders');
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.put(`/api/orders/${orderId}/cancel`);
  return response.data;
};