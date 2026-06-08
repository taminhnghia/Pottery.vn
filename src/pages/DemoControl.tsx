/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import { Shield, Eye, Clock, Key, UserCheck, AlertTriangle, Lock, Unlock, HelpCircle, Check, Compass, Settings } from 'lucide-react';

interface DemoControlProps {
  language: 'en' | 'vi';
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onNavigate: (path: string) => void;
  isQuickBarEnabled: boolean;
  setQuickBarEnabled: (val: boolean) => void;
}

export default function DemoControl({
  language,
  currentRole,
  onChangeRole,
  onNavigate,
  isQuickBarEnabled,
  setQuickBarEnabled
}: DemoControlProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Security gate passcode
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if previously authorized in session
    return sessionStorage.getItem('pottery_sandbox_authorized') === 'true';
  });
  const [authError, setAuthError] = useState('');
  const REQUIRED_PIN = '2026';

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === REQUIRED_PIN) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('pottery_sandbox_authorized', 'true');
    } else {
      setAuthError(t('Invalid security lock passcode!', 'Mã khóa bảo mật không chính xác!'));
    }
  };

  const handleRoleActivation = (role: UserRole) => {
    onChangeRole(role);
    // Alert nicely
    const successMsg = t(
      `System Role assumed: ${role.toUpperCase().replace('_', ' ')}. Navigating home.`,
      `Hệ thống đã chuyển sang vai trò: ${role.toUpperCase().replace('_', ' ')}. Đang quay về trang chủ.`
    );
    alert(successMsg);
    onNavigate('/');
  };

  const rolesSelectionList = [
    {
      role: 'guest' as UserRole,
      title: t('Guest Visitor (Default Public)', 'Khách vãng lai (Công cộng)'),
      desc: t('Represents an anonymous visitor browsing products publicly. All wholesale/FOB supply prices are completely locked and hidden. No checkout access to cargo trade pools.', 'Đại diện cho khách hàng vãng lai duyệt web bình thường. Toàn bộ giá bán sỉ/FOB xuất khẩu bị ẩn hoàn toàn để bảo vệ thiết kế.'),
      icon: Eye,
      color: 'bg-stone-500 text-white',
      badge: 'GUEST_PROFILE'
    },
    {
      role: 'retail_customer' as UserRole,
      title: t('Retail Shopper (Domestic & E-commerce)', 'Người mua lẻ (Trong nước & E-commerce)'),
      desc: t('Represents a direct client shopping via the retail cart bag. Accesses standard retail pricing ($) and can submit orders through the retail checkout pipeline.', 'Khách mua lẻ trong nước. Có thể xem giá bán lẻ theo size và bổ sung sản phẩm vào Giỏ hàng để tiến hành đặt hàng trực tiếp.'),
      icon: UserCheck,
      color: 'bg-emerald-600 text-white',
      badge: 'RETAIL_CUSTOMER'
    },
    {
      role: 'trade_applicant' as UserRole,
      title: t('Pending B2B Trade Applicant', 'Đối tác B2B đang chờ phê duyêt'),
      desc: t('Simulates a business that has submitted an application form. Pricing displays as "Under Review" with a yellow warning band, keeping commercial FOB data hidden during screening.', 'Thương nhân đã đăng ký tài khoản nhưng đang chờ xét duyệt tư cách pháp nhân. Giá FOB hiển thị dạng "Đang thẩm định" để bảo mật thông tin sỉ.'),
      icon: Clock,
      color: 'bg-amber-500 text-white',
      badge: 'PENDING_APPROVAL'
    },
    {
      role: 'approved_b2b_buyer' as UserRole,
      title: t('Approved B2B Wholesaler', 'Nhà nhập khẩu / Đối tác sỉ đã duyệt'),
      desc: t('Simulates an authorized container trade partner. Explores full raw FOB pricing tiers, packaging CBM specs, minimum order orders (MOQs), and wholesale project tools.', 'Đại lý sỉ chính thức. Được cấp quyền truy cập toàn bộ bậc giá sỉ thương mại FOB (cảng VN), thông số quy cách đóng gói và tải trọng container.'),
      icon: Shield,
      color: 'bg-blue-600 text-white',
      badge: 'APPROVED_B2B'
    },
    {
      role: 'admin' as UserRole,
      title: t('Portal Administrator (Control Panel Access)', 'Quản trị viên Hệ thống'),
      desc: t('Full administrative security bypass. Grants terminal dashboards access, factory order status monitoring, incoming B2B application lists tracking, and live catalog price edits.', 'Trưởng ban quản trị tối cao. Mở khóa toàn cục trang Dashboard quản lý tiến trình nung lò, đơn hàng sỉ, duyệt hồ sơ đại lý sỉ và giá sản phẩm.'),
      icon: Key,
      color: 'bg-rose-600 text-white',
      badge: 'SYSTEM_ADMIN'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-stone-50">
        <div className="max-w-md w-full bg-white border border-stone-200/80 p-8 rounded shadow-sm text-center space-y-6">
          <div className="w-14 h-14 bg-pottery-ivory text-pottery-terracotta rounded-full flex items-center justify-center mx-auto">
            <Lock size={26} />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-serif text-stone-900 tracking-tight">
              {t('Demo Gate Authorization Required', 'Xác Minh Quyền Quản Trị / Mô Phỏng')}
            </h1>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {t(
                'Access to developer profile simulation environments is restricted to secure public testing loops. Use the sandbox PIN code to continue.',
                'Kênh tinh chỉnh / giả lập hành trình thành viên được bảo vệ để phục vụ môi trường chạy thử nghiệm. Vui lòng điền mã khóa mô phỏng để tiếp tục.'
              )}
            </p>
          </div>

          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                {t('Developer Bypass PIN Code', 'MÃ KHÓA BẢO MẬT DEVELOPER')}
              </label>
              <input
                type="password"
                placeholder={t('Enter PIN (Hint: 2026)', 'Nhập mã PIN (Gợi ý: 2026)')}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border border-stone-250 p-2.5 rounded font-mono text-center text-sm tracking-widest focus:outline-none focus:border-pottery-terracotta text-stone-800"
                autoFocus
              />
              {authError && (
                <span className="text-[10px] text-red-500 font-mono block mt-1">
                  ⚠️ {authError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-semibold tracking-widest uppercase py-3 rounded transition"
            >
              {t('Unlock Simulator Environment', 'Mở khóa Môi trường Giả lập')}
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs font-mono text-stone-450 hover:text-stone-700 transition"
            >
              ← {t('Back to Public Storefront', 'Quay lại Cửa hàng Công cộng')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] bg-pottery-terracotta/10 text-pottery-terracotta px-2 py-0.5 rounded font-mono font-bold uppercase tracking-widest">
            <Settings size={10} />
            {t('Sandbox Console', 'Kênh Điều Khiển Thử Nghiệm')}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <h1 className="text-3xl font-serif text-stone-900 tracking-tight">
          {t('Secure Sourcing & Role Simulation Center', 'Hệ Thống Mô Phỏng Quyền Hạn & Sourcing')}
        </h1>
        <p className="text-xs text-stone-500 leading-relaxed max-w-2xl">
          {t(
            'We protect Vietnam pottery designs and manufacturers proprietary commercial data. Authenticate your sandbox roles to see how pricing tiers, FOB parameters, order catalogs, and administrator dash structures alter seamlessly matching the user profile credentials.',
            'Hệ thống bảo vệ tối đa dữ liệu thiết kế và biểu giá sỉ FOB thương mại xuất khẩu của lò nung Việt Nam. Hãy bật các mô phỏng dưới đây để kiểm nghiệm độ bảo mật, sự biến đổi nhịp nhàng của giao diện, catalog bán buôn và trang quản trị.'
          )}
        </p>
      </div>

      <div className="bg-stone-50 border border-stone-200/70 rounded p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-stone-850 uppercase tracking-wider font-mono">
            {t('🔒 Secure Gate Settings', '🔒 Cấu hình Hiển thị & Bảo mật')}
          </h2>
          <p className="text-xs text-stone-500">
            {t(
              'Hide or show developer utilities to client reviewers. Enabling the Quick Simulator Bar places the sticky bar globally on tops of pages.',
              'Thiết lập phương thức truy cập nhanh. Kích hoạt thanh giả lập nhanh sẽ đính kèm thanh điều phối của nhà phát triển ở đầu tất cả các trang.'
            )}
          </p>
        </div>
        <div className="space-y-4">
          <label className="flex items-start gap-3 p-3 bg-white border border-stone-150 rounded cursor-pointer hover:border-pottery-terracotta/55 transition">
            <input
              type="checkbox"
              checked={isQuickBarEnabled}
              onChange={(e) => setQuickBarEnabled(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-stone-300 text-pottery-terracotta focus:ring-pottery-terracotta/50"
            />
            <div>
              <span className="text-xs font-semibold text-stone-800 block">
                {t('Enable Sticky Quick-Simulator Box globally', 'Kích hoạt Thanh Giả Lập Nhanh trên toàn trang')}
              </span>
              <span className="text-[10px] text-stone-400 font-mono block mt-0.5 uppercase">
                {t('DEVELOPER_QUICK_BAR_STIKY_WIDGET', 'QUẢN QUYỀN TRUY CẬP TRỰC TIẾP')}
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Grid of Simulation Profiles */}
      <div className="space-y-4">
        <h3 className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-widest">
          {t('Select A Simulation Profile Persona', 'LỰA CHỌN VAI TRÒ GIẢ LẬP ĐỂ KHẢO SÁT')}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {rolesSelectionList.map((profile) => {
            const Icon = profile.icon;
            const isSelected = currentRole === profile.role;
            return (
              <div
                key={profile.role}
                className={`border p-5 rounded transition duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-pottery-terracotta bg-white shadow-md ring-1 ring-pottery-terracotta/30'
                    : 'border-stone-200/80 bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex gap-4 items-start max-w-xl">
                  <div className={`p-3 rounded-full shrink-0 ${profile.color} ${isSelected ? 'scale-110 animate-pulse' : ''}`}>
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-850">
                        {profile.title}
                      </h4>
                      {isSelected ? (
                        <span className="text-[9px] bg-pottery-terracotta text-white px-2 py-0.5 font-mono uppercase tracking-wider rounded font-bold">
                          {t('Active Flow', 'HOẠT ĐỘNG')}
                        </span>
                      ) : (
                        <span className="text-[8px] border border-stone-200 text-stone-400 px-1.5 py-0.5 font-mono uppercase tracking-wider rounded">
                          {profile.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {profile.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                  <button
                    onClick={() => handleRoleActivation(profile.role)}
                    className={`w-full sm:w-auto text-center px-4 py-2 border text-xs font-mono font-bold tracking-wider uppercase transition rounded-sm whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'border-pottery-terracotta bg-pottery-terracotta text-white'
                        : 'border-stone-800 text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected ? t('Active Now ✓', 'Đã Kích Hoạt ✓') : t('Assume Role →', 'Thử vai trò này →')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security notice & credentials reminder */}
      <div className="bg-rose-50/50 border border-rose-150/40 p-4 rounded text-xs text-stone-600 flex gap-3 items-start">
        <AlertTriangle className="text-pottery-terracotta mt-0.5 shrink-0" size={16} />
        <div className="space-y-1">
          <span className="font-bold text-stone-850 block uppercase font-mono text-[10px] tracking-wider">
            {t('🔒 Secure Architecture Enforcement Notice', '🔒 PHONG TỎA DỮ LIỆU ĐĂNG NHẬP')}
          </span>
          <p className="leading-relaxed">
            {t(
              'While public visitors can easily lock back into clean Guest orbits or preview retail pipelines, actual business users credentials are verified server-side. In a live production deploy on Cloud Run or Firestore, non-authenticated requests will reject access to bulk CBM cargos, preventing database scrapers or price crawlers from capturing Vietnam factories confidential export margins.',
              'Môi trường chạy sản phẩm chính thức sẽ áp dụng rào cản mật khẩu và thông tin đăng sỉ thông qua cơ sở dữ liệu để bảo vệ bí mật kinh doanh cho các làng nghề. Phiên thử nghiệm này mô phỏng sát nhất các luồng nghiệp vụ để phê duyệt nhanh tiến độ dự án.'
            )}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => {
            sessionStorage.removeItem('pottery_sandbox_authorized');
            setIsAuthenticated(false);
          }}
          className="text-xs font-mono text-red-500 hover:text-red-700 hover:underline"
        >
          🔒 {t('Lock Settings Console (Full Lockout)', 'Khóa bảng điều khiển (Bảo mật tuyệt đối)')}
        </button>

        <button
          onClick={() => onNavigate('/')}
          className="bg-pottery-charcoal hover:bg-black text-white text-xs font-mono font-bold px-4 py-2 uppercase tracking-widest rounded-sm transition"
        >
          {t('Return Home', 'Quay Về Trang Chủ')}
        </button>
      </div>

    </div>
  );
}
