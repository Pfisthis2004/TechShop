
import { Product, Category, User, Promotion } from '../types';

export const MOCK_CATEGORIES: Category[] = [];



export const MOCK_PRODUCTS: Product[] = [];


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
