/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Product, UserRole, SizeOption, SetOption } from '../types';
import { Search, Filter, HelpCircle, Shield, Sliders, ChevronRight, Lock, Sparkles } from 'lucide-react';

interface ProductsProps {
  products: Product[];
  language: 'en' | 'vi';
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  onAddToCart?: (product: Product, size?: SizeOption, set?: SetOption) => void;
  onAddToInquiry: (product: Product) => void;
  onSaveProduct: (product: Product) => void;
  isSaved: (product: Product) => boolean;
  selectedProductSKU: string | null;
  setSelectedProductSKU: (sku: string | null) => void;
}

export default function Products({
  products,
  language,
  currentRole,
  onNavigate,
  onAddToCart,
  onAddToInquiry,
  onSaveProduct,
  isSaved,
  selectedProductSKU,
  setSelectedProductSKU
}: ProductsProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedApplication, setSelectedApplication] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [selectedColour, setSelectedColour] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  
  // Mobile drawer state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Helper for mock FOB pricing generation
  const getFobPriceRange = (product: Product) => {
    const code = parseInt(product.id.substring(2)) || 5;
    const base = 8 + (code % 15) * 2.5;
    return {
      tier1: base,
      tier2: base * 0.85,
      moq: 10 + (code % 5) * 5
    };
  };

  // Memoized filter list
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Text Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.SKU.toLowerCase().includes(term) ||
          p.finish.toLowerCase().includes(term) ||
          p.material.toLowerCase().includes(term)
      );
    }

    // 2. Product Category Filter
    if (selectedType !== 'All') {
      list = list.filter(p => p.category === selectedType);
    }

    // 3. Application Filter
    if (selectedApplication !== 'All') {
      if (selectedApplication === 'Indoor') {
        list = list.filter(p => p.indoorOutdoor.toLowerCase().includes('indoor'));
      } else if (selectedApplication === 'Outdoor') {
        list = list.filter(p => p.indoorOutdoor.toLowerCase().includes('outdoor'));
      }
    }

    // 4. Size Filter
    if (selectedSize !== 'All') {
      list = list.filter(p => {
        const heightMatch = p.dimensions.match(/H\s*(\d+)/i);
        const heightVal = heightMatch ? parseInt(heightMatch[1]) : 40;
        if (selectedSize === 'Small') return heightVal < 30;
        if (selectedSize === 'Medium') return heightVal >= 30 && heightVal <= 50;
        if (selectedSize === 'Large') return heightVal > 50 && heightVal <= 90;
        if (selectedSize === 'Oversized') return heightVal > 90;
        return true;
      });
    }

    // 5. Finish Filter
    if (selectedFinish !== 'All') {
      list = list.filter(p => p.finish.toLowerCase().includes(selectedFinish.toLowerCase()));
    }

    // 6. Colour Filter
    if (selectedColour !== 'All') {
      list = list.filter(p => p.colourDirection.toLowerCase().includes(selectedColour.toLowerCase()));
    }

    // Sort order
    if (sortBy === 'Name A-Z') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Outdoor Planters') {
      list = list.filter(p => p.category === 'Outdoor Planters').concat(list.filter(p => p.category !== 'Outdoor Planters'));
    } else if (sortBy === 'Large Format') {
      list = list.filter(p => p.category === 'Large Garden Pieces').concat(list.filter(p => p.category !== 'Large Garden Pieces'));
    }

    return list;
  }, [products, searchTerm, selectedType, selectedApplication, selectedSize, selectedFinish, selectedColour, sortBy]);

  // Selected single product detail modal simulation
  const activeProduct = useMemo(() => {
    if (!selectedProductSKU) return null;
    return products.find(p => p.SKU === selectedProductSKU) || null;
  }, [products, selectedProductSKU]);

  // Selected configuration states for size and set / packaging
  const [selectedSizeOpt, setSelectedSizeOpt] = useState<SizeOption | null>(null);
  const [selectedSetOpt, setSelectedSetOpt] = useState<SetOption | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sync selected options when activeProduct changes
  useEffect(() => {
    if (activeProduct) {
      setActiveImageIndex(0); // Reset to first image on product opening
      if (activeProduct.sizes && activeProduct.sizes.length > 0) {
        setSelectedSizeOpt(activeProduct.sizes[0]);
      } else {
        setSelectedSizeOpt(null);
      }
      if (activeProduct.sets && activeProduct.sets.length > 0) {
        setSelectedSetOpt(activeProduct.sets[0]);
      } else {
        setSelectedSetOpt(null);
      }
    } else {
      setSelectedSizeOpt(null);
      setSelectedSetOpt(null);
      setActiveImageIndex(0);
    }
  }, [activeProduct]);

  // Pricing helper based on user roles
  const renderPricingBlock = (product: Product) => {
    const fob = getFobPriceRange(product);
    
    if (currentRole === 'approved_b2b_buyer' || currentRole === 'admin') {
      return (
        <div className="bg-emerald-50/70 p-2 sm:py-2 sm:px-2.5 rounded border border-emerald-150 space-y-1 text-left">
          <div className="flex justify-between items-center text-[9px] font-mono text-emerald-950 border-b border-emerald-200/50 pb-0.5 leading-none">
            <span className="font-bold uppercase tracking-tight">FOB TRADE PRICE</span>
            <span className="text-[8px] text-emerald-700 font-medium">Incoterms® 2020</span>
          </div>
          <div className="grid grid-cols-2 gap-1 pb-0.5">
            <div className="flex items-center justify-between text-[10px] border-r border-emerald-150/50 pr-2">
              <span className="text-stone-500 truncate">{t('Tier 1:', 'Sỉ 1:')}</span>
              <span className="font-mono font-bold text-stone-850">US$ {fob.tier1.toFixed(2)}/pc</span>
            </div>
            <div className="flex items-center justify-between text-[10px] pl-1">
              <span className="text-stone-500 truncate">{t('Tier 2:', 'Sỉ 2:')}</span>
              <span className="font-mono font-bold text-emerald-700">US$ {fob.tier2.toFixed(2)}/pc</span>
            </div>
          </div>
          <div className="text-[9px] text-stone-500 pt-0.5 border-t border-stone-250/20 font-mono flex justify-between leading-none">
            <span>{t('MOQ:', 'MOQ:')}: <strong className="text-stone-700">{fob.moq} pcs</strong></span>
            <span>Port: <strong className="text-stone-700">Vietnam</strong></span>
          </div>
        </div>
      );
    }

    if (currentRole === 'trade_applicant') {
      return (
        <div className="bg-amber-50/50 p-2 sm:p-2 border border-amber-200 text-stone-700 space-y-0.5 rounded-sm">
          <div className="flex items-center gap-1 text-[10.5px] font-mono text-amber-850">
            <Lock size={10} className="text-amber-600" />
            <span className="font-bold uppercase">{t('FOB pricing locked', 'Bảng giá FOB bị Khóa')}</span>
          </div>
          <p className="text-[9.5px] text-stone-500 leading-tight">
            {t(
              'Your B2B trade account is currently under review.',
              'Hồ sơ của bạn đang được xét duyệt và sẽ sớm được mở khóa.'
            )}
          </p>
        </div>
      );
    }

    // If guest or retail customer
    return (
      <div className="bg-pottery-ivory/30 p-2 sm:p-2 border border-pottery-ivory/70 rounded flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Lock size={12} className="text-stone-400 shrink-0" />
          <div className="leading-tight">
            <span className="text-[10px] uppercase font-mono text-stone-600 block font-bold leading-none">
              {t('FOB exported price', 'Giá sỉ xuất FOB')}
            </span>
            <span className="text-[9px] text-stone-400">
              {t('For approved trade partners.', 'Đối tác kinh doanh đã duyệt.')}
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('/trade/apply')}
          className="text-[9.5px] underline font-bold text-pottery-terracotta hover:text-pottery-deepclay cursor-pointer shrink-0 font-mono"
        >
          {t('Apply', 'Đăng ký')}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-serif text-pottery-charcoal">
          {t('Vietnamese Pottery Collections', 'Tinh Hoa Danh Mục Gốm Xuất Khẩu')}
        </h1>
        <p className="text-xs text-stone-500">
          {t(
            'Browse ceramic planters, decorative vessels, stools and crafted objects for indoor living, outdoor landscapes and international sourcing.',
            'Dải sản phẩm đắp tay mộc mạc, bền bỉ chống sương giá cho cảnh quan ngoài trời và trang trí nội căn hộ cao cấp.'
          )}
        </p>
      </div>

      {/* Main Search & Sorting Grid */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded border border-pottery-ivory shadow-xs">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
            placeholder={t(
              'Search catalog by SKU, name, material, color...',
              'Tìm kiếm theo SKU, tên sản phẩm, chất thô địa tầng...'
            )}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-1 px-3 py-2 bg-stone-100 text-stone-700 rounded text-xs"
          >
            <Filter size={14} />
            <span>{t('Filters', 'Bộ lọc')} ({filteredProducts.length})</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-stone-200 bg-white rounded px-3 py-2 text-xs focus:outline-none"
          >
            <option value="Featured">{t('Featured Sort', 'Sắp xếp nổi bật')}</option>
            <option value="Name A-Z">{t('Name A-Z', 'Tên sản phẩm A-Z')}</option>
            <option value="Outdoor Planters">{t('Outdoor Planters First', 'Ưu tiên Chậu ngoài trời')}</option>
            <option value="Large Format">{t('Large Landscape First', 'Ưu tiên Gốm cảnh quan lớn')}</option>
          </select>
        </div>
      </div>

      {/* Body Content Sidebar + Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filter Sidebar (Left) */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded border border-pottery-ivory/80 shadow-xs h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-xs font-mono font-bold tracking-wider text-pottery-terracotta uppercase">
              {t('Search Facets', 'Hình thức Lọc')}
            </h3>
            <button
              onClick={() => {
                setSelectedType('All');
                setSelectedApplication('All');
                setSelectedSize('All');
                setSelectedFinish('All');
                setSelectedColour('All');
                setSearchTerm('');
              }}
              className="text-[10px] text-stone-400 font-mono hover:text-pottery-terracotta"
            >
              [ {t('Clear All', 'Xóa lọc')} ]
            </button>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-stone-700 uppercase font-mono">{t('Product Type', 'Dòng gốm')}</h4>
            <div className="space-y-1.5">
              {['All', 'Outdoor Planters', 'Indoor Pots', 'Decorative Vases', 'Ceramic Stools', 'Decorative Objects', 'Large Garden Pieces'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`block text-xs py-1 px-2 rounded-sm text-left w-full transition ${
                    selectedType === type
                      ? 'bg-pottery-terracotta text-white font-medium'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {type === 'All' ? t('All categories', 'Tất cả dòng gốm') : t(type, type)}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Application */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-stone-700 uppercase font-mono">{t('Application Use', 'Sử dụng')}</h4>
            <div className="flex gap-1.5">
              {['All', 'Indoor', 'Outdoor'].map((app) => (
                <button
                  key={app}
                  onClick={() => setSelectedApplication(app)}
                  className={`flex-1 text-[11px] py-1 px-2 border rounded-sm text-center transition ${
                    selectedApplication === app
                      ? 'border-pottery-terracotta bg-pottery-terracotta/10 text-pottery-terracotta'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {t(app, app)}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Dimensions Size category */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-stone-700 uppercase font-mono">{t('Height Size', 'Khoảng Chiều cao')}</h4>
            <div className="space-y-1">
              {[
                { key: 'All', val: t('All sizes', 'Tất cả kích thước') },
                { key: 'Small', val: t('Small (<30cm)', 'Nhỏ (<30cm)') },
                { key: 'Medium', val: t('Medium (30-50cm)', 'Vừa (30-50cm)') },
                { key: 'Large', val: t('Large (50-90cm)', 'Lớn (50-90cm)') },
                { key: 'Oversized', val: t('Oversized (>90cm)', 'Gốm khổng lồ (>90cm)') },
              ].map((sz) => (
                <label key={sz.key} className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer hover:text-stone-900">
                  <input
                    type="radio"
                    name="size-group"
                    checked={selectedSize === sz.key}
                    onChange={() => setSelectedSize(sz.key)}
                    className="accent-pottery-terracotta"
                  />
                  <span>{sz.val}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Finishes */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-stone-700 uppercase font-mono">{t('Glaze & Finish', 'Loại bề mặt / Chất men')}</h4>
            <select
              value={selectedFinish}
              onChange={(e) => setSelectedFinish(e.target.value)}
              className="w-full text-xs border border-stone-200 bg-white p-2 rounded focus:outline-none"
            >
              <option value="All">{t('All finishes', 'Tất cả hệ men')}</option>
              <option value="Natural">{t('Natural / Mossy Earth', 'Gốm đất nung mộc mạc')}</option>
              <option value="Matte">{t('Matte Glaze', 'Men cực lì (Matte)')}</option>
              <option value="Reactive">{t('Reactive High-Gloss', 'Men hỏa biến bóng')}</option>
              <option value="Rustic">{t('Rustic Rough Clay', 'Men xù xì phong sương')}</option>
              <option value="Sandblasted">{t('Sandblasted Finish', 'Nhám phun cát xám')}</option>
            </select>
          </div>

          <hr className="border-stone-100" />

          {/* Colours */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-stone-700 uppercase font-mono">{t('Colour Direction', 'Màu sắc chủ đạo')}</h4>
            <select
              value={selectedColour}
              onChange={(e) => setSelectedColour(e.target.value)}
              className="w-full text-xs border border-stone-200 bg-white p-2 rounded focus:outline-none"
            >
              <option value="All">{t('All colorways', 'Tất cả tông màu')}</option>
              <option value="Terracotta">{t('Terracotta Ochre', 'Ochre đất sét đỏ')}</option>
              <option value="Sand">{t('Warm Sand', 'Màu cát ấm sa mạc')}</option>
              <option value="White">{t('Linen White', 'Trắng ngà Linen')}</option>
              <option value="Charcoal">{t('Charcoal Slate', 'Xám đen đá cacbon')}</option>
              <option value="Olive">{t('Natural Olive', 'Xanh rêu mốc trầm')}</option>
              <option value="Emerald">{t('Emerald', 'Lục bảo hỏa biến hoàng gia')}</option>
            </select>
          </div>

          {/* Regulatory note */}
          <div className="p-3 bg-stone-50 rounded border border-stone-150 text-[10px] text-stone-400 font-mono italic leading-tight">
            {t(
              'Export packaging, loading advice, and sample cost calculations are completely customizable inside the Request FOB page.',
              'Kích cỡ bao chuẩn xuất khẩu, đóng pallet thô và dán nhãn luân chuyển sẽ được thống nhất tùy theo bến cảng chỉ định trong RFQ.'
            )}
          </div>
        </aside>

        {/* Product Grid Area (Right) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono bg-white px-4 py-2 rounded border border-pottery-ivory">
            <span>{t('Rendering:', 'Đang hiển thị:')} <strong>{filteredProducts.length}</strong> {t('pottery records found', 'sản phẩm đất nung')}</span>
            <span>{t('Default basis:', 'Cơ sở mặc định:')} <strong>Incoterms® 2020</strong></span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-stone-50 border border-stone-150 rounded-lg p-12 text-center space-y-3">
              <Sliders className="mx-auto text-stone-300" size={36} />
              <h4 className="font-bold text-stone-700">{t('No Pottery Records Found', 'Không tìm thấy mẫu gốm phù hợp')}</h4>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                {t(
                  'Try expanding your filters, searching for alternate SKUs or mailing sales@pottery.vn for bespoke custom mold calculations.',
                  'Hãy thử nới lỏng các bộ lọc chiều cao, đổi màu sắc hoặc gửi email yêu cầu trực tiếp về sales@pottery.vn.'
                )}
              </p>
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedApplication('All');
                  setSelectedSize('All');
                  setSelectedFinish('All');
                  setSelectedColour('All');
                  setSearchTerm('');
                }}
                className="bg-pottery-terracotta text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded"
              >
                {t('Reset Filters', 'Đặt lại bộ lọc')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-pottery-ivory rounded overflow-hidden p-2.5 sm:p-4 hover:shadow-md transition duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {/* Image thumb */}
                    <div
                      className="aspect-square w-full rounded bg-stone-50 overflow-hidden relative cursor-pointer hover-zoom"
                      onClick={() => setSelectedProductSKU(product.SKU)}
                    >
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-stone-900/80 text-white rounded font-mono text-[9px] px-1.5 py-0.5 leading-none">
                        {product.SKU}
                      </div>

                      {/* Indoor Outdoor tag */}
                      <div className="absolute bottom-2 right-2 bg-white/90 text-stone-800 font-mono rounded text-[8px] px-1.5 py-0.5 tracking-wider uppercase backdrop-blur-xs">
                        {product.indoorOutdoor.split(' ')[0]}
                      </div>
                    </div>

                    {/* Metadata text */}
                    <div className="space-y-1 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2 leading-tight">
                        <span className="text-[9px] text-pottery-terracotta font-mono font-bold uppercase tracking-wider truncate block" title={product.category}>
                          {product.category}
                        </span>
                        <span className="text-[9px] text-stone-400 shrink-0 font-mono">{product.dimensions.split('x')[0]}</span>
                      </div>
                      <h3
                        onClick={() => setSelectedProductSKU(product.SKU)}
                        className="text-xs font-bold text-stone-800 truncate hover:text-pottery-terracotta cursor-pointer transition"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-stone-500 leading-tight">
                        {product.finish} • <span className="italic">{product.material}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions & Pricing area */}
                  <div className="space-y-3 pt-3 mt-3 border-t border-stone-150/40">
                    
                    {/* Dynamic Pricing block */}
                    {renderPricingBlock(product)}

                    <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 mt-auto">
                      <button
                        onClick={() => setSelectedProductSKU(product.SKU)}
                        className="w-full sm:flex-1 text-center py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] uppercase font-bold tracking-wider rounded transition"
                      >
                        {t('Details', 'Hồ sơ')}
                      </button>
                      
                      <button
                        onClick={() => onAddToInquiry(product)}
                        className="w-full sm:flex-1 text-center py-2 bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-[10px] uppercase font-bold tracking-wider rounded transition"
                        title={currentRole === 'retail_customer' ? t('Add to Shopping Cart', 'Thêm vào giỏ hàng') : t('Add to FOB RFQ List', 'Thêm vào thư mục đàm phán sỉ')}
                      >
                        {currentRole === 'retail_customer' ? t('+ Buy', '+ Mua') : t('+ Inquiry', '+ Bản RFQ')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* MOBILE POP-UP FILTER OVERLAY */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end lg:hidden">
          <div className="bg-white w-80 max-w-full h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-pottery-charcoal">{t('Filter Sourcing Options', 'Bộ lọc tìm gốm')}</h3>
              <button onClick={() => setShowMobileFilters(false)} className="text-xl font-bold p-1">×</button>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase font-mono">{t('Category', 'Dòng hàng')}</h4>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-xs border border-stone-200 bg-white p-2 rounded focus:outline-none"
              >
                <option value="All">{t('All product ranges', 'Mọi dòng gốm')}</option>
                <option value="Outdoor Planters">{t('Outdoor Planters', 'Chậu ngoài trời chống băng giá')}</option>
                <option value="Indoor Pots">{t('Indoor Pots', 'Chậu gốm nhỏ nội thất')}</option>
                <option value="Decorative Vases">{t('Decorative Vases', 'Bình hoa trang trí')}</option>
                <option value="Ceramic Stools">{t('Ceramic Stools', 'Đôn gốm tráng men nghệ thuật')}</option>
                <option value="Decorative Objects">{t('Decorative Objects', 'Đồ sứ nặn tay mỹ nghệ')}</option>
                <option value="Large Garden Pieces">{t('Large Garden Pieces', 'Lu gốm cảnh quan khủng')}</option>
              </select>
            </div>

            {/* Application */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase font-mono">{t('Application', 'Không gian ứng dụng')}</h4>
              <div className="flex gap-2">
                {['All', 'Indoor', 'Outdoor'].map((app) => (
                  <button
                    key={app}
                    onClick={() => setSelectedApplication(app)}
                    className={`flex-1 text-xs py-1.5 border rounded text-center transition ${
                      selectedApplication === app
                        ? 'border-pottery-terracotta bg-pottery-terracotta/5 text-pottery-terracotta'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    {t(app, app)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-pottery-charcoal text-white py-3 text-xs uppercase tracking-widest font-semibold font-mono"
            >
              {t('Apply filters', 'Áp dụng bộ lọc')}
            </button>
          </div>
        </div>
      )}

      {/* DETAILED DIALOG/MODAL WITH OVERLAY */}
      {activeProduct && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-pottery-ivory flex flex-col md:flex-row shadow-2xl relative">
            
            {/* Close */}
            <button
              onClick={() => setSelectedProductSKU(null)}
              className="absolute top-4 right-4 z-10 w-8 w-8 h-8 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center text-lg leading-none"
            >
              ×
            </button>

            {/* Left side: Images */}
            <div className="md:w-1/2 bg-stone-100 p-6 flex flex-col justify-center">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-xs border border-stone-200 relative group">
                <img
                  src={activeProduct.galleryImages && activeProduct.galleryImages[activeImageIndex] ? activeProduct.galleryImages[activeImageIndex] : activeProduct.mainImage}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-102"
                />
                
                {/* Active index overlay pill */}
                <div className="absolute bottom-3 right-3 bg-stone-900/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-medium tracking-tight">
                  {activeImageIndex + 1} / {(activeProduct.galleryImages?.length || 1)}
                </div>
              </div>
              
              {/* 5-Image interactive thumbnail list slider */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {(activeProduct.galleryImages && activeProduct.galleryImages.length > 0
                  ? activeProduct.galleryImages
                  : [activeProduct.mainImage]
                ).map((img, i) => {
                  const isActive = i === activeImageIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`aspect-square rounded overflow-hidden border transition bg-white block focus:outline-none cursor-pointer relative ${
                        isActive 
                          ? 'border-pottery-terracotta ring-2 ring-pottery-terracotta/20 scale-102 shadow-xs' 
                          : 'border-stone-300 hover:border-stone-400 opacity-70 hover:opacity-100'
                      }`}
                      title={t(`Angle ${i + 1}`, `Góc chi tiết ${i + 1}`)}
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`Detail angle ${i + 1}`} />
                      
                      {/* Interactive hover border */}
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-pottery-terracotta pointer-events-none rounded-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-stone-400 font-mono mt-2 text-center">
                * {t('Click thumbnails to change the zoom angle', 'Nhấp vào ảnh thu nhỏ để thay đổi góc chi tiết nâng cao')}
              </p>
            </div>

            {/* Right side: Detailed Specs */}
            <div className="md:w-1/2 p-4 sm:p-5 md:p-6 space-y-3.5 text-stone-850">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold text-pottery-terracotta bg-pottery-ivory/80 px-2 py-0.5 rounded tracking-tight">
                    {activeProduct.category}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">SKU: {activeProduct.SKU}</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-stone-900 pt-1 tracking-tight">{activeProduct.name}</h2>
                <p className="text-stone-500 text-[11px] italic leading-tight">{t('Application:', 'Ứng dụng:')} {activeProduct.buyerApplication}</p>
              </div>

              {/* Pricing section with detailed data tables and Frost tolerances */}
              <div className="space-y-1.5">
                <h4 className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest leading-none">{t('Pricing & Logistics', 'Giá cả & Quy chuẩn Logistics')}</h4>
                {renderPricingBlock(activeProduct)}
              </div>

              {/* Material properties & sizes */}
              <table className="w-full text-[11px] sm:text-xs text-left border-y border-stone-100 divide-y divide-stone-100 font-mono text-stone-600">
                <tbody>
                  <tr>
                    <td className="py-1 sm:py-1.5 font-bold text-stone-850">{t('Outer Dimensions', 'Kích thước phủ')}</td>
                    <td className="py-1 sm:py-1.5 text-right sm:text-left">{activeProduct.dimensions}</td>
                  </tr>
                  <tr>
                    <td className="py-1 sm:py-1.5 font-bold text-stone-850">{t('Clay Sourcing', 'Địa mỏ đất sét')}</td>
                    <td className="py-1 sm:py-1.5 text-right sm:text-left">{activeProduct.material}</td>
                  </tr>
                  <tr>
                    <td className="py-1 sm:py-1.5 font-bold text-stone-850">{t('Surface glaze', 'Men & Bề mặt')}</td>
                    <td className="py-1 sm:py-1.5 text-right sm:text-left">{activeProduct.finish}</td>
                  </tr>
                  <tr>
                    <td className="py-1 sm:py-1.5 font-bold text-stone-850">{t('Color scheme', 'Màu sắc')}</td>
                    <td className="py-1 sm:py-1.5 text-right sm:text-left">{activeProduct.colourDirection}</td>
                  </tr>
                  <tr>
                    <td className="py-1 sm:py-1.5 font-bold text-stone-850">{t('Drainage design', 'Lỗ thoát nước')}</td>
                    <td className="py-1 sm:py-1.5 text-right sm:text-left text-[10.5px] leading-tight">{activeProduct.category === 'Outdoor Planters' || activeProduct.category === 'Large Garden Pieces' ? t('Pre-drilled center hole', 'Khoan lỗ đáy sẵn') : t('Optional / Glazed over', 'Tùy chọn bịt nắp')}</td>
                  </tr>
                </tbody>
              </table>

              {/* Dynamic Size Option Selector Component */}
              {activeProduct.sizes && activeProduct.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest leading-none">
                      {t('Select Size Specification', 'CHỌN DÒNG KÍCH THƯỚC')}
                    </span>
                    {selectedSizeOpt && (
                      <span className="text-[9px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded leading-none">
                        📐 {selectedSizeOpt.dimensions}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {activeProduct.sizes.map((size) => {
                      const isSelected = selectedSizeOpt?.name === size.name;
                      return (
                        <button
                          key={size.name}
                          type="button"
                          onClick={() => setSelectedSizeOpt(size)}
                          className={`text-center py-1.5 px-1 border transition rounded-sm font-mono text-[11px] cursor-pointer whitespace-nowrap overflow-hidden ${
                            isSelected
                              ? 'border-pottery-terracotta bg-pottery-terracotta/5 text-pottery-terracotta font-bold'
                              : 'border-stone-200 text-stone-600 hover:border-stone-400 bg-white'
                          }`}
                        >
                          <div className="truncate font-bold">{size.name}</div>
                          <span className="text-[8.5px] text-stone-400 font-light block mt-0.5">
                            f: ×{size.priceFactor.toFixed(1)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dynamic Set Package Options */}
              {activeProduct.sets && activeProduct.sets.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest leading-none">
                      {t('Select Set Packaging', 'CHỌN SỐ LƯỢNG SET ĐÓNG GÓI')}
                    </span>
                    {selectedSetOpt && selectedSetOpt.qty > 1 && (
                      <span className="text-[8.5px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/55 px-1.5 py-0.2 rounded font-bold leading-none">
                        ⭐ {t('Value Package!', 'Giá tiết kiệm!')}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {activeProduct.sets.map((sett) => {
                      const isSelected = selectedSetOpt?.name === sett.name;
                      return (
                        <button
                          key={sett.name}
                          type="button"
                          onClick={() => setSelectedSetOpt(sett)}
                          className={`text-center py-1.5 px-1 border transition rounded-sm font-mono text-[11px] cursor-pointer whitespace-nowrap overflow-hidden ${
                            isSelected
                              ? 'border-pottery-terracotta bg-pottery-terracotta/5 text-pottery-terracotta font-bold'
                              : 'border-stone-200 text-stone-600 hover:border-stone-400 bg-white'
                          }`}
                        >
                          <div className="truncate font-bold">{sett.name}</div>
                          <span className="text-[8.5px] text-stone-400 font-light block mt-0.5">
                            Q: {sett.qty}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Highly interactive Real-time Live Price Calculator */}
              <div className="bg-stone-50 border border-stone-150 p-2.5 rounded-sm space-y-1.5 bg-gradient-to-r from-stone-50 via-white to-orange-50/10">
                <div className="flex justify-between items-start text-[10px] text-stone-500">
                  <span>{t('Active Configuration:', 'Quy cách đã chọn:')}</span>
                  <span className="text-stone-850 font-mono font-bold text-right max-w-[200px] line-clamp-1">
                    {selectedSizeOpt?.name || 'Standard'} • {selectedSetOpt?.name || 'Single Bag'}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-1.5 border-t border-stone-200/60">
                  <span className="text-[9px] uppercase font-mono font-bold text-stone-400 tracking-wider">
                    {t('Dynamic Output Price:', 'Giá thực tế ước lượng:')}
                  </span>
                  <div className="text-right">
                    {currentRole === 'retail_customer' || currentRole === 'guest' ? (
                      activeProduct.retailPrice ? (
                        <div>
                          <span className="text-base font-mono font-bold text-pottery-charcoal">
                            US$ {((activeProduct.retailPrice) * (selectedSizeOpt?.priceFactor ?? 1.0) * (selectedSetOpt?.priceFactor ?? 1.0)).toFixed(2)}
                          </span>
                          {selectedSetOpt && selectedSetOpt.qty > 1 && (
                            <div className="text-[9px] text-stone-400 font-mono leading-none mt-0.5">
                              ≈ US$ {(((activeProduct.retailPrice) * (selectedSizeOpt?.priceFactor ?? 1.0) * (selectedSetOpt?.priceFactor ?? 1.0)) / selectedSetOpt.qty).toFixed(2)} / {t('piece', 'chậu')}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-pottery-terracotta uppercase">{t('Upon Enquiry', 'Giá: Liên hệ')}</span>
                      )
                    ) : (
                      <div>
                        <span className="text-base font-mono font-bold text-pottery-charcoal">
                          US$ {((activeProduct.fobPriceTier1 || 15) * (selectedSizeOpt?.priceFactor ?? 1.0) * (selectedSetOpt?.priceFactor ?? 1.0)).toFixed(2)}
                        </span>
                        <span className="text-[9px] text-stone-550 font-mono block leading-none mt-0.5">
                          {t('Est. FOB Cargo Trade Pool Price', 'Giá xuất sỉ ước tính')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Customization Note */}
              <div className="space-y-0.5 bg-stone-50 p-2 rounded text-[10.5px] leading-tight text-stone-500">
                <span className="font-bold text-stone-700 block uppercase tracking-wider font-mono text-[8.5px]">{t('Private label & OEM customization', 'Gia công nhãn riêng OEM')}</span>
                <p className="line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-pointer">{activeProduct.customizationNote}</p>
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  onClick={() => {
                    if ((currentRole === 'retail_customer' || currentRole === 'guest') && onAddToCart) {
                      onAddToCart(activeProduct, selectedSizeOpt || undefined, selectedSetOpt || undefined);
                    } else {
                      onAddToInquiry(activeProduct);
                    }
                    setSelectedProductSKU(null);
                  }}
                  className="flex-1 bg-pottery-terracotta hover:bg-pottery-deepclay text-white py-2 sm:py-2.5 text-xs uppercase tracking-widest font-semibold transition text-center cursor-pointer font-mono"
                >
                  {currentRole === 'retail_customer' || currentRole === 'guest' ? t('Add to Shopping Cart', 'Thêm vào giỏ hàng') : t('Add to B2B Inquiry List', 'Thêm vào Thư mục RFQ B2B')}
                </button>
                <button
                  onClick={() => onSaveProduct(activeProduct)}
                  className={`border px-4 transition rounded cursor-pointer ${
                    isSaved(activeProduct)
                      ? 'border-pottery-terracotta bg-pottery-terracotta/5 text-pottery-terracotta'
                      : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                  }`}
                >
                  {isSaved(activeProduct) ? '★' : '☆'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
