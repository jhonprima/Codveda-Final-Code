import api from './api';

const cartService = {
  // Get user's cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId, quantity) => {
    const response = await api.post('/cart', {
      product_id: productId,
      quantity,
    });
    return response.data;
  },

  // Update cart item
  updateCartItem: async (cartId, quantity) => {
    const response = await api.put(`/cart/${cartId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (cartId) => {
    const response = await api.delete(`/cart/${cartId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },
};

export default cartService;