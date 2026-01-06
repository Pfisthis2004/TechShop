import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { ProductAPI } from '../services/api';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  RefreshCcw,
  ChevronRight,
  ChevronLeft,
  Star
} from 'lucide-react';

interface Props {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<Props> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    ProductAPI.getProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));

    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="p-20 text-center text-xl font-bold">Đang tải sản phẩm...</div>;
  }

  if (!product) {
    return <div className="p-20 text-center text-xl font-bold text-red-600">Không tìm thấy sản phẩm</div>;
  }

  const productImages = product.images?.length
    ? product.images
    : [product.image];

  const handleNext = () =>
    setActiveImg((prev) => (prev + 1) % productImages.length);

  const handlePrev = () =>
    setActiveImg((prev) => (prev - 1 + productImages.length) % productImages.length);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-red-600">Trang chủ</Link>
        <ChevronRight size={14} />
        <Link to={`/?category=${product.categoryId}`} className="hover:text-red-600">
          {product.categoryId}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="bg-white rounded-3xl shadow p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* IMAGE GALLERY */}
          <div>
            <div className="relative aspect-square border rounded-2xl flex items-center justify-center">
              <img
                src={productImages[activeImg]}
                alt={product.name}
                className="max-h-full object-contain"
              />

              {productImages.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-4">
                    <ChevronLeft />
                  </button>
                  <button onClick={handleNext} className="absolute right-4">
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              {productImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImg(i)}
                  className={`cursor-pointer border rounded-xl p-2 ${
                    i === activeImg ? 'border-red-600' : 'border-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thong tin san pham*/}
          <div>
            <h1 className="text-4xl font-black mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded-full font-bold">
                {product.rating} <Star size={14} fill="currentColor" />
              </div>
              <span className="text-gray-500">{product.reviewsCount} đánh giá</span>
              <span className="text-gray-500">Hãng: <b>{product.brand}</b></span>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl mb-6">
              <div className="flex gap-4 items-end">
                <span className="text-4xl font-black text-red-600">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                {product.originalPrice > product.price && (
                  <span className="line-through text-gray-400">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {product.promotions?.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="text-green-500" size={18} />
                  {p}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-red-700"
            >
              MUA NGAY
            </button>

            <div className="grid grid-cols-3 gap-6 mt-10 text-center">
              <div><Truck className="mx-auto" /> Giao nhanh</div>
              <div><RefreshCcw className="mx-auto" /> Đổi 30 ngày</div>
              <div><ShieldCheck className="mx-auto" /> Bảo hành</div>
            </div>
          </div>
        </div>

        {/* mo ta vs thong so san pham */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-8 border-l-8 border-red-600 pl-6">ĐẶC ĐIỂM NỔI BẬT</h2>
            <div className="prose prose-red max-w-none text-gray-700 leading-relaxed text-lg">
              <p className="mb-6">{product.description}</p>
              <p className="mb-8 font-medium">Mô hình phân tích theo tiêu chuẩn FPT Shop mang lại sự an tâm tuyệt đối cho khách hàng về nguồn gốc sản phẩm và chất lượng dịch vụ hậu mãi.</p>
              <img src="https://picsum.photos/1200/800?random=20" alt="Product Review" className="rounded-3xl shadow-xl w-full mb-8" />
              <p>Trải nghiệm công nghệ đỉnh cao cùng thiết bị từ {product.brand}. Từng đường nét thiết kế, từng thông số kỹ thuật đều được tối ưu hóa để phục vụ người dùng tốt nhất.</p>
            </div>
          </div>


           <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 h-fit sticky top-24">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
               Thông số kỹ thuật
            </h2>
            <div className="space-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-200 text-sm">
                  <span className="text-gray-500 font-bold">{key}</span>
                  <span className="text-gray-900 font-black text-right ml-4">{value}</span>
                </div>
              ))}
              <button className="w-full mt-6 bg-white border border-red-600 text-red-600 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors uppercase text-sm">
                Xem cấu hình chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
