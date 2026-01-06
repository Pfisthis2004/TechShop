
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Maximize2, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  ArrowUp, 
  Sparkles,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ProductAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { Product } from '@/types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Chào bạn! Mình là Bitu. Bạn đang quan tâm đến sản phẩm nào? Hãy thử hỏi mình về **iPhone 15** hoặc **MacBook** nhé, mình sẽ gửi ảnh và thông tin chi tiết cho bạn! [PRODUCT:p1]' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      const timer = setTimeout(scrollToBottom, 150);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading, isOpen]);

  
  useEffect(() => { 
    ProductAPI.getAllProducts() 
    .then(res => setProducts(res.data)) 
    .catch(() => setProducts([])); 
  }, 
  []);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});
      
      // Fix: Changed p.id to p._id
      const productContext = products.map(p => `${p.name} (ID: ${p._id}) - Giá: ${p.price.toLocaleString()}đ`).join(', ');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `Bạn là trợ lý ảo TechMart - Bitu. 
          Nhiệm vụ: Tư vấn nhiệt tình, chuyên nghiệp về sản phẩm công nghệ (${productContext}).
          QUY TẮC QUAN TRỌNG: 
          1. Luôn trả lời bằng tiếng Việt thân thiện.
          2. Khi giới thiệu một sản phẩm cụ thể có trong danh sách, bạn PHẢI kèm theo mã sản phẩm theo định dạng [PRODUCT:_id] ở cuối câu hoặc đoạn văn liên quan. 
          3. Chỉ gợi ý tối đa 2 sản phẩm mỗi lần để tránh làm phiền người dùng.
          4. Nếu người dùng hỏi chung chung, hãy giới thiệu 1-2 sản phẩm tiêu biểu kèm tag [PRODUCT:_id].
          5. KHÔNG tự bịa ID. Nếu không chắc ID, hãy hỏi lại người dùng.`,
        },
      });

      let botResponse = response.text ||"Chào bạn! Mình chưa hiểu rõ lắm, bạn có thể nói lại không ạ?";

      // 🔥 ÉP FRONTEND GẮN PRODUCT TAG
      const matchedProducts = products.filter(p =>
        botResponse.toLowerCase().includes(p.name.toLowerCase())
      );

      if (matchedProducts.length > 0) {
        const productTags = matchedProducts
          .slice(0, 2)
          .map(p => `[PRODUCT:${p._id}]`)
          .join('\n');

        botResponse += `\n\n${productTags}`;
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Hệ thống đang bận một chút, bạn thử lại sau nhé!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\[PRODUCT:[a-zA-Z0-9]+\])/g);
    
    return parts.map((part, i) => {
      const productMatch = part.match(/\[PRODUCT:([a-zA-Z0-9]+)\]/);
      
      if (productMatch) {
        const productId = productMatch[1];
        // Fix: Changed p.id to p._id
        const product = products.find(p => p._id === productId);     
        if (product) {
          return (
            <div key={i} className="my-4 bg-slate-50 border border-red-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex p-3 gap-3">
                <div className="w-20 h-20 bg-white rounded-xl p-1 shrink-0 flex items-center justify-center border border-red-50">
                  <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-xs text-slate-800 line-clamp-2 leading-tight mb-1">{product.name}</h4>
                  <p className="text-red-600 font-black text-sm">{product.price.toLocaleString('vi-VN')}đ</p>
                  <Link 
                    // Fix: Changed product.id to product._id
                    to={`/product/${product._id}`} 
                    onClick={() => setIsOpen(false)}
                    className="mt-2 text-[10px] font-black uppercase text-red-500 flex items-center gap-1 hover:underline"
                  >
                    Xem chi tiết <ExternalLink size={10} />
                  </Link>
                </div>
              </div>
            </div>
          );
        }
        return null;
      }

      const textParts = part.split(/(\*\*.*?\*\*)/g);
      return textParts.map((t, j) => {
        if (t.startsWith('**') && t.endsWith('**')) {
          return <strong key={`${i}-${j}`}>{t.slice(2, -2)}</strong>;
        }
        return t;
      });
    });
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-110 active:scale-95 group"
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[85vw] md:w-[400px] bg-[#fdf2f2] rounded-[2rem] shadow-2xl border border-red-100 flex flex-col h-[65vh] md:h-[580px] overflow-hidden animate-in zoom-in duration-300">
      <div className="p-3 px-6 flex items-center justify-between bg-white/60 backdrop-blur-md border-b border-red-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-red-100 overflow-hidden shadow-sm">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Bitu&backgroundColor=ffffff" alt="Avatar" className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 flex items-center gap-1 text-sm">
            Trợ lý AI - Bitu <Sparkles size={12} className="text-red-500 fill-red-500 animate-pulse" />
          </h3>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <button onClick={() => setMessages([{ role: 'bot', text: 'Chào bạn! Mình có thể giúp gì cho bạn hôm nay?' }])} className="hover:text-red-600 transition-colors">
            <RotateCcw size={18} />
          </button>
          <button className="hover:text-red-600 transition-colors">
            <Maximize2 size={18} />
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:text-red-600 transition-colors">
            <X size={22} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll p-5 space-y-8 custom-scrollbar bg-[#fdf2f2]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-in`}>
            {msg.role === 'bot' && (
               <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center border border-red-100 shadow-sm ml-1 mb-0.5">
                 <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Bitu" alt="Bot" className="w-3.5 h-3.5" />
               </div>
            )}
            
            <div className={`relative max-w-[95%] flex items-end gap-2.5 ${msg.role === 'user' ? 'flex-row' : ''}`}>
              <div className={`p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm transition-all ${
                msg.role === 'user' 
                  ? 'bg-[#e1504d] text-white rounded-tr-sm' 
                  : 'bg-white text-slate-700 rounded-tl-sm border border-red-50'
              }`}>
                {renderMessageContent(msg.text)}
              </div>

              {msg.role === 'user' && (
                <div className="w-9 h-9 bg-[#e1504d] rounded-full flex items-center justify-center shrink-0 shadow-lg border-2 border-white">
                   <span className="text-[9px] text-white font-black">SSS</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse ml-1">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-red-50 flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-2 w-full" />
      </div>

      <div className="p-5 bg-white rounded-t-[2rem] shadow-[0_-10px_25px_rgba(225,80,77,0.06)] mt-auto">
        <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 relative">
            <input 
              type="text" 
              placeholder="Bạn cần hỗ trợ gì?"
              className="flex-1 bg-slate-50 border-none rounded-xl px-5 py-3.5 text-sm font-medium text-black focus:outline-none placeholder:text-slate-300 shadow-inner"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`absolute right-1.5 p-2.5 rounded-lg transition-all ${
                isLoading || !input.trim() 
                ? 'text-slate-200' 
                : 'text-slate-600 hover:bg-slate-100 active:scale-90 bg-slate-100/50'
              }`}
            >
              <ArrowUp size={20} className="stroke-[3]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChatbot;
