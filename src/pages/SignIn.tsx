/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import { LogIn, Shield, Users, UserCheck } from 'lucide-react';

interface SignInProps {
  language: 'en' | 'vi';
  onNavigate: (path: string) => void;
  onLoginAsRole: (role: UserRole) => void;
}

export default function SignIn({ language, onNavigate, onLoginAsRole }: SignInProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      setErrorMsg(t('Please enter both email and password.', 'Vui lòng nhập cả email và mật khẩu.'));
      return;
    }

    // Role mapping based on input
    if (trimmedEmail === 'admin@pottery.vn' && trimmedPass === 'admin2026') {
      handleSelectRole('admin');
    } else if (trimmedEmail === 'b2b@pottery.vn' && trimmedPass === 'b2b2026') {
      handleSelectRole('approved_b2b_buyer');
    } else if (trimmedEmail === 'retail@pottery.vn' && trimmedPass === 'retail2026') {
      handleSelectRole('retail_customer');
    } else if (trimmedEmail === 'pending@pottery.vn' && trimmedPass === 'pending2026') {
      handleSelectRole('trade_applicant');
    } else {
      setErrorMsg(t('Invalid email address or passcode sequence. Please refer to the guidelines below.', 'Email hoặc mật khẩu bảo mật chưa đúng. Vui lòng tham khảo thông tin tài khỏan bên dưới.'));
    }
  };

  const handleSelectRole = (role: UserRole) => {
    onLoginAsRole(role);
    if (role === 'admin') {
      onNavigate('/'); // Redirect to primary control workspace or home
    } else {
      onNavigate('/'); // Redirect home
    }
  };

  const demoAccounts = [
    {
      role: 'admin',
      label: t('System Administrator', 'Trưởng Ban Quản trị'),
      email: 'admin@pottery.vn',
      pass: 'admin2026',
      badge: 'ADMIN',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      role: 'approved_b2b_buyer',
      label: t('Approved B2B Wholesaler', 'Đối tác sỉ đã duyệt'),
      email: 'b2b@pottery.vn',
      pass: 'b2b2026',
      badge: 'B2B PARTNER',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      role: 'retail_customer',
      label: t('Retail Customer', 'Người mua lẻ cá nhân'),
      email: 'retail@pottery.vn',
      pass: 'retail2026',
      badge: 'RETAIL',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      role: 'trade_applicant',
      label: t('Pending B2B Applicant', 'Đối tác sỉ chờ duyệt'),
      email: 'pending@pottery.vn',
      pass: 'pending2026',
      badge: 'PENDING B2B',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      
      {/* Editorial Heading */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-pottery-ivory text-pottery-terracotta rounded-full flex items-center justify-center mx-auto mb-2">
          <LogIn size={22} />
        </div>
        <h1 className="text-2xl font-serif text-pottery-charcoal">{t('Sourcing Portal Sign In', 'Đăng Nhập Cổng Sourcing')}</h1>
        <p className="text-xs text-stone-500 max-w-xs mx-auto">
          {t('Authenticate using security credentials to explore role-restricted pricing tier and tools.', 'Xác thực thông tin tài khoản bảo mật để truy cập bảng giá và tài nguyên chuyên biệt.')}
        </p>
      </div>

      {/* Actual login form */}
      <form onSubmit={handleSubmit} className="bg-white border border-stone-200 p-6 rounded shadow-xs space-y-4">
        
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-150 p-3 rounded text-xs text-rose-700 font-mono">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest block">
            {t('Business Email Address', 'MÃ EMAIL DOANH NGHIỆP / CÁ NHÂN')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g., mail@pottery.vn"
            className="w-full border border-stone-250 p-2.5 rounded text-xs focus:outline-none focus:border-pottery-terracotta text-stone-850"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest block">
            {t('Security Passcode', 'MẬT KHẨU TRUY CẬP')}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-stone-250 p-2.5 rounded text-xs focus:outline-none focus:border-pottery-terracotta text-stone-850"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pottery-charcoal hover:bg-black text-white py-3 text-xs uppercase tracking-widest font-semibold transition text-center mt-2 cursor-pointer"
        >
          {t('Sign In', 'Đăng Nhập Hệ Thống')}
        </button>

      </form>

      {/* Demo Credentials Guidance Board */}
      <div className="border border-stone-150 bg-stone-50/70 p-5 rounded space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">
            {t('🔒 Verified Demo Credentials', '🔒 THÔNG TIN TÀI KHOẢN TRUY CẬP')}
          </h3>
          <p className="text-[10px] text-stone-400 font-mono uppercase">
            {t('Please copy and paste the details below into the form inputs:', 'Hình mẫu tài khoản liên kết được cấu dịch sẵn:')}
          </p>
        </div>

        <div className="divide-y divide-stone-200/60 text-xs">
          {demoAccounts.map((acc) => (
            <div key={acc.role} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-805 select-text">{acc.label}</span>
                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${acc.badgeColor}`}>
                  {acc.badge}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 font-mono text-[10px] text-stone-500">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-bold text-stone-700 select-all">{acc.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass:</span>
                  <span className="font-bold text-stone-700 select-all">{acc.pass}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-4 border-t border-stone-100 space-y-3">
        <div>
          <button
            onClick={() => handleSelectRole('guest')}
            className="text-xs font-mono text-stone-500 hover:text-pottery-terracotta underline"
          >
            {t('Clear credentials, continue as Guest Visitor', 'Hủy phiên, duyệt trang như Khách vãng lai')}
          </button>
        </div>
        <div>
          <button
            onClick={() => onNavigate('/demo-control')}
            className="text-[10px] font-mono text-stone-400 hover:text-pottery-terracotta flex items-center gap-1.5 justify-center mx-auto"
          >
            🔒 {t('Access System Simulation Control Panel', 'Truy cập Bảng mô phỏng quyền hạn & Sandbox')}
          </button>
        </div>
      </div>

    </div>
  );
}
