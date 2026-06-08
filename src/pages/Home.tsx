/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, UserRole } from '../types';
import { ArrowRight, Sparkles, CheckCircle, Shield, FileSpreadsheet, Layers, Send, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeProps {
  products: Product[];
  language: 'en' | 'vi';
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  onSelectFlow: (flow: 'retail' | 'trade') => void;
  onAddToInquiry: (product: Product) => void;
  onSaveProduct: (product: Product) => void;
  isSaved: (product: Product) => boolean;
}

export default function Home({
  products,
  language,
  currentRole,
  onNavigate,
  onSelectFlow,
  onAddToInquiry,
  onSaveProduct,
  isSaved
}: HomeProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Hero carousel state
  const [activeSlide, setActiveSlide] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % 3);
  };

  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1600&q=80",
      tagline: t('Est. 2026 • Premium Outdoor Craftsmanship', 'Thành lập 2026 • Gốm Sứ Sân Vườn Cao Cấp'),
      title: t('Vietnamese Outdoor Masterpieces for Premium Landscapes', 'Chậu Gốm Ngoại Thất Đắp Men – Nâng Tầm Biệt Thự'),
      desc: t('Heavy-duty clay pots, weather-resistant firing, and exquisite hand-applied glazes made to withstand freezes and harsh weather worldwide.', 'Chất đất sét chịu sương tuyết, dải men nung nhiệt độ cao từ kỹ sư thợ cả, kiến tạo điểm nhấn bền bỉ tuyệt mỹ cho resort & biệt thự cao cấp B2B.'),
      btn1Text: t('Explore Products', 'Xem Sản Phẩm lẻ'),
      btn1Path: '/products',
      btn2Text: t('Request FOB Quote', 'Đàm Phán FOB Sỉ'),
      btn2Path: '/trade'
    },
    {
      img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1600&q=80",
      tagline: t('Artisan Glazes • Curated Interior Styling', 'Phòng chế tác màu men mộc • Tĩnh lặng Bắc Âu'),
      title: t('Elegance Sculpted in Fine-Walled Ceramic Vases', 'Vẻ Đẹp Đương Đại Trên Từng Thân Quạt Gốm Mộc'),
      desc: t('Organic forms, sand wash textures, and premium metallic dripping glazes designed for minimal homes, art galleries, and architectural spaces.', 'Bình gốm mộc nghệ thuật mang phong cách thiết kế Wabi-Sabi và Zen nhẹ nhàng tinh khiết, mang sinh khí thiên nhiên chân thật nhất vào sảnh chờ, phòng khách.'),
      btn1Text: t('Bespoke Custom R&D', 'Xưởng Chế Tác Mẫu'),
      btn1Path: '/custom-development',
      btn2Text: t('Browse Collections', 'Xem Bộ Sưu Tập'),
      btn2Path: '/collections'
    },
    {
      img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1600&q=80",
      tagline: t('B2B Trade & Large Volume • Export Standard', 'Chuỗi bán lẻ & Thầu dự án • Đóng kiện gỗ hun trùng'),
      title: t('Container-Scale Global Freight Pottery Delivery', 'Nhà Cung Ứng Container Xuất Khẩu Toàn Cầu'),
      desc: t('Direct factory orders, standardized ISPM-15 export bark-free wood pallets support, and full custom CAD mold production with flawless tracking.', 'Cung ứng trọn gói bao gồm thiết kế mẫu 3D độc quyền, kiểm soát hư hao nhiệt độ, hỗ trợ ghép sỉ gom công và lo thủ tục hải quan xuất bến nhanh chóng.'),
      btn1Text: t('B2B Enterprise Portal', 'Cổng Doanh Nghiệp sỉ'),
      btn1Path: '/trade',
      btn2Text: t('Download specifications', 'Tải Spec Catalogue'),
      btn2Path: '/catalogue'
    }
  ];

  // Form states for Request Catalogue
  const [catName, setCatName] = useState('');
  const [catCompany, setCatCompany] = useState('');
  const [catEmail, setCatEmail] = useState('');
  const [catCountry, setCatCountry] = useState('United States');
  const [catType, setCatType] = useState('Importer');
  const [catInterest, setCatInterest] = useState('Outdoor Planters');
  const [catSuccess, setCatSuccess] = useState(false);

  const handleCatRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName || !catEmail) {
      alert(t('Please enter your Name and Email address.', 'Vui lòng cung cấp cả Tên và Email liên hệ.'));
      return;
    }
    setCatSuccess(true);
  };

  // Get subset of products
  const retailFeatured = products.filter(p => p.retailEligible).slice(0, 8);
  const generalFeatured = products.slice(10, 22); // 12 products

  const categories = [
    {
      id: 'planters',
      title: t('Outdoor Planters', 'Chậu cây Ngoài trời'),
      desc: t('Statement ceramic planters for gardens, terraces, landscapes and hospitality spaces.', 'Chậu gốm nung cao cấp chịu thời tiết cho sân vườn, cảnh quan resort.'),
      img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'pots',
      title: t('Indoor Pots', 'Chậu gốm Trong nhà'),
      desc: t('Refined pottery for living spaces, entryways and interior styling.', 'Chậu gốm trang trí tinh tế cho sảnh chờ, phòng khách, chung cư.'),
      img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'vases',
      title: t('Decorative Vases', 'Bình hoa Trang trí'),
      desc: t('Ceramic vessels created for curated interiors and retail assortments.', 'Dòng bình gốm nghệ thuật, độc bản cắm hoa cho không gian kiến trúc.'),
      img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'stools',
      title: t('Ceramic Stools', 'Đôn gốm Nghệ thuật'),
      desc: t('Functional pottery accents for indoor and outdoor living.', 'Đôn gốm tráng men tuyệt mỹ dùng làm bàn trà, bục kê tượng ngoài trời.'),
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'objects',
      title: t('Decorative Objects', 'Vật phẩm Mỹ nghệ'),
      desc: t('Sculptural ceramic pieces that add texture and character.', 'Các tác phẩm điêu khắc bằng đất sét nung tôn vinh cá tính không gian.'),
      img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'large',
      title: t('Large Garden Pieces', 'Gốm Sân vườn Cỡ lớn'),
      desc: t('Large-format pottery for landscape, villa and hospitality applications.', 'Lu gốm đại sảnh tầm cỡ, tâm điểm của mọi ánh nhìn trong cảnh quan.'),
      img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* SECTION 1: HERO - INTERACTIVE SLIDE CAROUSEL */}
      <section className="relative h-[85vh] bg-stone-950 overflow-hidden flex items-center group/hero" id="home-hero-carousel">
        {/* Slides Container */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'
                }`}
                style={{ zIndex: isActive ? 10 : 0 }}
              >
                {/* Image */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-60 transition-transform duration-[6500ms] ease-out-sine"
                  style={{ transform: isActive ? 'scale(1.05)' : 'scale(1.15)' }}
                />
                
                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-stone-950/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60"></div>
                
                {/* Slide Floating Content Container */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full text-white">
                    <div className="max-w-2.5xl space-y-6 md:space-y-8">
                      <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono font-bold text-pottery-sand bg-white/10 px-3 py-1 rounded backdrop-blur-xs transition-all duration-700 delay-100 translate-y-0 opacity-100">
                        {slide.tagline}
                      </span>
                      
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.08] text-white font-medium max-w-2.5xl">
                        {slide.title}
                      </h1>
                      
                      <p className="text-xs sm:text-sm md:text-base text-stone-200 leading-relaxed max-w-xl font-light">
                        {slide.desc}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button
                          onClick={() => onNavigate(slide.btn1Path)}
                          className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-6 py-3 text-[11px] tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-2 group shadow-xl hover:shadow-pottery-terracotta/20"
                        >
                          <span>{slide.btn1Text}</span>
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                        </button>
                        
                        <button
                          onClick={() => onNavigate(slide.btn2Path)}
                          className="bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 px-6 py-3 text-[11px] tracking-wider uppercase font-semibold transition"
                        >
                          {slide.btn2Text}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 z-20 w-10 h-10 rounded-full border border-white/10 bg-black/20 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover/hero:opacity-100 transition duration-300"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 z-20 w-10 h-10 rounded-full border border-white/10 bg-black/20 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover/hero:opacity-100 transition duration-300"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dynamic Dot Indicators (Capsule Theme) */}
        <div className="absolute bottom-18 left-0 right-0 z-20 flex justify-center gap-2.5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setActiveSlide(index); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeSlide ? 'w-8 bg-pottery-terracotta' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Floating Trust Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-pottery-charcoal/95 border-t border-pottery-terracotta/20 py-4 z-20 text-white/90 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-[9px] sm:text-xs tracking-[0.16em] uppercase font-mono">
            {t(
              'Indoor Living • Outdoor Landscape • Retail Collections • B2B Export Supply',
              'Không gian Trong nhà • Cảnh quan Sân vườn • Chuỗi Bán lẻ • Cung ứng Xuất khẩu FOB'
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: CUSTOMER PATH SELECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-pottery-terracotta block font-mono">
            {t('EXPLORATION PATHWAYS', 'LỰA CHỌN PHÂN LUỒNG')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-pottery-charcoal">
            {t('Designed for Living. Prepared for Trade.', 'Vẹn toàn Thẩm mỹ. Tuyệt hảo cho Giao thương.')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {t(
              'Select your path to view retail pricing for homes/gardens or register to access approved FOB export data.',
              'Vui lòng chọn nhu cầu của bạn để xem giá bán lẻ tiêu dùng hoặc đăng ký thông tin đối tác xuất nhập khẩu B2B.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Retail Customers */}
          <div className="border border-pottery-ivory bg-white rounded-lg p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-pottery-ivory flex items-center justify-center rounded text-pottery-terracotta font-serif font-bold">
                01
              </div>
              <h3 className="text-xl font-serif font-bold text-pottery-charcoal">
                {t('Personal Collection', 'Mua Sắm Cá Nhân (Bán lẻ)')}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t(
                  'Discover ceramic planters, vases and decorative pieces for your home, garden and balcony spaces. Public retail listings are visible where active.',
                  'Khám phá chậu cây ngoài trời, bình hoa nghệ thuật tinh xảo để trang điểm ấm cúng cho ban công, mái hiên biệt thự hay phòng khách của gia đình bạn.'
                )}
              </p>
            </div>
            <button
              onClick={() => { onSelectFlow('retail'); onNavigate('/shop'); }}
              className="mt-8 border border-pottery-terracotta text-pottery-terracotta hover:bg-pottery-terracotta hover:text-white transition w-full py-3 text-xs uppercase tracking-wider font-semibold"
            >
              {t('Shop Retail Collection', 'Truy cập Cửa hàng Lẻ')}
            </button>
          </div>

          {/* Card 2: B2B Wholesalers */}
          <div className="border border-pottery-ivory bg-pottery-ivory/30 rounded-lg p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-pottery-terracotta text-white flex items-center justify-center rounded font-serif font-bold">
                02
              </div>
              <h3 className="text-xl font-serif font-bold text-pottery-charcoal">
                {t('Trade & Export Buyers', 'Kênh Sỉ & Xuất Khẩu B2B')}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t(
                  'Explore extensive collections ideal for wholesale distribution, landscape architects, luxury resorts, commercial designs, and private label development.',
                  'Khảo sát hàng trăm mẫu sản xuất thủ công, đàm phán Incoterm FOB, đăng ký tài khoảnTrade Account để mở khóa biểu giá sỉ và quy cách đóng thùng container.'
                )}
              </p>
            </div>
            <button
              onClick={() => { onSelectFlow('trade'); onNavigate('/trade'); }}
              className="mt-8 bg-pottery-charcoal text-white hover:bg-black transition w-full py-3 text-xs uppercase tracking-wider font-semibold"
            >
              {t('Enter Trade Portal', 'Vào Cổng Doanh Nghiệp B2B')}
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: PRODUCT CATEGORIES */}
      <section className="bg-pottery-ivory/45 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-stone-500 block">
              {t('VIETNAMESE CERAMIC ARTISTRY', 'TINH HOA NGHỆ THUẬT GỐM VIỆT')}
            </span>
            <h2 className="text-3xl font-serif text-pottery-charcoal">
              {t('Explore Our Pottery Range', 'Bức Tranh Toàn Diện Ngành Hàng')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group cursor-pointer bg-white border border-stone-100 overflow-hidden rounded shadow-xs hover:shadow-md transition hover-zoom"
                onClick={() => onNavigate('/products')}
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition"></div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-serif font-bold text-pottery-charcoal group-hover:text-pottery-terracotta transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-pottery-terracotta flex items-center gap-1">
                    <span>{t('View Selection', 'Khám phá ngay')}</span>
                    <ArrowRight size={12} className="transition transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BRAND INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-pottery-terracotta block">
            {t('CONTEMPORARY HERITAGE', 'GỐM VIỆT ĐƯƠNG ĐẠI')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-pottery-charcoal">
            {t('Crafted in Vietnam. Shaped for Contemporary Spaces.', 'Nâng Tầm Gốm Việt Trên Bản Đồ Thiết Kế Toàn Cầu.')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {getTranslation('brandIntroBody', language)}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2 border-l-2 border-pottery-terracotta pl-4">
              <h4 className="text-xs font-bold tracking-wider font-mono text-pottery-charcoal">
                {t('Natural Materials', '100% Đất Sét Tự Nhiên')}
              </h4>
              <p className="text-[11px] text-stone-500">
                {t('Sourced directly from local clay beds, mixed to ensure maximum strength.', 'Sét đỏ và sét xám lọc kỹ từ phù sa sông Hồng và các mỏ cao lanh trứ danh.')}
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-pottery-terracotta pl-4">
              <h4 className="text-xs font-bold tracking-wider font-mono text-pottery-charcoal">
                {t('Refined Craftsmanship', 'Chế tác Thủ công')}
              </h4>
              <p className="text-[11px] text-stone-500">
                {t('Each vessel is turned and glazed by hand, capturing artisan touch.', 'Bàn xoay truyền thống, chạm khắc vân mộc và tráng men bí truyền bằng tay.')}
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-pottery-terracotta pl-4">
              <h4 className="text-xs font-bold tracking-wider font-mono text-pottery-charcoal">
                {t('Flexible Selection', 'Cơ cấu Linh hoạt')}
              </h4>
              <p className="text-[11px] text-stone-500">
                {t('From small interior tabletop vases to monumental resort urns.', 'Từ quy mô đắp tay gốm khổng lồ cho khách sạn cho đến bình sứ để bàn.')}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&fit=crop&w=800&q=80"
              alt="Hands shaping clay at Potter wheel Vietnam"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-pottery-charcoal text-white p-6 rounded shadow-xl hidden sm:block max-w-[240px]">
            <p className="text-[11px] text-pottery-sand font-mono tracking-wider uppercase mb-1">
              {t('AUTHENTIC PROCESS', 'KHOA HỌC CHẾ TÁC')}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed font-serif italic">
              "To be updated with official certifications and specific kiln technology details upon validation."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4.5: SPECIAL PRODUCT RANGE PROMO BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6" id="product-range-banners">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner 1: Cobalt & Emerald Glazes */}
          <div className="relative overflow-hidden rounded-lg min-h-[300px] flex items-center bg-stone-900 text-white group cursor-pointer" onClick={() => onNavigate('/products')}>
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80"
                alt="Teahouse and Glazes detail"
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/60 to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-8 sm:p-10 space-y-4 max-w-md">
              <span className="inline-block text-[10px] tracking-[0.2em] font-mono text-pottery-sand uppercase font-bold bg-white/10 px-2.5 py-1 rounded">
                {t('KILN EXPERIMENTAL GLIDE', 'BẢN SẮC MEN PHỔ CỔ')}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {t('Coated Cobalt & Cracking Emerald Reactive Glazes', 'Tinh Hoa Men Chảy Bát Sắc & Ngọc Bích Vân Rạn')}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {t('Curate your wholesale container with limited-edition high-fire flows developed in our R&D lab.', 'Hàng trăm sắc độ hỏa biến tuyệt diệu nung chín ở 1280°C tạo nên chiều sâu lung linh ảo diệu độc quyền.')}
              </p>
              <div className="text-xs text-white group-hover:text-pottery-sand font-semibold uppercase tracking-wider flex items-center gap-1.5 transition">
                <span>{t('Discover Glazes', 'Khám phá sắc men')}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Banner 2: Giant Garden Planters */}
          <div className="relative overflow-hidden rounded-lg min-h-[300px] flex items-center bg-stone-900 text-white group cursor-pointer" onClick={() => onNavigate('/products')}>
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"
                alt="Large scale outdoor pot"
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/60 to-transparent"></div>
            </div>

            <div className="relative z-10 p-8 sm:p-10 space-y-4 max-w-md">
              <span className="inline-block text-[10px] tracking-[0.2em] font-mono text-pottery-sand uppercase font-bold bg-white/10 px-2.5 py-1 rounded">
                {t('RESILIENT STONEWARE', 'ĐẤT NUNG CHỊU LỰC GIGANTIC')}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {t('Heavy Volcanic Textured Giant Planters', 'Bộ Sưu Tập Lu Gốm & Chậu Cây Đại Sân Vườn')}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {t('Massive statement vases up to 1.8 meters tall, structurally sound for commercial resort entries.', 'Trang trí sân thượng, sảnh resort rộng lớn bằng những tuyệt phẩm đắp mộc gờ nổi dũng mãnh, đầy lôi cuốn.')}
              </p>
              <div className="text-xs text-white group-hover:text-pottery-sand font-semibold uppercase tracking-wider flex items-center gap-1.5 transition">
                <span>{t('View Giant Planters', 'Xem Chậu Ngoại Cỡ')}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SHOP COLLECTION (RETAIL PREVIEW) */}
      <section className="bg-white py-16 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-pottery-terracotta block mb-2">
                {t('RETAIL & LIVING PORTFOLIO', 'KHÔNG GIAN TIÊU DÙNG CHỌN LỌC')}
              </span>
              <h2 className="text-3xl font-serif text-pottery-charcoal">
                {t('Curated Pottery for Indoor and Outdoor Living', 'Điểm Nhấn Tinh Tế Cho Mọi Điểm Chạm')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-xl">
                {t(
                  'Explore pottery pieces selected for homes, gardens, balconies, terraces and expressive interiors.',
                  'Tổng hợp các mẫu chậu cây mộc, men hỏa biến sang trọng bậc nhất phục vụ cư dân mong muốn bứt phá thẩm mỹ nội ngoại thất.'
                )}
              </p>
            </div>
            
            <button
              onClick={() => { onSelectFlow('retail'); onNavigate('/shop'); }}
              className="text-xs uppercase tracking-wider font-semibold text-pottery-terracotta hover:text-pottery-deepclay flex items-center gap-1 group border-b border-pottery-terracotta pb-1 whitespace-nowrap"
            >
              <span>{t('Browse Shop Collection', 'Tham quan showroom bán lẻ')}</span>
              <ArrowRight size={14} className="transition transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Product cards list */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {retailFeatured.map((product) => (
              <div
                key={product.id}
                className="group border border-stone-100 p-4 rounded bg-white hover:shadow-xs transition"
              >
                <div
                  className="aspect-square w-full overflow-hidden bg-stone-50 mb-4 cursor-pointer relative rounded hover-zoom"
                  onClick={() => onNavigate(`/products`)}
                >
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                    {product.SKU}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-mono tracking-wider uppercase">
                    {product.category}
                  </span>
                  <h3
                    className="text-xs font-semibold text-stone-800 truncate cursor-pointer hover:text-pottery-terracotta transition"
                    onClick={() => onNavigate(`/products`)}
                  >
                    {product.name}
                  </h3>
                  
                  {/* Retail state based on admin enabling */}
                  <div className="pt-2 text-[11px] font-mono font-bold text-pottery-charcoal">
                    {product.retailPriceVisible && product.retailPrice ? (
                      <span>US$ {product.retailPrice.toFixed(2)}</span>
                    ) : (
                      <span className="text-stone-400">{t('Price upon request', 'Giá bán: Liên hệ')}</span>
                    )}
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button
                      onClick={() => onNavigate(`/products`)}
                      className="text-[10px] uppercase font-bold tracking-wider text-pottery-terracotta flex-1 text-center py-1 bg-pottery-ivory/80 rounded hover:bg-pottery-ivory transition"
                    >
                      {t('View Detail', 'Chi tiết')}
                    </button>
                    <button
                      onClick={() => onSaveProduct(product)}
                      className={`text-xs px-2 py-1 rounded border transition ${
                        isSaved(product)
                          ? 'border-pottery-terracotta bg-pottery-terracotta text-white'
                          : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                      }`}
                      title={t('Save item', 'Lưu sản phẩm')}
                    >
                      ★
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: TRADE & EXPORT POSITIONING */}
      <section className="bg-pottery-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-pottery-sand block">
              {t('B2B INTERNATIONAL PROCUREMENT', 'CUNG ỨNG XUẤT KHẨU TOÀN CẦU')}
            </span>
            <h2 className="text-3xl font-serif text-white">
              {t('FOB-Based Pottery Sourcing from Vietnam', 'Nhà Cung Ứng Gốm Xuất Khẩu Uy Tín Từ Việt Nam')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {t(
                'POTTERY.VN supports international buyers exploring Vietnamese pottery for wholesale distribution, retail assortments, garden centres, hospitality applications and custom product development.',
                'Chúng tôi áp dụng quy trình kiểm soát chất lượng từ khâu tinh đất cho đến bao gói pallet đai xơ dừa đạt tiêu chuẩn thông hải Mỹ, Châu Âu và Úc.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Buyer Benefits */}
            <div className="bg-white/5 border border-white/10 p-6 rounded space-y-3">
              <h3 className="text-base font-serif font-bold text-pottery-sand">
                {t('Wholesalers & Importers', 'Nhà Nhập Khẩu & Wholesaler')}
              </h3>
              <ul className="text-xs text-stone-300 space-y-2">
                <li>• {t('Access approved tier-based FOB Vietnam port unit pricing.', 'Mở khóa bảng chia giá FOB theo số lượng đặt hàng.')}</li>
                <li>• {t('Get fully calculated specification sheets (sizes, packing CBMs).', 'Tải Spec Sheet định lượng độ dày đất, kích cỡ quy ước.')}</li>
                <li>• {t('Mix diverse styles within a single container lot.', 'Hỗ trợ gom ghép nhiều SKU mẫu mã vào chung 1 container.')}</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded space-y-3">
              <h3 className="text-base font-serif font-bold text-pottery-sand">
                {t('Garden Centres & Retail Chains', 'Chuỗi Garden Centre & Đại Siêu Thị')}
              </h3>
              <ul className="text-xs text-stone-300 space-y-2">
                <li>• {t('Seasonal wholesale planning catalogs for winter-proof clay.', 'Brochure lập kế hoạch mùa vụ cho gốm chịu được khí hậu đóng băng.')}</li>
                <li>• {t('Pallet packing with clear shipping labels for easy delivery.', 'Pallet bọc màng chuyên nghiệp kèm tem nhãn mã vạch kho vận chuẩn.')}</li>
                <li>• {t('Guaranteed firing and structural stability for high frost.', 'Cam kết kiểm thử độ bền cơ học nung nhiệt độ cao chống rạn lẻ.')}</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded space-y-3">
              <h3 className="text-base font-serif font-bold text-pottery-sand">
                {t('Hospitality Projects & Hotels', 'Dự án Hotel & Resort Nghỉ dưỡng')}
              </h3>
              <ul className="text-xs text-stone-300 space-y-2">
                <li>• {t('Work with designers to tweak custom colors or logo plaques.', 'Tùy biến men mộc hỏa biến, đắp huy hiệu thương hiệu nổi.')}</li>
                <li>• {t('Stunning gargantuan sculptures & garden water fountains.', 'Đắp đất đại sảnh khổng lồ cao tới 2m phục vụ cảnh quan.')}</li>
                <li>• {t('Expedited samples delivery for landscape architectural signoffs.', 'Hỗ trợ mẫu gốm thử nghiệm trình kiến trúc sư duyệt nhanh.')}</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-center mt-8">
            <button
              onClick={() => onNavigate('/trade/apply')}
              className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-8 rounded transition"
            >
              {t('Apply for a Trade Account', 'Đăng ký Tài khoản Trade B2B')}
            </button>
            <button
              onClick={() => onNavigate('/export-capabilities')}
              className="border border-white/30 hover:border-white text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-8 rounded transition"
            >
              {t('Review Export Capabilities', 'Xem Năng lực Đạt chuẩn')}
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 7: FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-pottery-terracotta block">
            {t('EDITORIAL CATALOGUES', 'TUYỂN TẬP ĐƯỢC CHỌN LỌC')}
          </span>
          <h2 className="text-3xl font-serif text-pottery-charcoal">
            {t('Collections for Distinctive Spaces and Markets', 'Sắp Đặt Hoàn Hảo Cho Từng Ý Đồ Độc Đáo')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="group cursor-pointer space-y-4" onClick={() => onNavigate('/collections')}>
            <div className="aspect-[3/2] overflow-hidden rounded bg-stone-100 hover-zoom">
              <img
                src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80"
                alt="Garden Landscape Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-serif font-bold text-pottery-charcoal group-hover:text-pottery-terracotta transition">
              {t('Garden & Landscape Collection', 'Bản sắc Cảnh quan & Sân vườn')}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('Outdoor planters and decorative vessels for terraces, gardens, villas and landscape applications.', 'Chậu cây đại sảnh và thố nước cảnh quan đắp tôn tạo không gian biệt thự ngoài trời.')}
            </p>
          </div>

          <div className="group cursor-pointer space-y-4" onClick={() => onNavigate('/collections')}>
            <div className="aspect-[3/2] overflow-hidden rounded bg-stone-100 hover-zoom">
              <img
                src="https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=600&q=80"
                alt="Interior Decorative Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-serif font-bold text-pottery-charcoal group-hover:text-pottery-terracotta transition">
              {t('Interior Decorative Collection', 'Bộ sưu tập Bình gốm Nghệ thuật')}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('Vases, pots and ceramic objects for curated interiors and home décor selections.', 'Dòng gốm tĩnh lặng mang hơi thở Bắc Âu phối mộc mạc châu Á dành cho showroom, phòng gym, spa.')}
            </p>
          </div>

          <div className="group cursor-pointer space-y-4" onClick={() => onNavigate('/collections')}>
            <div className="aspect-[3/2] overflow-hidden rounded bg-stone-100 hover-zoom">
              <img
                src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80"
                alt="Hospitality Selection"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-serif font-bold text-pottery-charcoal group-hover:text-pottery-terracotta transition">
              {t('Hospitality Selection', 'Tuyển tập Gốm Resort & Hospitalty')}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('Statement pottery for resorts, hotels, courtyards and guest-facing environments.', 'Đem lại điểm nhấn đẳng cấp 5 sao tại các khu nghỉ nghỉ dưỡng, đôn sảnh chờ khách sạn.')}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 8: FEATURED PRODUCTS GRID */}
      <section className="bg-pottery-ivory/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl font-serif text-pottery-charcoal">
              {t('Selected Pottery Products Portfolio', 'Bộ Sưu Tập Gốm Sứ Độc Bản Tiêu Biểu')}
            </h2>
            <p className="text-xs text-stone-500">
              {t('Browse our mixed list of hand-formed premium planters, vases and ceramic furniture relics.', 'Bảng giới thiệu ngẫu nhiên để thấy được dải bề mặt men, kích thước và chất địa tầng đất sông ngòi nước Việt.')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {generalFeatured.map((product) => (
              <div
                key={product.id}
                className="group border border-pottery-ivory p-4 rounded bg-white hover:shadow-xs transition"
              >
                <div
                  className="aspect-square w-full overflow-hidden bg-stone-50 mb-3 cursor-pointer relative rounded hover-zoom"
                  onClick={() => onNavigate(`/products`)}
                >
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-stone-900/80 text-white font-mono text-[9px] px-2 py-0.5 rounded leading-none">
                    {product.SKU}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-pottery-terracotta tracking-wider uppercase">
                      {product.category}
                    </span>
                    <span className="text-[10px] text-stone-500">{product.indoorOutdoor.split(' ')[0]}</span>
                  </div>
                  <h3
                    className="text-xs font-semibold text-stone-800 truncate cursor-pointer hover:text-pottery-terracotta transition"
                    onClick={() => onNavigate(`/products`)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-stone-500 truncate">{product.finish} • {product.colourDirection}</p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    {/* Role pricing locks representation safely */}
                    {currentRole === 'guest' || currentRole === 'trade_applicant' ? (
                      <span className="text-[10px] text-stone-400 italic">
                        {t('Trade price locked', 'Giá B2B: Khóa')}
                      </span>
                    ) : currentRole === 'approved_b2b_buyer' ? (
                      <span className="text-[11px] text-emerald-600 font-mono font-bold">
                        US$ {(15 + (parseInt(product.id.substring(2)) || 1) * 2).toFixed(2)} (FOB)
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-700 font-mono">
                        {product.retailPrice ? `US$ ${product.retailPrice}` : t('Enquiry available', 'Giá: Liên hệ')}
                      </span>
                    )}

                    <button
                      onClick={() => onAddToInquiry(product)}
                      className="text-[10px] font-mono text-pottery-terracotta font-semibold hover:underline"
                    >
                      {currentRole === 'retail_customer' ? t('+ Cart', '+ Mua lẻ') : t('+ Inquiry', '+ Bản RFQ')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8.5: RESORT AND CONTRACT SOURCING HERO BANNER */}
      <section className="relative py-24 bg-stone-900 text-white overflow-hidden flex items-center min-h-[350px]" id="resort-contract-sourcing-banner">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury resort with great planters"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-950/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-pottery-sand font-bold block">
            {t('5-STAR RESORT CONTRACT SOURCING', 'HỢP TÁC DỰ ÁN NGHỈ DƯỠNG & CẢNH QUAN CAO CẤP')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
            {t('Architectural Scale & Custom Hospitality Solutions', 'May Đo Riêng Cho Công Trình Nghỉ Dưỡng Thượng Lưu')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            {t(
              'We partner with lead landscape designers to produce certified frostproof structural stoneware, bespoke glazes matching brand color guides, and engraved hallmark insignia. Standard container logistical delivery or premium air-freight samples.',
              'Vietnam Pottery là đối tác chiến lược chế tác cơ số gốm sứ ngoại cỡ cho sảnh đón, giếng trời và hồ bơi vô cực tại các resort mang tầm quốc tế.'
            )}
          </p>
          <div className="flex justify-center flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('/custom-development')}
              className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-8 rounded transition animate-pulse hover:animate-none"
            >
              {t('Consult Custom Solution', 'Tìm Hiểu Năng Lực R&D')}
            </button>
            <button
              onClick={() => onNavigate('/export-capabilities')}
              className="bg-white/10 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-8 rounded transition"
            >
              {t('Download Certificates', 'Hồ Sơ Năng Lực Nhà Máy')}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: CUSTOM DEVELOPMENT BRIEFING */}
      <section className="bg-stone-50 border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-pottery-terracotta block">
              {t('TAILOR-MADE PRODUCTION', 'KIẾN TẠO PHÂN KHÚC ĐỘC QUYỀN')}
            </span>
            <h2 className="text-3xl font-serif text-pottery-charcoal">
              {t('Custom Pottery Development for Your Market', 'Thiết Kế Men & Đúc Khuôn Bản Quyền Thương Hiệu')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              {t(
                'Develop tailored pottery selections for retail assortments, hospitality spaces, private label requirements or project applications. You can define shapes, specific glaze melting temperatures, and packaging logos.',
                'Hỗ trợ chế tác mẫu 3D trước khi nặn mẫu sáp nung thử nghiệm. Với đội ngũ kỹ sư men nung chuyên nghiệp, chúng tôi tự tin đáp ứng mọi sắc màu hỏa biến phức tạp nhất.'
              )}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded border border-stone-100 space-y-1">
                <h4 className="text-xs font-bold font-mono text-stone-800">
                  {t('1. CAD/Shape Direction', '1. Vẽ CAD & Định hình Dáng')}
                </h4>
                <p className="text-[10px] text-stone-500">
                  {t('Adjust radius, height ranges or base curves precisely.', 'Làm mượt biên dạng bình gốm theo tỉ lệ vàng kiến trúc.')}
                </p>
              </div>
              <div className="p-4 bg-white rounded border border-stone-100 space-y-1">
                <h4 className="text-xs font-bold font-mono text-stone-800">
                  {t('2. Custom Glaze Fusion', '2. Nghiên cứu Hệ Men Nghiệm')}
                </h4>
                <p className="text-[10px] text-stone-500">
                  {t('Develop unique colors to match Pantone or project hues.', 'Phối khoáng thạch bản địa ra màu men hỏa biến khao khát.')}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-pottery-ivory shadow-lg space-y-4">
            <h3 className="text-lg font-serif font-bold text-pottery-charcoal">
              {t('Start a Custom Project Brief', 'Yêu cầu phát triển Mẫu độc quyền')}
            </h3>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              {t(
                'Submit custom development specifications. Our B2B factory specialists will evaluate structural capabilities upon inquiry.',
                'Đội ngũ R&D của Vietnam Pottery Join Stock Company sẽ xem xét và phản hồi tính khả thi cơ lý của phôi gốm.'
              )}
            </p>
            <button
              onClick={() => onNavigate('/custom-development')}
              className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs uppercase tracking-widest font-semibold py-3 transition text-center"
            >
              {t('Start a Custom Project', 'Yêu cầu bản R&D')}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 10: INSPIRATION GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-pottery-terracotta block">
            {t('ENVIRONMENT APPLICATIONS', 'KHÔNG GIAN NGHỆ THUẬT')}
          </span>
          <h2 className="text-3xl font-serif text-pottery-charcoal">
            {t('Pottery Inspiration for Designed Spaces', 'Khơi nguồn cảm hứng ứng dụng')}
          </h2>
          <p className="text-xs text-stone-400 italic">
            "Application Inspiration. Images shown for visual reference only."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: t('Resort Arrival Landscape', 'Cảnh quan Biệt thự ven biển'), img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=500&q=80' },
            { title: t('Boutique Hotel Courtyard', 'Giếng trời Khách sạn'), img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=500&q=80' },
            { title: t('Contemporary Villa Garden', 'Sân vườn ban công Châu Âu'), img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80' },
            { title: t('Curated Interior Styling', 'Sắp đặt tĩnh vật mộc'), img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=500&q=80' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group cursor-pointer relative aspect-square overflow-hidden rounded bg-stone-100"
              onClick={() => onNavigate('/inspiration')}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono font-bold text-pottery-sand uppercase tracking-widest mb-1">
                  {t('DESIGN INSPIRATION', 'Ý TƯỞNG THIẾT KẾ')}
                </span>
                <h4 className="text-sm font-serif font-bold text-white">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: CATALOGUE REQUEST FORM */}
      <section className="bg-pottery-ivory/45 py-16 border-y border-pottery-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 bg-white p-8 sm:p-12 rounded-lg border border-stone-250/20 shadow-xs">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif text-pottery-charcoal">
              {t('Request Our Product Catalogue', 'Đăng ký Nhận Catalogue & Biểu mẫu B2B')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              {t(
                'Explore ceramic planters, decorative vessels, stools and pottery objects for retail selection, wholesale sourcing and hospitality applications.',
                'Chọn phiên bản catalogue tiêu dùng bán lẻ hoặc tài liệu thông số kỹ thuật (Specification) dành riêng cho Wholesaler quốc tế.'
              )}
            </p>
          </div>

          {catSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded text-center space-y-3">
              <CheckCircle className="mx-auto text-emerald-500" size={32} />
              <h4 className="font-bold text-sm">
                {t('Thank you! Catalog Request Submitted.', 'Cảm ơn bạn! Đăng ký của bạn đã được tiếp nhận.')}
              </h4>
              <p className="text-xs leading-relaxed max-w-md mx-auto">
                {t(
                  'Your request has been filed under ID #CAT-2026. A digital PDF copy of our collections has been queued for download.',
                  'Thông tin của bạn được ghi nhận mã số #CAT-2026. Một đường dẫn tải file PDF chất lượng cao đã gửi tự động đi.'
                )}
              </p>
              <button
                onClick={() => {
                  setCatSuccess(false);
                  setCatName('');
                  setCatEmail('');
                }}
                className="text-xs text-pottery-terracotta underline font-semibold"
              >
                {t('Make another request', 'Thực hiện yêu cầu khác')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleCatRequest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                    {t('Full Name *', 'Họ & Tên *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                    placeholder="e.g. Johnathan Smith"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                    {t('Company Name (Optional)', 'Tên Công ty (Không bắt buộc)')}
                  </label>
                  <input
                    type="text"
                    value={catCompany}
                    onChange={(e) => setCatCompany(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                    placeholder="e.g. Earthy Pots LLC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                    {t('Business Email *', 'Email liên hệ *')}
                  </label>
                  <input
                    type="email"
                    required
                    value={catEmail}
                    onChange={(e) => setCatEmail(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                    placeholder="e.g. buyer@earthypots.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                    {t('Country', 'Quốc gia')}
                  </label>
                  <select
                    value={catCountry}
                    onChange={(e) => setCatCountry(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs bg-white focus:outline-none focus:border-pottery-terracotta"
                  >
                    <option value="United States">United States</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                    {t('Customer Sourcing Type', 'Loại hình Sourcing')}
                  </label>
                  <select
                    value={catType}
                    onChange={(e) => setCatType(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs bg-white focus:outline-none focus:border-pottery-terracotta"
                  >
                    <option value="Personal">{t('Personal Customer', 'Khách cá nhân mua lẻ')}</option>
                    <option value="Importer">{t('Importer', 'Nhà nhập khẩu sỉ')}</option>
                    <option value="Distributor">{t('Distributor', 'Đại lý phân phối')}</option>
                    <option value="Garden Centre">{t('Garden Centre', 'Trung tâm Sân vườn')}</option>
                    <option value="Home Decor Retailer">{t('Home Décor Retailer', 'Chuỗi bán lẻ nội thất')}</option>
                    <option value="Hospitality">{t('Hospitality / Architect', 'Dự án Hotel / Thiết kế')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                  {t('Main Product Category of Interest', 'Phân khúc quan tâm chính')}
                </label>
                <select
                  value={catInterest}
                  onChange={(e) => setCatInterest(e.target.value)}
                  className="w-full border border-stone-250 px-3 py-2 text-xs bg-white focus:outline-none"
                >
                  <option value="Outdoor Planters">{t('Outdoor Planters', 'Chậu ngoài trời chống băng giá')}</option>
                  <option value="Indoor Pots">{t('Indoor Pots', 'Chậu gốm nhỏ nội thất')}</option>
                  <option value="Decorative Vases">{t('Decorative Vases', 'Bình hoa men mộc hỏa biến')}</option>
                  <option value="Ceramic Stools">{t('Ceramic Stools', 'Đôn gốm tráng men nghệ thuật')}</option>
                  <option value="Large Pieces">{t('Large Garden Pieces', 'Lu đất nung đại thụ cảnh quan')}</option>
                </select>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="newsletter" defaultChecked className="mt-0.5" />
                <label htmlFor="newsletter" className="text-[11px] text-stone-500 cursor-pointer">
                  {t('I would like to receive product catalogues and pottery sourcing updates from POTTERY.VN.', 'Tôi đồng ý nhận tài liệu cập nhật dải men và mẫu mới định kỳ.')}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest py-3 mt-4 transition flex items-center justify-center gap-2"
              >
                <Download size={14} />
                <span>{t('Request Digital Catalogue', 'Đăng ký Tải Catalogue')}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 12: FINAL CTA */}
      <section className="bg-pottery-charcoal text-white py-16 text-center space-y-6">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-serif text-pottery-sand leading-tight">
            {t('Sourcing Pottery from Vietnam or Selecting Pieces for Your Space?', 'Bắt Đầu Kết Nối Với Trung Tâm Gốm Sứ Xuất Khẩu Việt Nam')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            {t(
              'Explore standard shapes or define custom private labels with our expert engineers. We support both container-scale export consignments and curated luxury residential drops.',
              'Chúng tôi luôn sẵn sàng hỗ trợ bạn biến mọi mẫu vẽ kiến tạo thành hiện mộc sống động.'
            )}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/shop')}
              className="bg-white text-pottery-charcoal hover:bg-stone-100 text-xs font-bold uppercase tracking-wider py-3 px-6 rounded"
            >
              {t('Shop Retail Collection', 'Ghé Showroom Bán Lẻ')}
            </button>
            <button
              onClick={() => onNavigate('/trade/apply')}
              className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded"
            >
              {t('Apply for B2B Account', 'Đăng ký Khách sỉ B2B')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

// Translations helper dictionary mapping standard keys
const TRANSLATIONS: { [key: string]: { en: string; vi: string } } = {
  brandIntroBody: {
    en: 'POTTERY.VN presents Vietnamese ceramic collections designed for indoor living, outdoor landscapes, retail assortments and international sourcing. Our focus is on expressive forms, natural textures and pottery selections suited to both personal spaces and professional buyer requirements.',
    vi: 'POTTERY.VN là cổng kết nối tinh hoa gốm sứ Việt Nam với thế giới. Chúng tôi cung ứng trực tiếp các dòng sản phẩm chậu gốm tráng men nung nhiệt độ cao, bình hoa mộc phong cách tối giản Bắc Âu và đôn gốm sứ đầy nghệ thuật đáp ứng các yêu cầu chất lượng khắt khe nhất của thị trường Hoa Kỳ và Châu Âu.'
  }
};

function getTranslation(key: string, lang: 'en' | 'vi'): string {
  if (TRANSLATIONS[key]) {
    return TRANSLATIONS[key][lang];
  }
  return key;
}
