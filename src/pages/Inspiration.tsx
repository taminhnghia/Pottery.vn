/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Eye, ArrowRight, Layers } from 'lucide-react';

interface InspirationProps {
  language: 'en' | 'vi';
  onNavigate: (path: string) => void;
}

export default function Inspiration({ language, onNavigate }: InspirationProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  const galleryItems = [
    {
      title: t('Resort Arrival Courtyard Courtyard', 'Điểm chạm Tiền Sảnh Resort'),
      space: 'Resort & Hospitality',
      img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
      desc: t('Monumental pottery vessels establishing symmetrical scale at architectural entryways and check-in lobby terraces.', 'Sự sắp đặt đối xứng của các lu gốm nung mộc cỡ đại tạo cảm quan cân bằng bề thế cho lối đón khách phong cách nghỉ dưỡng.')
    },
    {
      title: t('Boutique Hotel Garden Oasis', 'Hồ nước Tĩnh tâm Khách sạn'),
      space: 'Garden & Landscape',
      img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      desc: t('Water-spouting ceramic fountain basins nestled into coarse stones, surrounded by local sub-tropical ferns.', 'Tiếng róc rách của thố nước đắp đất thô hòa dòng vào bụi cây ráng ổ phụng mang đậm tinh thần thiền tịnh Á Đông.')
    },
    {
      title: t('Modernist Villa Patio Stools', 'Sân Vườn Ban Công Đón Phên'),
      space: 'Outdoor Living',
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      desc: t('Functional terracotta glazed stools paired with sculptural olive planters for breezy open-air decks.', 'Sắp xếp đan xen giữa đôn tráng men hoàng gia bóng loáng bẹt phẳng làm đôn trà và chậu sấy xơ mộc trồng rêu quý.')
    },
    {
      title: t('Curated Scandinavian Living styling', 'Góc Đọc Sách Phong Cách Minimalist'),
      space: 'Interior Styling',
      img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      desc: t('Tall ceramic vases in warm ivory glaze, reflecting ambient shadows against soft linen backdrops.', 'Đường biên dáng bẹt trang nghiêm của bình hoa men rạn trắng ngà dâng trọn tinh thần chánh niệm tĩnh lặng.')
    },
    {
      title: t('Garden Centre Seasonal display', 'Hệ thống Trưng bày Nhà Kính Chuỗi Sân Vườn'),
      space: 'Retail & Commercial',
      img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      desc: t('Cohesive potting arrays grouped by height and glaze families, making wholesale setups look beautiful.', 'Cách bày bố phân chia theo tầng dải màu từ men mộc thô lấm tấm cát sa mạc đến hệ men chảy hỏa biến bóng bẩy.')
    },
    {
      title: t('Contemporary Poolside Courtyard', 'Bể Bơi Biệt Thự Gần Gũi Thiên Nhiên'),
      space: 'Outdoor Living',
      img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      desc: t('Heavy-walled rough clay planter urns flanking pool steps, resisting chlorine mist and intense direct heat.', 'Chất liệu đất cao lượng nung sấy bền chắc, chống bay màu bào mòn do bốc mịt clo hay bức xạ nhiệt độ cao dưới ánh mặt trời.')
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-pottery-terracotta uppercase bg-pottery-ivory px-3 py-1 rounded">
          <Camera size={13} />
          <span>{t('VISUAL STYLING MOODBOARDS', 'Ý TƯỞNG CẢNH QUAN & BÀY BỐ')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-pottery-charcoal">
          {t('Pottery Inspiration for Designed Spaces', 'Phong Cách Sắp Đặt Gốm Thượng Lưu')}
        </h1>
        <p className="text-xs text-stone-400 italic">
          {t(
            '“Application Inspiration. Articles and photos shown for visual reference.”',
            '“Ứng dụng Minh họa Sắp đặt. Hình ảnh tổng hợp phục vụ khơi gợi ý tưởng dự án.”'
          )}
        </p>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((article, idx) => (
          <div
            key={idx}
            className="group border border-pottery-ivory bg-white rounded overflow-hidden shadow-xs hover:shadow-md transition duration-300"
          >
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-pottery-charcoal/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded">
                {article.space}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <div className="text-[10px] font-mono text-pottery-terracotta font-bold uppercase tracking-wider">
                {t('Aesthetic Reference Layout', 'Bày trí tham chiếu kiến trúc')}
              </div>
              <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-pottery-terracotta transition leading-tight">
                {article.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {article.desc}
              </p>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                {/* Specific regulatory line */}
                <span className="text-[10px] text-stone-400 font-mono italic">
                  {t('Mock visual layout ref', 'Ảnh tham chiếu mộc')}
                </span>

                <button
                  onClick={() => onNavigate('/products')}
                  className="text-pottery-terracotta hover:text-pottery-deepclay font-mono font-bold uppercase tracking-wider flex items-center gap-1 group/btn text-[11px]"
                >
                  <span>{t('Source similar gốm', 'Xem gốm biên dạng này')}</span>
                  <ArrowRight size={12} className="transition transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warning Alert banner */}
      <section className="bg-amber-50 p-4 border border-amber-200 rounded max-w-2xl mx-auto text-xs text-amber-900 leading-relaxed font-mono italic text-center">
        {t(
          'Note: All complete client logos or completed developer projects will be uploaded once contract permissions and physical validation audits are satisfied.',
          'Lưu ý: Hồ sơ dự án biệt thự thực tế tại Phú Quốc, Nha Trang được bảo mật thông tin thầu của chủ tư và sẽ khai trình cụ thể sau.'
        )}
      </section>

    </div>
  );
}
