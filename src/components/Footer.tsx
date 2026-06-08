/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, ShieldCheck, MapPin, Globe2, Sparkles } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'vi';
  onNavigate: (path: string) => void;
}

export default function Footer({ language, onNavigate }: FooterProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  return (
    <footer className="bg-pottery-charcoal text-white pt-16 pb-8 border-t border-pottery-deepclay/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-1.5 space-y-4">
            <h3 className="text-lg tracking-[0.15em] font-serif font-bold text-pottery-sand">
              POTTERY.VN
            </h3>
            <p className="text-[11px] text-stone-400 font-mono tracking-wider uppercase">
              {t('Vietnam Pottery Join Stock Company', 'Công ty Cổ phần Gốm Sứ Việt Nam')}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed font-sans max-w-xs">
              {t(
                'Premium manufacturer and sourcing platform delivering authentic Vietnamese pottery for homes, luxury retailers, and commercial projects.',
                'Nền tảng trưng bày, cung ứng và kết nối trực tiếp các xưởng gốm sứ thủ công cao cấp của Việt Nam với các nhà bán lẻ và nhập khẩu thế giới.'
              )}
            </p>
            <div className="space-y-2 pt-2 text-xs text-stone-300">
              <a href="mailto:sales@pottery.vn" className="flex items-center gap-2 hover:text-pottery-sand transition">
                <Mail size={14} className="text-pottery-terracotta" />
                <span>sales@pottery.vn</span>
              </a>
              <div className="flex items-center gap-2 text-stone-400 font-mono text-[10px]">
                <MapPin size={14} className="text-stone-500" />
                <span>{t('Vietnam Factories: To be updated', 'Xưởng chế tác: To be updated')}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-pottery-terracotta uppercase mb-4">
              {t('POTTERY RANGE', 'DÒNG SẢN PHẨM')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Outdoor Planters', 'Chậu cây ngoài trời')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Indoor Pots', 'Chậu gốm trong nhà')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Decorative Vases', 'Bình hoa trang trí')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Ceramic Stools', 'Đôn gốm trang trí')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Decorative Objects', 'Đồ gốm trang trí')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Large Garden Pieces', 'Chậu gốm đại sảnh')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-pottery-terracotta uppercase mb-4">
              {t('EXPLORE PATHWAYS', 'TÌM HIỂU THÊM')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate('/shop')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Shop Collection', 'Cửa hàng bán lẻ')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/collections')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Our Collections', 'Các bộ sưu tập')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/inspiration')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Design Inspiration', 'Ý tưởng không gian')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/catalogue')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Request Catalogue', 'Đăng ký Catalogue')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about-us')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('About Pottery.vn', 'Về chúng tôi')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Corporate Contact', 'Liên hệ làm đại lý')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Trade Portal */}
          <div>
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-pottery-terracotta uppercase mb-4">
              {t('B2B SOURCING', 'KÊNH B2B XUẤT KHẨU')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate('/trade')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Trade Buyer Portal', 'Cổng B2B Wholesaler')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/export-capabilities')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Export Sourcing Guide', 'Chính sách xuất khẩu')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/custom-development')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Bespoke Private Label', 'Gia công Nhãn hiệu riêng')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/trade/apply')} className="hover:text-pottery-sand hover:underline text-left font-semibold text-pottery-sand">
                  {t('Apply for B2B Account', 'Đăng ký Trade Account')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/trade/request-fob-quote')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Request Container Quote', 'Yêu cầu Báo giá FOB')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Authority Check */}
          <div>
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-pottery-terracotta uppercase mb-4">
              {t('REGULATORY & LEGAL', 'PHÁP LÝ & ĐIỀU KHOẢN')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Privacy Policy', 'Chính sách bảo mật')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms-of-use')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Terms of Use', 'Điều khoản sử dụng')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cookie-policy')} className="hover:text-pottery-sand hover:underline text-left">
                  {t('Cookie Policy', 'Chính sách cookie')}
                </button>
              </li>
              <li className="pt-4 text-[10px] italic leading-tight text-stone-500 font-mono">
                {t('Legal content and registrations must be reviewed before public deployment.', 'Thông tin pháp nhân và xưởng sản xuất thực tế sẽ được cập nhật chính thức sau khi phê duyệt nội dung.')}
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500 font-mono">
            © 2026 POTTERY.VN – {t('Vietnam Pottery Join Stock Company', 'Công ty Cổ phần Gốm Sứ Việt Nam')}. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-stone-400 text-xs font-mono">
            <span className="hover:text-white transition cursor-pointer">Instagram</span>
            <span className="hover:text-white transition cursor-pointer">Pinterest</span>
            <span className="hover:text-white transition cursor-pointer">LinkedIn</span>
            <span className="hover:text-white transition cursor-pointer">Facebook</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
