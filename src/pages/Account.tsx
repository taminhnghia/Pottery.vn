/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, UserRole, TradeApplication, Order, CartItem } from '../types';
import { 
  ShoppingCart, Heart, FileText, CheckCircle2, Shield, Trash2, ArrowRight, Truck, 
  CreditCard, Clock, Search, Flame, RefreshCw, Check, CheckSquare, Box, Anchor, 
  Compass, Gift, Sparkles, Activity, AlertCircle 
} from 'lucide-react';

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

  // Real-time tracking and simulation states
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [trackError, setTrackError] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogMessage, setSimulationLogMessage] = useState('');

  // 7 Stages of the Logistical Pipeline
  const LOGISTICS_STAGES: Order['deliveryStatus'][] = [
    'Clay Forming',
    'Kiln Firing',
    'Quality Inspecting',
    'Custom Crating',
    'Out for Delivery / Port FOB',
    'Shipping Transit',
    'Delivered'
  ];

  const getSimpleShippingStatus = (status: Order['deliveryStatus']) => {
    if (['Clay Forming', 'Kiln Firing', 'Quality Inspecting'].includes(status)) {
      return { index: 0, label: t('Processing', 'Đang xử lý / Chế tác') };
    }
    if (['Custom Crating', 'Out for Delivery / Port FOB', 'Shipping Transit'].includes(status)) {
      return { index: 1, label: t('In Transit', 'Đang vận chuyển / Hải trình') };
    }
    return { index: 2, label: t('Delivered', 'Đã bàn giao hoàn tất') };
  };

  const getLogisticsStageDetails = (stage: Order['deliveryStatus']) => {
    switch (stage) {
      case 'Clay Forming':
        return {
          titleVi: 'Chế Tác Gốm Mộc',
          titleEn: 'Clay Forming Sizing',
          descVi: 'Giai đoạn nhào đất sông lọc tạp, xoay chuốt phôi bình gốm mộc nguyên bản trên bàn xoay thủ công.',
          descEn: 'Artisans purification process of river silt clay, manual wheel shaping, and air-drying raw greenware.',
          icon: <Activity className="w-5 h-5 text-amber-600 animate-pulse" />,
          colorClass: 'border-amber-400 bg-amber-50/50 text-amber-800',
          etaDays: 12,
          logs: [
            { time: '08:00 AM', textVi: 'Kiểm chuẩn tạp chất đất sét sông Hồng đã hoàn tất.', textEn: 'Hong River silt purification audit passed.' },
            { time: '10:15 AM', textVi: 'Xoay chuốt phôi gốm mộc bởi nghệ nhân chủ xưởng.', textEn: 'Spun on turntable by lead workshop artisan.' },
            { time: '15:30 PM', textVi: 'Chuyển sân đón gió tự nhiên để ráo phôi thô.', textEn: 'Relocated to shaded wind yard for natural drying.' }
          ]
        };
      case 'Kiln Firing':
        return {
          titleVi: 'Hỏa Lò Độ Cao',
          titleEn: 'High-Temp Kiln Firing',
          descVi: 'Đưa sản phẩm vào buồng lò gas trung tính nung nhiệt độ cao từ 1200°C - 1300°C để chốt mộc men hóa.',
          descEn: 'Loading raw pieces to the high-temp kiln chambers, raising fire to 1200°C to vitrify body structure.',
          icon: <Flame className="w-5 h-5 text-red-650 animate-pulse" />,
          colorClass: 'border-red-400 bg-red-50/50 text-red-800',
          etaDays: 10,
          logs: [
            { time: '07:30 AM', textVi: 'Xếp phôi mộc vào goong lò nung trung tính.', textEn: 'Stacked greenware inside neutral kiln shuttle.' },
            { time: '11:45 AM', textVi: 'Lò đạt ngưỡng nhiệt 1280°C lý tưởng của đất sét.', textEn: 'Chamber hit peak vitrification temp 1280°C.' },
            { time: '17:00 PM', textVi: 'Bắt đầu quy trình hạ nhiệt độ lò từ từ tránh sốc nứt.', textEn: 'Controlled cooling sequence initiated safely.' }
          ]
        };
      case 'Quality Inspecting':
        return {
          titleVi: 'Hậu Kiểm Âm Thanh',
          titleEn: 'Acoustic Quality Inspection',
          descVi: 'Gõ âm vang kiểm tra độ đặc rỗng bọt khí, rà soát kẽ nứt viền miệng và độ đều của nước men hỏa biến.',
          descEn: 'Testing sound resonance, audit for hidden shrinkage cracks, and checking reactive glaze flow fidelity.',
          icon: <CheckSquare className="w-5 h-5 text-teal-650" />,
          colorClass: 'border-teal-400 bg-teal-50/50 text-teal-800',
          etaDays: 8,
          logs: [
            { time: '09:00 AM', textVi: 'Dỡ lò nguội, gõ âm phát hiện rỗng nứt ẩn.', textEn: 'Chamber unloading, resonant acoustic density check.' },
            { time: '13:30 PM', textVi: 'Đạt chỉ số xuất xưởng loại 1 đối với tất cả phôi.', textEn: 'Glaze consistency certified to Premium export grade.' },
            { time: '16:15 PM', textVi: 'Đóng dấu số hiệu lô sản xuất xưởng Ceramics Việt.', textEn: 'Stamped with authorized Vietnam Kiln seal.' }
          ]
        };
      case 'Custom Crating':
        return {
          titleVi: 'Đóng Cũi Gỗ Xuất Khẩu',
          titleEn: 'Secure Export Wood Crating',
          descVi: 'Quấn giấy tổ ong giảm chấn cao, xếp gọn trong cũi gỗ đóng theo kích thước chậu mộc chống xê dịch.',
          descEn: 'Wrapping products with heavy honeycomb paper, arranging tightly in fumigated bespoke timber pallets.',
          icon: <Box className="w-5 h-5 text-yellow-650" />,
          colorClass: 'border-yellow-400 bg-yellow-50/50 text-yellow-800',
          etaDays: 6,
          logs: [
            { time: '08:30 AM', textVi: 'Gói bọc màng giấy bọt khí & tổ ong phân lớp.', textEn: 'Wrapped in multi-layer honeycomb cardboard armor.' },
            { time: '11:00 AM', textVi: 'Cố định pallet cũi gỗ nẹp sắt mạ kẽm.', textEn: 'Timber boxes sealed with heavy duty galvanized strapping.' },
            { time: '14:45 PM', textVi: 'Hun trùng cũi gỗ xuất khẩu tiêu chuẩn ISPM-15.', textEn: 'Fumigation process completed under ISPM-15 standard.' }
          ]
        };
      case 'Out for Delivery / Port FOB':
        return {
          titleVi: 'Thông Quan & Xuất Cảng',
          titleEn: 'Port FOB & Customs Clearance',
          descVi: 'Hạ bãi cảng, kẹp niêm chì (seal) container hàng sỉ, tiến hành thủ tục khai báo hải quan xuất khẩu.',
          descEn: 'Ferrying container payload to key ports, custom sealing, and logging official export declaration papers.',
          icon: <Anchor className="w-5 h-5 text-indigo-650" />,
          colorClass: 'border-indigo-400 bg-indigo-50/50 text-indigo-800',
          etaDays: 4,
          logs: [
            { time: '06:15 AM', textVi: 'Xe container chở lô hàng xuất phát từ Hải Dương ra cảng.', textEn: 'Container truck departed ceramics factory hub.' },
            { time: '10:30 AM', textVi: 'Thông quan tờ khai xuất khẩu cảng Hải Phòng.', textEn: 'Export port declaration cleared by customs desk.' },
            { time: '14:00 PM', textVi: 'Kẹp seal thép mạ vận đơn tàu đại bạt.', textEn: 'Feeder container locked with authorized metal seal.' }
          ]
        };
      case 'Shipping Transit':
        return {
          titleVi: 'Hải Trình Vượt Biển',
          titleEn: 'International Maritime Transit',
          descVi: 'Tàu mẹ chở container rời bến chạy hải lộ hỏa tốc, vượt trùng khơi hướng về bến cảng chỉ định.',
          descEn: 'Barge loading completed, container ship crossing international oceans towards target hub.',
          icon: <Compass className="w-5 h-5 text-blue-650 animate-spin-slow" />,
          colorClass: 'border-blue-400 bg-blue-50/50 text-blue-800',
          etaDays: 2,
          logs: [
            { time: '09:00 AM', textVi: 'Bốc dỡ container cố định an toàn trên boong tàu mẹ.', textEn: 'Payload container secured atop mother ocean liner.' },
            { time: '14:30 PM', textVi: 'Tàu rời cảng Hải Phòng, bắt đầu hải lộ hải trình sỉ.', textEn: 'Vessel started crossing maritime open shipping lane.' },
            { time: '21:00 PM', textVi: 'Tọa độ GPS hải trình hoạt động ổn định.', textEn: 'Vessel AIS GPS signal pinging active and on track.' }
          ]
        };
      case 'Delivered':
        return {
          titleVi: 'An Bến Đích - Hoàn Tất',
          titleEn: 'Safely Arrived & Handed Over',
          descVi: 'Dỡ container tại bến nhập, hoàn thành thông quan nhập khẩu và bàn giao kí nhận an toàn tận địa chỉ khách hàng.',
          descEn: 'Destination unloading completed, import declaration approved, final doorstep hand over confirmed.',
          icon: <Gift className="w-5 h-5 text-emerald-650" />,
          colorClass: 'border-emerald-400 bg-emerald-50/50 text-emerald-800',
          etaDays: 0,
          logs: [
            { time: '08:15 AM', textVi: 'Dỡ dỡ hàng tại cảng bến đích, hoàn thuế.', textEn: 'Destination ocean vessel offloaded and verified.' },
            { time: '11:45 AM', textVi: 'Thông quan nhập khẩu kết nối đại lý vận chuyển.', textEn: 'Import clearance approved inside destination terminal.' },
            { time: '15:30 PM', textVi: 'Ký nhận rỡ hàng an toàn tuyệt đối, không sứt mẻ.', textEn: 'Handover complete! Pristine delivery with zero chip-offs.' }
          ]
        };
      default:
        return {
          titleVi: 'Chuẩn Bị Sản Xuất',
          titleEn: 'Order Scheduled',
          descVi: 'Tiếp nhận đơn hàng mộc nung gốm lẻ, lên lịch làm mát phôi mộc.',
          descEn: 'Order queue initialized, setting up production batch schedule.',
          icon: <Clock className="w-5 h-5 text-stone-500" />,
          colorClass: 'border-stone-405 bg-stone-50 text-stone-700',
          etaDays: 14,
          logs: [
            { time: '10:00 AM', textVi: 'Tiếp nhận đơn hàng, lên kế hoạch cấp đất.', textEn: 'Processing receipt, scheduled within clay formulation queue.' }
          ]
        };
    }
  };

  const handleTrackOrder = (targetId?: string) => {
    setTrackError('');
    const lookupId = targetId || trackOrderId;

    if (!lookupId.trim()) {
      setTrackError(t('Please enter an Order ID.', 'Vui lòng nhập mã đơn hàng của bạn.'));
      setTrackedOrder(null);
      return;
    }

    const cleanedLookup = lookupId.trim().toLowerCase();
    const matched = orders.find(
      o => o.id.trim().toLowerCase() === cleanedLookup ||
           (o.trackingCode && o.trackingCode.trim().toLowerCase() === cleanedLookup)
    );

    if (matched) {
      setTrackedOrder(matched);
      if (!targetId) {
        setTrackOrderId(matched.id);
      }
    } else {
      setTrackError(
        t(
          `No order found matching "${lookupId}". Try searching 'POT-2026-1024' or check your Cart receipts.`,
          `Không tìm thấy đơn hàng tương ứng với mã "${lookupId}". Thử tài khoản 'POT-2026-1024' hoặc kiểm tra biên lai mua cá nhân.`
        )
      );
      setTrackedOrder(null);
    }
  };

  const handleSimulateLogisticsNext = () => {
    if (!trackedOrder) return;
    
    setIsSimulating(true);
    setSimulationLogMessage(t('Communicating with Bat Trang kiln telemetry sensors...', 'Đang gửi tín hiệu kết nối tới cảm biến nhiệt lò gốm Bát Tràng...'));

    const currentIndex = LOGISTICS_STAGES.indexOf(trackedOrder.deliveryStatus);
    const nextIndex = currentIndex < LOGISTICS_STAGES.length - 1 ? currentIndex + 1 : 0;
    const nextStatus = LOGISTICS_STAGES[nextIndex];

    setTimeout(() => {
      setSimulationLogMessage(
        nextIndex === 0 
          ? t('Resetting simulated loop to Clay Forming...', 'Đang hoàn vòng chu kỳ sản xuất quay lại chế tác phôi mộc...')
          : t(`Switching stage payload to: ${nextStatus}...`, `Đang nâng cấp trạng thái hải trình sang: ${nextStatus}...`)
      );

      setTimeout(() => {
        // Update order status in core orders state list
        setOrders(prevOrders => 
          prevOrders.map(o => o.id === trackedOrder.id ? { ...o, deliveryStatus: nextStatus } : o)
        );

        // Update the active tracker view state
        setTrackedOrder(prev => prev ? { ...prev, deliveryStatus: nextStatus } : null);
        
        setIsSimulating(false);
        setSimulationLogMessage('');
      }, 700);
    }, 850);
  };

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

            {/* Instant Real-Time Order Tracking Desk */}
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-lg space-y-4 text-left">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-stone-850 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <Search size={14} className="text-pottery-terracotta animate-pulse" />
                  <span>{t('Instant Ceramic Shipment Locator', 'Kính Định Vị Hoạt Trình Giao Vận')}</span>
                </h3>
                <p className="text-[11px] text-stone-500 leading-normal">
                  {t(
                    'Input any Order reference (e.g., POT-2026-1024 or self-checkout ID) to query Kiln temperatures, packaging, customs status, and vessel coordinates in real-time.',
                    'Điền mã vận đơn hoặc mã số đơn hàng (Ví dụ: POT-2026-1024 hoặc mã đơn tự mua lẻ) để truy vấn tiến độ lò nung, đóng cũi và định vị hải lộ tức thì.'
                  )}
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={(e) => { e.preventDefault(); handleTrackOrder(); }} className="flex gap-2">
                <input
                  type="text"
                  value={trackOrderId}
                  onChange={(e) => setTrackOrderId(e.target.value)}
                  placeholder={t('e.g., POT-2026-1024', 'Ví dụ: POT-2026-1024')}
                  className="flex-1 bg-white border border-stone-250 p-2.5 rounded text-xs font-mono focus:outline-none focus:border-pottery-terracotta text-stone-850"
                />
                <button
                  type="submit"
                  className="bg-pottery-charcoal hover:bg-black text-white px-4 py-2.5 rounded text-xs font-mono uppercase tracking-wider font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Search size={13} />
                  <span>{t('Locate', 'Định Vị')}</span>
                </button>
              </form>

              {/* Quick Scan Selection list */}
              {orders.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-stone-500 font-mono">
                  <span>{t('Quick Scan:', 'Quét nhanh:')}</span>
                  {orders.slice(0, 4).map((o) => (
                    <button
                      key={o.id}
                      onClick={() => handleTrackOrder(o.id)}
                      className="bg-white hover:bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-stone-650 cursor-pointer transition font-bold"
                    >
                      {o.id}
                    </button>
                  ))}
                </div>
              )}

              {/* Error log feedback */}
              {trackError && (
                <div className="text-[11px] bg-rose-50 border border-rose-150 text-rose-700 p-3 rounded font-mono flex items-center gap-1.5 animate-in fade-in duration-300">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}

              {/* Rich Live Tracking Information Display */}
              {trackedOrder && (() => {
                const stageInfo = getLogisticsStageDetails(trackedOrder.deliveryStatus);
                const currentStageIdx = LOGISTICS_STAGES.indexOf(trackedOrder.deliveryStatus);
                
                return (
                  <div className="border border-stone-250 bg-white rounded-lg p-5 space-y-5 shadow-xs animate-in fade-in duration-300 text-stone-850">
                    
                    {/* Header info row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-pottery-terracotta uppercase bg-pottery-ivory px-2 py-0.5 rounded border border-pottery-sand/30">
                            {trackedOrder.orderType === 'B2B Wholesale' ? 'B2B SHIPMENT' : 'RETAIL SHIPMENT'}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400">ID: {trackedOrder.id} • {trackedOrder.orderDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 mt-1">{trackedOrder.customerName}</h4>
                        <p className="text-[10px] text-stone-400 font-mono mt-0.5">{trackedOrder.shippingAddress}</p>
                      </div>

                      {/* Interactive Milestone Progress Loops */}
                      <div className="space-y-1.5 shrink-0 w-full sm:w-auto text-left sm:text-right">
                        <button
                          onClick={handleSimulateLogisticsNext}
                          disabled={isSimulating}
                          className="bg-stone-50 hover:bg-stone-100 border border-stone-250 text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded text-[11px] font-mono flex items-center gap-1.5 w-full sm:w-auto justify-center cursor-pointer transition"
                          title={t('Test real-time status update loop', 'Giả lập tiến hành công đoạn hậu cần thực tế')}
                        >
                          <RefreshCw size={12} className={isSimulating ? 'animate-spin text-pottery-terracotta' : 'text-stone-500'} />
                          <span>{isSimulating ? t('Advancing...', 'Đang cập nhật...') : t('Simulate Next Stage', 'Giả Lập Bước Kế')}</span>
                        </button>
                        {isSimulating && simulationLogMessage && (
                          <div className="text-[8px] font-mono text-pottery-terracotta tracking-tight animate-pulse text-left sm:text-right">
                            {simulationLogMessage}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* High-level shipping status progress indicator (Processing, In Transit, Delivered) */}
                    <div className="bg-[#FAF8F5] border border-stone-200/50 p-4 rounded-sm space-y-4">
                      <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded border border-stone-150">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase">
                          {t('Core Delivery Status', 'TRẠNG THÁI GIAO VẬN HẢI QUAN')}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-pottery-terracotta uppercase">
                          {getSimpleShippingStatus(trackedOrder.deliveryStatus).label}
                        </span>
                      </div>

                      <div className="relative flex justify-between mx-auto max-w-sm pt-2 mb-1">
                        {/* Connecting background progress tracks */}
                        <div className="absolute top-4 left-4 right-4 h-0.5 bg-stone-200 -z-0" />
                        <div 
                          className="absolute top-4 left-4 h-0.5 bg-pottery-terracotta transition-all duration-500 -z-0"
                          style={{ 
                            width: `${getSimpleShippingStatus(trackedOrder.deliveryStatus).index * 50}%` 
                          }}
                        />

                        {/* Three Key Milestones */}
                        {[
                          { key: 'processing', labelEn: 'Processing', labelVi: 'Chế Tác / Chờ Sắp Lịch' },
                          { key: 'transit', labelEn: 'In Transit', labelVi: 'Đang Vận Chuyển' },
                          { key: 'delivered', labelEn: 'Delivered', labelVi: 'Đã Bàn Giao Thượng Khách' }
                        ].map((item, idx) => {
                          const simpleIndex = getSimpleShippingStatus(trackedOrder.deliveryStatus).index;
                          const isCompleted = idx < simpleIndex;
                          const isActive = idx === simpleIndex;

                          let circleStyle = 'bg-stone-100 border-stone-200 text-stone-400';
                          if (isCompleted) {
                            circleStyle = 'bg-pottery-terracotta border-pottery-terracotta text-white shadow-xs';
                          } else if (isActive) {
                            circleStyle = 'bg-white border-pottery-terracotta text-pottery-terracotta ring-4 ring-pottery-terracotta/15 font-bold';
                          }

                          return (
                            <div key={item.key} className="flex flex-col items-center relative z-10 w-28">
                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs transition-all duration-300 ${circleStyle}`}>
                                {isCompleted ? (
                                  <Check size={14} className="stroke-[3]" />
                                ) : (
                                  <span>{idx + 1}</span>
                                )}
                              </div>
                              <span className={`text-[9.5px] font-mono tracking-tight mt-2 text-center leading-tight ${isActive ? 'font-bold text-pottery-terracotta' : 'text-stone-500'}`}>
                                {t(item.labelEn, item.labelVi)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step Timeline Indicator with clickable nodes */}
                    <div className="space-y-3">
                      <div className="relative pt-1.5">
                        <div className="absolute top-[18px] left-[5%] right-[5%] h-0.5 bg-stone-100 -z-0" />
                        <div 
                          className="absolute top-[18px] left-[5%] h-0.5 bg-emerald-500 transition-all duration-500 -z-0"
                          style={{ width: `${(currentStageIdx / (LOGISTICS_STAGES.length - 1)) * 90}%` }}
                        />

                        {/* Node Bubble Buttons */}
                        <div className="relative z-10 flex justify-between select-none">
                          {LOGISTICS_STAGES.map((st, sidx) => {
                            const isCompleted = sidx < currentStageIdx;
                            const isActive = sidx === currentStageIdx;
                            
                            let bubbleColor = 'bg-stone-100 border-stone-200 text-stone-400';
                            if (isCompleted) bubbleColor = 'bg-emerald-500 border-emerald-500 text-white';
                            if (isActive) bubbleColor = 'bg-white border-pottery-terracotta text-pottery-terracotta ring-4 ring-pottery-terracotta/10';

                            return (
                              <button
                                key={st}
                                onClick={() => {
                                  // Update general records
                                  setOrders(prev => prev.map(o => o.id === trackedOrder.id ? { ...o, deliveryStatus: st } : o));
                                  setTrackedOrder(prev => prev ? { ...prev, deliveryStatus: st } : null);
                                }}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold transition duration-200 cursor-pointer ${bubbleColor}`}
                                title={t(`Jump to: ${st}`, `Chuyển nhanh tới: ${st}`)}
                              >
                                {isCompleted ? <Check size={11} className="stroke-[3]" /> : sidx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Small node caption text */}
                      <div className="grid grid-cols-7 gap-1 text-[8px] sm:text-[9px] font-mono text-center text-stone-400 leading-tight">
                        <div>{t('Raw Shape', 'Tạo Mộc')}</div>
                        <div>{t('Hỏa Lò', 'Hỏa Lò')}</div>
                        <div>{t('Inspector', 'Hậu Kiểm')}</div>
                        <div>{t('Crating', 'Đóng Cũi')}</div>
                        <div>{t('Out Port', 'Hạ Cảng')}</div>
                        <div>{t('Transit', 'Hải Trình')}</div>
                        <div>{t('Arrived', 'An Bến')}</div>
                      </div>
                    </div>

                    {/* Stage status statement card */}
                    <div className={`p-4 rounded border flex gap-3.5 items-start text-xs leading-relaxed ${stageInfo.colorClass}`}>
                      <div className="p-2 bg-white rounded-full border border-stone-200 shrink-0">
                        {stageInfo.icon}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1">
                          <h5 className="font-bold text-stone-900">
                            {language === 'vi' ? stageInfo.titleVi : stageInfo.titleEn}
                          </h5>
                          {stageInfo.etaDays > 0 ? (
                            <span className="text-[10px] font-mono font-semibold">
                              ETA: ~{stageInfo.etaDays} {t('days to handover', 'ngày tới bàn giao')}
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold text-emerald-700">
                              ✓ {t('Journey Completed', 'Hải trình hoàn thành')}
                            </span>
                          )}
                        </div>
                        <p className="text-stone-650 text-[11px]">
                          {language === 'vi' ? stageInfo.descVi : stageInfo.descEn}
                        </p>
                      </div>
                    </div>

                    {/* Sensor & Signal Logs list */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#9C8470] block font-bold">
                        🛰️ {t('REAL-TIME SIGNAL RETRIEVED (BAT TRANG HUB)', 'TÍN HIỆU ĐỊNH VỊ THỰC TẾ (LÒ GỐM BÁT TRÀNG & HẢI CẢNG)')}
                      </span>
                      <div className="border border-stone-150 rounded overflow-hidden divide-y divide-[#EBE8E2] font-mono text-[10px]">
                        {stageInfo.logs.map((log, lidx) => (
                          <div key={lidx} className="flex gap-4 p-2.5 bg-stone-50/50 hover:bg-stone-50/80 transition">
                            <span className="text-pottery-terracotta font-bold shrink-0">{log.time}</span>
                            <span className="text-stone-600 flex-1">
                              {language === 'vi' ? log.textVi : log.textEn}
                            </span>
                            <span className="text-[8px] text-emerald-600 font-bold uppercase shrink-0">
                              {t('Vrf Sec', 'Xác thực')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Logistics metadata summaries */}
                    <div className="bg-[#FCFAF7] p-3.5 rounded border border-stone-200 flex flex-wrap gap-x-6 gap-y-2 justify-between text-[11px] font-mono text-stone-650">
                      <div>
                        <span>{t('Outpost Contract value:', 'Trị giá đơn lẻ:')}</span>{' '}
                        <strong className="text-stone-900">US$ {trackedOrder.totalAmount.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span>{t('Cargo Carrier:', 'Đội xe Giao nhận:')}</span>{' '}
                        <strong className="text-stone-900">{trackedOrder.carrierName || 'Vietnam Ceramics Fleet'}</strong>
                      </div>
                      <div>
                        <span>{t('Voyage Vessel ID / Code:', 'Ký hiệu vận đơn:')}</span>{' '}
                        <strong className="text-stone-900">{trackedOrder.trackingCode || 'FOB-VTN-2026'}</strong>
                      </div>
                    </div>

                  </div>
                );
              })()}
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
