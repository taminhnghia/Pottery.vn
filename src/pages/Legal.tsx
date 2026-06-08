/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, FileWarning, Eye, Lock } from 'lucide-react';

interface LegalProps {
  language: 'en' | 'vi';
  mode: 'privacy' | 'terms' | 'cookie';
}

export default function Legal({ language, mode }: LegalProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  const renderTitle = () => {
    if (mode === 'privacy') return t('Privacy Policy - POTTERY.VN', 'Chính sách Bảo mật thông tin - POTTERY.VN');
    if (mode === 'terms') return t('Terms of Use Agreements', 'Điều khoản Sử dụng cổng thông tin');
    return t('Cookie and Tracker Policy Directive', 'Chính sách quản lý tệp cookie');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Title */}
      <div className="border-b border-pottery-ivory pb-4 space-y-2">
        <h1 className="text-3xl font-serif text-pottery-charcoal">
          {renderTitle()}
        </h1>
        <p className="text-xs text-stone-400 font-mono">
          Last revised: June 2026 • Vietnam Pottery Join Stock Company Draft Section 37
        </p>
      </div>

      {/* Mandatory Admin content review label */}
      <div className="bg-amber-100 border border-amber-300 text-amber-900 rounded p-4 text-xs font-mono flex items-start gap-3">
        <FileWarning className="text-amber-700 shrink-0 mt-0.5" size={16} />
        <div>
          <strong className="block uppercase text-[10px]">⚠️ ADMINISTRATOR REGULATORY WARNING:</strong>
          <span>“Legal content inside this portal represents placeholder material. All sections must be audited, customized, and finalized by corporate general counsel before public launch.”</span>
        </div>
      </div>

      {/* Main legal content */}
      <div className="prose prose-stone max-w-none text-xs text-stone-650 leading-relaxed font-sans space-y-6">
        
        {mode === 'privacy' && (
          <>
            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">1. Information Accumalation</h3>
              <p>
                Under default Incoterms standards and B2B sourcing policies, POTTERY.VN (Vietnam Pottery Join Stock Company) accumulates corporate taxation codes, registered business licensing details, contact names, and website addresses when you submit a Trade Account application. This information is saved securely within our sandboxed server context.
              </p>
            </section>
            
            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">2. Safeguarding Protected FOB Price Pools</h3>
              <p>
                In alignment with B2B distributor security, wholesale FOB pricing schemas are strictly stored inside encrypted memory matrices. They will never be mapped to public scripts, guest cookies, or leaked in raw network response responses to unauthorized roles. Your credentials and pricing access details are non-transferable.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">3. Contacting and Emails</h3>
              <p>
                Mailing databases compiled from Catalogue requests or custom R&D submissions are curated exclusively to draft quotation responses and share glaze revisions. We do not forward mailing parameters to third-party marketing companies.
              </p>
            </section>
          </>
        )}

        {mode === 'terms' && (
          <>
            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">1. Acceptance of Terms</h3>
              <p>
                By visiting POTTERY.VN or completing a B2B wholesaler questionnaire, you declare that your sourcing intentions are authentic and company details represent true, validated legal entities.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">2. Proprietary Mold Geometry Rights</h3>
              <p>
                All 2D and 3D CAD schematic reference graphics, high-resolution clay textures, and trademark logos compiled in this portal remain the intellectual properties of Vietnam Pottery Join Stock Company. Any unauthorized scraping, mirroring, or reverse mold copying is prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">3. Limitation of Liability</h3>
              <p>
                Until signed proforma invoices are executed, all unit price estimates, estimated container packing volumes, Frost resistance tests, and sample arrival dates compile as non-binding estimates. We exclude liabilities regarding structural order adjustments or custom color matches before full muffle-kiln signatures are obtained.
              </p>
            </section>
          </>
        )}

        {mode === 'cookie' && (
          <>
            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">1. Use of LocalStorage and Transient State Cookies</h3>
              <p>
                POTTERY.VN utilizes local sandboxed sessions and standard browser LocalStorage keys (e.g., storing your selected customer flow path selection, your B2B Inquiry pool items, and your active retail shopping cart pieces) to personalize the interface.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900">2. Custom Impersonation Tool Sessions</h3>
              <p>
                For testing and auditing (utilizing the Demo Control Center simulator), simulated credentials do not send private parameters to external servers. To clear your cookie traces, simply press the "Thoát / Logout" button inside the navigation layout header.
              </p>
            </section>
          </>
        )}

      </div>

    </div>
  );
}
