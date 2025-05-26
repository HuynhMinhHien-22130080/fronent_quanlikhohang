import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints cho Product
export const productApi = {
  // Lấy điều kiện tìm kiếm
  getSearchConditions: () => api.get("/product/search-conditions"),

  // Lấy danh sách sản phẩm
  getProducts: () => api.get("/product"),
};

// API endpoints cho Transaction
export const transactionApi = {
  // Lấy tất cả transactions
  getAllTransactions: (type) => {
    const params = type ? { type } : {};
    return api.get("/transactions", { params });
  },

  // Lấy danh sách phiếu nhập kho
  getImportTransactions: () => api.get("/transactions/imports"),

  // Lấy chi tiết transaction theo ID
  getTransactionById: (id) => api.get(`/transactions/${id}`),

  // 4.4.3: POST /transactions/import - Tạo phiếu nhập kho
  createImportTransaction: async (createDto) => {
    console.log("4.4.3: POST /transactions/import");
    try {
      const response = await api.post("/transactions/import", createDto);
      return response.data;
    } catch (error) {
      console.error("Error creating import transaction:", error);
      // Ném lại error để component xử lý
      throw error.response?.data || error;
    }
  },
};
