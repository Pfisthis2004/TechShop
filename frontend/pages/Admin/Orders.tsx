
import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Eye, CheckCircle, 
  Truck, Clock, XCircle, Filter, ChevronRight 
} from 'lucide-react';
import { OrderStatus } from '../../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-8821', customer: 'Nguyễn Văn A', total: 30990000, status: 'PENDING' as OrderStatus, date: '2024-08-25', items: 1 },
    { id: 'ORD-8822', customer: 'Trần Thị B', total: 24990000, status: 'PROCESSING' as OrderStatus, date: '2024-08-24', items: 2 },
    { id: 'ORD-8823', customer: 'Lê Văn C', total: 18490000, status: 'SHIPPING' as OrderStatus, date: '2024-08-24', items: 1 },
    { id: 'ORD-8824', customer: 'Phạm Minh D', total: 29990000, status: 'COMPLETED' as OrderStatus, date: '2024-08-23', items: 1 },
    { id: 'ORD-8825', customer: 'Hoàng Anh E', total: 1200000, status: 'CANCELLED' as OrderStatus, date: '2024-08-22', items: 3 },
  ]);

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'PROCESSING': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'SHIPPING': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'COMPLETED': return 'bg-green-50 text-green-600 border-green-100';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Quản lý Đơn hàng</h1>
           <p className="text-gray-400 font-medium">Bạn có <span className="text-red-600 font-bold">{orders.filter(o => o.status === 'PENDING').length}</span> đơn hàng mới</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm theo mã đơn hoặc tên khách hàng..."
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none font-bold text-black"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black">
            <tr>
              <th className="px-10 py-6">Mã Đơn</th>
              <th className="px-10 py-6">Khách Hàng</th>
              <th className="px-10 py-6 text-center">Trạng Thái</th>
              <th className="px-10 py-6 text-right">Cập nhật</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm font-medium">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-10 py-6 font-black text-slate-900">{order.id}</td>
                <td className="px-10 py-6 font-bold text-gray-700">{order.customer}</td>
                <td className="px-10 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                   <select 
                    className="text-[10px] font-black uppercase bg-gray-50 border border-gray-200 p-2 rounded-xl text-black"
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                   >
                     <option value="PENDING">Pending</option>
                     <option value="PROCESSING">Processing</option>
                     <option value="SHIPPING">Shipping</option>
                     <option value="COMPLETED">Completed</option>
                     <option value="CANCELLED">Cancelled</option>
                   </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
