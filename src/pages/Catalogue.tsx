/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Download, CheckCircle, FileText, Sparkles, Mail } from 'lucide-react';

interface CatalogueProps {
  language: 'en' | 'vi';
}

export default function Catalogue({ language }: CatalogueProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // States
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [custType, setCustType] = useState('Personal Customer');
  const [catOption, setCatOption] = useState('Outdoor Planters Catalogue');
  const [success, setSuccess] = useState(false);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert(t('Please complete your Name and Email address.', 'Vui lòng điền đủ Tên và Email để tiếp nhận.'));
      return;
    }
    setSuccess(true);
  };

  const catalogs = [
    { title: t('Retail Living Overview', 'Tuyển tập Gốm Đương Đại Bán Lẻ'), size: '4.8 MB PDF', desc: t('Curated planters, stools and vases styled for high-end residential balconies and living corners.', 'Các mẫu chậu ngọc men hỏa biến, đôn nung độc bản làm bừng sáng mọi ban công chưng cư, sảnh villa.') },
    { title: t('Outdoor Frost-Resistant Planters', 'Chậu ngoài trời Chịu sương nén nặng'), size: '12.4 MB PDF', desc: t('Thick-walled clay garden planters, strictly engineered for cold, sub-zero European & US Winters.', 'Ưu tiên thông số cơ lý chống nứt vỡ trong điều kiện đông lạnh băng tuyết khắc nghiệt bến ngoài.') },
    { title: t('Global B2B Wholesale & Packing Specs', 'Quy các Đóng Hàng & Quy chuẩn Logistics B2B'), size: '8.1 MB PDF', desc: t('FOB terms, packaging pallet counts, container stuffing CBM calculations, and sample dispatch rules.', 'Chính sách giá sỉ thương lượng mạn tàu Cat Lai Port Incoterm FOB, biểu đóng mác màng chống nước.') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Editorial Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-pottery-terracotta uppercase bg-pottery-ivory px-3 py-1 rounded">
          <BookOpen size={13} />
          <span>{t('DIGITAL & PRINT PUBLICATIONS', 'TÀI LIỆU BROCHURE & CATALOGUE')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-pottery-charcoal">
          {t('Request the POTTERY.VN Catalogue', 'Đăng Ký Tài Liệu Danh Mục Sản Phẩm')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {t(
            'Explore pottery selections for personal spaces, retail sourcing, wholesale distribution, hospitality applications and custom development.',
            'Vui lòng điền thông tin để chuyển đến phân luồng tải tài liệu chất lượng cao dải men nung mộc, kích cỡ phủ sấy mẫu.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Interactive request options list */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="font-serif font-bold text-stone-800 text-lg border-b border-pottery-ivory pb-2">
            {t('Available Catalog Publications', 'Các Tập Catalogue Sẵn Sàng Tải Xuống')}
          </h3>
          
          <div className="space-y-4">
            {catalogs.map((c, idx) => (
              <div key={idx} className="bg-white border border-pottery-ivory p-5 rounded hover:shadow-xs transition space-y-2 relative">
                <span className="absolute top-4 right-4 bg-stone-100 text-stone-600 font-mono text-[9px] px-2 py-0.5 rounded">
                  {c.size}
                </span>
                <h4 className="font-serif font-bold text-stone-900 text-sm leading-tight flex items-center gap-1.5">
                  <FileText size={15} className="text-pottery-terracotta" />
                  <span>{c.title}</span>
                </h4>
                <p className="text-[11px] text-stone-500 leading-relaxed max-w-md">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Submission form */}
        <div className="lg:col-span-6 bg-white p-8 rounded-lg border border-pottery-ivory shadow-md h-fit">
          {success ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded text-center space-y-4">
              <CheckCircle size={32} className="mx-auto text-emerald-500 animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">
                  {t('Thank You! Verification Completed.', 'Hồ Sơ Hợp Lệ! Tập Brochure Sẵn Sàng!')}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
                  {t(
                    'Your catalogue request has been received. We have dispatched a secure high-resolution download hyperlink directly to your inbox.',
                    'Hệ thống thu thư đề mục của POTTERY.VN đã kích hoạt gửi link tài liệu đến hòm email của bạn.'
                  )}
                </p>
                
                <div className="pt-4 max-w-xs mx-auto">
                  <a
                    href="https://images.unsplash.com/photo-1512428559087-560fa5ceab42"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest py-3 px-4 rounded block"
                  >
                    🚀 {t('Instantly open PDF Preview', 'Mở xem trực tiếp PDF bản nháp')}
                  </a>
                </div>
              </div>
              
              <button
                onClick={() => setSuccess(false)}
                className="text-xs text-pottery-terracotta underline font-semibold mt-4"
              >
                {t('Submit another request', 'Tải Catalogue khác')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequest} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Full Name *', 'Họ & Tên của bạn *')}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                  placeholder="e.g. Charlotte Miller"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Company / Brand Name', 'Tên doanh nghiệp / Cửa hàng kinh doanh')}</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                  placeholder="e.g. Nordic Ceramics UK"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Business Email *', 'Hòm Email liên hệ nhận tệp *')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                    placeholder="e.g. info@nordicceramics.co.uk"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Destination Country', 'Quốc gia nơi nhận')}</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Sourcing Intent Type', 'Nhu cầu Sourcing chính')}</label>
                  <select
                    value={custType}
                    onChange={(e) => setCustType(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Personal Customer">{t('Personal Home Decor', 'Trang trí gia đình cá nhân')}</option>
                    <option value="Importer">{t('Importer', 'Nhập sỉ Wholesaler lớn')}</option>
                    <option value="Garden Centre">{t('Garden Centre Sourcing', 'Hệ thống vườn ươm, cây cảnh')}</option>
                    <option value="Hospitality">{t('Hospitality Procurement', 'Kiến trúc sư / Dự án bến thầu')}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Select Brochure Focus', 'Danh mục nhận tải chính')}</label>
                  <select
                    value={catOption}
                    onChange={(e) => setCatOption(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Retail Living Overview">Retail Collection Selection Overview</option>
                    <option value="Outdoor Planters Catalogue">Outdoor Winter-proof Planters</option>
                    <option value="Glazed Stools Brochure">Glazed stools and Objects Brochure</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="consentUpdates" defaultChecked className="mt-0.5 accent-pottery-terracotta" />
                <label htmlFor="consentUpdates" className="text-[11px] text-stone-500 cursor-pointer">
                  {t('I would like to receive product and sourcing updates. I understand legal content must be reviewed before final launch.', 'Đồng ý nhận thư điện tử cập nhật dải men mới định kỳ. Chấp nhận các điều khoản lọc.')}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest py-3 mt-4 transition flex items-center justify-center gap-2"
              >
                <Download size={14} />
                <span>{t('Request Digital Catalogue', 'Đăng ký Tải ngay tài liệu')}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
