
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onClearCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderItems = [], total = 0 } = location.state || {};

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'QR'>('QR');
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    if (orderItems.length === 0) {
      navigate('/cart');
    }
  }, [orderItems, navigate]);

  const handleOrder = () => {
    if (paymentMethod === 'QR' && step === 2) {
      setStep(3);
    } else {
      setIsOrdered(true);
      setTimeout(() => {
        onClearCart();
        navigate('/');
      }, 3000);
    }
  };

  if (isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-in zoom-in duration-500">
        <div className="bg-white rounded-[3rem] p-16 shadow-2xl border border-green-100 inline-block">
          <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={60} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Đặt hàng thành công!</h2>
          <p className="text-slate-500 text-lg font-medium mb-8">Cảm ơn bạn đã tin tưởng TechMart. Đơn hàng của bạn đang được xử lý.</p>
          <p className="text-sm text-slate-400">Đang quay về trang chủ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-10 text-slate-500 hover:text-red-600 transition-colors cursor-pointer group w-fit" onClick={() => navigate('/cart')}>
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold uppercase text-sm tracking-widest">Quay lại giỏ hàng</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="flex items-center gap-6 mb-4">
             {[1, 2].map((i) => (
               <div key={i} className={`flex items-center gap-2 ${step >= i ? 'text-red-600' : 'text-slate-300'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black border-2 ${step >= i ? 'border-red-600 bg-red-50' : 'border-slate-200'}`}>{i}</div>
                 <span className="font-black uppercase text-xs tracking-widest">{i === 1 ? 'Thông tin' : 'Thanh toán'}</span>
                 {i === 1 && <div className="w-12 h-0.5 bg-slate-100 ml-2"></div>}
               </div>
             ))}
          </div>

          {step === 1 ? (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6 animate-in slide-in-from-left duration-500">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Thông tin giao hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Họ tên người nhận</label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none font-semibold text-black" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                  <input type="tel" placeholder="090 123 4567" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none font-semibold text-black" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Địa chỉ nhận hàng</label>
                <textarea placeholder="Số nhà, tên đường, phường/xã..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none font-semibold text-black h-32" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-slate-800 transition-all uppercase tracking-widest shadow-xl">Tiếp tục: Thanh toán</button>
            </div>
          ) : step === 2 ? (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Phương thức thanh toán</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod('QR')}
                  className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${paymentMethod === 'QR' ? 'border-red-600 bg-red-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${paymentMethod === 'QR' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <CreditCard size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-900 uppercase text-sm">Chuyển khoản QR (VietQR)</p>
                      <p className="text-xs text-slate-500 font-medium">Thanh toán nhanh qua ứng dụng ngân hàng</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'QR' ? 'border-red-600 bg-red-600' : 'border-slate-200'}`}>
                    {paymentMethod === 'QR' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('COD')}
                  className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${paymentMethod === 'COD' ? 'border-red-600 bg-red-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${paymentMethod === 'COD' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Truck size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-900 uppercase text-sm">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-xs text-slate-500 font-medium">Thanh toán bằng tiền mặt khi shipper tới</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-red-600 bg-red-600' : 'border-slate-200'}`}>
                    {paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </button>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase tracking-widest">Quay lại</button>
                <button onClick={handleOrder} className="flex-[2] bg-red-600 text-white py-5 rounded-2xl font-black hover:bg-red-700 transition-all uppercase tracking-widest shadow-xl shadow-red-600/20">Xác nhận thanh toán</button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-10 rounded-[3rem] shadow-inner border border-slate-100 flex flex-col items-center animate-in zoom-in duration-500">
               <div className="flex items-center justify-between w-full mb-8 px-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Logo_Vietinbank.svg/2560px-Logo_Vietinbank.svg.png" alt="VietinBank" className="h-6 object-contain" />
                  <div className="flex items-center gap-3">
                    <img src="https://napas.com.vn/datafiles/2/napas-logo-moi-11.png" alt="Napas" className="h-5 object-contain" />
                    <img src="https://vietqr.net/portal-v2/images/img-vietqr.png" alt="VietQR" className="h-5 object-contain" />
                  </div>
               </div>

               <div className="bg-white p-6 rounded-[2rem] shadow-2xl mb-8 border border-slate-50 w-full max-w-[320px]">
                  <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
                     <div className="relative w-full h-full bg-white flex items-center justify-center rounded-xl p-2">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=vietqr://payment/102877548381@vietinbank?amount=${total}&message=TECHMART_PAY`}
                          alt="QR Code"
                          className="w-full h-full grayscale contrast-125"
                        />
                        <div className="absolute inset-0 border-8 border-white"></div>
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-8 border-l-8 border-black rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-8 border-r-8 border-black rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-8 border-l-8 border-black rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-8 border-r-8 border-black rounded-br-lg"></div>
                     </div>
                  </div>
               </div>

               <div className="text-center space-y-2 mb-10">
                  <h3 className="text-2xl font-black text-[#003B71] uppercase tracking-tighter">NGUYEN THE DAI</h3>
                  <p className="text-slate-600 font-bold flex items-center justify-center gap-2">
                    Tài khoản: <span className="text-slate-900 font-black">102877548381</span>
                  </p>
                  <p className="text-[10px] text-[#003B71] font-black uppercase tracking-widest opacity-80">
                    VietinBank CN THAI NGUYEN - PGD CHO THAI
                  </p>
               </div>

               <div className="w-full space-y-4">
                  <button onClick={() => setIsOrdered(true)} className="w-full bg-[#003B71] text-white py-5 rounded-2xl font-black hover:opacity-90 transition-all uppercase tracking-widest shadow-xl">Tôi đã thanh toán xong</button>
                  <button onClick={() => setStep(2)} className="w-full text-slate-400 font-bold text-sm uppercase hover:text-red-600 transition-colors">Hủy & chọn lại phương thức</button>
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100 sticky top-24">
            <h2 className="text-xl font-black text-slate-900 mb-8 pb-8 border-b uppercase tracking-widest">Đơn hàng của bạn</h2>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide mb-8">
              {(orderItems as CartItem[]).map((item) => (
                // Fix: Changed item.product.id to item.product._id
                <div key={item.product._id} className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 shrink-0 flex items-center justify-center border border-slate-100">
                    <img src={item.product.image} alt="" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-slate-400 font-medium">Số lượng: {item.quantity}</p>
                    <p className="text-red-600 font-black text-sm">{(item.product.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-dashed border-slate-200">
              <div className="flex justify-between text-slate-600 font-bold uppercase text-xs tracking-widest">
                <span>Tổng tiền hàng</span>
                <span className="text-slate-900">{total.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-slate-600 font-bold uppercase text-xs tracking-widest">
                <span>Phí vận chuyển</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              <div className="pt-6 mt-6 flex justify-between items-baseline">
                <span className="text-lg font-black text-slate-900 uppercase tracking-tighter">Tổng cộng</span>
                <span className="text-3xl font-black text-red-600">{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4 text-slate-500">
               <ShieldCheck size={24} className="shrink-0 text-red-600" />
               <p className="text-[10px] font-bold leading-relaxed uppercase tracking-tight">
                 Mọi giao dịch đều được bảo mật 256-bit SSL. <br/>
                 Sản phẩm được bảo hiểm 100% trong quá trình vận chuyển.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
