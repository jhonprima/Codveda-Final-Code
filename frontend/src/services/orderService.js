import api from './api';

const orderService = {
  // Create new order
  createOrder: async (shippingAddress) => {
    const response = await api.post('/orders', {
      shipping_address: shippingAddress,
    });
    return response.data;
  },

  // Get user's orders
  getMyOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get order detail
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (id) => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },

  // Get all orders (Admin only)
  getAllOrders: async () => {
    const response = await api.get('/orders/admin/all');
    return response.data;
  },

  // Update order status (Admin only)
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default orderService;