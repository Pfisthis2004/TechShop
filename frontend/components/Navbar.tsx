
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  User as UserIcon, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  Settings,
  ChevronDown,
  UserCircle,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-red-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8 flex-1">
            <Link to="/" className="text-2xl font-bold italic tracking-tighter shrink-0">
              TECHMART
            </Link>
            
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative">
              <input
                type="text"
                className="w-full bg-white text-black rounded-md py-2 px-4 focus:outline-none font-medium"
                placeholder="Hôm nay bạn cần tìm gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-2 text-gray-500 hover:text-red-600 transition-colors">
                <Search size={20} />
              </button>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative p-2 hover:bg-red-700 rounded-full transition-all">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-red-600">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 hover:bg-red-700 px-3 py-2 rounded-xl transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <UserIcon size={18} />
                  </div>
                  <span className="max-w-[120px] truncate font-bold">{user.name}</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 text-slate-800 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tài khoản của bạn</p>
                      <p className="text-sm font-black text-slate-900 truncate">{user.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <UserCircle size={18} className="text-red-600" />
                      <span className="text-sm font-bold">Thông tin cá nhân</span>
                    </Link>
                    
                    <Link 
                      to="/orders-history" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <Package size={18} className="text-red-600" />
                      <span className="text-sm font-bold">Đơn hàng của tôi</span>
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-50"
                      >
                        <Settings size={18} className="text-slate-900" />
                        <span className="text-sm font-black uppercase text-slate-900">Quản trị hệ thống</span>
                      </Link>
                    )}

                    <button 
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors border-t border-gray-50"
                    >
                      <LogOut size={18} />
                      <span className="text-sm font-bold">Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 border border-white px-4 py-1.5 rounded-md hover:bg-white hover:text-red-600 transition-all duration-300">
                <UserIcon size={20} />
                <span className="font-medium">Đăng nhập</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-700 pb-4 px-4 border-t border-red-500 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="py-4 relative">
            <input
              type="text"
              className="w-full bg-white text-black rounded-md py-2 px-4 focus:outline-none"
              placeholder="Hôm nay bạn cần tìm gì?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex flex-col space-y-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 py-2 border-b border-red-600">
                  <UserCircle size={20} />
                  <span>Thông tin cá nhân</span>
                </Link>
                <Link to="/orders-history" className="flex items-center gap-2 py-2 border-b border-red-600">
                  <Package size={20} />
                  <span>Đơn hàng của tôi</span>
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="flex items-center gap-2 py-2 border-b border-red-600 font-black uppercase">
                    <Settings size={20} />
                    <span>Quản trị hệ thống</span>
                  </Link>
                )}
                <button onClick={logout} className="flex items-center gap-2 py-2 text-left text-red-100">
                  <LogOut size={20} />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 py-2 font-medium">
                <UserIcon size={20} />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
