
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { 
  DollarSign, ShoppingBag, Users, TrendingUp, CheckCircle, Clock, AlertTriangle, 
  MessageSquare, PlusCircle, ArrowUpRight, ClipboardList
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
    <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{title}</h3>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      {trend && (
        <span className={`text-[10px] font-bold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '+' : ''}{trend}% so với tháng trước
        </span>
      )}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Bàn làm việc Admin</h1>
           <p className="text-gray-400 font-medium">Chào buổi sáng! Đây là những việc bạn cần xử lý hôm nay.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
            <PlusCircle size={18} />
            Tạo thông báo mới
          </button>
        </div>
      </div>

      {/* Quick Stats Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Doanh thu ngày" value="45.2M đ" icon={DollarSign} color="bg-red-600" trend={12} />
        <StatCard title="Đơn hàng chờ" value="24" icon={Clock} color="bg-blue-600" />
        <StatCard title="Chatbot tư vấn" value="1.2k" icon={MessageSquare} color="bg-orange-500" trend={5} />
        <StatCard title="Phản hồi User" value="15" icon={Users} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* To-do List Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-3">
              <ClipboardList className="text-red-600" /> Công việc cần làm
            </h2>
            <div className="space-y-4">
              {[
                { task: "Xác nhận 5 đơn hàng iPhone 15", priority: "High", time: "15p trước" },
                { task: "Cập nhật giá MacBook M3", priority: "Medium", time: "1h trước" },
                { task: "Kiểm tra tồn kho phụ kiện", priority: "Low", time: "3h trước" },
                { task: "Trả lời 3 yêu cầu hỗ trợ", priority: "High", time: "vừa xong" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${item.priority === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : item.priority === 'Medium' ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{item.task}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">{item.time}</p>
                  </div>
                  <button className="text-gray-300 hover:text-green-500 transition-colors">
                    <CheckCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-black text-red-600 uppercase tracking-widest border-2 border-dashed border-red-100 rounded-xl hover:bg-red-50 transition-colors">
              Xem tất cả checklist
            </button>
          </div>
        </div>

        {/* System Activity Section */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Hoạt động hệ thống</h2>
              <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Máy chủ: Ổn định
              </span>
           </div>
           
           <div className="space-y-8">
              <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-3 rounded-2xl text-white">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <p className="font-black text-red-900 uppercase text-xs tracking-wider">Cảnh báo tồn kho thấp</p>
                    <p className="text-sm text-red-700 font-medium">Sản phẩm "iPhone 15 Pro Max" chỉ còn 2 chiếc trong kho.</p>
                  </div>
                </div>
                <button className="bg-white text-red-600 px-4 py-2 rounded-xl font-black text-[10px] uppercase shadow-sm">Nhập hàng</button>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-3 rounded-2xl text-white">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 uppercase text-xs tracking-wider">Tăng trưởng người dùng</p>
                    <p className="text-sm text-slate-600 font-medium">Lượng truy cập tăng 25% trong 24h qua nhờ chiến dịch "Săn Sale".</p>
                  </div>
                </div>
                <ArrowUpRight size={24} className="text-slate-400" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
