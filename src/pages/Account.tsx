/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product, UserRole, TradeApplication } from '../types';
import { ShoppingCart, Heart, FileText, CheckCircle2, Shield, Trash2, ArrowRight } from 'lucide-react';

interface AccountProps {
  language: 'en' | 'vi';
  currentRole: UserRole;
  cart: { product: Product; qty: number }[];
  inquiry: Product[];
  savedProducts: Product[];
  tradeApplications: TradeApplication[];
  onNavigate: (path: string) => void;
  onUpdateCartQty: (productId: string, qty: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onRemoveFromInquiry: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onClearCart: () => void;
  onClearInquiry: () => void;
  onSubmitInquiry: () => void;
}

export default function Account({
  language,
  currentRole,
  cart,
  inquiry,
  savedProducts,
  tradeApplications,
  onNavigate,
  onUpdateCartQty,
  onRemoveFromCart,
  onRemoveFromInquiry,
  onAddToCart,
  onClearCart,
  onClearInquiry,
  onSubmitInquiry
}: AccountProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Cart pricing calculation
  const totalCartValue = cart.reduce((overall, current) => {
    return overall + (current.product.retailPrice || 0) * current.qty;
  }, 0);

  const getRoleLabel = () => {
    if (currentRole === 'admin') return t('System Administrator', 'Trưởng Ban Quản trị hệ thống');
    if (currentRole === 'approved_b2b_buyer') return t('Approved B2B Wholesaler', 'Đối tác Wholesaler B2B đã Duyệt');
    return t('Retail Guest / Local Visitor', 'Khách Vãng Lai / Mua lẻ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Title */}
      <div className="border-b border-pottery-ivory pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-pottery-terracotta tracking-wider">{t('PERSONAL BUYING DASHBOARD', 'BÀN TRÀ SOURCING CÁ NHÂN')}</span>
          <h1 className="text-3xl font-serif text-pottery-charcoal">{t('Your Account Space', 'Không Gian Tài Khoản')}</h1>
        </div>

        <div className="bg-pottery-ivory rounded px-4 py-2 text-xs flex items-center gap-2 border border-pottery-sand/30 font-mono">
          <Shield size={16} className="text-pottery-terracotta shrink-0" />
          <div className="space-y-0.5">
            <span className="text-[9px] text-stone-400 uppercase block">{t('ACTIVE PRIVILEGES:', 'QUYỀN HẠN TRUY CẬP:')}</span>
            <strong className="text-stone-800">{getRoleLabel()}</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Cart & Inquiry forms (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Section 1: Retail Shopping Bag */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-pottery-charcoal flex items-center gap-2">
              <ShoppingCart size={18} className="text-pottery-terracotta" />
              <span>{t('Your Retail Cart Bag', 'Giỏ hàng Khách Mua Lẻ')}</span>
            </h2>

            {cart.length === 0 ? (
              <div className="border border-dashed border-stone-200 p-8 rounded text-center text-xs text-stone-400 space-y-2">
                <p>{t('Your retail shopping cart is empty.', 'Giỏ hàng lẻ của bạn đang trống.')}</p>
                <button
                  onClick={() => onNavigate('/products')}
                  className="text-pottery-terracotta underline font-bold"
                >
                  {t('Browse and shop retail gốm', 'Mua sắm bình gốm hỏa biến')}
                </button>
              </div>
            ) : (
              <div className="border border-pottery-ivory bg-white rounded overflow-hidden">
                <table className="w-full text-xs text-stone-650">
                  <thead className="bg-stone-50 text-stone-600 font-mono text-[10px] border-b border-stone-150">
                    <tr>
                      <th className="p-3 text-left">{t('Product Name', 'Chi Tiết Gốm')}</th>
                      <th className="p-3 text-center">{t('Quantity', 'Số lượng')}</th>
                      <th className="p-3 text-right">{t('Unit Price', 'Giá lẻ gốc')}</th>
                      <th className="p-3 text-right">{t('Subtotal', 'Tổng cộng')}</th>
                      <th className="p-3 text-center">{t('Remove', 'Hủy')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.product.id} className="border-b border-stone-100 font-sans">
                        <td className="p-3 flex items-center gap-3">
                          <img src={item.product.mainImage} className="w-10 h-10 object-cover rounded" alt={item.product.name} />
                          <div>
                            <strong className="block text-stone-800 line-clamp-1">{item.product.name}</strong>
                            <span className="text-[10px] text-stone-400 font-mono">{item.product.SKU}</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => onUpdateCartQty(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border border-stone-250 p-1 rounded"
                          />
                        </td>
                        <td className="p-3 text-right font-mono font-bold">
                          US$ {item.product.retailPrice?.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-pottery-charcoal">
                          US$ {((item.product.retailPrice || 0) * item.qty).toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => onRemoveFromCart(item.product.id)}
                            className="text-stone-400 hover:text-red-500 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Subtotal bar */}
                <div className="bg-stone-50/50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-stone-150 text-xs">
                  <div className="font-mono text-stone-600">
                    {t('Final Checkout Total Container Sizing:', 'Tổng giá trị đơn lẻ:')} <strong className="text-pottery-charcoal text-sm">US$ {totalCartValue.toFixed(2)}</strong>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={onClearCart}
                      className="text-stone-500 hover:bg-stone-100 border border-stone-200 p-2 text-[10px] uppercase font-bold tracking-wider rounded"
                    >
                      {t('Clear Cart Bag', 'Dọn rỗng')}
                    </button>
                    <button
                      onClick={() => {
                        alert(t('Your retail order is simulated! A billing counselor will contact soon.', 'Đơn mua lẻ của bạn đã giả lập thành công! Nhân viên bán lẻ sẽ gửi xác nhận địa chỉ giao hàng.'));
                        onClearCart();
                      }}
                      className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white p-2 px-4 text-[10px] uppercase font-bold tracking-wider rounded transition"
                    >
                      {t('Simulate Order Checkout', 'Thanh Toán Giả Lập')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Wholesale RFQ Inquiry Pool */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-pottery-charcoal flex items-center gap-2">
              <FileText size={18} className="text-pottery-terracotta" />
              <span>{t('Your Wholesale RFQ Inquiry Pool', 'Phiếu Trưng Cầu Giá Sỉ FOB')}</span>
            </h2>

            {inquiry.length === 0 ? (
              <div className="border border-dashed border-stone-200 p-8 rounded text-center text-xs text-stone-400 space-y-2 bg-stone-50/20">
                <p>{t('No items are loaded in your B2B Inquiry pool.', 'Chưa có mẫu chậu mộc nào được thêm vào danh bản hỏi FOB.')}</p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => onNavigate('/products')} className="text-pottery-terracotta underline font-bold">
                    {t('Browse Trade catalog', 'Khảo sát dòng chậu mộc')}
                  </button>
                  <span>•</span>
                  <button onClick={() => onNavigate('/trade')} className="text-stone-600 underline font-semibold">
                    {t('Read export standard instructions', 'Xem quy chế xuất khẩu')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-pottery-ivory bg-white rounded overflow-hidden">
                <div className="p-4 bg-stone-50 text-stone-600 text-xs flex items-center gap-1.5 border-b border-stone-150 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>{t('DRAFT SKUs SELECTED FOR RFQ QUOTE EVALUATION:', 'DANH SÁCH MÃ GỐM KHẢO SÁT CHỐT FOB:')}</span>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inquiry.map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between border border-stone-100 p-3 rounded bg-white">
                      <div className="flex items-center gap-3">
                        <img src={prod.mainImage} className="w-10 h-10 object-cover rounded" alt={prod.name} />
                        <div>
                          <h4 className="text-xs font-bold text-stone-800 line-clamp-1">{prod.name}</h4>
                          <span className="text-[10px] text-stone-400 font-mono">{prod.SKU} • {prod.category}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onRemoveFromInquiry(prod.id)}
                        className="text-stone-400 hover:text-red-500 p-1"
                        title={t('Remove code', 'Xóa bỏ khỏi danh bản')}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-stone-50 p-4 border-t border-stone-150 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-mono">{inquiry.length} {t('Items in RFQ Pool', 'mã chậu mộc')}</span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={onClearInquiry}
                      className="text-stone-500 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded uppercase font-mono tracking-wider font-bold text-[10px]"
                    >
                      {t('Clear List', 'Hủy danh sách')}
                    </button>
                    <button
                      onClick={onSubmitInquiry}
                      className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-4 py-1.5 rounded uppercase font-mono tracking-wider font-bold text-[10px] transition"
                    >
                      {t('Submit FOB Quote Request', 'Gửi Phiếu Báo Giá FOB')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right column: Saved items & Historical lists (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Saved Items */}
          <div className="bg-white rounded-lg border border-pottery-ivory p-6 space-y-4 shadow-sm">
            <h3 className="font-serif font-bold text-stone-950 text-sm flex items-center gap-2 border-b border-stone-100 pb-2">
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>{t('Saved Wishlist Pieces', 'Tuyển lựa Gốm đã Lưu')}</span>
            </h3>

            {savedProducts.length === 0 ? (
              <p className="text-[11px] text-stone-400 text-center py-4">{t('No products are marked as favorites yet.', 'Chưa lựa gốm mẫu nào vào mục ưa thích.')}</p>
            ) : (
              <div className="space-y-3">
                {savedProducts.map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between text-xs border-b border-stone-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <img src={prod.mainImage} className="w-8 h-8 object-cover rounded" alt={prod.name} />
                      <div className="max-w-[150px]">
                        <strong className="block text-stone-850 truncate">{prod.name}</strong>
                        <span className="text-[9px] text-stone-400 block font-mono">{prod.SKU}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(prod)}
                      className="text-[9px] font-mono text-pottery-terracotta uppercase font-bold hover:underline"
                    >
                      {t('+ Cart', '+ Giỏ')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sourcing Submission logs */}
          <div className="bg-stone-50 rounded-lg p-6 space-y-4 border border-stone-200">
            <h3 className="font-serif font-bold text-stone-900 text-sm border-b border-stone-200 pb-2 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>{t('Your Sourcing Log Tracker', 'Bản Theo Dõi Đơn Khảo Sát')}</span>
            </h3>

            {tradeApplications.length === 0 ? (
              <p className="text-[11px] text-stone-400">{t('No active trade logs found for this session.', 'Chưa ghi nhận hoạt trình kinh doanh B2B nào.')}</p>
            ) : (
              <div className="space-y-3 font-mono text-[10px]">
                {tradeApplications.map((app) => (
                  <div key={app.id} className="bg-white border border-stone-200 p-3 rounded space-y-2">
                    <div className="flex justify-between items-center bg-stone-50 p-1.5 rounded">
                      <strong className="text-stone-800">{app.id}</strong>
                      <span className={`px-1.5 py-0.5 rounded uppercase font-bold text-[8px] ${
                        app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status === 'approved' ? t('APPROVED', 'ĐÃ DUYỆT') : t('POST-AUDIT PENDING', 'CHỜ HẬU KIỂM')}
                      </span>
                    </div>
                    <div className="text-stone-500 text-[8px] space-y-0.5">
                      <div>Company: <span className="text-stone-700">{app.companyName}</span></div>
                      <div>Contact: <span className="text-stone-700">{app.contactName}</span></div>
                      <div>Registration: <span className="text-stone-700">{app.businessRegistrationNumber}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
