
const TOKEN_KEY = 'techmart_access_token';
const USER_KEY = 'techmart_user_data';
const CART_PREFIX = 'techmart_cart_';

export const StorageService = {
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  setUser: (user: any) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  getUser: () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

 // Quản lý giỏ hàng theo User ID (hoặc 'guest' nếu chưa đăng nhập)
  setCart: (userId: string | undefined, cartItems: any[]) => {
    const key = `${CART_PREFIX}${userId || 'guest'}`;
    localStorage.setItem(key, JSON.stringify(cartItems));
  },

  getCart: (userId: string | undefined) => {
    const key = `${CART_PREFIX}${userId || 'guest'}`;
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  removeCart: (userId: string | undefined) => {
    const key = `${CART_PREFIX}${userId || 'guest'}`;
    localStorage.removeItem(key);
  },

  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};
