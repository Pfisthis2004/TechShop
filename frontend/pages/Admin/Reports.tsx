
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  TrendingUp, Calendar, DollarSign, 
  ArrowUpRight, Download, Filter 
} from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 450, orders: 120 },
  { name: 'Feb', revenue: 520, orders: 150 },
  { name: 'Mar', revenue: 610, orders: 180 },
  { name: 'Apr', revenue: 480, orders: 130 },
  { name: 'May', revenue: 700, orders: 210 },
  { name: 'Jun', revenue: 850, orders: 250 },
  { name: 'Jul', revenue: 920, orders: 280 },
];

const categoryData = [
  { name: 'iPhone', value: 400 },
  { name: 'MacBook', value: 300 },
  { name: 'iPad', value: 200 },
  { name: 'Watch', value: 100 },
];

const COLORS = ['#dc2626', '#1e293b', '#64748b', '#ef4444'];

const AdminReports: React.FC = () => {
  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Thống kê & Báo cáo</h1>
           <p className="text-gray-400 font-medium">Phân tích chuyên sâu hiệu năng kinh doanh TechMart</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all">
             <Filter size={18} /> Lọc kỳ hạn
           </button>
           <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all">
             <Download size={18} /> Xuất báo cáo
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Revenue Chart */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-10">
             <div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Doanh thu & Đơn hàng</h3>
                <p className="text-xs text-gray-400 font-bold uppercase mt-1">6 tháng gần nhất (Đơn vị: Triệu VNĐ)</p>
             </div>
             <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-black">
                <ArrowUpRight size={14} /> +24%
             </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                   contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                   itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="orders" stroke="#1e293b" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Split */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
           <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-10 text-center">Cơ cấu doanh thu danh mục</h3>
           <div className="h-80 w-full flex flex-col md:flex-row items-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
             </ResponsiveContainer>
             
             <div className="space-y-4 w-full max-w-[150px] mt-6 md:mt-0">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                        <span className="text-[10px] font-black uppercase text-gray-500">{item.name}</span>
                     </div>
                     <span className="text-[10px] font-black text-slate-900">{(item.value / 10).toFixed(1)}%</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10"><DollarSign size={100}/></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Giá trị đơn trung bình</p>
            <h4 className="text-3xl font-black italic">22.400.000đ</h4>
            <div className="mt-6 flex items-center gap-2 text-green-400 text-xs font-bold">
               <TrendingUp size={14} /> +8% so với tuần trước
            </div>
         </div>
         
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Khách quay lại</p>
            <h4 className="text-3xl font-black text-slate-900">64.2%</h4>
            <div className="mt-6 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
               <div className="bg-red-600 h-full w-[64%]"></div>
            </div>
         </div>

         <div className="bg-red-600 text-white p-10 rounded-[3rem] shadow-xl shadow-red-600/30">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-200 mb-2">Tỷ lệ hủy đơn</p>
            <h4 className="text-3xl font-black italic">2.4%</h4>
            <p className="text-xs text-red-100 mt-6 font-medium">Giảm 1.2% nhờ tối ưu quy trình xác nhận</p>
         </div>
      </div>
    </div>
  );
};

export default AdminReports;
