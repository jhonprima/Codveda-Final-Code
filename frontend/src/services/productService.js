import api from './api';

const productService = {
  // Get all products
  getAllProducts: async (params = {}) => {
    const { page = 1, limit = 12, search = '' } = params;
    const response = await api.get('/products', {
      params: { page, limit, search },
    });
    return response.data;
  },

  // Get single product
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    const { page = 1, limit = 12 } = params;
    const response = await api.get(`/products/category/${categoryId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Create product (Admin only)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update product (Admin only)
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (Admin only)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  // Get single product
getProductById: async (id) => {
  try {
    console.log('API: Fetching product ID:', id); // Debug log
    const response = await api.get(`/products/${id}`);
    console.log('API: Product response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('API: Error fetching product:', error); // Debug log
    throw error;
  }
},


  // Create category (Admin only)
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
};

export default productService;