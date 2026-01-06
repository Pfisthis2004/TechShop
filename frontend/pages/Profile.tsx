
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Save, ShieldCheck } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '0901234567',
    address: user?.address || '123 Đường Lê Lợi, Quận 1, TP.HCM'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập lưu thông tin
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header/Cover */}
        <div className="h-48 bg-gradient-to-r from-red-600 to-red-400 relative">
          <div className="absolute -bottom-12 left-12">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] bg-white p-2 shadow-xl">
                 <div className="w-full h-full rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center font-black text-4xl">
                   {formData.name.charAt(0)}
                 </div>
              </div>
              <button className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-12 pt-20">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{formData.name}</h1>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Hội viên hạng Vàng tại TechMart</p>
            </div>
            {isSuccess && (
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold text-sm animate-in zoom-in duration-300">
                <ShieldCheck size={18} /> Cập nhật thành công!
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-12 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none font-bold text-black"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  disabled
                  className="w-full pl-12 p-4 bg-gray-100 border border-gray-100 rounded-2xl outline-none font-bold text-slate-400 cursor-not-allowed"
                  value={formData.email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  className="w-full pl-12 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none font-bold text-black"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2 col-span-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Địa chỉ giao hàng mặc định</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-6 text-slate-400" size={18} />
                <textarea
                  className="w-full pl-12 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-600/10 focus:border-red-600 outline-none font-bold text-black h-24"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div className="col-span-full pt-6 flex gap-4">
               <button
                type="submit"
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl shadow-slate-900/20"
               >
                 <Save size={20} /> Lưu thông tin
               </button>
               <button
                type="button"
                className="bg-white border border-gray-200 text-slate-400 px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
               >
                 Hủy bỏ
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
