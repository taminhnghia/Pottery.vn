/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import {
  Menu, X, ShoppingCart, ListCollapse, Globe, LogIn, UserCircle2,
  ChevronDown, BookOpen, AlertCircle, FileText, ShoppingBag, ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
  cartCount: number;
  inquiryCount: number;
  onNavigate: (path: string) => void;
  currentPath: string;
  onLogout: () => void;
}

export default function Navbar({
  currentRole,
  language,
  setLanguage,
  cartCount,
  inquiryCount,
  onNavigate,
  currentPath,
  onLogout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Link helper
  const linkClass = (path: string) => {
    const isActive = currentPath === path;
    return `text-xs tracking-wider uppercase font-medium transition duration-200 ${
      isActive
        ? 'text-pottery-terracotta border-b-2 border-pottery-terracotta'
        : 'text-stone-700 hover:text-pottery-terracotta'
    } py-1.5`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-pottery-ivory backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('/')}>
            <span className="text-xl tracking-[0.15em] font-bold text-pottery-charcoal font-serif">
              POTTERY.VN
            </span>
            <span className="hidden md:block text-[9px] text-stone-500 uppercase tracking-widest font-mono mt-0.5">
              {t('Vietnam Pottery Join Stock Company', 'Công ty Cổ phần Gốm Sứ Việt Nam')}
            </span>
          </div>
 
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <span
              className="group"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                onClick={() => onNavigate('/products')}
                className={`flex items-center gap-1 ${linkClass('/products')}`}
              >
                <span>{t('Products', 'Sản phẩm')}</span>
                <ChevronDown size={11} className="transition group-hover:rotate-180" />
              </button>
 
              {/* High-End Mega Menu */}
              <div
                className={`absolute left-4 right-4 sm:left-6 sm:right-6 top-full bg-white border border-pottery-ivory shadow-2xl p-6 grid grid-cols-4 gap-6 rounded-b transition-all duration-300 z-50 ${
                  isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Transparent Bridge to prevent hover mouseout gap */}
                <div className="absolute left-0 right-0 h-8 -top-8 bg-transparent pointer-events-auto" />

                {/* Column 1: By Product */}
                <div>
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-pottery-terracotta uppercase border-b border-stone-100 pb-2 mb-3">
                    {t('By Product', 'Dòng gốm')}
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button onClick={() => { onNavigate('/products'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Outdoor Planters', 'Chậu cây ngoài trời')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/products'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Indoor Pots', 'Chậu gốm trong nhà')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/products'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Decorative Vases', 'Bình hoa trang trí')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/products'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Ceramic Stools', 'Đôn gốm nghệ thuật')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/products'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Decorative Objects', 'Vật phẩm mỹ nghệ')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/products'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Large Garden Pieces', 'Gốm sân vườn cỡ lớn')}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: By Application */}
                <div>
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-pottery-terracotta uppercase border-b border-stone-100 pb-2 mb-3">
                    {t('By Application', 'Ứng dụng')}
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button onClick={() => { onNavigate('/shop'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Indoor Living', 'Không gian trong nhà')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/collections/garden-landscape'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Outdoor Living', 'Không gian vườn')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/collections/garden-landscape'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Garden & Landscape', 'Sân vườn & Cảnh quan')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/collections/hospitality'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Hospitality Projects', 'Dự án Hotel & Resort')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/shop'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Retail Collections', 'Trưng bày Bán lẻ')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/collections/sculptural-objects'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Architectural Spaces', 'Không gian Kiến trúc')}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: By Buyer Needs */}
                <div>
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-pottery-terracotta uppercase border-b border-stone-100 pb-2 mb-3">
                    {t('By Buyer Need', 'Sourcing doanh nghiệp')}
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button onClick={() => { onNavigate('/trade'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Wholesale Selection', 'Tuyển tập Bán sỉ B2B')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/collections/garden-centre'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Garden Centre Sourcing', 'Hệ thống Garden Centre')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/custom-development'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Custom Development', 'Phát triển Sản phẩm')}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onNavigate('/custom-development'); setIsMegaMenuOpen(false); }} className="hover:text-pottery-terracotta text-stone-600 block py-0.5">
                        {t('Private Label Discussion', 'Gia công Nhãn riêng')}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Sourcing Actions */}
                <div className="bg-pottery-ivory/40 p-4 rounded border border-pottery-ivory">
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-pottery-charcoal uppercase border-b border-pottery-sand pb-2 mb-3">
                    {t('Buyer Actions', 'Hợp tác Sourcing')}
                  </h4>
                  <ul className="space-y-2 text-xs font-medium">
                    <li>
                      <button
                        onClick={() => { onNavigate('/trade/catalogue'); setIsMegaMenuOpen(false); }}
                        className="text-pottery-terracotta hover:text-pottery-deepclay flex items-center gap-1.5 py-0.5 w-full text-left"
                      >
                        <BookOpen size={13} />
                        <span>{t('View Trade Catalogue', 'Xem Catalogue B2B')}</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => { onNavigate('/catalogue'); setIsMegaMenuOpen(false); }}
                        className="text-stone-700 hover:text-pottery-terracotta flex items-center gap-1.5 py-0.5 w-full text-left"
                      >
                        <FileText size={13} />
                        <span>{t('Request Printed Catalogue', 'Đăng ký Nhận Catalogue')}</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => { onNavigate('/trade/apply'); setIsMegaMenuOpen(false); }}
                        className="text-stone-700 hover:text-pottery-terracotta flex items-center gap-1.5 py-0.5 w-full text-left"
                      >
                        <ShieldCheck size={13} />
                        <span>{t('Apply for Trade Account', 'Đăng ký Tài khoản B2B')}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </span>

            <button onClick={() => onNavigate('/collections')} className={linkClass('/collections')}>
              {t('Collections', 'Bộ sưu tập')}
            </button>

            <button onClick={() => onNavigate('/shop')} className={linkClass('/shop')}>
              {t('Shop', 'Cửa hàng')}
            </button>

            <button onClick={() => onNavigate('/trade')} className={linkClass('/trade')}>
              {t('B2B Trade', 'Đối tác B2B')}
            </button>

            <span className="h-4 w-px bg-stone-200 -mx-3 xl:-mx-4"></span>

            <button onClick={() => onNavigate('/export-capabilities')} className={linkClass('/export-capabilities')}>
              {t('Capabilities & OEM', 'Năng lực & Chế tác')}
            </button>

            <button onClick={() => onNavigate('/about-us')} className={linkClass('/about-us')}>
              {t('About Us', 'Về chúng tôi')}
            </button>

            {currentRole === 'admin' && (
              <button onClick={() => onNavigate('/admin')} className="text-xs tracking-wider uppercase font-bold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-1 rounded">
                ★ Admin Panel
              </button>
            )}
          </nav>

          {/* Right side accessories */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
              className="flex items-center gap-1.5 px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-mono font-medium transition"
              title={t('Switch Language', 'Đổi ngôn ngữ')}
            >
              <Globe size={13} />
              <span>{language === 'en' ? 'VI' : 'EN'}</span>
            </button>

            {/* Wishlist / Inquiry / Cart Counts */}
            {currentRole === 'retail_customer' ? (
              <button
                onClick={() => onNavigate('/account')}
                className="relative p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-full transition"
                title={t('Shopping Cart', 'Giỏ hàng bán lẻ')}
              >
                <ShoppingCart size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pottery-terracotta text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/trade/request-fob-quote')}
                className="relative p-2.5 bg-pottery-ivory hover:bg-pottery-sand/70 text-pottery-deepclay rounded-full transition flex items-center gap-1.5 px-3 py-1.5"
                title={t('Trade Sourcing Inquiry Pool', 'Danh mục sản phẩm quan tâm')}
              >
                <ListCollapse size={15} />
                <span className="text-[11px] font-mono font-bold">{t('Inquiry List', 'Yêu cầu')}</span>
                {inquiryCount > 0 && (
                  <span className="bg-pottery-terracotta text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {inquiryCount}
                  </span>
                )}
              </button>
            )}

            {/* Logged in indicator / Sign in trigger */}
            {currentRole === 'guest' ? (
              <button
                onClick={() => onNavigate('/sign-in')}
                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-pottery-terracotta"
              >
                <LogIn size={15} />
                <span>{t('Sign In', 'Đăng nhập')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('/account')}
                  className="flex items-center gap-1 text-xs font-mono text-pottery-terracotta hover:underline"
                >
                  <UserCircle2 size={16} />
                  <span className="max-w-[110px] truncate">
                    {currentRole === 'admin' ? 'Administrator' : t('My Profile', 'Hồ sơ cá nhân')}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-500 hover:bg-stone-200"
                >
                  {t('Exit', 'Thoát')}
                </button>
              </div>
            )}
          </div>

          {/* Small screens menu accessories */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
              className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs font-mono"
            >
              {language === 'en' ? 'VI' : 'EN'}
            </button>

            {currentRole === 'retail_customer' ? (
              <button onClick={() => onNavigate('/account')} className="relative p-2 text-stone-700">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pottery-terracotta text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            ) : (
              <button onClick={() => onNavigate('/trade/request-fob-quote')} className="relative p-2 text-stone-700">
                <ListCollapse size={20} />
                {inquiryCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pottery-terracotta text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {inquiryCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-pottery-ivory p-4 space-y-3">
          <nav className="flex flex-col gap-3 text-sm font-semibold">
            <button
              onClick={() => { onNavigate('/products'); setMobileMenuOpen(false); }}
              className="text-left py-1.5 text-stone-805 hover:text-pottery-terracotta border-b border-stone-100 pb-1.5 text-xs tracking-wider uppercase font-medium"
            >
              {t('Products', 'Sản phẩm')}
            </button>
            <button
              onClick={() => { onNavigate('/collections'); setMobileMenuOpen(false); }}
              className="text-left py-1.5 text-stone-805 hover:text-pottery-terracotta border-b border-stone-100 pb-1.5 text-xs tracking-wider uppercase font-medium"
            >
              {t('Collections', 'Bộ sưu tập')}
            </button>
            <button
              onClick={() => { onNavigate('/shop'); setMobileMenuOpen(false); }}
              className="text-left py-1.5 text-stone-805 hover:text-pottery-terracotta border-b border-stone-100 pb-1.5 text-xs tracking-wider uppercase font-medium"
            >
              {t('Retail Shop', 'Cửa hàng')}
            </button>
            <button
              onClick={() => { onNavigate('/trade'); setMobileMenuOpen(false); }}
              className="text-left py-1.5 text-stone-805 hover:text-pottery-terracotta border-b border-stone-100 pb-1.5 text-xs tracking-wider uppercase font-medium"
            >
              {t('B2B Trade', 'Đối tác B2B')}
            </button>
            <button
              onClick={() => { onNavigate('/export-capabilities'); setMobileMenuOpen(false); }}
              className="text-left py-1.5 text-stone-805 hover:text-pottery-terracotta border-b border-stone-100 pb-1.5 text-xs tracking-wider uppercase font-medium"
            >
              {t('Capabilities & OEM', 'Năng lực & Chế tác')}
            </button>
            <button
              onClick={() => { onNavigate('/about-us'); setMobileMenuOpen(false); }}
              className="text-left py-1.5 text-stone-805 hover:text-pottery-terracotta pb-1.5 text-xs tracking-wider uppercase font-medium"
            >
              {t('About Us', 'Về chúng tôi')}
            </button>

            {currentRole === 'admin' && (
              <button
                onClick={() => { onNavigate('/admin'); setMobileMenuOpen(false); }}
                className="text-left py-2 px-3 bg-rose-50 text-rose-700 rounded"
              >
                ★ Store Administration Dashboard
              </button>
            )}

            <div className="pt-4 flex flex-col gap-2">
              {currentRole === 'guest' ? (
                <button
                  onClick={() => { onNavigate('/sign-in'); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2.5 text-xs bg-pottery-charcoal text-white rounded"
                >
                  {t('Sign In To Your Account', 'Đăng nhập tài khoản')}
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-stone-500 font-mono text-center">
                    Logged in: {currentRole}
                  </div>
                  <button
                    onClick={() => { onNavigate('/account'); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2 text-xs border border-pottery-terracotta text-pottery-terracotta rounded"
                  >
                    {t('My Account Dashboard', 'Bảng điều khiển tài khoản')}
                  </button>
                  <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-center py-2 text-xs bg-stone-100 text-stone-600 rounded"
                  >
                    {t('Logout', 'Thoát tài khoản')}
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
