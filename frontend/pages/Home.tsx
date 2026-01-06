import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductAPI, CategoryAPI } from '../services/api';
import { Product, Category } from '../types';
import { Smartphone, Laptop, Tablet, Headphones, Watch, Filter } from 'lucide-react';

/* ================= ICON MAP ================= */
const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={24} />,
  Laptop: <Laptop size={24} />,
  Tablet: <Tablet size={24} />,
  Headphones: <Headphones size={24} />,
  Watch: <Watch size={24} />,
};

/* ================= PRODUCT CARD ================= */
const ProductCard: React.FC<{
  product: Product;
  onAddToCart: (p: Product) => void;
}> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all p-4 flex flex-col border border-gray-100">
      <Link
        to={`/product/${product._id}`}
        className="relative block aspect-square overflow-hidden rounded-md mb-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain hover:scale-110 transition-transform"
        />
        {product.originalPrice > product.price && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
            GIẢM{' '}
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            %
          </span>
        )}
      </Link>

      <Link
        to={`/product/${product._id}`}
        className="font-semibold text-gray-800 hover:text-red-600 line-clamp-2 min-h-[3rem]"
      >
        {product.name}
      </Link>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-red-600 font-bold text-lg">
          {product.price.toLocaleString('vi-VN')}đ
        </span>
        {product.originalPrice > product.price && (
          <span className="text-gray-400 text-sm line-through">
            {product.originalPrice.toLocaleString('vi-VN')}đ
          </span>
        )}
      </div>

      {product.promotions?.length > 0 && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-700">
          🎁 {product.promotions[0]}
        </div>
      )}

      <button
        onClick={() => onAddToCart(product)}
        className="mt-auto bg-red-600 text-white py-2 rounded-md font-bold hover:bg-red-700"
      >
        MUA NGAY
      </button>
    </div>
  );
};

/* ================= HOME PAGE ================= */
const Home: React.FC<{ onAddToCart: (p: Product) => void }> = ({
  onAddToCart,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    Promise.all([ProductAPI.getAllProducts(), CategoryAPI.getAllCategory()])
      .then(([productRes, categoryRes]) => {
        setProducts(productRes.data);
        setCategories(categoryRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ===== FILTER LOGIC ===== */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (currentCategory) {
      result = result.filter(p => p.categoryId === currentCategory);
    }

    if (searchQuery) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.brand.toLowerCase().includes(searchQuery)
      );
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, currentCategory, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="text-center py-32 text-gray-400">
        Đang tải sản phẩm...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ===== CATEGORY ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() =>
              setSearchParams(
                currentCategory === cat._id ? {} : { category: cat._id }
              )
            }
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 ${
              currentCategory === cat._id
                ? 'border-red-600 bg-red-50 text-red-600'
                : 'bg-white hover:border-gray-200'
            }`}
          >
            {iconMap[cat.icon]}
            <span className="font-bold text-sm">{cat.name}</span>
          </button>
        ))}
      </div>
 {!searchQuery && !currentCategory && (
        <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl h-64 md:h-[450px] relative group">
          <img 
            src="https://picsum.photos/1200/600?random=10" 
            alt="Hero Banner" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
            <span className="bg-red-600 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">KHUYẾN MÃI LỚN</span>
            <h2 className="text-3xl md:text-6xl font-black mb-4 leading-tight">SIÊU TIỆC <br/> CÔNG NGHỆ</h2>
            <p className="text-lg md:text-2xl opacity-90 mb-8 max-w-md">Giảm đến 50% hàng loạt sản phẩm Apple & Samsung cực phẩm.</p>
            <button className="bg-yellow-400 text-red-800 px-10 py-4 rounded-full font-black w-fit hover:bg-yellow-300 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
              MUA NGAY - GIÁ SỐC
            </button>
          </div>
        </div>
      )}
      {/* ===== SORT ===== */}
      <div className="flex items-center gap-4 mb-6">
        <Filter size={18} />
        {['featured', 'price-asc', 'price-desc'].map(opt => (
          <button
            key={opt}
            onClick={() => setSortBy(opt)}
            className={`px-4 py-1 rounded-full text-sm ${
              sortBy === opt
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {opt === 'featured'
              ? 'Bán chạy'
              : opt === 'price-asc'
              ? 'Giá thấp'
              : 'Giá cao'}
          </button>
        ))}
      </div>

      {/* ===== PRODUCT GRID ===== */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <ProductCard
              key={p._id}
              product={p}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 text-gray-400">
          Không tìm thấy sản phẩm phù hợp
        </div>
      )}
    </div>
  );
};

export default Home;
