
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, Lock } from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate(); // Hook để điều hướng
  const location = useLocation(); // Hook để lấy thông tin route hiện tại
  const { user } = useAuth();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      // TRUYỀN DỮ LIỆU: Gửi dữ liệu giỏ hàng qua state của navigate
      navigate('/checkout', {
        state: {
          orderItems: items,
          total: subtotal,
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="flex flex-col items-center animate-in fade-in duration-700">
          <div className="bg-gray-100 p-10 rounded-full mb-8">
            <ShoppingBag size={100} className="text-gray-300" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-500 mb-10 text-lg">Hàng ngàn sản phẩm công nghệ đang chờ đón bạn!</p>
          <Link to="/" className="bg-red-600 text-white px-12 py-4 rounded-full font-black hover:bg-red-700 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 uppercase tracking-wider">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-10 text-slate-500 hover:text-red-600 transition-colors cursor-pointer group w-fit" onClick={() => navigate('/')}>
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold uppercase text-sm tracking-widest">Quay lại mua sắm</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
             <h1 className="text-3xl font-black text-gray-900 uppercase">Giỏ hàng của bạn ({items.length})</h1>
             {/* Fix: Changed item.product.id to item.product._id */}
             <button onClick={() => items.forEach(i => onRemove(i.product._id))} className="text-sm text-gray-400 hover:text-red-600 font-bold transition-colors">Xóa tất cả</button>
          </div>

          {items.map((item) => (
            // Fix: Changed item.product.id to item.product._id
            <div key={item.product._id} className="bg-white rounded-2xl shadow-sm p-6 flex gap-6 border border-gray-100 animate-in slide-in-from-left duration-500">
              <div className="w-24 md:w-32 aspect-square shrink-0 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                <img src={item.product.image} alt={item.product.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-gray-900 md:text-xl line-clamp-1">{item.product.name}</h3>
                    <button
                      // Fix: Changed item.product.id to item.product._id
                      onClick={() => onRemove(item.product._id)}
                      className="text-gray-300 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                     <p className="text-red-600 font-black text-lg">{item.product.price.toLocaleString('vi-VN')}đ</p>
                     <p className="text-xs text-gray-400 line-through">{(item.product.originalPrice).toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                    <button
                      // Fix: Changed item.product.id to item.product._id
                      onClick={() => onUpdateQuantity(item.product._id, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors disabled:opacity-20 shadow-sm"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-black text-gray-900">{item.quantity}</span>
                    <button
                      // Fix: Changed item.product.id to item.product._id
                      onClick={() => onUpdateQuantity(item.product._id, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-black text-gray-900">
                    {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4 text-blue-800">
             <ShieldCheck size={32} className="shrink-0" />
             <div className="text-sm">
                <p className="font-black uppercase tracking-tighter">TechMart Cam Kết</p>
                <p className="font-medium opacity-80">Sản phẩm chính hãng 100%, bảo hành chính hãng toàn quốc, hỗ trợ kỹ thuật trọn đời.</p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6 pb-6 border-b uppercase tracking-widest">Thanh toán</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Tạm tính</span>
                <span className="text-gray-900 font-bold">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Phí vận chuyển</span>
                <span className="text-green-600 font-black">MIỄN PHÍ</span>
              </div>
              <div className="pt-6 border-t border-dashed mt-6 flex justify-between">
                <span className="text-lg font-black text-gray-900 uppercase">Tổng cộng</span>
                <span className="text-2xl font-black text-red-600">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">(Đã bao gồm thuế giá trị gia tăng VAT)</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black hover:bg-red-700 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {!user && <Lock size={18} />}
              {user ? 'Tiến hành thanh toán' : 'Đăng nhập để thanh toán'}
            </button>

            <div className="mt-8 flex flex-col gap-4">
               <div className="p-3 border border-gray-100 rounded-xl bg-gray-50 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Đã áp dụng mã giảm giá vận chuyển</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
