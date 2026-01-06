
import React, { useState } from 'react';
import { Tag, Plus, Trash2, Calendar, Percent, CheckCircle, XCircle, X, Save, Ticket } from 'lucide-react';

interface Promo {
  id: number;
  name: string;
  code: string;
  discount: string;
  status: 'Active' | 'Expired';
  expiry: string;
}

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promo[]>([
    { id: 1, name: "Siêu Tiệc Apple", code: "APPLE50", discount: "10%", status: "Active", expiry: "2024-12-30" },
    { id: 2, name: "Mừng Tựu Trường", code: "BACK2SCHOOL", discount: "500.000đ", status: "Active", expiry: "2024-09-15" },
    { id: 3, name: "Xả Kho Phụ Kiện", code: "PHUKIEN20", discount: "20%", status: "Expired", expiry: "2024-08-15" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Promo>>({
    name: '', code: '', discount: '', expiry: '', status: 'Active'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newPromo: Promo = {
      id: Date.now(),
      name: formData.name || '',
      code: formData.code || '',
      discount: formData.discount || '',
      status: 'Active',
      expiry: formData.expiry || '',
    };
    setPromotions(prev => [newPromo, ...prev]);
    setIsModalOpen(false);
    setFormData({ name: '', code: '', discount: '', expiry: '', status: 'Active' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Xóa mã này?')) {
      setPromotions(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Hệ thống Ưu đãi</h1>
           <p className="text-gray-400 font-medium">Quản lý các chương trình giảm giá</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl uppercase tracking-widest">
          <Plus size={20} /> Tạo mã mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden group transition-all">
            <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-2">{promo.name}</h3>
            <div className="mb-4"><span className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">Code: {promo.code}</span></div>
            <p className="text-gray-900 font-black text-lg">{promo.discount}</p>
            <p className="text-gray-400 text-xs font-bold mt-2">Đến: {new Date(promo.expiry).toLocaleDateString()}</p>
            <button onClick={() => handleDelete(promo.id)} className="absolute top-6 right-6 text-gray-300 hover:text-red-600"><Trash2 size={20}/></button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8">
            <h2 className="text-2xl font-black uppercase mb-8">Tạo mã giảm giá</h2>
            <form onSubmit={handleSave} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-2">Tên</label>
                  <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-bold text-black" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Mã Code</label>
                    <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-black text-black uppercase" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Mức giảm</label>
                    <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-black text-black" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-2">Ngày hết hạn</label>
                  <input type="date" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-bold text-black" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} />
               </div>
               <button type="submit" className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase shadow-xl">Lưu mã</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromotions;
