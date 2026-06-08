/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ArrowRight, Table, Layers } from 'lucide-react';

interface CollectionsProps {
  language: 'en' | 'vi';
  onNavigate: (path: string) => void;
}

export default function Collections({ language, onNavigate }: CollectionsProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  const list = [
    {
      name: t('Outdoor Frost Proof Planters', 'Chậu Cây Ngoài Trời Chống Nứt Sương'),
      img: 'https://images.unsplash.com/photo-1545241047-6083a3684587',
      desc: t('Heavy-duty garden planters designed with reinforced cellular walls to handle winter frost cycles in Western climates.', 'Thành chậu cực dày dặn trồng cây tùng, dương xỉ đại cảnh, dầm mưa dãi nắng không bay màu phong hóa.'),
    },
    {
      name: t('Indoor Fine Pots & Trays', 'Chậu Trắng Tháp Để Bàn Phòng Khách'),
      img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
      desc: t('Delicately throws tabletop ceramics utilizing fine ivory sand, optimized for modern home decor styling.', 'Kích thước nhỏ nhắn trang nhã để chậu sen đá, trầu bà đế vương tráng men lì ngọc bích cực kỳ thanh lịch.'),
    },
    {
      name: t('Heritage Flowing & Crackled Vases', 'Chuỗi Bình Hoa Men Rạn & Men Chảy Cổ'),
      img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c',
      desc: t('Expressive pottery vases fired using raw minerals, highlighting Vietnamese kiln craftsmanship colors.', 'Bộ dải màu hỏa biến men rạn giả cổ lôi cuốn cho các gian phòng thiền trà, cắm sen hồng tinh tế.'),
    },
    {
      name: t('Palace Glazed Ceramic Stools', 'Bộ Đôn Gốm Sứ Mỹ Nghệ Hoàng Gia'),
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
      desc: t('Robust hollow structures styled with pierce-work and high-gloss glazes, serving as side stools or stand bases.', 'Tiết diện đôn gốm sứ đục CNC thủ công hoa văn cổ điển làm ghế phụ sảnh biệt thự hồ bơi cực sang trọng.'),
    },
    {
      name: t('Giant Architectural Urns & Pillars', 'Chậu Lu Nước Đại Cảnh Biệt Thự'),
      img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
      desc: t('Monumental urns scaling up to 1.5 meters, engineered for hotel water fountain setups and garden centers.', 'Dáng lu truyền thống bầu tròn hay cao dài dập mọc triện xuất phát từ thợ lành nghề lò củi.'),
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-pottery-terracotta uppercase bg-pottery-ivory px-3 py-1 rounded">
          <Layers size={13} />
          <span>{t('VERIFIED DESIGN FAMILIES', 'PHÂN LOẠI DÒNG CHẾ TÁC LÒ')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-pottery-charcoal">
          {t('Curated Pottery Collections', 'Bộ Sưu Tập Gốm Sứ Tinh Hoa')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {t(
            'Explore pottery selections built across dedicated design disciplines, combining traditional raw clay chemistry with contemporary geometric lines.',
            'Tìm kiếm các mẫu gốm mộc mạc nguyên sơ hay rực rỡ sắc màu được nung sấy công phu để bổ sung catalogue.'
          )}
        </p>
      </div>

      {/* List */}
      <div className="space-y-12">
        {list.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center gap-8 bg-pottery-ivory/20 p-6 sm:p-10 rounded-xl border border-pottery-ivory`}
          >
            <div className="flex-1 aspect-[16/10] rounded-lg overflow-hidden shadow-md">
              <img src={`${item.img}?auto=format&fit=crop&w=800&q=80`} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 space-y-4">
              <span className="text-[10px] text-pottery-terracotta font-mono font-bold uppercase tracking-widest">{t('COLLECTION OVERVIEW', 'CHI TIẾT DÒNG GỐM')}</span>
              <h3 className="text-xl sm:text-2xl font-serif text-pottery-charcoal leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {item.desc}
              </p>

              <div className="pt-2 flex gap-4">
                <button
                  onClick={() => onNavigate('/products')}
                  className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-5 py-2.5 text-xs uppercase font-semibold tracking-wider flex items-center gap-2 transition"
                >
                  <span>{t('Shop Collection Products', 'Khảo sát sản phẩm')}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
