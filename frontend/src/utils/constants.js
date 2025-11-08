// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Order Status Options
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  pending: 'Menunggu Pembayaran',
  processing: 'Sedang Diproses',
  shipped: 'Dalam Pengiriman',
  delivered: 'Selesai',
  cancelled: 'Dibatalkan',
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
};

// Image Placeholder
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

// Toast Duration
export const TOAST_DURATION = 3000;

// Categories (fallback)
export const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Electronics', icon: '💻' },
  { id: 2, name: 'Fashion', icon: '👕' },
  { id: 3, name: 'Home & Living', icon: '🏠' },
  { id: 4, name: 'Books', icon: '📚' },
  { id: 5, name: 'Sports', icon: '⚽' },
];