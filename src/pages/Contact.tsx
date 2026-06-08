/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, User, HelpCircle, Briefcase } from 'lucide-react';

interface ContactProps {
  language: 'en' | 'vi';
}

export default function Contact({ language }: ContactProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [custType, setCustType] = useState('Personal Customer');
  const [inqType, setInqType] = useState('Trade Buyer Enquiry');
  const [interest, setInterest] = useState('Outdoor Planters');
  const [message, setMessage] = useState('');

  const [success, setSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert(t('Please complete all required fields (*)', 'Vui lòng cung cấp đầy đủ thông tin bắt buộc có dấu (*)'));
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-pottery-terracotta uppercase bg-pottery-ivory px-3 py-1 rounded">
          <Mail size={13} />
          <span>{t('CORPORATE COMMUNICATIONS', 'ĐƯỜNG DÂY LIÊN HỆ TRỰC TIẾP')}</span>
        </span>
        <h1 className="text-3xl font-serif text-pottery-charcoal">
          {t('Contact POTTERY.VN', 'Liên Hệ Vietnam Ceramics')}
        </h1>
        <p className="text-xs text-stone-500">
          {t(
            'Connect directly with our sales engineering office regarding retail shopping feedback or large-scale container export quoting.',
            'Vui lòng lựa chọn luồng nội dung cần trao đổi phù hợp để tổ kỹ sư lò hoặc phòng xuất nhập khẩu kết nối giải đáp nhanh nhất.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Corporate coordinates info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-lg border border-pottery-ivory shadow-xs space-y-6 font-mono text-xs">
            <h3 className="font-serif font-bold text-stone-900 text-base">{t('Company Coordinates', 'Thông tin Trụ sở')}</h3>
            
            <div className="space-y-4 text-stone-600">
              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-bold">{t('Manufacturer Name', 'Mạng lưới lò xưởng')}</span>
                <strong className="text-stone-800 font-sans text-xs">Vietnam Pottery Join Stock Company</strong>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-bold">{t('Inquiry Hub Email', 'Hộp thư điện tử liên hệ')}</span>
                <a href="mailto:sales@pottery.vn" className="text-pottery-terracotta font-sans text-xs font-bold block hover:underline">
                  sales@pottery.vn
                </a>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-bold">{t('Hotline / WhatsApp No.', 'Hotline thương thảo di động/WhatsApp')}</span>
                <span className="text-stone-700 italic">"To be updated upon validated review"</span>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-bold">{t('Factory & Showroom Physical Addresses', 'Địa chỉ xưởng sản xuất thực tế')}</span>
                <span className="text-stone-700 italic">"To be updated upon audit selection"</span>
              </div>
            </div>

            {/* Note regarding Google maps Section 30 rule (No maps until verified address) */}
            <div className="p-4 bg-amber-50 rounded border border-amber-200 text-[11px] text-stone-500 leading-normal font-sans">
              <strong>💡 Map Display Notice:</strong><br />
              {t(
                'Under Section 30 guidelines, interactive Google Map overlays are hidden until official verified physical locations are supplied by the administrator.',
                'Bản đồ vị trí lò Bát Tràng hỏa hỏa sẽ được bật lên sau khi ban giám lý kiểm duyệt tọa độ thực địa chính xác để tránh nhầm lẫn.'
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive contacting questionnaire */}
        <div className="lg:col-span-7 bg-white p-8 rounded-lg border border-pottery-ivory shadow-md">
          {success ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded text-center space-y-4">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500 animate-bounce" />
              <h4 className="font-bold text-sm">
                {t('Message Transmitted Successfully!', 'Nội dung đã được mã hóa gửi đi thành công!')}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
                {t(
                  'Your message is filed in our CRM platform (Reference #MSG-2026). A sales desk specialist will reply shortly.',
                  'Thông điệp được lưu dưới mã hồ sơ #MSG-2026. Chuyên viên giao thương hải quan hoặc chăm sóc khách lẻ sẽ liên hệ lại bạn qua Email.'
                )}
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setMessage('');
                }}
                className="text-xs text-pottery-terracotta underline font-semibold"
              >
                {t('Send another message', 'Gửi thông điệp khác')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Your Full Name *', 'Họ & Tên *')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                    placeholder="e.g. Liam Thompson"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Company / Brand (Optional)', 'Công ty / Thương hiệu (Không bắt buộc)')}</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                    placeholder="e.g. Thompson Nurseries LLC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Business Email *', 'Email liên hệ *')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none"
                    placeholder="e.g. liam@thompsongardens.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Country', 'Quốc gia')}</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs"
                  >
                    <option value="United States">United States</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Vietnam">Vietnam</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Client Sourcing Type', 'Loại hình của bạn')}</label>
                  <select
                    value={custType}
                    onChange={(e) => setCustType(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs"
                  >
                    <option value="Personal Customer">{t('Personal (Private Home)', 'Khách mua lẻ nhà ở')}</option>
                    <option value="Importer">{t('Importer / Volume Wholesaler', 'Nhà Nhập khẩu / Wholesaler')}</option>
                    <option value="Retail Chain">{t('Store Retail Sourcing Chain', 'Chuỗi bán lẻ nội ngoại thất')}</option>
                    <option value="Hospitality">{t('Hospitality Procurement', 'Dự án nghỉ dưỡng / Cảnh quan')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Select Request Channel', 'Luồng nộp nội dung')}</label>
                  <select
                    value={inqType}
                    onChange={(e) => setInqType(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Trade Buyer Enquiry">B2B Trade Buyer Enquiry</option>
                    <option value="Catalogue Request">Catalogue Request mailing</option>
                    <option value="FOB Quotation Request">FOB Container Quotation</option>
                    <option value="Custom Development Request">Bespoke Design R&D Brief</option>
                    <option value="Retail Order Support">Retail Shopping Cart Support</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Core category focus', 'Nhóm gốm sác quan tâm')}</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full border border-stone-250 bg-white px-3 py-2 text-xs"
                  >
                    <option value="Outdoor Planters">{t('Outdoor Planters', 'Chậu cây ngoài trời')}</option>
                    <option value="Indoor Pots">{t('Indoor Pots', 'Chậu gốm trong nhà')}</option>
                    <option value="Decorative Vases">{t('Decorative Vases', 'Bình hoa trang trí')}</option>
                    <option value="Ceramic Stools">{t('Ceramic Stools', 'Đôn gốm nghệ thuật')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">{t('Detailed message *', 'Nội dung tin nhắn yêu cầu *')}</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t(
                    'Specify dimensions, colors, preferred incoterm or any question regarding custom manufacturing...',
                    'Hãy miêu tả chi tiết băn khoăn về đai cát bốc xếp xơ dừa, nung men chảy thủ công bến cảng...'
                  )}
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta"
                ></textarea>
              </div>

              {/* References simulation upload */}
              <div className="p-3 border border-dashed border-stone-300 rounded text-center text-[11px] text-stone-400 font-mono bg-stone-50">
                {t('Attach sketches or spec references (Mocked)', 'Chọn tệp tham chiếu bản vẽ thiết kế gốm (Nháp đính kèm)')}
              </div>

              <button
                type="submit"
                className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest py-3 mt-4 transition flex items-center justify-center gap-2"
              >
                <Send size={13} />
                <span>{t('Send Message Brief', 'Gửi Đi Thông Điệp')}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
