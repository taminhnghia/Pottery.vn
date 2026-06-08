/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Layers, Sliders, CheckCircle, FileText, Send } from 'lucide-react';

interface CustomDevelopmentProps {
  language: 'en' | 'vi';
  onNavigate: (path: string) => void;
  onSubmitBrief: (brief: any) => void;
}

export default function CustomDevelopment({ language, onNavigate, onSubmitBrief }: CustomDevelopmentProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [category, setCategory] = useState('Outdoor Planters');
  const [qty, setQty] = useState(250);
  const [customizationDetails, setCustomizationDetails] = useState('');
  
  const [success, setSuccess] = useState(false);

  const handleSubmitBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !customizationDetails) {
      alert(t('Please fill in your Name, Email, and customization details.', 'Vui lòng cung cấp đầy đủ Tên, Email, và Bản mô tả tùy biến gốm mong muốn.'));
      return;
    }

    const briefObj = {
      id: `RFD-${Date.now().toString().substring(8)}`,
      fullName: name,
      company,
      email,
      country,
      productCategory: category,
      estimatedQuantity: qty,
      customizationDetails,
      status: 'New'
    };

    onSubmitBrief(briefObj);
    setSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-pottery-terracotta bg-pottery-ivory px-3 py-1 rounded">
          <Sparkles size={13} />
          <span>{t('OEM & PRIVATE LABEL R&D', 'PHÒNG R&D - GIA CÔNG KHUÔN LOGO')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-pottery-charcoal">
          {t('Develop Custom Pottery Collections for Your Brand', 'Phát Triển Thiết Kế Độc Quyền & Nhãn Hàng Riêng (OEM)')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {t(
            'Discuss tailored shapes, dimensions, finishes, colours and collection directions for retail assortments, hospitality projects or private label sourcing.',
            'Hợp tác cùng kỹ sư tạo tác mẫu tráng men để đúc khuôn gốm theo bản vẽ thiết kế 2D/3D của riêng bạn, có in ấn logo nổi sang trọng.'
          )}
        </p>
      </div>

      {/* Capabilities details */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="border border-pottery-ivory p-6 rounded bg-white shadow-xs space-y-3">
          <div className="w-10 h-10 bg-pottery-ivory text-pottery-terracotta flex items-center justify-center rounded">
            <Sliders size={18} />
          </div>
          <h3 className="font-serif font-bold text-stone-800 text-sm">{t('1. Shapes & Geometric Changes', '1. Tùy chỉnh Biên dạng mộc')}</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t(
              'Alter base curves, radius, wall thickness, or overall heights. Our master throwing artists can turn clay samples based on solid CAD schemas.',
              'Kỹ sư tạo dáng của chúng tôi vẽ khuôn định hình mộc giúp bạn căn chỉnh độ dày phôi gốm, tỷ lệ thoát dáng hoàn mỹ nhất.'
            )}
          </p>
        </div>

        <div className="border border-pottery-ivory p-6 rounded bg-white shadow-xs space-y-3">
          <div className="w-10 h-10 bg-pottery-ivory text-pottery-terracotta flex items-center justify-center rounded">
            <Layers size={18} />
          </div>
          <h3 className="font-serif font-bold text-stone-800 text-sm">{t('2. Experimental Glaze Customization', '2. Tùy biến Màu men hỏa biến')}</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t(
              'Achieve exactly the texture, tone, and gloss you seek. We can match Pantone color matrices using raw Vietnamese mineral stones.',
              'Gia nhiệt hỏa phối khoáng học ra hàng chục dải men chảy, men rạn hay men matte lì tối giản hợp dải màu khao khát.'
            )}
          </p>
        </div>

        <div className="border border-pottery-ivory p-6 rounded bg-white shadow-xs space-y-3">
          <div className="w-10 h-10 bg-pottery-ivory text-pottery-terracotta flex items-center justify-center rounded">
            <FileText size={18} />
          </div>
          <h3 className="font-serif font-bold text-stone-800 text-sm">{t('3. Decal debossing & Branding', '3. Ấn Triện Logo thương hiệu')}</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {t(
              'Incorporate customized debossed logo plates, brand plaques or barcode stickers directly into the foot of the pottery.',
              'Dán decal chìm nung nhiệt độ cao hoặc in khuôn chìm dập nổi mộc triện thương hiệu ở đáy chậu làm gia tăng giá trị thương hiệu sỉ.'
            )}
          </p>
        </div>

      </section>

      {/* Sourcing warning */}
      <section className="bg-stone-50 border border-stone-200 p-4 rounded text-xs text-stone-500 max-w-3xl mx-auto flex items-start gap-2">
        <span className="text-pottery-terracotta font-mono font-bold shrink-0">[RULE]</span>
        <p className="leading-relaxed">
          {t(
            'We DO NOT commit to guaranteed production timelines, mold feasibility outcomes, or cost points before our kiln master evaluates the clay structure brief of the bespoke order.',
            'Vietnam Pottery Join Stock Company cam kết tính trung thực thương hiệu. Tất cả đề án khuôn mẫu mới bắt buộc phải trải qua đánh giá ứng suối nhiệt phôi gốm mộc trước khi cam kết sản xuất diện rộng.'
          )}
        </p>
      </section>

      {/* Interactive Formulation Form */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-pottery-ivory p-8 shadow-md">
          
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-xl sm:text-2xl font-serif text-pottery-charcoal">
              {t('Submit Sourcing Custom Development Brief', 'Bản Thiết Kế Nghiên Cứu Chế Tác Gốm')}
            </h2>
            <p className="text-xs text-stone-400">
              {t('File an active R&D brief to let our technical team evaluate clay tolerances.', 'Điền các thông số cơ bản về dải màu men, độ dày và phân khúc bình chậu cần R&D.')}
            </p>
          </div>

          {success ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded text-center space-y-4">
              <CheckCircle size={32} className="mx-auto text-emerald-500" />
              <h4 className="font-semibold text-sm">
                {t('Custom Brief Submitted to R&D Queue!', 'Bản Đề Án Phát Triển Đã Được Ghi Nhận!')}
              </h4>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                {t(
                  'Your technical brief has been assigned reference ID #RFD-2026. A sales engineer will consult with details regarding physical sample mockups.',
                  'Đề án được nộp thành công với mã tra cứu #RFD-2026. Chi tiết mẫu nung thử sẽ được gửi đến email cá nhân sau khi hội ý kỹ sư lò.'
                )}
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setCustomizationDetails('');
                }}
                className="text-xs text-pottery-terracotta underline font-semibold block mx-auto"
              >
                {t('Make another custom brief', 'Tạo đề án mới')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBrief} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Your Full Name *', 'Họ & Tên của bạn *')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Charlotte Miller"
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Company Legal Name', 'Tên Pháp lý Doanh nghiệp')}</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Miller Landscape & Decor"
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Business Email *', 'Email làm việc *')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. cmiller@millers.com"
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Country of Distribution', 'Quốc gia tiêu thụ chính')}</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="Australia">Australia</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Target Sourcing Volume MOQ', 'Khối lượng dự tuyển mẻ lò')}</label>
                  <input
                    type="number"
                    min="50"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value) || 100)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Customize Pottery Category', 'Phân khúc gốm cần R&D')}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-stone-250 bg-white px-3 py-2 text-xs"
                >
                  <option value="Outdoor Planters">{t('Outdoor Planters', 'Chậu cây Ngoài trời Chống nứt sương')}</option>
                  <option value="Indoor Pots">{t('Indoor Pots', 'Chậu nhỏ tráng men bàn trà')}</option>
                  <option value="Decorative Vases">{t('Decorative Vases', 'Bình hoa mộc mạc hỏa biến')}</option>
                  <option value="Ceramic Stools">{t('Ceramic Stools', 'Đôn gốm tráng men màu mộc')}</option>
                  <option value="Large Pieces">{t('Large Garden Pieces', 'Mẫu gốm đại cảnh đống thùng dày')}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                  {t('Detailed Outline Sizing, Glaze tones & Mold requirements *', 'Bản Mô Tả Chi Tiết Sizing mộc, màu men và yêu khắc Logo triện *')}
                </label>
                <textarea
                  required
                  rows={4}
                  value={customizationDetails}
                  onChange={(e) => setCustomizationDetails(e.target.value)}
                  placeholder={t(
                    'Please list desired high of pots, radius, base drainage option, exact Pantone color reference, and draft references...',
                    'Hãy miêu tả rõ chiều cao mong muốn (ví dụ: H 80cm, r 45cm), chất rác thạch cần có, màu men mộc hoàng gia hay lì đen slate...'
                  )}
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                ></textarea>
              </div>

              {/* Upload Mock indicator */}
              <div className="p-4 border border-dashed border-stone-300 rounded bg-stone-50/50 text-center text-xs text-stone-400 font-mono">
                {t(
                  'Drag & Drop CAD Drawings, PDF specs or lifestyle photos here (Mocked Upload Enabled)',
                  'Kéo thả tệp thiết kế CAD 3D, bản vẽ tay hoặc bảng màu mẫu dải men vào đây (Mô phỏng tệp đính kèm)'
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest py-3 mt-4 transition flex items-center justify-center gap-2"
              >
                <Send size={13} />
                <span>{t('Submit Technical R&D Brief', 'Gửi Đề Án Phát Triển Mẫu Đến Kỹ Sư Lò')}</span>
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
