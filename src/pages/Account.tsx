/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product, UserRole, TradeApplication, Order, CartItem } from '../types';
import { ShoppingCart, Heart, FileText, CheckCircle2, Shield, Trash2, ArrowRight, Truck, CreditCard, Clock } from 'lucide-react';

interface AccountProps {
  language: 'en' | 'vi';
  currentRole: UserRole;
  cart: CartItem[];
  inquiry: Product[];
  savedProducts: Product[];
  tradeApplications: TradeApplication[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onNavigate: (path: string) => void;
  onUpdateCartQty: (cartItemId: string, qty: number) => void;
  onRemoveFromCart: (cartItemId: string) => void;
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
  orders,
  setOrders,
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
    const sizeFactor = current.selectedSize?.priceFactor ?? 1.0;
    const setFactor = current.selectedSet?.priceFactor ?? 1.0;
    const basePrice = current.product.retailPrice ?? 35.00;
    return overall + (basePrice * sizeFactor * setFactor) * current.qty;
  }, 0);

  const handleRetailCheckout = () => {
    if (cart.length === 0) return;

    const orderItems = cart.map(item => {
      const sizeFactor = item.selectedSize?.priceFactor ?? 1.0;
      const setFactor = item.selectedSet?.priceFactor ?? 1.0;
      const basePrice = item.product.retailPrice ?? 35.00;
      const adjustedPrice = basePrice * sizeFactor * setFactor;
      
      const sizeLabel = item.selectedSize ? ` (${item.selectedSize.name})` : '';
      const setLabel = item.selectedSet ? ` • ${item.selectedSet.name}` : '';
      
      return {
        productId: item.product.id,
        productName: `${item.product.name}${sizeLabel}${setLabel}`,
        sku: item.selectedSize || item.selectedSet 
          ? `${item.product.SKU}-${item.selectedSize?.name || 'DEF'}-${item.selectedSet?.name.replace(/\s+/g, '') || 'DEF'}`
          : item.product.SKU,
        image: item.product.mainImage,
        quantity: item.qty,
        price: adjustedPrice
      };
    });

    const newOrder: Order = {
      id: `POT-R-${Math.floor(Math.random() * 90000 + 10000)}`,
      customerId: 'USR-0452', // Assign to Elena Petrova
      customerName: 'Elena Petrova',
      customerEmail: 'elena.petrova@decorlux.cz',
      orderType: 'Retail',
      orderDate: new Date().toISOString().split('T')[0],
      items: orderItems,
      totalAmount: totalCartValue,
      paidAmount: totalCartValue,
      paymentStatus: 'Fully Paid',
      paymentMethod: 'Direct Bank Transfer',
      deliveryStatus: 'Clay Forming',
      deliveryDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      carrierName: 'DHL Express',
      trackingCode: `TRK-${Math.floor(Math.random() * 900000 + 100000)}`,
      shippingAddress: 'Prague 1 Old Town, Czech Republic',
      notes: 'Customer self-checkout via Retail Shopping Bag.'
    };

    setOrders(prev => [newOrder, ...prev]);
    onClearCart();
    alert(t(
      'Simulated checkout complete! Your order has been registered in the system. Check the logistical timeline tracker down below!',
      'Tất toán đơn hàng giả lập thành công! Bản ghi đã cập nhật vào Sổ cái. Lộ trình chế tác gốm chi tiết hiển thị ở bảng thống kê phía bên dưới.'
    ));
  };

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
                    {cart.map((item) => {
                      const itemSizePrice = (item.product.retailPrice || 35.00) * (item.selectedSize?.priceFactor ?? 1.0) * (item.selectedSet?.priceFactor ?? 1.0);
                      
                      return (
                        <tr key={item.id} className="border-b border-stone-100 font-sans">
                          <td className="p-3 flex items-center gap-3">
                            <img src={item.product.mainImage} className="w-10 h-10 object-cover rounded" alt={item.product.name} />
                            <div>
                              <strong className="block text-stone-800 line-clamp-1">{item.product.name}</strong>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] text-stone-400 font-mono">{item.product.SKU}</span>
                                {item.selectedSize && (
                                  <span className="bg-stone-100 text-stone-600 px-1 py-0.5 rounded text-[9px] font-mono leading-none" title={item.selectedSize.dimensions}>
                                    📐 {item.selectedSize.name}
                                  </span>
                                )}
                                {item.selectedSet && (
                                  <span className="bg-pottery-ivory text-pottery-terracotta px-1 py-0.5 rounded text-[9px] font-mono leading-none">
                                    📦 {item.selectedSet.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) => onUpdateCartQty(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 text-center border border-stone-250 p-1 rounded"
                            />
                          </td>
                          <td className="p-3 text-right font-mono font-bold">
                            US$ {itemSizePrice.toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-pottery-charcoal">
                            US$ {(itemSizePrice * item.qty).toFixed(2)}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-stone-400 hover:text-red-500 transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
                      onClick={handleRetailCheckout}
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

          {/* Section 3: Live Orders, Deliveries & Payments Tracking */}
          <div className="space-y-6 pt-8 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-pottery-charcoal flex items-center gap-2">
                <Truck size={18} className="text-pottery-terracotta" />
                <span>{t('Your Orders, Delivery & Payments Tracking', 'Quản lý Đơn Hàng & Thống Kê Giao Vận')}</span>
              </h2>
              <span className="text-[10px] text-stone-400 font-mono uppercase bg-stone-100 px-2 py-0.5 rounded font-bold">
                {t('REAL-TIME TIMELINES', 'HOẠT TRÌNH THỰC TẾ')}
              </span>
            </div>

            {(() => {
              const relevantOrders = orders.filter(o => {
                if (currentRole === 'approved_b2b_buyer' || currentRole === 'strategic_distributor') {
                  return o.orderType === 'B2B Wholesale';
                } else {
                  return o.orderType === 'Retail';
                }
              });

              if (relevantOrders.length === 0) {
                return (
                  <div className="border border-dashed border-stone-200 p-8 rounded text-center text-xs text-stone-400 bg-stone-50/10">
                    <p>{t('No current active orders found under your privilege level.', 'Chưa ghi nhận đơn hàng chủ quản nào khớp đặc quyền hiện hành.')}</p>
                    <p className="text-[10px] text-stone-400 mt-1">
                      {t('Simulate retail purchases above or ask Admin to assign a B2B contract block.', 'Vui lòng thực hiện đặt mua lẻ phía trên hoặc kết nối với Admin để lên hồ sơ sỉ FOB.')}
                    </p>
                  </div>
                );
              }

              return (
                <div className="space-y-5">
                  {relevantOrders.map(order => {
                    const balanceDue = order.totalAmount - order.paidAmount;
                    
                    return (
                      <div key={order.id} className="bg-white border border-pottery-ivory rounded-lg p-5 space-y-4 shadow-sm text-left">
                        
                        {/* Order Header bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                          <div>
                            <span className="text-[9px] text-stone-400 font-mono block">REF ID: {order.id} • {order.orderDate}</span>
                            <span className="text-xs uppercase font-bold text-pottery-charcoal">{order.customerName}</span>
                          </div>
                          
                          <div className="flex gap-1.5 items-center">
                            <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded ${
                              order.paymentStatus === 'Fully Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              💳 {t(order.paymentStatus, order.paymentStatus)}
                            </span>
                            <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-full ${
                              order.deliveryStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-150 text-stone-600'
                            }`}>
                              🚢 {t(order.deliveryStatus, order.deliveryStatus)}
                            </span>
                          </div>
                        </div>

                        {/* Order Wares */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          <div className="space-y-2 border-r border-stone-100 pr-2">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 block font-bold">🛒 {t('Porcelain Wares Ledger', 'Sản phẩm mộc nung')}</span>
                            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <img src={it.image} className="w-8 h-8 object-cover rounded" alt={it.productName} />
                                  <div className="truncate flex-1">
                                    <strong className="block text-stone-800 truncate">{it.productName}</strong>
                                    <span className="text-[9px] text-stone-400 font-mono">{it.sku} • {it.quantity} pcs @ ${it.price.toFixed(2)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Financial terms */}
                          <div className="space-y-2 text-xs leading-normal">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 block font-bold">💰 {t('Payment Condition Tracing', 'Theo dõi thanh toán')}</span>
                            <div className="space-y-1 bg-stone-50 p-2.5 rounded font-mono text-[11px]">
                              <div className="flex justify-between">
                                <span className="text-stone-500">{t('Total contract:', 'Tổng giá trị:')}</span>
                                <strong className="text-stone-850">US$ {order.totalAmount.toFixed(2)}</strong>
                              </div>
                              <div className="flex justify-between text-emerald-700 font-bold">
                                <span>{t('Total paid:', 'Đã đặt cọc:')}</span>
                                <span>US$ {order.paidAmount.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between border-t border-dashed border-stone-200 pt-1 text-stone-700 font-semibold">
                                <span>{t('Outstanding due:', 'Còn lại nợ:')}</span>
                                <span className={balanceDue > 0 ? 'text-amber-700' : 'text-emerald-800'}>
                                  US$ {balanceDue.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <p className="text-[9px] text-stone-400 italic">Method: {order.paymentMethod}</p>
                          </div>

                        </div>

                        {/* Interactive Timed Milestones */}
                        <div className="bg-stone-50 border border-stone-200 rounded p-4 space-y-3">
                          <div className="flex justify-between items-baseline border-b border-stone-150 pb-1 text-[10px]">
                            <span className="font-mono uppercase font-bold text-pottery-terracotta">🚢 {t('Logistical progress tracker', 'Xác định hoạt lộ giao vận')}</span>
                            <span className="font-sans font-medium text-stone-500">ETA: {order.deliveryDate} ({order.carrierName || 'TBA'})</span>
                          </div>

                          <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-sans">
                            
                            {/* Clay forming */}
                            <div className="space-y-1 text-[9px] sm:text-[10px]">
                              <div className="h-1 bg-emerald-500 rounded-full"></div>
                              <strong className="block text-emerald-700">Mộc</strong>
                              <span className="text-[8px] text-stone-400 block leading-tight">{t('Forms made', 'Thành hình')}</span>
                            </div>

                            {/* Kiln */}
                            <div className="space-y-1 text-[9px] sm:text-[10px]">
                              <div className={`h-1 rounded-full ${
                                ['Kiln Firing', 'Quality Inspecting', 'Custom Crating', 'Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered'].includes(order.deliveryStatus) 
                                  ? 'bg-emerald-500' 
                                  : 'bg-stone-200'
                              }`}></div>
                              <strong className={['Kiln Firing', 'Quality Inspecting', 'Custom Crating', 'Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered'].includes(order.deliveryStatus) ? 'text-emerald-700' : 'text-stone-400'}>Hỏa Lò</strong>
                              <span className="text-[8px] text-stone-400 block leading-tight">{t('1200°C Fire', 'Nung lò')}</span>
                            </div>

                            {/* Packing/Port */}
                            <div className="space-y-1 text-[9px] sm:text-[10px]">
                              <div className={`h-1 rounded-full ${
                                ['Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered'].includes(order.deliveryStatus) 
                                  ? 'bg-emerald-500' 
                                  : ['Quality Inspecting', 'Custom Crating'].includes(order.deliveryStatus) ? 'bg-amber-400 animate-pulse' : 'bg-stone-200'
                              }`}></div>
                              <strong className={['Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered', 'Quality Inspecting', 'Custom Crating'].includes(order.deliveryStatus) ? 'text-emerald-700 font-bold' : 'text-stone-400'}>Cảng FOB</strong>
                              <span className="text-[8px] text-stone-400 block leading-tight">{t('Dispatcher', 'Cũi gỗ gọn')}</span>
                            </div>

                            {/* Shipping */}
                            <div className="space-y-1 text-[9px] sm:text-[10px]">
                              <div className={`h-1 rounded-full ${
                                order.deliveryStatus === 'Delivered' 
                                  ? 'bg-emerald-500' 
                                  : order.deliveryStatus === 'Shipping Transit' ? 'bg-amber-400 animate-pulse' : 'bg-stone-200'
                              }`}></div>
                              <strong className={order.deliveryStatus === 'Delivered' ? 'text-emerald-700 font-bold' : order.deliveryStatus === 'Shipping Transit' ? 'text-amber-700 font-bold' : 'text-stone-400'}>An bến</strong>
                              <span className="text-[8px] text-stone-400 block leading-tight">{t('Cargo Sea', 'Vượt biển')}</span>
                            </div>

                          </div>

                          {order.trackingCode && (
                            <div className="text-[9px] font-mono text-stone-400 text-right pt-1.5 border-t border-stone-100">
                              {t('Tracking Vessel ID:', 'Ký hiệu vận đơn Hải trình:')} <strong className="text-stone-700">{order.trackingCode}</strong>
                            </div>
                          )}

                        </div>

                      </div>
                    );
                  })}
                </div>
              );
            })()}
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
