
import { Product, Category, User, Promotion } from '../types';

export const MOCK_CATEGORIES: Category[] = [];


// Add missing isActive property to fix error on line 66
export const MOCK_ADMIN: User = {
  _id: 'a1',
  name: 'System Admin',
  email: 'admin@techmart.com',
  role: 'ADMIN',
  isActive: true,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  createdAt: '2023-12-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

export const MOCK_PRODUCTS: Product[] = [];

// Add missing isActive property to fix error on line 76
export const MOCK_USER: User = {
  _id: 'u1',
  name: 'Nguyễn Văn A',
  email: 'user@techmart.com',
  role: 'USER',
  phone: '0901234567',
  address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
  isActive: true,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UserA',
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-08-20T00:00:00Z'
};

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    _id: 'promo1',
    name: 'Siêu Tiệc Apple',
    code: 'APPLE50',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    minOrderValue: 20000000,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T00:00:00Z',
    usageLimit: 100,
    usedCount: 20,
    isActive: true
  }
];
