/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Mail, Check, Copy, Sparkles } from 'lucide-react';

interface ExitIntentModalProps {
  language: 'en' | 'vi';
  isOpen: boolean;
  onClose: (proceedWithNavigation?: boolean) => void;
  onSubscribe: (email: string) => void;
  isPendingNavigation: boolean;
}

export default function ExitIntentModal({
  language,
  isOpen,
  onClose,
  onSubscribe,
  isPendingNavigation,
}: ExitIntentModalProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  const PROMO_CODE = 'KILN10';

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is active
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg(t('Please enter a valid email address.', 'Vui lòng cung cấp địa chỉ email hợp lệ.'));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setErrorMsg(t('Please enter a valid email format.', 'Định dạng email không chính xác.'));
      return;
    }

    onSubscribe(trimmedEmail);
    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseAndProceed = () => {
    onClose(true); // Proceed with pending path navigation if any
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => onClose(true)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FCFAF7] border border-stone-200 rounded-sm shadow-xl overflow-hidden z-10 flex flex-col md:flex-row transform transition-all duration-300 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner/Image Left Column */}
        <div className="relative w-full md:w-5/12 min-h-[160px] md:min-h-[420px] bg-stone-900 overflow-hidden shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80" 
            alt="Handcrafted Vietnam Ceramics" 
            className="absolute inset-0 w-full h-full object-cover opacity-85 object-center hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/70 via-stone-900/10 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[9px] font-mono tracking-widest text-[#E6DFD5] uppercase mb-1">
              {t('Vietnam Kiln Artistry', 'Nghệ Thuật Lò Nung Việt')}
            </span>
            <h4 className="text-base font-serif font-medium tracking-tight text-[#FAF9F5] leading-tight">
              {t('Pure Clay. Raw Design.', 'Đất sét nguyên bản. Chế tác hoàn mỹ.')}
            </h4>
          </div>
        </div>

        {/* Form Content Column */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between relative space-y-6">
          
          {/* Close Button right upper */}
          <button 
            onClick={() => onClose(true)}
            aria-label="Close modal"
            className="absolute right-4 top-4 text-stone-400 hover:text-stone-800 transition cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Core messages */}
          <div className="space-y-4 pt-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-pottery-terracotta/10 text-pottery-terracotta text-[9px] font-mono uppercase tracking-widest font-bold">
              <Sparkles size={10} />
              {t('Exclusive Journeys Offer', 'ƯU ĐÃI KHÁM PHÁ')}
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl md:text-2xl font-serif text-stone-900 tracking-tight leading-tight">
                {t('Before You Drift Away...', 'Đợi một chút...')}
              </h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t(
                  'Join our private newsletter circle today. We supply gorgeous catalog releases, artisan stories direct from Bat Trang & Binh Duong kilns, and private discounts.',
                  'Đăng ký vòng tròn nhận tin của chúng tôi hôm nay. Nhận thông tin mới nhất về các chuyến nung mộc mỹ nghệ, câu chuyện làng nghề và mật mã ưu đãi đặc biệt.'
                )}
              </p>
            </div>
          </div>

          {!isSubscribed ? (
            /* Subscription Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest block">
                  {t('Your email address', 'ĐỊA CHỈ EMAIL CỦA BẠN')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    placeholder={t('e.g., curator@luxespaces.com', 'Ví dụ: curator@luxespaces.com')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 border border-stone-250 p-2 text-xs rounded-sm focus:outline-none focus:border-pottery-terracotta text-stone-850 bg-white"
                    required
                    autoFocus
                  />
                </div>
                {errorMsg && (
                  <span className="text-[10px] text-red-500 font-mono block mt-1">
                    ⚠️ {errorMsg}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-pottery-charcoal hover:bg-black text-white text-xs font-mono font-bold tracking-widest uppercase py-3 rounded-sm transition cursor-pointer"
                >
                  {t('Reveal 10% Discount Code →', 'Nhận ngay mật mã ưu đãi 10% →')}
                </button>
                <p className="text-[9px] text-center text-stone-400 italic">
                  {t('*Discount code is valid immediately on retail cart collections.', '*Mã ưu đãi áp dụng trực tiếp cho các bộ sưu tập bán lẻ của bạn.')}
                </p>
              </div>
            </form>
          ) : (
            /* Success State with Copyable Promo Code */
            <div className="bg-emerald-50/50 border border-emerald-200/60 p-4 rounded-sm text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <Check size={18} />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-stone-850">
                  {t('Welcome to the Sourcing Legacy!', 'Chào mừng bạn đến với Di Sản Gốm Việt!')}
                </h3>
                <p className="text-[11px] text-stone-500 max-w-xs mx-auto leading-normal">
                  {t(
                    'We successfully saved your email. Copy the private retail promo code below for 10% off your direct purchase:',
                    'Chúng tôi đã đăng ký thành công email của bạn. Sao chép mã ưu đãi đặc chế dưới đây cho đơn hàng mua lẻ trực tiếp:'
                  )}
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="flex items-center justify-between bg-white border border-dashed border-stone-300 p-2.5 rounded-sm max-w-xs mx-auto">
                <span className="font-mono text-sm font-bold text-pottery-terracotta tracking-widest pl-1.5 select-all">
                  {PROMO_CODE}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-[10px] font-mono px-2.5 py-1 rounded-sm transition text-stone-700 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={10} className="text-emerald-600" />
                      <span className="text-emerald-700 font-bold">{t('COPIED', 'ĐÃ COPY')}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={10} />
                      <span>{t('COPY', 'SAO CHÉP')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Secondary Actions */}
          <div className="pt-2 border-t border-stone-150 flex items-center justify-between text-[11px]">
            <button
              onClick={handleCloseAndProceed}
              className="text-stone-450 hover:text-stone-800 hover:underline transition font-medium cursor-pointer"
            >
              {isPendingNavigation 
                ? t('Dismiss and explore next area →', 'Xem tiếp khu vực kế tiếp →') 
                : t('No thanks, take me back', 'Không, cảm ơn, quay lại trang')}
            </button>
            <span className="text-stone-400 font-mono text-[9px] tracking-wider uppercase">
              {t('OFFLINE PERSISTENCE EMPOWERED', 'DI SẢN TRANG PHỤC GỐM')}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
