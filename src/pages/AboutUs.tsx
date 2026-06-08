/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building, Award, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

interface AboutUsProps {
  language: 'en' | 'vi';
}

export default function AboutUs({ language }: AboutUsProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Editorial Hero */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif text-pottery-charcoal border-b border-pottery-ivory pb-4">
          {t('Vietnamese Ceramics for Contemporary Global Spaces', 'Gốm Sứ Việt Nam Kiến Tạo Không Gian Sống Đương Đại')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {t(
            'Vietnam Pottery Join Stock Company presents pottery collections for indoor, outdoor and architectural applications. Through POTTERY.VN, we introduce Vietnamese ceramic products to personal customers and international buyers seeking natural materials, refined forms and flexible product selection.',
            'Công ty Cổ phần Gốm Sứ Việt Nam mang đến những bộ sưu tập gốm sứ tinh xảo, bền bỉ mộc mạc cho căn hộ, chuỗi bán lẻ, trung tâm sân vườn và đối tác B2B quốc tế.'
          )}
        </p>
      </div>

      {/* Grid segments */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
        
        <div className="space-y-3">
          <h3 className="text-sm font-bold font-mono text-pottery-terracotta uppercase">{t('Our Sourcing Integrity Direction', 'Định hướng sản xuất trung thực')}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t(
              'Our focus lies strictly in pure earthen clay minerals, balanced proportions, contemporary geometries, and sustainable kiln firings that tolerate freezing temperatures. We combine architectural design elements with generational ceramic craftsmanship.',
              'Ưu tiên hàng đầu của chúng tôi là làm giàu giá trị cốt thô địa tầng mộc mạc, cân bằng tỷ lệ hình học mộc và tối ưu hiệu suất nung ga. Tránh xa các claim ảo không có cơ sở kỹ thuật hoặc giả số liệu lò.'
            )}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold font-mono text-pottery-terracotta uppercase">{t('Working with Volume Importers', 'Đồng hành cùng nhà phân phối B2B')}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t(
              'We prepare transparent, verified packing specification templates, exact container load estimations, and fast sample matching to minimize transactional overhead for international buyers.',
              'Thiết lập biểu mẫu dữ liệu kích thước CBM đóng thùng, pallet đai tôn mộc tiêu chuẩn và nén ép tải thử nghiệm cường lực giúp nhà nhập khẩu yên tâm tối ưu kho vận bến cảng.'
            )}
          </p>
        </div>

      </section>

      {/* Official Corporate details */}
      <section className="bg-white rounded-lg border border-pottery-ivory p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-serif font-bold text-pottery-charcoal border-b border-stone-100 pb-2">
          {t('Registered Corporation Details', 'Hồ Sơ Kê Khai Đăng Ký Pháp Nhân')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">{t('Legal Corporate Name (English)', 'Tên quốc tế (Tiếng Anh)')}</span>
              <strong className="text-stone-800">Vietnam Pottery Join Stock Company</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">{t('Legal Corporate Name (Vietnamese)', 'Tên pháp nhân đăng ký (Tiếng Việt)')}</span>
              <strong className="text-stone-800">Công ty Cổ phần Gốm Sứ Việt Nam</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">{t('Display Brand Slogan', 'Tên thương hiệu & Website')}</span>
              <strong className="text-stone-800">POTTERY.VN</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase block">{t('Global Sales Inquiry Email', 'Hộp thư giao thương quốc tế')}</span>
              <strong className="text-pottery-terracotta underline">sales@pottery.vn</strong>
            </div>
          </div>

          <div className="space-y-3 bg-stone-50 p-4 rounded border border-stone-200">
            <div>
              <span className="text-[10px] text-amber-700 uppercase font-bold block">🚨 {t('Administrative Alert Label', 'CẢNH BÁO QUẢN TRỊ')}</span>
              <p className="text-[11px] text-stone-500 leading-relaxed pt-1 select-none">
                {t(
                  'Under Section 7 strict rules: Factory addresses, physical showroom pins, telephone hotlines, certifications (BSCI/Smeta), and registered business numbers are marked as [To Be Updated] until official validation audits are satisfied before final deployment.',
                  'Theo luật số liệu thật (Section 7), địa chỉ xưởng nung mọc lò cụ thể, mã số thuế nội địa và số hotline sẽ hiển thị dưới dạng placeholder [To be updated] để đảm bảo không rò rỉclaims chưa kiểm chứng.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust check values */}
      <section className="bg-pottery-ivory/30 p-6 rounded-lg text-xs text-stone-500 leading-relaxed flex items-start gap-3">
        <AlertCircle size={18} className="text-pottery-terracotta shrink-0" />
        <div>
          <span className="font-bold text-stone-700 block uppercase font-mono text-[9px]">{t('Pre-Launch Governance Note', 'Ghi chú phê duyệt nội dung pháp lý')}</span>
          <p>
            {t(
              'Company legal history is subject to update. Legal structures and Incoterms obligations must be approved before publication.',
              'Bản nháp hồ sơ doanh nghiệm và chính sách vận chuyển bến cảng của POTTERY.VN đã được phê duyệt nén sấy cục bộ cho bản thử khách hàng.'
            )}
          </p>
        </div>
      </section>

    </div>
  );
}
