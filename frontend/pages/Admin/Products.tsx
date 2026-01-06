import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types';
import { ProductAPI } from '../../services/api';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const AdminProducts: React.FC = () => {
  /* ===================== STATE ===================== */
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    brand: '',
    categoryId: '',
    stock: 0,
    image: '',
    images: [],
    description: '',
    promotions: [],
    specs: {}
  });
 const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newPromo, setNewPromo] = useState('');
  /* ===================== LOAD ===================== */
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await ProductAPI.getAllProducts();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ===================== SEARCH ===================== */
  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  /* ===================== MODAL ===================== */
  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        originalPrice: 0,
        brand: '',
        categoryId: 'cat1',
        stock: 0,
        image: '',
        images: [],
        description: '',
        promotions: [],
        specs: {}
      });
    }
    setIsModalOpen(true);
  };

  /* ===================== SAVE ===================== */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await ProductAPI.updateProduct(editingProduct._id, formData);
    } else {
      const { _id, ...payload } = formData;
      await ProductAPI.createProduct(payload);
    }
    setIsModalOpen(false);
    loadProducts();
  };

  /* ===================== DELETE ===================== */
  const handleDelete = async (id: string) => {
    if (!window.confirm('Xóa sản phẩm này?')) return;
    await ProductAPI.deleteProduct(id);
    setProducts(prev => prev.filter(p => p._id !== id));
  };
  /* ===================== SPECS ===================== */
  const addSpec = () => {
    if (!newSpecKey || !newSpecValue) return;
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [newSpecKey]: newSpecValue }
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const removeSpec = (key: string) => {
    const clone = { ...formData.specs };
    delete clone[key];
    setFormData(prev => ({ ...prev, specs: clone }));
  };

  /* ===================== PROMOTIONS ===================== */
  const addPromo = () => {
    if (!newPromo) return;
    setFormData(prev => ({
      ...prev,
      promotions: [...(prev.promotions || []), newPromo]
    }));
    setNewPromo('');
  };

  const removePromo = (i: number) => {
    setFormData(prev => ({
      ...prev,
      promotions: prev.promotions?.filter((_, idx) => idx !== i)
    }));
  };

  if (loading) return <div className="p-20 text-center font-black">ĐANG TẢI...</div>;

  /* ===================== UI ===================== */
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black">QUẢN LÝ SẢN PHẨM</h1>
        <button
          onClick={() => openModal()}
          className="bg-black text-white px-6 py-4 rounded-xl"
        >
          <Plus />
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-12 py-4 border rounded-xl"
          placeholder="Tìm sản phẩm..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs font-black text-gray-400 uppercase">
              <th className="p-6 text-left">Sản phẩm</th>
              <th className="p-6">Giá</th>
              <th className="p-6">Kho</th>
              <th className="p-6 text-right">Quản lý</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProducts.map(p => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-6 flex items-center gap-4">
                  <img src={p.image} className="w-16 h-16 object-cover rounded-xl" />
                  <div>
                    <div className="font-black">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.brand}</div>
                  </div>
                </td>
                <td className="p-6 font-black text-red-600">
                  {(p.price || 0).toLocaleString()}đ
                </td>
                <td className="p-6 text-center font-bold">
                  {p.stock}
                </td>
                <td className="p-6 text-right space-x-2">
                  <button
                    onClick={() => openModal(p)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl p-12">

            {/* HEADER */}
            <div className="flex justify-between mb-10">
              <h2 className="text-3xl font-black">
                {editingProduct ? 'SỬA SẢN PHẨM' : 'THÊM SẢN PHẨM'}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSave} className="space-y-8">

              {/* NAME */}
              <div>
                <label className="font-bold block mb-2">Tên sản phẩm *</label>
                <input
                  className="w-full p-5 border rounded-2xl font-bold"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* BRAND */}
              <div>
                <label className="font-bold block mb-2">Thương hiệu *</label>
                <input
                  className="w-full p-5 border rounded-2xl font-bold"
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              {/* PRICE */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="font-bold block mb-2">Giá bán *</label>
                  <input
                    type="number"
                    className="w-full p-5 border rounded-2xl font-bold"
                    value={formData.price}
                    onChange={e =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="font-bold block mb-2">Giá gốc</label>
                  <input
                    type="number"
                    className="w-full p-5 border rounded-2xl font-bold"
                    value={formData.originalPrice}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        originalPrice: Number(e.target.value)
                      })
                    }
                  />
                </div>
                <div>
                  <label className="font-bold block mb-2">Tồn kho *</label>
                  <input
                    type="number"
                    className="w-full p-5 border rounded-2xl font-bold"
                    value={formData.stock}
                    onChange={e =>
                      setFormData({ ...formData, stock: Number(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <select
                className="w-full p-5 border rounded-2xl font-bold"
                value={formData.categoryId}
                onChange={e =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                required
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="cat1">Điện thoại</option>
                <option value="cat2">Tai nghe</option>
                <option value="cat3">Laptop</option>
                <option value="cat4">Phụ kiện</option>
                <option value="cat5">Đồng hồ</option>
              </select>

              {/* IMAGE */}
              <div>
                <label className="font-bold block mb-2">Ảnh chính (URL) *</label>
                <input
                  className="w-full p-5 border rounded-2xl font-bold"
                  value={formData.image}
                  onChange={e =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    className="mt-4 w-40 h-40 object-cover rounded-xl border"
                  />
                )}
              </div>

              {/* GALLERY */}
              <div>
                <label className="font-bold block mb-2">Ảnh phụ</label>
                {(formData.images || []).map((url, i) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <input
                      className="flex-1 p-4 border rounded-xl"
                      value={url}
                      onChange={e => {
                        const clone = [...formData.images!];
                        clone[i] = e.target.value;
                        setFormData({ ...formData, images: clone });
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 bg-red-500 text-white rounded-xl"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          images: formData.images!.filter((_, idx) => idx !== i)
                        })
                      }
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="px-5 py-3 bg-gray-200 rounded-xl font-bold"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      images: [...(formData.images || []), '']
                    })
                  }
                >
                  + Thêm ảnh
                </button>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="font-bold block mb-2">Mô tả</label>
                <textarea
                  className="w-full p-5 border rounded-2xl min-h-[120px]"
                  value={formData.description}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      description: e.target.value
                    })
                  }
                />
              </div>

              {/* SPECS */}
        <div>
          <h3 className="font-black mb-3">Thông số kỹ thuật</h3>
          {Object.entries(formData.specs || {}).map(([k, v]) => (
            <div
                key={k}
                className="flex items-center justify-between bg-gray-50 px-6 py-4 rounded-2xl mb-3 group"
              >
                <div className="font-bold text-gray-800">
                  {k}: <span className="font-normal text-gray-600">{v}</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeSpec(k)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
          ))}

          <div className="flex gap-2">
            <input
              placeholder="Thành phần"
              value={newSpecKey}
              onChange={e => setNewSpecKey(e.target.value)}
              className="border p-2 flex-1"
            />
            <input
              placeholder="Cấu hình"
              value={newSpecValue}
              onChange={e => setNewSpecValue(e.target.value)}
              className="border p-2 flex-1"
            />
            <button type="button" onClick={addSpec} className="px-4 bg-black text-white">+</button>
          </div>
        </div>

              {/* PROMOTIONS */}
              <div>
                <h3 className="text-xl font-black mb-6 border-l-8 border-black pl-6">
                  Khuyến mãi
                </h3>

                {(formData.promotions || []).map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 px-6 py-4 rounded-2xl mb-3 group"
                  >
                    <span className="font-medium text-gray-700">{p}</span>
                    <button
                      type="button"
                      onClick={() => removePromo(i)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 mt-4">
                  <input
                    className="flex-1 p-4 border rounded-xl font-bold"
                    placeholder="Thêm khuyến mãi"
                    value={newPromo}
                    onChange={e => setNewPromo(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addPromo()}
                  />
                  <button
                    type="button"
                    onClick={addPromo}
                    className="bg-black text-white rounded-xl font-black text-xl px-4"
                  >
                    +
                  </button>
                </div>
        </div>
              <button
                type="submit"
                className="w-full py-5 bg-black text-white font-black rounded-2xl"
              >
                LƯU SẢN PHẨM
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
