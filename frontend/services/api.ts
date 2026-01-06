
import axios from 'axios';
import { StorageService } from './storage';
import { Product, Order, Category, User } from '../types';

// Bước 1: Khởi tạo gọn nhẹ
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "ngrok-skip-browser-warning": "true" }
});
/*
// 2. Request Interceptor: Tự động thêm Token vào Header
api.interceptors.request.use(
  (config) => {
    const token = StorageService.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Xử lý khi Token hết hạn (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      StorageService.clearAll();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
*/
// --- Cấu trúc API tương ứng với các Controller trong Spring Boot ---

export const AuthAPI = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
};

export const ProductAPI = {
  // 1. Lấy tất cả (có hỗ trợ truyền params như page, limit nếu sau này làm phân trang)
  getAllProducts: (params?: any) => api.get<Product[]>('/products', { params }),

  // 2. Lấy chi tiết theo ID
  getProductById: (id: string) => api.get<Product>(`/products/detail/${id}`),

  // 3. Tìm kiếm theo tên (Khớp với @RequestParam String name của bạn)
  searchByName: (name: string) => api.get<Product[]>('/products/search', { params: { name } }),

  // 4. Lấy theo danh mục (Khớp với /category/{categoryId} của bạn)
  getByCategory: (categoryId: string) => api.get<Product[]>(`/products/category/${categoryId}`),

  // 5. Tạo mới
  createProduct: (data: Partial<Product>) => api.post<Product>('/products', data),

  // 6. Cập nhật (Sử dụng Partial để chỉ gửi những trường thay đổi)
  updateProduct: (id: string, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data),

  // 7. Xóa
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
};

export const CategoryAPI = {
  getAllCategory: (params?: any) => api.get<Category[]>('/categories', { params }),
  create: (data: Partial<Category>) => api.post<Product>('/categories', data),
};

export const OrderAPI = {
  create: (orderData: any) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/my-orders'),
  getAllOrders: () => api.get('/orders/admin/all'),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
};

export default api;
