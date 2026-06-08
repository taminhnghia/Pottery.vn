/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product, UserRole } from '../types';
import { ShieldCheck, Truck, Sparkles, Lock, ArrowRight, Table, HelpCircle, FileText } from 'lucide-react';

interface TradePortalProps {
  products: Product[];
  language: 'en' | 'vi';
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  onAddToInquiry: (product: Product) => void;
}

export default function TradePortal({
  products,
  language,
  currentRole,
  onNavigate,
  onAddToInquiry
}: TradePortalProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Take 8 items representing strong export potential
  const tradePreviewItems = products.filter(p => p.tradeEligible).slice(0, 8);

  const partners = [
    { title: t('Global Importers', 'Nhà nhập khẩu Toàn cầu'), desc: t('Source robust pottery for multi-warehouse container allocations.', 'Phân bổ hàng xuất xưởng trực tiếp cho tổng kho lớn.') },
    { title: t('Garden Centres', 'Trung tâm Sân vườn & Vườn ươm'), desc: t('High-firing frost proof outdoor pots optimized for cold climates.', 'Tuyển tập chậu chịu sương tuyết tốt cho thị trường Mỹ, Âu.') },
    { title: t('Lifestyle Retailers', 'Chuỗi Trang trí nội thất'), desc: t('Private label development matching seasonal color catalogs.', 'Gia công đóng gói hộp màu nhãn riêng phục vụ mùa xuân vụ.') },
    { title: t('Hospitality Procurers', 'Đơn vị dự án Khách sạn & Resort'), desc: t('Statement gigantic clay urns, custom hand-placed logos.', 'Sản xuất lu nước cỡ đại, đóng mác gắn kèm thương hiệu nghỉ dưỡng.') },
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-pottery-charcoal text-white rounded-2xl overflow-hidden p-8 sm:p-16 border border-pottery-terracotta/25 shadow-xl">
          <div className="absolute inset-0 opacity-15">
            <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Background pottery stack" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-pottery-sand bg-white/10 px-3 py-1 rounded">
              {t('FOB B2B SOURCING PORTAL', 'CỔNG KÌNH DOANH XUẤT KHẨU')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
              {t('FOB-Based Pottery Sourcing from Vietnam', 'Đơn Vị Sản Xuất & Liên Kết Hải Quan Trọn Gói')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-normal">
              {t(
                'Explore extensive Vietnamese pottery collections with approved prices, exact packing configurations, shipping specifications, and sample testing protocols. Designed for international volume buyers.',
                'Cổng xuất nhập khẩu kết nối với xưởng lò Vietnam Ceramics. Hỗ trợ nhà bán buôn, ban quản lý dự án resort và các đơn vị ủy thác thu mua quốc tế khảo sát dải men mộc, lấy Spec Sheet và lên container tối ưu chi phí.'
              )}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('/trade/apply')}
                className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-semibold uppercase tracking-wider py-3 px-6 transition"
              >
                {t('Apply for B2B Account', 'Đăng ký Trade Account')}
              </button>
              
              <button
                onClick={() => onNavigate('/products')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider py-3 px-6 transition"
              >
                {t('Browse Trade Catalogue', 'Tra cứu Catalogue')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Segments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <h2 className="text-xl sm:text-2xl font-serif text-pottery-charcoal text-center">
          {t('A High-Fidelity Sourcing Channel For Global Retailers', 'Luồng Sourcing Chuyên Nghiệp Theo Chuẩn FOB Incoterm')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {partners.map((p, idx) => (
            <div key={idx} className="border border-pottery-ivory p-6 rounded bg-white shadow-xs space-y-3">
              <div className="w-10 h-10 bg-pottery-ivory text-pottery-terracotta flex items-center justify-center rounded font-bold font-mono">
                0{idx + 1}
              </div>
              <h3 className="font-serif font-bold text-stone-800 text-sm">{p.title}</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* B2B Sourcing Process Timeline */}
      <section className="bg-pottery-ivory/35 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-serif text-pottery-charcoal">
              {t('FOB Export Sourcing Workflow', 'Quy trình Làm việc & Đóng hàng Xuất khẩu')}
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              {t('Standard chronological steps from sample review to FOB port loading.', 'Các giai đoạ chế tác sáp mẫu nén ép thử rạn cho tới khi bốc xếp hàng lên mạn tàu.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            {[
              { val: t('1. Browse Catalog', '1. Duyệt Sản phẩm'), desc: t('Select your SKUs & dimensions.', 'Chọn mẫu nồi, thố hoặc đôn gốm sỉ.') },
              { val: t('2. Apply B2B', '2. Đăng ký B2B'), desc: t('Submit company registration info.', 'Cung cấp pháp nhân xuất nhập khẩu.') },
              { val: t('3. Evaluate Dims', '3. Định giá quy ước'), desc: t('View FOB unit tiers & packing specifications.', 'Mở khóa bảng FOB cấp 1 & đóng gói.') },
              { val: t('4. Sample Dispatch', '4. Chế tác mẫu thử'), desc: t('Review surface texture physically.', 'Gửi phôi mẫu gốm hỏa biến thực tế.') },
              { val: t('5. Cargo Stuffing', '5. Bốc xếp container'), desc: t('Loading under default Incoterms® 2020.', 'Giao hàng mạn tàu đạt chuẩ pallet.') },
            ].map((st, idx) => (
              <div key={idx} className="space-y-2 relative">
                <div className="bg-white p-4 rounded border border-pottery-ivory shadow-xs font-mono">
                  <h4 className="text-xs text-pottery-terracotta font-bold">{st.val}</h4>
                  <p className="text-[10px] text-stone-500 mt-1">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-pottery-charcoal">
              {t('Refined Trade Selection Preview', 'Danh mục Trưng bày B2B Tiêu Biểu')}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {t('FOB prices and exact container loading quantities are dynamically protected.', 'Bảng giá FOB bậc sỉ gốc và hồ sơ đai nẹp container được bảo vệ quyền truy cập.')}
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('/products')}
            className="text-xs text-pottery-terracotta font-semibold hover:underline flex items-center gap-1 font-mono uppercase"
          >
            <span>{t('View Full Catalogue', 'Xem Toàn bộ file danh mục')}</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Trade cards rendering */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {tradePreviewItems.map((product) => {
            const isApproved = currentRole === 'approved_b2b_buyer' || currentRole === 'admin';
            
            return (
              <div
                key={product.id}
                className="border border-pottery-ivory bg-white rounded p-4 flex flex-col justify-between hover:shadow-sm transition"
              >
                <div className="space-y-2">
                  <div className="aspect-square bg-stone-50 rounded overflow-hidden relative group cursor-pointer" onClick={() => onNavigate('/products')}>
                    <img src={product.mainImage} className="w-full h-full object-cover" alt={product.name} />
                    <span className="absolute top-2 left-2 bg-stone-900/70 text-white text-[8px] font-mono px-1.5 py-0.5 rounded leading-none">
                      {product.SKU}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-stone-400 font-bold uppercase block">{product.category}</span>
                    <h3 onClick={() => onNavigate('/products')} className="text-xs font-semibold text-stone-800 hover:text-pottery-terracotta cursor-pointer truncate">{product.name}</h3>
                    <p className="text-[9px] text-stone-500">{product.dimensions} • {product.finish}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 space-y-2">
                  {/* FOB dynamic block representation */}
                  {isApproved ? (
                    <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded text-[10px] font-mono">
                      <div className="flex justify-between">
                        <span>FOB Unit price:</span>
                        <strong className="text-stone-800">US$ {(12 + (parseInt(product.id.substring(2)) || 1) * 2.2).toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between pt-0.5">
                        <span>Est. MOQ lot:</span>
                        <strong className="text-stone-800">20 pcs</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-stone-50 p-2.5 rounded border border-stone-150 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-mono text-stone-400 block tracking-wider">{t('fob tier pricing', 'BẢNG GIÁ FOB SỈ')}</span>
                        <span className="text-[10px] text-stone-500 italic font-mono flex items-center gap-1">
                          <Lock size={10} />
                          <span>{t('Approved buyers', 'Đăng nhập sỉ')}</span>
                        </span>
                      </div>
                      <button
                        onClick={() => onNavigate('/trade/apply')}
                        className="text-[9px] uppercase font-bold text-pottery-terracotta hover:underline"
                      >
                        {t('Unlock', 'mở khóa')}
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('/products')}
                      className="flex-1 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-mono tracking-wide rounded"
                    >
                      {t('Specifications', 'Hồ Sơ Kỹ Thuật')}
                    </button>
                    <button
                      onClick={() => onAddToInquiry(product)}
                      className="px-2.5 py-1.5 bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-[10px] font-mono rounded"
                      title={t('Add SKU to inquiry form', 'Thêm SKU vào thư mục yêu cầu báo giá')}
                    >
                      + RFQ
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Bottom Sourcing */}
      <section className="bg-stone-900 text-white py-16 text-center space-y-6">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif text-pottery-sand leading-tight">
            {t('Ready to Source Premium Vietnamese Pottery?', 'Lập Bản Đăng Ký Đối Tác Kinh Doanh Ngay')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            {t(
              'Apply for a trade buyer dashboard. Verified wholesales gain direct contact with sales engineers, custom packaging options, and FOB ports booking schedules.',
              'Hoàn thiện phiếu thông tin đăng ký để nhân viên hỗ trợ kinh doanh gửi mật khẩu tài khoản đối tác phê duyệt trong vòng 24 giờ.'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/trade/apply')}
              className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded"
            >
              {t('Apply for Trade Account', 'Đăng ký B2B Partnership')}
            </button>
            <button
              onClick={() => onNavigate('/catalogue')}
              className="border border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded"
            >
              {t('Request Sourcing Catalogue', 'Yêu cầu Tải Bản cứng')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
