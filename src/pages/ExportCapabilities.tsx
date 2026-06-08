/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Truck, Scale, ShieldCheck, Box, Anchor, Info } from 'lucide-react';

interface ExportCapabilitiesProps {
  language: 'en' | 'vi';
  onNavigate: (path: string) => void;
}

export default function ExportCapabilities({ language, onNavigate }: ExportCapabilitiesProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  const steps = [
    { num: '01', title: t('Explore Collections', 'Khảo sát dòng gốm'), desc: t('Browse our programmatically generated list representation of 84+ distinct items.', 'Duyệt danh mục tuyển lọc gồm 84 sản phẩm gốm mộc trứ danh.') },
    { num: '02', title: t('Apply for Trade B2B', 'Đính kèm hồ sơ B2B'), desc: t('Complete company registration details to verify sourcing intent.', 'Gửi giấy phép, mã số thuế để xác nhận tư cách đại lý sỉ.') },
    { num: '03', title: t('Select Specifications', 'Định mức kỹ thuật'), desc: t('Specify your height, coloring, glaze, drainage, and volume per SKU.', 'Chốt dải màu hỏa biến, kích cỡ mộc và luồng bốc dỡ.') },
    { num: '04', title: t('Review Samples', 'Nghiệm thu gốm mẫu'), desc: t('Fast express sample dispatch to clear glazes before full firing.', 'Gửi nhanh miếng thẻ đất mẫu nung thử nghiệm để ký duyệt men.') },
    { num: '05', title: t('Confirm Commercials', 'Kí kết thương thảo'), desc: t('Approve proforma specifications, packaging pallets, and draft bills.', 'Ký duyệt hợp đồng bao gói thô, nắp đai nẹp bến bãi.') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] font-mono font-bold text-pottery-terracotta bg-pottery-ivory px-3 py-1 rounded">
          <Truck size={14} />
          <span>{t('LOGISTIC CHAIN STANDARDS', 'TIÊU CHUẨN TRUNG TÂM LOGISTICS')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-pottery-charcoal">
          {t('Supporting International Pottery Sourcing from Vietnam', 'Năng Lực Bao Gói & Xuất Khẩu Toàn Cầu')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {t(
            'POTTERY.VN is designed to support international buyers exploring Vietnamese pottery collections for wholesale, retail, hospitality and project-based applications.',
            'Tìm hiểu năng lực đóng thùng đai tôn mộc, bọc xơ dừa chống sốc cơ học, nẹp gỗ thông đạt tiêu chuẩn thông hải bến cảng nội địa bốc dỡ mạn tàu.'
          )}
        </p>
      </div>

      {/* Sourcing Timeline */}
      <section className="space-y-8 bg-white p-8 rounded-lg border border-pottery-ivory shadow-xs">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-pottery-charcoal border-l-4 border-pottery-terracotta pl-3">
          {t('Sourcing Roadmap For International Enterprise Buyers', 'Quy Quyển Hợp Tác Giao Thương Cho Đối Tác')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((st) => (
            <div key={st.num} className="space-y-2 relative">
              <span className="text-3xl font-serif font-bold text-pottery-sand block leading-none">
                {st.num}
              </span>
              <h3 className="font-serif font-bold text-stone-800 text-sm">{st.title}</h3>
              <p className="text-[11px] text-stone-500 leading-normal">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Regulatory Placeholders Section 24 mandates */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="border border-pottery-ivory bg-stone-50 rounded p-6 space-y-4">
          <div className="flex items-center gap-2 text-pottery-terracotta">
            <Anchor size={18} />
            <h3 className="font-serif font-bold text-stone-900 text-base">{t('Port of Loading Basis', 'Cảng bốc hàng Chỉ định')}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t(
              'Default trade price base: FOB Vietnam Port, Incoterms® 2020. Named port of loading (e.g. Cat Lai Port, Ho Chi Minh or Hai Phong Port) is subject to product weight and final proforma selection.',
              'Mặc định của cổng: FOB, Incoterms® 2020. Cảng thả neo (ví dụ: Cảng Cát Lái, Hải Phòng) sẽ được duyệt cụ thể tùy theo phân bổ lò nung miền Bắc hay miền Nam.'
            )}
          </p>
        </div>

        <div className="border border-pottery-ivory bg-stone-50 rounded p-6 space-y-4">
          <div className="flex items-center gap-2 text-pottery-terracotta">
            <Box size={18} />
            <h3 className="font-serif font-bold text-stone-900 text-base">{t('Packaging Standards', 'Quy cách Đóng pallet')}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t(
              'Available upon final quotation review. All landscape oversized garden urns are wrapped in double-layered bubble packs, loaded on fumigated wooden pallets, and secured by steel straps.',
              'Tất cả hàng cồng kềnh, lu lớn sân vườn được bọc màng kép chống sốc va đập gốm, đặt lên pallet gỗ thông đã hun khử trùng đạt chuẩn ISPM-15 Hải quan.'
            )}
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-stone-400 uppercase">
            [ State: To be validated in final proforma ]
          </span>
        </div>

        <div className="border border-pottery-ivory bg-stone-50 rounded p-6 space-y-4">
          <div className="flex items-center gap-2 text-pottery-terracotta">
            <Scale size={18} />
            <h3 className="font-serif font-bold text-stone-900 text-base">{t('Minimum Quantity Lot (MOQ)', 'Định lượng tối thiểu (MOQ)')}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t(
              'Minimum order values depend on SKU dimensions. Smaller indoor table pots start at 200pcs per color, while gigantic architectural urns accept 5-10pcs per lot.',
              'Số lượng tối thiểu giao động linh hoạt. Chậu hoa trang trí nhỏ để bàn nhận sản xuất từ 200 chiếc, trong khi lu biệt thự cỡ lớn nhận từ 5-10 chiếc.'
            )}
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-stone-400 uppercase">
            [ State: Subject to product specifications ]
          </span>
        </div>

      </section>

      {/* Info strip about placeholders - MUST be displayed cleanly */}
      <section className="bg-amber-50 border border-amber-200 text-amber-900 p-6 rounded flex items-start gap-4">
        <Info className="shrink-0 mt-0.5 text-amber-700" size={18} />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold">{t('Commercial Export Traceability Check', 'Mẫu khai báo và cập nhật số liệu lò xưởng')}</h4>
          <p className="leading-relaxed">
            {t(
              'Production limits, kiln temperature metrics, container stuffing, certificates (BSCI, Smeta), and registered factory maps are set as "To Be Updated" until physical validation audits are satisfied.',
              'Các chỉ số định lượng liên quan đến công suất mẻ nung hàng tuần, chứng nhận xưởng BSCI, sơ đồ lò Bát Tràng hỏa hỏa được để dưới dạng Placeholder chuyên nghiệp để bảo vệ tính trung thực của website.'
            )}
          </p>
        </div>
      </section>

      {/* Interactive Container Estimator Guide */}
      <section className="bg-white rounded-lg border border-pottery-ivory p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-serif font-bold text-pottery-charcoal">
          {t('Interactive Container stuffing load guidance', 'Ước lượng Dung lượng bốc xếp Container')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="border border-stone-200 p-4 rounded bg-stone-50/50 space-y-2">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider">{t('20-Foot Container (20FT)', 'Container 20 feet (20FT)')}</h4>
            <table className="w-full text-[11px] text-stone-600">
              <tbody>
                <tr>
                  <td className="py-1">{t('Usable volume:', 'Thế tích khả dụng:')}</td>
                  <td className="py-1 font-bold text-right">~28-30 CBM</td>
                </tr>
                <tr>
                  <td className="py-1">{t('Standard Pallets:', 'Số Pallet tiêu chuẩn:')}</td>
                  <td className="py-1 font-bold text-right">{t('9-10 Pallets', '9-10 Pallet')}</td>
                </tr>
                <tr>
                  <td className="py-1">{t('Average pieces:', 'Số lượng trung bình:')}</td>
                  <td className="py-1 font-bold text-right font-serif">"TBD / Quote-specific"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-stone-200 p-4 rounded bg-stone-50/50 space-y-2">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider">{t('40-Foot Standard (40FT)', 'Container 40 feet (40FT)')}</h4>
            <table className="w-full text-[11px] text-stone-600">
              <tbody>
                <tr>
                  <td className="py-1">{t('Usable volume:', 'Thể tích khả danh:')}</td>
                  <td className="py-1 font-bold text-right">~56-58 CBM</td>
                </tr>
                <tr>
                  <td className="py-1">{t('Standard Pallets:', 'Số Pallet tiêu chuẩn:')}</td>
                  <td className="py-1 font-bold text-right">{t('20-21 Pallets', '20-21 Pallet')}</td>
                </tr>
                <tr>
                  <td className="py-1">{t('Average pieces:', 'Số lượng trung bình:')}</td>
                  <td className="py-1 font-bold text-right font-serif">"TBD / Quote-specific"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-stone-200 p-4 rounded bg-stone-50/50 space-y-2">
            <h4 className="font-bold text-stone-800 uppercase tracking-wider">{t('40-Foot High Cube (40HC)', 'Container Cao 40 feet (40HC)')}</h4>
            <table className="w-full text-[11px] text-stone-600">
              <tbody>
                <tr>
                  <td className="py-1">{t('Usable volume:', 'Thể tích khả khối:')}</td>
                  <td className="py-1 font-bold text-right">~68-70 CBM</td>
                </tr>
                <tr>
                  <td className="py-1">{t('Standard Pallets:', 'Số Pallet tiêu chuẩn:')}</td>
                  <td className="py-1 font-bold text-right">{t('20-21 Pallets (tall)', '20-21 Pallet cao')}</td>
                </tr>
                <tr>
                  <td className="py-1">{t('Average pieces:', 'Số lượng trung bình:')}</td>
                  <td className="py-1 font-bold text-right font-serif">"TBD / Quote-specific"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Bottom bar */}
      <section className="bg-pottery-ivory/55 p-8 rounded-lg text-center space-y-4 border border-pottery-ivory">
        <h3 className="text-xl font-serif text-pottery-charcoal">{t('Discuss Container Stuffing & Loading', 'Thảo Luận Đóng Ghép Container Hoàn Chỉnh')}</h3>
        <p className="text-xs text-stone-500 max-w-lg mx-auto">
          {t('Fill your inquiry table with pottery models. Submitted lists automatically generate exact pack specifications for freight evaluation.', 'Ghép gốm, thố, đôn vào mẫu yêu cầu báo giá của bạn để lò lò nghiên cứu trọng lượng sấy khô.')}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onNavigate('/trade/apply')}
            className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded"
          >
            {t('Register B2B Account', 'Đăng ký Wholesaler')}
          </button>
          
          <button
            onClick={() => onNavigate('/products')}
            className="bg-white border border-stone-250 text-stone-700 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-50"
          >
            {t('Explore Catalog range', 'Tra cứu Catalogue')}
          </button>
        </div>
      </section>

    </div>
  );
}
