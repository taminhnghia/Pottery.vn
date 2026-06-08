/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react';

interface ApplyTradeProps {
  language: 'en' | 'vi';
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  onSubmitApplication: (application: any) => void;
}

export default function ApplyTrade({
  language,
  currentRole,
  onNavigate,
  onSubmitApplication
}: ApplyTradeProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [country, setCountry] = useState('United States');
  const [regNumber, setRegNumber] = useState('');
  const [businessType, setBusinessType] = useState('Wholesaler');
  const [salesChannel, setSalesChannel] = useState('Garden Centre / Nurseries');
  
  const [contactName, setContactName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [categories, setCategories] = useState<string[]>([]);
  const [initialQty, setInitialQty] = useState('1x 20FT Container');
  const [preferredIncoterm, setPreferredIncoterm] = useState('FOB');
  const [needCustom, setNeedCustom] = useState('No');
  
  const [success, setSuccess] = useState(false);

  const handleCheckbox = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !contactEmail || !regNumber) {
      alert(t('Please complete all required fields.', 'Vui lòng điền đầy đủ thông tin bắt buộc có dấu *.'));
      return;
    }

    const appObj = {
      id: `APP-${Date.now().toString().substring(8)}`,
      date: new Date().toISOString().substring(0, 10),
      companyName,
      companyWebsite,
      country,
      businessRegistrationNumber: regNumber,
      businessType,
      primarySalesChannel: salesChannel,
      contactName,
      jobTitle,
      email: contactEmail,
      phone: contactPhone,
      preferredIncoterm,
      status: 'pending' as const
    };

    onSubmitApplication(appObj);
    setSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Heading */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider text-pottery-terracotta uppercase bg-pottery-ivory px-3 py-1 rounded">
          <ShieldCheck size={13} />
          <span>{t('B2B TRADE SOURCING VERIFICATION', 'XÁC THỰC DOANH NGHIỆP NHẬP KHẨU')}</span>
        </span>
        <h1 className="text-3xl font-serif text-pottery-charcoal">
          {t('Apply for a Trade Account', 'Đăng Ký Tài Khoản Wholesaler B2B')}
        </h1>
        <p className="text-xs text-stone-500">
          {t(
            'Register your business details to unlock authorized pricing lists, packed shipping weight data, custom product CAD specifications, and private label support.',
            'Cung cấp thông tin đăng ký kinh doanh hợp lệ để ban chuyên trách kinh doanh duyệt chiết khấu FOB, nắp pallet chuỗi cung ứng.'
          )}
        </p>
      </div>

      {success ? (
        <div className="bg-white border-2 border-pottery-ivory rounded-lg p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <CheckCircle2 className="mx-auto text-emerald-500" size={48} />
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-pottery-charcoal">
              {t('Trade Application Submitted Successfully', 'Hồ Sơ Của Bạn Đã Được Tiếp Nhận')}
            </h3>
            <p className="text-xs text-stone-500 max-w-lg mx-auto leading-relaxed">
              {t(
                'Thank you for applying for a POTTERY.VN Trade Account. Your business information has been logged into our administration system. Sourcing specialists will verify your company registration number shortly.',
                'Cảm ơn sự quan tâm đối tác của bạn đến Vietnam Pottery Join Stock Company. Cổng thông tin đang tiến hành hậu kiểm tư cách đại lý. Bạn có thể sử dụng Trình Giả Lập Vai Trò ở phía trên để đổi sang chế độ "Approved B2B Buyer" để xem và dùng thử ngay lập tức các tính năng nâng cao.'
              )}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/products')}
              className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded"
            >
              {t('Browse General Catalogue', 'Xem Catalogue Trực tuyến')}
            </button>
            <button
              onClick={() => onNavigate('/export-capabilities')}
              className="border border-stone-250 text-stone-700 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded"
            >
              {t('See Packing Guide', 'Quy trình Xuất khẩu')}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleRegister} className="bg-white rounded-lg border border-pottery-ivory p-6 sm:p-10 shadow-md space-y-8">
          
          {/* Block A: Company Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-pottery-terracotta border-b border-stone-100 pb-2">
              {t('BLOCK A: Company Information', 'PHẦN A: THÔNG TIN DOANH NGHIỆP')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Company Legal Name *', 'Tên Pháp lý Công ty *')}</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Earthy Decor LLC"
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta bg-stone-50/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Company Website / Store URL', 'Website doanh nghiệp')}</label>
                <input
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="e.g. www.earthydecor.com"
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta bg-stone-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Country of Registration *', 'Quốc gia trụ sở *')}</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Japan">Japan</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">
                  {t('Business Registration No. *', 'Mã số Đăng ký Kinh doanh *')}
                </label>
                <input
                  type="text"
                  required
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  placeholder="e.g. US-TAX-9821892"
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta bg-stone-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Business Format Type', 'Mô hình Kinh doanh')}</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="Importer">Importer / Wholesaler</option>
                  <option value="Distributor">Regional Distributor</option>
                  <option value="Garden Centre">Garden Centre Owner</option>
                  <option value="Retail Chain">Big Box Retail Chain</option>
                  <option value="Project Buyer">Landscape Contractor</option>
                  <option value="Private Label">OEM/ODM Brand Owner</option>
                </select>
              </div>
            </div>
          </div>

          {/* Block B: Contact point */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-pottery-terracotta border-b border-stone-100 pb-2">
              {t('BLOCK B: Contact Information', 'PHẦN B: ĐẠI DIỆN LIÊN HỆ')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Contact Person Name *', 'Họ & Tên Đại diện Liên hệ *')}</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Jonathan Smith"
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta bg-stone-50/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Job Title / Position', 'Bộ phận / Chức danh')}</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. VP Sourcing"
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta bg-stone-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Work Business Email *', 'Email Doanh nghiệp làm việc *')}</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. ssmith@earthypeats.com"
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta bg-stone-50/50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Phone / WhatsApp No.', 'Số điện thoại / WhatsApp')}</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +1 (341) 980-2810"
                  className="w-full border border-stone-250 px-3 py-2 text-xs focus:outline-none focus:border-pottery-terracotta bg-stone-50/50"
                />
              </div>
            </div>
          </div>

          {/* Block C: Sourcing volumes */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-pottery-terracotta border-b border-stone-100 pb-2">
              {t('BLOCK C: Commercial Sourcing Estimates', 'PHẦN C: NHU CẦU SOURCING THƯƠNG MẠI')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Preferred Incoterm Basis', 'Điều kiện Giao hàng mong muốn')}</label>
                <select
                  value={preferredIncoterm}
                  onChange={(e) => setPreferredIncoterm(e.target.value)}
                  className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="FOB">FOB (Free On Board - Standard)</option>
                  <option value="FCA">FCA (Free Carrier)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight to Dest.)</option>
                  <option value="EXW">EXW (Ex Works Yard)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Estimated Sourcing Volume Lot', 'Dự thảo Khối lượng mua vụ')}</label>
                <select
                  value={initialQty}
                  onChange={(e) => setInitialQty(e.target.value)}
                  className="w-full border border-stone-250 bg-white px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="LCL">LCL Sample Lots (Less than Container)</option>
                  <option value="1x 20FT">1x 20-Foot Container Lot</option>
                  <option value="1x 40FT">1x 40-Foot Standard Container Lot</option>
                  <option value="Multiple Containers">Multiple Containers / Annual Contract</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-mono font-bold text-stone-600 uppercase block">{t('Product Categories Interested In *', 'Phân khúc quan tâm chính *')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Outdoor Planters',
                  'Indoor Pots',
                  'Decorative Vases',
                  'Ceramic Stools',
                  'Decorative Objects',
                  'Large Garden Pieces'
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categories.includes(item)}
                      onChange={() => handleCheckbox(item)}
                      className="accent-pottery-terracotta"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-stone-500 cursor-pointer">
                <input type="checkbox" id="ndaConsent" required className="accent-pottery-terracotta" />
                <span>
                  {t(
                    'I swear that the company documents, taxation registration numbers, and sales channels provided are truthful.',
                    'Tôi cam kết mọi thông tin về đăng ký kinh doanh và dải bán ra là thật.'
                  )}
                </span>
              </label>
            </div>
          </div>

          <div className="bg-stone-50 p-4 border border-stone-150 rounded text-xs text-stone-500 flex items-start gap-2">
            <AlertCircle className="text-pottery-terracotta shrink-0 mt-0.5" size={16} />
            <p>
              {t(
                'Approval timing is subject to commercial validation and country verification. Under local Vietnam Pottery Join Stock Company governance, trade pricing will remain strictly masked for Guest users to protect distributor margins.',
                'Quy trình phê duyệt thông thường mất từ 1-2 ngày làm việc. Quý đối tác vui lòng sử dụng Trình giả lập (Simulator) phía trên để tạm thời đóng vai Approved Buyer để trải nghiệm ngay.'
              )}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest py-3 px-4 transition text-center"
          >
            {t('Submit Sourcing Trade Application', 'Nộp Hồ Sơ Đăng Ký Tài Khoản B2B')}
          </button>
        </form>
      )}

    </div>
  );
}
