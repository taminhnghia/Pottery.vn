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

  const handleSelectRole = (role: UserRole) => {
    onLoginAsRole(role);
    alert(t(`Logged in successfully! Role mapped to: ${role.toUpperCase()}`, `Đăng nhập thành công! Vai trò đổi thành: ${role.toUpperCase()}`));
    if (role === 'admin') {
      onNavigate('/admin'); // Redirect to admin dashboard
    } else {
      onNavigate('/'); // Redirect home
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Editorial Heading */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-pottery-ivory text-pottery-terracotta rounded-full flex items-center justify-center mx-auto mb-2">
          <LogIn size={22} />
        </div>
        <h1 className="text-2xl font-serif text-pottery-charcoal">{t('Sourcing Portal Sign In', 'Đăng Nhập Cổng Sourcing')}</h1>
        <p className="text-xs text-stone-500 max-w-xs mx-auto">
          {t('Select your credentials layout below to experience role-restricted content immediately.', 'Lựa chọn tư cách thành viên dưới đây để trải nghiệm nhanh không gian hạn chế giá sỉ.')}
        </p>
      </div>

      {/* Select buttons stack */}
      <div className="space-y-4">
        
        <button
          onClick={() => handleSelectRole('retail_customer')}
          className="w-full text-left bg-white hover:bg-stone-50 border border-stone-200 p-4 rounded-lg flex items-center gap-4 hover:shadow-xs transition duration-200 cursor-pointer"
        >
          <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
            <UserCheck size={18} />
          </div>
          <div>
            <strong className="text-xs text-stone-850 block">{t('Sign In as Private Retail Buyer', 'Đăng nhập Mua lẻ / Cá nhân')}</strong>
            <span className="text-[10px] text-stone-400 font-mono tracking-wider">RETAIL_CUSTOMER PRIVILEGES</span>
          </div>
        </button>

        <button
          onClick={() => handleSelectRole('approved_b2b_buyer')}
          className="w-full text-left bg-white hover:bg-stone-50 border border-stone-200 p-4 rounded-lg flex items-center gap-4 hover:shadow-xs transition duration-200 cursor-pointer"
        >
          <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center shrink-0">
            <Shield size={18} />
          </div>
          <div>
            <strong className="text-xs text-stone-850 block">{t('Sign In as Trade Wholesaler', 'Đăng nhập Đối tác sỉ / Doanh nghiệp')}</strong>
            <span className="text-[10px] text-stone-400 font-mono tracking-wider">APPROVED_B2B_BUYER PRIVILEGES</span>
          </div>
        </button>

        <button
          onClick={() => handleSelectRole('admin')}
          className="w-full text-left bg-white hover:bg-stone-50 border border-stone-200 p-4 rounded-lg flex items-center gap-4 hover:shadow-xs transition duration-200 cursor-pointer"
        >
          <div className="w-10 h-10 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center shrink-0">
            <Shield size={18} />
          </div>
          <div>
            <strong className="text-xs text-stone-850 block">{t('Sign In as System Administrator', 'Đăng nhập vai Trưởng Ban Quản trị')}</strong>
            <span className="text-[10px] text-stone-400 font-mono tracking-wider">ADMIN PRIVILEGES WORKSPACE</span>
          </div>
        </button>

      </div>

      <div className="text-center">
        <button
          onClick={() => handleSelectRole('guest')}
          className="text-xs font-mono text-stone-500 hover:text-pottery-terracotta underline"
        >
          {t('Clear credentials, continue as Guest Visitor', 'Hủy phiên, duyệt trang như Khách vãng lai')}
        </button>
      </div>

    </div>
  );
}
