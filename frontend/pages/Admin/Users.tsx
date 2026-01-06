
import React, { useState } from 'react';
import {
  Users, Search, Mail, Phone, MapPin,
  Shield, UserMinus, UserCheck, MoreVertical,
  Mail as MailIcon
} from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Nguyễn Văn A', email: 'user@techmart.com', phone: '0901234567', role: 'USER', status: 'Active', joined: '2024-01-15' },
    { id: 'u2', name: 'Trần Thị B', email: 'tranb@gmail.com', phone: '0988777666', role: 'USER', status: 'Active', joined: '2024-03-20' },
    { id: 'u3', name: 'Lê Văn C', email: 'levanc@outlook.com', phone: '0911222333', role: 'USER', status: 'Blocked', joined: '2024-05-10' },
    { id: 'u4', name: 'System Admin', email: 'admin@techmart.com', phone: '0888999000', role: 'ADMIN', status: 'Active', joined: '2023-12-01' },
  ]);

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u
    ));
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Quản lý Khách hàng</h1>
           <p className="text-gray-400 font-medium">Hiện có <span className="text-red-600 font-bold">{users.length}</span> tài khoản</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng..."
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none font-bold text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm group relative overflow-hidden">
            <div className="flex items-center gap-6 mb-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl ${user.role === 'ADMIN' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 truncate">
                 <h3 className="text-lg font-black text-black truncate uppercase">{user.name}</h3>
                 <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{user.status}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-500 font-bold">
               <div className="flex items-center gap-2 truncate"><MailIcon size={14} className="text-red-600"/> {user.email}</div>
               <div className="flex items-center gap-2"><Phone size={14} className="text-red-600"/> {user.phone}</div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-end gap-2">
               {user.role !== 'ADMIN' && (
                 <button onClick={() => toggleStatus(user.id)} className={`p-2 rounded-xl ${user.status === 'Active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}>
                    {user.status === 'Active' ? <UserMinus size={18}/> : <UserCheck size={18}/>}
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
