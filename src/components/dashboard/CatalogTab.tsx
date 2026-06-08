import React, { useState } from 'react';
import { Product } from '../../types';
import { Layers, Plus, Trash2, Edit, Save, CheckCircle, ListFilter, Sliders } from 'lucide-react';

interface CatalogTabProps {
  language: 'en' | 'vi';
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function CatalogTab({ language, products, setProducts }: CatalogTabProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Dynamic lists of collections loaded from active products
  const activeCollections = Array.from(new Set(products.map(p => p.collection).filter(Boolean)));

  const [collections, setCollections] = useState<string[]>(
    activeCollections.length ? activeCollections : [
      'Premium Glaze Collection',
      'Oceanic Glaze Series',
      'Traditional Cobalt',
      'Rustic Earth Clay',
      'Volcanic Sand Finish'
    ]
  );

  const [newColName, setNewColName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add collection target
  const handleAddCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = newColName.trim();
    if (!normalized) return;
    if (collections.includes(normalized)) {
      alert(t('Collection already exists!', 'Bộ sưu tập này đã tồn tại!'));
      return;
    }
    setCollections([...collections, normalized]);
    setNewColName('');
    alert(t('Catalog classification added successfully!', 'Phân dạng danh mục đã được khởi tạo thành công!'));
  };

  // Delete collection category
  const handleDeleteCollection = (name: string) => {
    if (confirm(t(`Are you sure you want to remove collection "${name}"? Existing items will revert to "General Collection".`, `Bạn chắc chắn muốn xóa nhóm danh mục "${name}"? Bản mẫu bên trong sẽ chuyển về "Bộ mặc định".`))) {
      setCollections(collections.filter(c => c !== name));
      // Revert product designations
      setProducts(prev => prev.map(p => p.collection === name ? { ...p, collection: 'General Collection' } : p));
    }
  };

  // Start edit
  const startEdit = (index: number, val: string) => {
    setEditingIndex(index);
    setEditingValue(val);
  };

  // Save edit
  const saveEdit = (index: number) => {
    const oldName = collections[index];
    const newName = editingValue.trim();
    if (!newName) return;
    
    setCollections(collections.map((c, i) => i === index ? newName : c));
    setProducts(prev => prev.map(p => p.collection === oldName ? { ...p, collection: newName } : p));
    setEditingIndex(null);
  };

  // Filtered lists of products
  const displayProducts = products.filter(p => {
    const colMatch = selectedCollection === 'all' || p.collection === selectedCollection;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.SKU.toLowerCase().includes(searchQuery.toLowerCase());
    return colMatch && searchMatch;
  });

  return (
    <div id="catalog-tab-container" className="space-y-8 text-left animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Collections classifier */}
        <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Layers size={16} className="text-pottery-terracotta" />
              <span>{t('Manage Collections & series', 'Quản lý Bộ sưu tập & Bộ dòng')}</span>
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              {t('Create, rename or delete dynamic collection groupings for products cataloging.', 'Khai sinh hoặc sáp nhập phân nhóm gốm mộc phục vụ lưu kho.')}
            </p>
          </div>

          <form onSubmit={handleAddCollection} className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
              {t('Create New Collection', 'Khai sinh dòng gốm mới')}
            </label>
            <div className="flex gap-2">
              <input
                id="new-col-name-input"
                type="text"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                placeholder={t('e.g. Imperial Crackle', 'Ví dụ: Men rạn hoàng cung')}
                className="flex-grow border border-stone-300 p-2 text-xs rounded focus:outline-none focus:border-pottery-terracotta"
              />
              <button
                type="submit"
                className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-3 py-2 text-xs font-mono font-bold rounded flex items-center gap-1 transition shrink-0"
              >
                <Plus size={14} />
                <span>{t('Create', 'Khởi tạo')}</span>
              </button>
            </div>
          </form>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
              {t('Existing Collections Registry', 'Sổ Đăng ký Các Bộ sưu tập')}
            </label>
            <div className="divide-y divide-stone-100 max-h-[300px] overflow-y-auto pr-1">
              {collections.map((col, index) => {
                const count = products.filter(p => p.collection === col).length;
                return (
                  <div key={index} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                    {editingIndex === index ? (
                      <div className="flex items-center gap-1 flex-grow">
                        <input
                          id={`edit-col-input-${index}`}
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="border border-stone-300 p-1 text-xs rounded w-full font-mono"
                        />
                        <button
                          onClick={() => saveEdit(index)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded transition"
                        >
                          <Save size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex-grow min-w-0">
                        <div className="font-sans font-medium text-stone-800 truncate">{col}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{count} SKUs active</div>
                      </div>
                    )}

                    {editingIndex !== index && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          id={`btn-edit-col-${index}`}
                          onClick={() => startEdit(index, col)}
                          className="text-stone-400 hover:text-stone-700 p-1 transition"
                          title="Rename"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          id={`btn-delete-col-${index}`}
                          onClick={() => handleDeleteCollection(col)}
                          className="text-stone-400 hover:text-red-600 p-1 transition"
                          title="Delete Collection"
                          disabled={col === 'Premium Glaze Collection'}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Products Cataloging Desk */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-lg p-5 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                <Sliders size={16} className="text-pottery-terracotta" />
                <span>{t('Assign Collection classifications', 'Đặt Nhãn Dòng Cho Từng Sản Phẩm')}</span>
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {t('View, filter, and change the product collection membership directly.', 'Xem, lọc và cập nhật trực tiếp dải xếp lớp bộ sưu tập cho từng mẫu lò.')}
              </p>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/3">
              <select
                id="filter-collections-select"
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full bg-stone-50 border border-stone-250 p-2 text-xs rounded focus:outline-none"
              >
                <option value="all">🔍 {t('All Collections', 'Tất cả Bộ sưu tập')}</option>
                {collections.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <input
                id="search-catalog-products-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search products by SKU or name...', 'Tìm sản phẩm theo SKU hoặc tên...')}
                className="w-full bg-stone-50 border border-stone-250 p-2 text-xs rounded focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-stone-150 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-mono border-b border-stone-150 uppercase tracking-wider text-[10px]">
                  <th className="p-3 font-semibold">{t('Product SKU', 'Mẫu & SKU')}</th>
                  <th className="p-3 font-semibold">{t('Category', 'Dòng gốm')}</th>
                  <th className="p-3 font-semibold">{t('Current Collection Assignation', 'Phân loại dòng')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150 font-sans">
                {displayProducts.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-stone-400 font-mono">
                      {t('No products matching query filters.', 'Không tìm thấy sản phẩm trùng khớp.')}
                    </td>
                  </tr>
                ) : (
                  displayProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/50 transition">
                      <td className="p-3">
                        <div className="font-semibold text-stone-850">{p.name}</div>
                        <div className="font-mono text-[10px] text-stone-400">{p.SKU}</div>
                      </td>
                      <td className="p-3 text-stone-600 italic">
                        {p.category}
                      </td>
                      <td className="p-3">
                        <select
                          id={`select-collection-for-${p.id}`}
                          value={p.collection || ''}
                          onChange={(e) => {
                            const updatedCol = e.target.value;
                            setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, collection: updatedCol } : prod));
                          }}
                          className="bg-white border border-stone-250 p-1.5 text-[11px] rounded transition focus:border-pottery-terracotta outline-none w-full max-w-[240px]"
                        >
                          {collections.map((colName, idx) => (
                            <option key={idx} value={colName}>{colName}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
