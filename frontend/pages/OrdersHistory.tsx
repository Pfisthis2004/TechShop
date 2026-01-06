
import React, { useState } from 'react';
import {
  Package, Truck, Clock, CheckCircle, ChevronRight,
  ShoppingBag, X, MapPin, CreditCard, AlertCircle,
  ArrowLeft, RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderRecord {
  id: string;
  date: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  total: number;
  items: OrderItem[];
  address: string;
  paymentMethod: string;
}

const OrdersHistory: React.FC = () => {
  // Giả lập lịch sử đơn hàng với trạng thái có thể cập nhật
  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: 'TM-9012',
      date: '25/08/2024',
      status: 'PROCESSING',
      total: 30990000,
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
      paymentMethod: 'Chuyển khoản QR (VietQR)',
      items: [
        { name: 'iPhone 15 Pro Max 256GB', image: 'https://picsum.photos/400/400?random=1', price: 30990000, quantity: 1 }
      ]
    },
    {
      id: 'TM-8812',
      date: '20/07/2024',
      status: 'COMPLETED',
      total: 43480000,
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
      paymentMethod: 'Thanh toán khi nhận hàng (COD)',
      items: [
        { name: 'MacBook Air 13 M2', image: 'https://picsum.photos/400/400?random=2', price: 24990000, quantity: 1 },
        { name: 'ASUS TUF Gaming F15', image: 'https://picsum.photos/400/400?random=4', price: 18490000, quantity: 1 }
      ]
    },
    {
      id: 'TM-7041',
      date: '15/06/2024',
      status: 'CANCELLED',
      total: 29990000,
      address: '456 Đường CMT8, Quận 10, TP.HCM',
      paymentMethod: 'Chuyển khoản QR (VietQR)',
      items: [
        { name: 'Samsung Galaxy S24 Ultra', image: 'https://picsum.photos/400/400?random=3', price: 29990000, quantity: 1 }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'PROCESSING': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'PENDING': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'SHIPPING': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'COMPLETED': return 'bg-green-50 text-green-600 border-green-100';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'PENDING': return 'Chờ xác nhận';
      case 'PROCESSING': return 'Đang xử lý';
      case 'SHIPPING': return 'Đang giao hàng';
      case 'COMPLETED': return 'Hoàn thành';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'CANCELLED' } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: 'CANCELLED' } : null);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between mb-10">
        <div>
           <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Đơn hàng của tôi</h1>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Quản lý và theo dõi lịch sử mua sắm</p>
        </div>
        <ShoppingBag className="text-red-100" size={64} />
      </div>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl p-3 shrink-0 border border-slate-100 flex items-center justify-center shadow-inner">
                    <img src={order.items[0].image} alt="" className="max-w-full max-h-full object-contain" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xl font-black text-slate-900 uppercase tracking-tight">Đơn #{order.id}</span>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-500 line-clamp-1">{order.items[0].name} {order.items.length > 1 && `và ${order.items.length - 1} sản phẩm khác`}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Ngày đặt: {order.date}</p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1 shrink-0">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Tổng thanh toán</p>
                    <p className="text-2xl font-black text-red-600">{order.total.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
                    >
                      Xem chi tiết <ChevronRight size={14} />
                    </button>
                    {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="px-6 py-3 bg-white border border-red-100 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all"
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Cần hỗ trợ? <Link to="/support" className="text-red-400 hover:underline">Chat ngay</Link></p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
             <p className="text-gray-400 font-bold text-xl">Bạn chưa có đơn hàng nào.</p>
             <Link to="/" className="text-red-600 font-black uppercase tracking-widest mt-4 inline-block hover:underline">Mua sắm ngay</Link>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-500 custom-scrollbar p-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                 <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-slate-400 hover:text-red-600 font-black uppercase text-[10px] tracking-widest mb-4 transition-colors">
                   <ArrowLeft size={16} /> Quay lại danh sách
                 </button>
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Chi tiết đơn #{selectedOrder.id}</h2>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Trạng thái: <span className="text-red-600">{getStatusLabel(selectedOrder.status)}</span></p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-3 hover:bg-gray-100 rounded-2xl">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-10">
              {/* Product List */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-red-600 pl-4">Sản phẩm trong đơn</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 p-4 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="w-16 h-16 bg-white rounded-2xl p-2 shrink-0 border border-slate-200 flex items-center justify-center">
                      <img src={item.image} alt="" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-400 font-bold">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-black text-slate-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-red-600 pl-4 flex items-center gap-2">
                       <MapPin size={16} className="text-red-600" /> Địa chỉ giao hàng
                    </h3>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                       <p className="text-sm font-bold text-slate-700 leading-relaxed">{selectedOrder.address}</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-red-600 pl-4 flex items-center gap-2">
                       <CreditCard size={16} className="text-red-600" /> Thanh toán
                    </h3>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                       <p className="text-sm font-bold text-slate-700">{selectedOrder.paymentMethod}</p>
                    </div>
                 </div>
              </div>

              {/* Total Summary */}
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><ShoppingBag size={120} /></div>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <span>Tổng giá trị hàng hóa</span>
                    <span>{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-400">MIỄN PHÍ</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-lg font-black uppercase italic">Tổng thanh toán</span>
                    <span className="text-3xl font-black text-red-500 italic">{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {selectedOrder.status === 'COMPLETED' ? (
                  <button className="flex-1 bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all flex items-center justify-center gap-3">
                    <RotateCcw size={20} /> Mua lại sản phẩm này
                  </button>
                ) : (selectedOrder.status === 'PENDING' || selectedOrder.status === 'PROCESSING') ? (
                  <button
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    className="flex-1 bg-red-50 text-red-600 border border-red-100 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 group"
                  >
                    <AlertCircle size={20} className="group-hover:animate-shake" /> Hủy bỏ đơn hàng này
                  </button>
                ) : null}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;
