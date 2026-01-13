// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState(''); // email hoặc username
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(identifier, password);
        navigate(from, { replace: true });
      } else {
        await register({
          name,
          email: identifier,
          password,
          phone,
          address,
        });
        alert('Đăng ký thành công. Vui lòng đăng nhập.');
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-md w-full animate-in zoom-in duration-500">
        <div className="bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-red-600 italic tracking-tighter mb-4">TECHMART</h1>
            <p className="text-slate-400 font-medium uppercase text-xs tracking-[0.2em]">
              {isLogin ? 'Chào mừng bạn quay trở lại' : 'Trở thành thành viên TechMart'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="animate-in slide-in-from-top duration-300">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Họ và tên</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all font-semibold text-black placeholder:text-slate-400"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Email tài khoản</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all font-semibold text-black placeholder:text-slate-400"
                  placeholder="admin@techmart.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              {isLogin && (
                <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight"></p>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all font-semibold text-black placeholder:text-slate-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Số điện thoại</label>
                  <input
                    type="text"
                    className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none transition-all"
                    placeholder="0123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none transition-all"
                    placeholder="Hà Nội"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-black text-red-600 uppercase hover:underline tracking-widest">Quên mật khẩu?</button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-red-600/30 hover:bg-red-700 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              {isLogin ? 'Đăng nhập ngay' : 'Tạo tài khoản'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-slate-500 font-medium text-sm">
              {isLogin ? 'Bạn chưa có tài khoản tại TechMart?' : 'Bạn đã là thành viên của chúng tôi?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-black text-red-600 hover:underline uppercase tracking-tighter"
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Phát triển bởi FPT Tech Academy &copy; 2024
        </p>
      </div>
    </div>
  );
};

export default Login;
