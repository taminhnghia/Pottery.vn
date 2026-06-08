/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import { LogIn } from 'lucide-react';

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

  const handleSelectRole = (role: UserRole) => {
    onLoginAsRole(role);
    onNavigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      setErrorMsg(t('Please enter both email and password.', 'Vui lòng nhập cả email và mật khẩu.'));
      return;
    }

    // Role mapping based on credentials
    if (trimmedEmail === 'admin@pottery.vn' && trimmedPass === 'admin2026') {
      handleSelectRole('admin');
    } else if (trimmedEmail === 'b2b@pottery.vn' && trimmedPass === 'b2b2026') {
      handleSelectRole('approved_b2b_buyer');
    } else if (trimmedEmail === 'retail@pottery.vn' && trimmedPass === 'retail2026') {
      handleSelectRole('retail_customer');
    } else if (trimmedEmail === 'pending@pottery.vn' && trimmedPass === 'pending2026') {
      handleSelectRole('trade_applicant');
    } else {
      setErrorMsg(
        t(
          'Invalid email address or passcode. Please check your credentials.',
          'Email hoặc mật khẩu bảo mật không chính xác. Vui lòng kiểm tra lại.'
        )
      );
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Editorial Heading */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-pottery-ivory text-pottery-terracotta rounded-full flex items-center justify-center mx-auto mb-2">
          <LogIn size={22} />
        </div>
        <h1 className="text-2xl font-serif text-pottery-charcoal">
          {t('Sourcing Portal Sign In', 'Đăng Nhập Cổng Sourcing')}
        </h1>
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

      <div className="text-center pt-4 border-t border-stone-100 space-y-3">
        <div>
          <button
            onClick={() => handleSelectRole('guest')}
            className="text-xs font-mono text-stone-500 hover:text-pottery-terracotta underline cursor-pointer"
          >
            {t('Clear credentials, continue as Guest Visitor', 'Hủy phiên, duyệt trang như Khách vãng lai')}
          </button>
        </div>
        <div>
          <button
            onClick={() => onNavigate('/demo-control')}
            className="text-[10px] font-mono text-stone-400 hover:text-pottery-terracotta flex items-center gap-1.5 justify-center mx-auto cursor-pointer"
          >
            🔒 {t('Access System Simulation Control Panel', 'Truy cập Bảng mô phỏng quyền hạn & Sandbox')}
          </button>
        </div>
      </div>

    </div>
  );
}
