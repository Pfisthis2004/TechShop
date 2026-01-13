
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import { StorageService } from '../services/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: Role) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect dùng để kiểm tra trạng thái đăng nhập khi ứng dụng khởi chạy
  useEffect(() => {
    const savedUser = StorageService.getUser();
    const token = StorageService.getToken();
    
    if (savedUser && token) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: Role) => {
    setIsLoading(true);
    
    // Giả lập gọi API login bằng axios
    try {
      // Trong thực tế sẽ là: const response = await api.post('/auth/login', { email, password });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = role === 'ADMIN' ? MOCK_ADMIN : MOCK_USER;
      const mockJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Token giả lập

      // Lưu trữ bằng StorageService
      StorageService.setUser(mockUser);
      StorageService.setToken(mockJWT);
      
      setUser(mockUser);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    StorageService.clearAll();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
