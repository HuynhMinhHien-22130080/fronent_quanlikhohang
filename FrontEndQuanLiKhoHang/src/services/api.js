import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints cho Product
export const productApi = {
  // Lấy điều kiện tìm kiếm
  getSearchConditions: () => api.get('/product/search-conditions'),
  
  // Lấy danh sách sản phẩm
  getProducts: () => api.get('/product'),

}; 