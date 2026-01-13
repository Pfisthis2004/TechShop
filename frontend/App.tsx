
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrdersHistory from './pages/OrdersHistory';
import Dashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/Products';
import AdminPromotions from './pages/Admin/Promotions';
import AdminOrders from './pages/Admin/Orders';
import AdminUsers from './pages/Admin/Users';
import AdminReports from './pages/Admin/Reports';
import ChatbotSettings from './pages/Admin/ChatbotSettings';
import AIChatbot from './components/AIChatbot';
import { Product, CartItem } from './types';
import { StorageService } from './services/storage';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart as CartIcon, 
  Users, 
  Tag, 
  BarChart3, 
  LogOut,
  MessageSquare
} from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Sản phẩm', path: '/admin/products', icon: Package },
    { name: 'Khuyến mãi', path: '/admin/promotions', icon: Tag },
    { name: 'Chatbot AI', path: '/admin/chatbot', icon: MessageSquare },
    { name: 'Đơn hàng', path: '/admin/orders', icon: CartIcon },
    { name: 'Khách hàng', path: '/admin/users', icon: Users },
    { name: 'Thống kê', path: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <aside className="w-80 bg-slate-900 text-white shrink-0 hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl overflow-hidden">
        <div className="p-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
          <Link to="/" className="text-3xl font-black italic text-red-500 tracking-tighter">TECHMART</Link>
          <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.3em] font-black opacity-60">Admin System 2024</p>
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-4 rounded-[1.25rem] transition-all duration-300 relative group ${
                  isActive 
                  ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={22} className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                <span className="font-black text-sm uppercase tracking-widest">{item.name}</span>
                {isActive && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white shadow-glow"></div>}
              </Link>
            );
          })}
        </nav>
        <div className="p-8 border-t border-white/5 bg-slate-950/30 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center font-black text-xl shadow-lg shadow-red-600/30">
              {user?.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-black truncate text-sm uppercase tracking-tighter text-white">{user?.name}</p>
              <p className="text-[10px] text-slate-500 truncate font-bold uppercase">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-4 w-full px-6 py-4 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all duration-300 group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-black text-sm uppercase tracking-widest">Đăng xuất hệ thống</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-12 lg:p-20 relative">
        <div className="lg:hidden flex items-center justify-between mb-12 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
           <Link to="/" className="text-2xl font-black italic text-red-600 tracking-tighter">TECHMART</Link>
           <button onClick={logout} className="p-3 bg-red-50 text-red-600 rounded-2xl"><LogOut size={20}/></button>
        </div>
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
           {children}
        </div>
      </main>
    </div>
  );
};

// Component con để quản lý State và Logic giỏ hàng theo User
const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const isInitialLoad = useRef(true);

  // 1. Nạp giỏ hàng từ LocalStorage khi User thay đổi (Login/Logout)
  useEffect(() => {
    const userId = user?._id;
    const savedCart = StorageService.getCart(userId);
    setCart(savedCart);
    // Đặt ref về true để effect lưu (ở dưới) không chạy ngay khi vừa nạp dữ liệu cũ lên
    isInitialLoad.current = true;
  }, [user?._id]);

  // 2. Lưu giỏ hàng vào LocalStorage mỗi khi có thay đổi trong state cart
  useEffect(() => {
    // Bỏ qua lần render đầu tiên ngay sau khi nạp dữ liệu từ LocalStorage
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    const userId = user?._id;
    StorageService.setCart(userId, cart);
  }, [cart, user?._id]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item => 
          item.product._id === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { productId: product._id, product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.product._id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product._id !== id));
  };

  const clearCart = () => {
    setCart([]);
    StorageService.removeCart(user?._id);
  };

  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<><Navbar cartCount={cart.length} /><Home onAddToCart={addToCart} /><AIChatbot /></>} />
        <Route path="/product/:id" element={<><Navbar cartCount={cart.length} /><ProductDetail onAddToCart={addToCart} /><AIChatbot /></>} />
        <Route path="/cart" element={<><Navbar cartCount={cart.length} /><Cart items={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} /><AIChatbot /></>} />
        <Route path="/checkout" element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']}><Navbar cartCount={cart.length} /><Checkout onClearCart={clearCart} /><AIChatbot /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']}><Navbar cartCount={cart.length} /><Profile /><AIChatbot /></ProtectedRoute>} />
        <Route path="/orders-history" element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']}><Navbar cartCount={cart.length} /><OrdersHistory /><AIChatbot /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout><AdminProducts /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/promotions" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout><AdminPromotions /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout><AdminOrders /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout><AdminReports /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/chatbot" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout><ChatbotSettings /></AdminLayout></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
