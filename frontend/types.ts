
export type Role = 'USER' | 'ADMIN' | 'STAFF';

export interface User {
  _id: string; // MongoDB ObjectID
  name: string;
  email: string;
  password?: string;
  role: Role;
  phone?: string;
  address?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
  isActive: boolean;
}


export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;      // 👈 ảnh chính (Cloudinary URL)
  images: string[]; 
  categoryId: string;
  brand: string;
  description: string;
  shortDescription?: string; // Đã có optional
  stock: number;
  soldCount: number;
  rating: number;
  reviewsCount: number;
  promotions: string[];
  specs: Record<string, string>; // Cách viết ngắn gọn hơn của { [key: string]: string }
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  _id: string;
  orderCode: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'COD' | 'QR' | 'STRIPE';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Promotion {
  _id: string;
  name: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderValue: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}
