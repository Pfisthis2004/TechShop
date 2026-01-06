
import React from 'react';
import { MessageSquare, Sparkles, Settings2, Save, History, PlayCircle } from 'lucide-react';

const ChatbotSettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Cấu hình Chatbot Bitu</h1>
           <p className="text-gray-400 font-medium">Tinh chỉnh trợ lý ảo AI</p>
        </div>
        <button className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl uppercase tracking-widest">
          <Save size={20} /> Lưu cấu hình
        </button>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
         <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Chỉ dẫn hệ thống (System Prompt)</h3>
         <textarea 
           className="w-full h-64 p-6 bg-gray-50 border border-gray-200 rounded-3xl font-bold text-black text-sm focus:ring-2 focus:ring-red-600/10 outline-none leading-relaxed"
           defaultValue={`Bạn là trợ lý ảo TechMart - Bitu. 
Nhiệm vụ: Tư vấn nhiệt tình về các sản phẩm công nghệ (iPhone, MacBook, Laptop...).
Tính cách: Lễ phép, chuyên nghiệp, sử dụng biểu tượng cảm xúc hợp lý.`}
         />
      </div>
    </div>
  );
};

export default ChatbotSettings;
