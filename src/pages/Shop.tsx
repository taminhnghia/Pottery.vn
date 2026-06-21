/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, UserRole } from '../types';
import { ShoppingCart, Armchair, Palmtree, Trees, Sparkles, Building, Briefcase, Search } from 'lucide-react';

interface ShopProps {
  products: Product[];
  language: 'en' | 'vi';
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  onAddToCart: (product: Product) => void;
  onSaveProduct: (product: Product) => void;
  isSaved: (product: Product) => boolean;
}

export default function Shop({
  products,
  language,
  currentRole,
  onNavigate,
  onAddToCart,
  onSaveProduct,
  isSaved
}: ShopProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // States for real-time search with debounce
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Debouncing search term input with a delay of 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Memoized search results by matching name, SKU, category, finish or material
  const searchedProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase().trim();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.SKU.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.finish.toLowerCase().includes(term) ||
        p.material.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  // Filter specific retail items (New arrivals & Featured)
  const newArrivals = products.filter(p => p.retailEligible).slice(4, 12);
  const featuredPieces = products.filter(p => p.retailEligible).slice(14, 22);

  const categories = [
    { name: t('Outdoor Planters', 'Chậu cây ngoài trời'), count: '24 Items', img: 'https://images.unsplash.com/photo-1545241047-6083a3684587' },
    { name: t('Indoor Pots', 'Chậu gốm nhỏ trong nhà'), count: '12 Items', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411' },
    { name: t('Decorative Vases', 'Bình hoa mỹ nghệ'), count: '18 Items', img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c' },
    { name: t('Ceramic Stools', 'Đôn gốm nghệ thuật'), count: '10 Items', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
    { name: t('Decorative Objects', 'Đồ sứ nặn tay trang trí'), count: '12 Items', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d' },
    { name: t('Large Garden Pieces', 'Gốm khổng lồ sân vườn'), count: '8 Items', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9' },
  ];

  const spaces = [
    { name: t('Living Room', 'Phòng khách'), icon: Armchair, desc: t('Curated indoor statements', 'Tác phẩm trong nhà chọn lọc') },
    { name: t('Balcony & Terrace', 'Ban công & Sân thượng'), icon: Trees, desc: t('Frost-resistant clay Pots', 'Gốm chịu sương mưa cực tốt') },
    { name: t('Poolside & Garden', 'Hồ bơi & Sân vườn'), icon: Palmtree, desc: t('Grand architectural pillars', 'Chậu gốm khối lượng khủng') },
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-pottery-ivory rounded-2xl overflow-hidden p-8 sm:p-16 flex flex-col md:flex-row items-center gap-12 border border-pottery-sand/40">
          <div className="flex-1 space-y-6">
            <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-pottery-terracotta bg-white px-3 py-1 rounded">
              {t('CURATED RETAIL SHOP', 'CỬA HÀNG ĐỒ ĐẤT NUNG CHỌN LỌC')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-pottery-charcoal leading-tight">
              {t('Curated Pottery for Indoor and Outdoor Living', 'Điểm Nhấn Gốm Sứ Thượng Lưu')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg">
              {t(
                'Explore planters, vases, ceramic stools and decorative pieces selected for homes, gardens, terraces and expressive architectural spaces.',
                'Chào mừng quý cư dân sành điệu ghé thăm. Chiêm ngưỡng hàng trăm mẫu đôn gốm, thố nước tráng men ngọc, và lu cao cấp phù hợp thiết kế cảnh quan biệt thự, ban công.'
              )}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('/products')}
                className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-6 py-3 text-xs tracking-wider uppercase font-semibold transition"
              >
                {t('Shop All Products', 'Xem Tất cả')}
              </button>
              <button
                onClick={() => onNavigate('/products')}
                className="bg-white hover:bg-stone-50 text-stone-700 hover:text-pottery-terracotta border border-stone-250 px-6 py-3 text-xs tracking-wider uppercase font-semibold transition"
              >
                {t('Explore Outdoor Living', 'Gốm Sân vườn Ngoài trời')}
              </button>
            </div>
          </div>
          
          <div className="flex-1 aspect-[4/3] rounded-lg overflow-hidden relative shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
              alt="Lifestyle interior pottery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Real-time Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="max-w-2xl mx-auto bg-white p-4 rounded-xl border border-pottery-ivory shadow-md">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-11 pr-10 py-3 text-xs sm:text-sm focus:outline-none focus:border-pottery-terracotta focus:ring-2 focus:ring-pottery-terracotta/10 transition-all duration-300"
              placeholder={t(
                'Search current collections or boutique catalog by name or SKU...',
                'Tìm kiếm bộ trưng bày hàng sỉ hoặc bán lẻ theo tên, mã SKU...'
              )}
            />
            {inputValue && (
              <button
                onClick={() => {
                  setInputValue('');
                  setSearchTerm('');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none cursor-pointer p-1"
                title={t('Clear search', 'Xóa tìm kiếm')}
              >
                <span className="text-xs font-bold font-sans">✕</span>
              </button>
            )}
            {inputValue !== searchTerm && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center">
                <span className="w-3.5 h-3.5 border-2 border-stone-300 border-t-pottery-terracotta rounded-full animate-spin"></span>
              </div>
            )}
          </div>
        </div>
      </section>

      {searchTerm.trim() ? (
        /* Search Results Panel */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-8 min-h-[400px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-pottery-ivory pb-4 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-pottery-charcoal">
                {t('Search Results', 'Kết quả tìm kiếm')}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {t(
                  `Found ${searchedProducts.length} matching pottery items for "${searchTerm}"`,
                  `Tìm thấy ${searchedProducts.length} sản phẩm gốm phù hợp cho từ khóa "${searchTerm}"`
                )}
              </p>
            </div>
            <button
              onClick={() => {
                setInputValue('');
                setSearchTerm('');
              }}
              className="text-xs font-mono font-bold text-pottery-terracotta hover:text-pottery-deepclay flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              ← {t('Back to Boutique Catalog', 'Quay lại cửa hàng')}
            </button>
          </div>

          {searchedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-stone-50 rounded-lg border border-stone-150">
              <Sparkles className="mx-auto text-stone-300" size={36} />
              <p className="text-stone-500 text-sm font-medium">
                {t('No matching pottery items found.', 'Không tìm thấy sản phẩm gốm phù hợp.')}
              </p>
              <button
                onClick={() => {
                  setInputValue('');
                  setSearchTerm('');
                }}
                className="mt-2 bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
              >
                {t('Clear Search', 'Xóa tìm kiếm')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {searchedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-stone-200 p-4 rounded bg-white hover:shadow-xs transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="aspect-square w-full overflow-hidden bg-stone-50 mb-3 cursor-pointer relative rounded hover-zoom"
                      onClick={() => onNavigate('/products')}
                    >
                      <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-stone-900/60 text-white font-mono text-[8px] px-1.5 py-0.5 rounded">
                        {product.SKU}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone-400 font-mono tracking-wider uppercase block">{product.category}</span>
                      <h3
                        onClick={() => onNavigate('/products')}
                        className="text-xs font-bold text-stone-800 hover:text-pottery-terracotta cursor-pointer truncate"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-stone-500 truncate">{product.finish}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 mt-2 border-t border-stone-50 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-pottery-charcoal">
                      {product.retailPrice ? `US$ ${product.retailPrice.toFixed(2)}` : t('Upon Enquiry', 'Giá: Liên hệ')}
                    </span>
                    
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-1 px-2.5 rounded bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-[10px] uppercase font-mono font-bold flex items-center gap-1 transition-all duration-200 cursor-pointer"
                    >
                      <ShoppingCart size={11} />
                      <span>{t('Cart', '+ Giỏ')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Shop by Category */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-pottery-charcoal border-b border-pottery-ivory pb-3">
              {t('Shop by Category', 'Mua sắm Theo Phân Loại')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('/products')}
                  className="cursor-pointer group flex flex-col items-center text-center space-y-2 hover-zoom"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-pottery-ivory mb-2 aspect-square">
                    <img src={`${cat.img}?auto=format&fit=crop&w=150&q=80`} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-800 group-hover:text-pottery-terracotta transition line-clamp-1">{cat.name}</h4>
                  <span className="text-[10px] text-stone-400 font-mono tracking-wider">{cat.count}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Shop by Space */}
          <section className="bg-pottery-ivory/30 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-pottery-charcoal text-center mb-8">
                {t('Styled by Environment', 'Trang Hoàng Theo Không Gian')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {spaces.map((sp, idx) => {
                  const IconComp = sp.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => onNavigate('/products')}
                      className="bg-white p-6 rounded-lg border border-stone-150/40 cursor-pointer hover:shadow-md transition text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-pottery-ivory text-pottery-terracotta flex items-center justify-center mx-auto">
                        <IconComp size={20} />
                      </div>
                      <h3 className="font-serif font-bold text-stone-800 text-base">{sp.name}</h3>
                      <p className="text-xs text-stone-500 leading-normal max-w-xs mx-auto">{sp.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* New Arrivals Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-pottery-charcoal">
                {t('New Arrival Pots', 'Sản phẩm mới tuyển lựa')}
              </h2>
              <span className="text-xs font-mono text-pottery-terracotta font-bold uppercase tracking-widest">{t('Summer 2026', 'Hạ khóa 2026')}</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <div
                  key={product.id}
                  className="border border-stone-200 p-4 rounded bg-white hover:shadow-xs transition duration-200"
                >
                  <div
                    className="aspect-square w-full overflow-hidden bg-stone-50 mb-3 cursor-pointer relative rounded hover-zoom"
                    onClick={() => onNavigate('/products')}
                  >
                    <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-stone-900/60 text-white font-mono text-[8px] px-1.5 py-0.5 rounded">
                      NEW
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-stone-400 font-mono tracking-wider uppercase block">{product.category}</span>
                    <h3 onClick={() => onNavigate('/products')} className="text-xs font-bold text-stone-800 hover:text-pottery-terracotta cursor-pointer truncate">{product.name}</h3>
                    
                    <div className="pt-2 border-t border-stone-50 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-pottery-charcoal">
                        {product.retailPrice ? `US$ ${product.retailPrice.toFixed(2)}` : t('Upon Enquiry', 'Giá: Liên hệ')}
                      </span>
                      
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-1 px-2.5 rounded bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-[10px] uppercase font-mono font-bold flex items-center gap-1 transition-all duration-200 cursor-pointer"
                      >
                        <ShoppingCart size={11} />
                        <span>{t('Cart', '+ Giỏ')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Pieces */}
          <section className="bg-pottery-ivory/10 border-y border-pottery-ivory py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
              <div className="text-center space-y-1 mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif text-pottery-charcoal">
                  {t('Hand-Crafted Statement Pieces', 'Tuyển Chọn Gốm Thổi Hồn Cho Phòng Khách')}
                </h2>
                <p className="text-xs text-stone-500">
                  {t('A list of stunning designer objects and stools, curated for sophisticated decorators.', 'Chiêm ngưỡng sắc tinh khôi ngọc men và màu hỏa phi mộc đặc sắc rạng rỡ của dải gốm nghệ nhân Việt.')}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPieces.map((product) => (
                  <div
                    key={product.id}
                    className="border border-stone-100 p-4 rounded bg-white hover:shadow-xs transition duration-200"
                  >
                    <div
                      className="aspect-square w-full overflow-hidden bg-stone-50 mb-3 cursor-pointer relative rounded hover-zoom"
                      onClick={() => onNavigate('/products')}
                    >
                      <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-stone-900/80 text-white font-mono text-[8px] px-1.5 py-0.5 rounded">
                        {product.SKU}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone-400 font-mono tracking-wider uppercase block">{product.category}</span>
                      <h3 onClick={() => onNavigate('/products')} className="text-xs font-bold text-stone-800 hover:text-pottery-terracotta cursor-pointer truncate">{product.name}</h3>
                      <p className="text-[10px] text-stone-500 truncate">{product.finish}</p>
                      
                      <div className="pt-2 border-t border-stone-50 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-pottery-charcoal">
                          {product.retailPrice ? `US$ ${product.retailPrice.toFixed(2)}` : t('Upon Enquiry', 'Giá: Liên hệ')}
                        </span>
                        
                        <button
                          onClick={() => onAddToCart(product)}
                          className="p-1 px-2.5 rounded bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-[10px] uppercase font-mono font-bold flex items-center gap-1 transition-all duration-200 cursor-pointer"
                        >
                          <ShoppingCart size={11} />
                          <span>{t('Cart', '+ Giỏ')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* B2B Sourcing Callout Section at bottom */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center bg-pottery-charcoal text-white rounded-xl p-8 sm:p-12 shadow-xl border border-pottery-terracotta/25 flex flex-col items-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-pottery-terracotta text-white flex items-center justify-center">
          <Briefcase size={22} />
        </div>
        <h2 className="text-xl sm:text-2xl font-serif text-pottery-sand">
          {t('Sourcing Pottery For Container Lots or Distribution?', 'Bạn Tìm Kiếm Nguồn Cung Ứng Cho Doanh Nghiệp?')}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
          {t(
            'Explore wholesale trade collections with approved FOB Vietnam pricing tiers, packing specifications, minimum lot quantities, and private label support. Approved Trade Buyers unlock complete export datasheets instantly.',
            'Nếu có nhu cầu nhập hàng sỉ số lượng lớn, đặt gia công theo bản vẽ dự án resort/khách sạn, vui lòng đăng ký thông tin doanh nghiệp để mở khóa chính sách FOB có chiết khấu cao lên tới 40%.'
          )}
        </p>
        <button
          onClick={() => onNavigate('/trade/apply')}
          className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-semibold uppercase tracking-widest py-3 px-8 rounded cursor-pointer transition"
        >
          {t('Apply for B2B Trade Account', 'Đăng ký Tài khoản Wholesaler B2B')}
        </button>
      </section>

    </div>
  );
}
