/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Order, OrderItem, Product, User } from '../../types';
import { 
  ShoppingBag, Calendar, DollarSign, Plus, Edit, Trash2, Search, Filter, 
  MapPin, Clock, Truck, ShieldAlert, CheckCircle2, ListFilter, CreditCard,
  TrendingUp, CreditCard as CardIcon, ChevronRight, X, AlertCircle
} from 'lucide-react';

interface OrdersTabProps {
  language: 'en' | 'vi';
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  products: Product[];
  registeredUsers: User[];
}

export default function OrdersTab({
  language,
  orders,
  setOrders,
  products,
  registeredUsers
}: OrdersTabProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Filter states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState<'All' | 'Retail' | 'B2B Wholesale'>('All');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('All');
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState<string>('All');

  // Modals / forms state
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingOrderDetails, setViewingOrderDetails] = useState<Order | null>(null);

  // New Order Form state
  const [newOrderForm, setNewOrderForm] = useState({
    customerId: '', // USR-xxx or empty for guest
    guestName: '',
    guestEmail: '',
    orderType: 'Retail' as Order['orderType'],
    shippingAddress: '',
    paymentMethod: 'Direct Bank Transfer' as Order['paymentMethod'],
    notes: '',
    etaDate: '2026-06-30',
    carrierName: 'DHL Express',
    selectedItems: [] as { productId: string; quantity: number; negotiatedPrice: number }[]
  });

  // Current item being added inside form
  const [itemSelectState, setItemSelectState] = useState({
    productId: products[0]?.id || '',
    quantity: 1,
    negotiatedPrice: products[0]?.retailPrice || 0
  });

  // Financial indicators
  const totalOutstandingReceivables = orders
    .filter(o => o.paymentStatus !== 'Fully Paid')
    .reduce((sum, o) => sum + (o.totalAmount - o.paidAmount), 0);

  const totalCollectedRevenue = orders.reduce((sum, o) => sum + o.paidAmount, 0);
  const activeShipmentsCount = orders.filter(o => o.deliveryStatus !== 'Delivered').length;

  const handleUpdateItemPrice = (prodId: string) => {
    const prod = products.find(p => p.id === prodId);
    if (prod) {
      setItemSelectState(prev => ({
        ...prev,
        productId: prodId,
        negotiatedPrice: newOrderForm.orderType === 'Retail' 
          ? (prod.retailPrice || 0) 
          : (prod.fobPriceTier1 || prod.retailPrice || 0)
      }));
    }
  };

  const handleAddItemToForm = () => {
    const prod = products.find(p => p.id === itemSelectState.productId);
    if (!prod) return;

    // Check if SKU already listed
    const existsIndex = newOrderForm.selectedItems.findIndex(i => i.productId === prod.id);
    if (existsIndex > -1) {
      const updated = [...newOrderForm.selectedItems];
      updated[existsIndex].quantity += itemSelectState.quantity;
      setNewOrderForm(prev => ({ ...prev, selectedItems: updated }));
    } else {
      setNewOrderForm(prev => ({
        ...prev,
        selectedItems: [
          ...prev.selectedItems,
          {
            productId: prod.id,
            quantity: itemSelectState.quantity,
            negotiatedPrice: itemSelectState.negotiatedPrice
          }
        ]
      }));
    }
  };

  const handleRemoveFormItem = (index: number) => {
    const filtered = newOrderForm.selectedItems.filter((_, i) => i !== index);
    setNewOrderForm(prev => ({ ...prev, selectedItems: filtered }));
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (newOrderForm.selectedItems.length === 0) {
      alert(t('Please load at least 1 ceramic item into this order ledger!', 'Vui lòng thêm ít nhất 1 sản phẩm gốm vào đơn hàng!'));
      return;
    }

    let customerName = newOrderForm.guestName;
    let customerEmail = newOrderForm.guestEmail;

    if (newOrderForm.customerId) {
      const selectedUser = registeredUsers.find(u => u.id === newOrderForm.customerId);
      if (selectedUser) {
        customerName = selectedUser.fullName;
        customerEmail = selectedUser.email;
      }
    }

    if (!customerName || !newOrderForm.shippingAddress) {
      alert(t('Customer Name and Shipping Address are mandatory details.', 'Tên khách hàng và Địa chỉ giao vận là các trường bắt buộc.'));
      return;
    }

    // Convert items
    const orderItems: OrderItem[] = newOrderForm.selectedItems.map(si => {
      const origProd = products.find(p => p.id === si.productId)!;
      return {
        productId: si.productId,
        productName: origProd.name,
        sku: origProd.SKU,
        image: origProd.mainImage,
        quantity: si.quantity,
        price: si.negotiatedPrice
      };
    });

    const calculatedTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const createdOrder: Order = {
      id: `POT-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      customerId: newOrderForm.customerId || 'GUEST',
      customerName,
      customerEmail,
      orderType: newOrderForm.orderType,
      orderDate: new Date().toISOString().split('T')[0],
      items: orderItems,
      totalAmount: calculatedTotal,
      paidAmount: 0,
      paymentStatus: 'Unpaid',
      paymentMethod: newOrderForm.paymentMethod,
      deliveryStatus: 'Clay Forming',
      deliveryDate: newOrderForm.etaDate,
      carrierName: newOrderForm.carrierName,
      trackingCode: `TRK-${Math.floor(Math.random() * 900000 + 100000)}`,
      shippingAddress: newOrderForm.shippingAddress,
      notes: newOrderForm.notes
    };

    setOrders(prev => [createdOrder, ...prev]);
    setIsAddOrderOpen(false);

    // Reset Form
    setNewOrderForm({
      customerId: '',
      guestName: '',
      guestEmail: '',
      orderType: 'Retail',
      shippingAddress: '',
      paymentMethod: 'Direct Bank Transfer',
      notes: '',
      etaDate: '2026-06-30',
      carrierName: 'DHL Express',
      selectedItems: []
    });

    alert(t('Order created and queued for tracking successfully!', 'Đơn hàng mới đã được khởi tạo và phân luồng thành công!'));
  };

  const handleUpdateOrderState = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
    alert(t('Order configuration & billing terms updated successfully.', 'Trạng thái đơn hàng và điều kiện thanh toán đã được cập nhật thành công.'));
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm(t(`Are you sure you want to permanently delete order reference ${id}?`, `Bạn có chắc chắn muốn xóa vĩnh viễn mã đơn hàng ${id}?`))) {
      setOrders(prev => prev.filter(o => o.id !== id));
      if (viewingOrderDetails?.id === id) setViewingOrderDetails(null);
    }
  };

  // Perform filtering
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.items.some(i => i.productName.toLowerCase().includes(orderSearch.toLowerCase()) || i.sku.toLowerCase().includes(orderSearch.toLowerCase()));

    const matchesType = orderTypeFilter === 'All' || o.orderType === orderTypeFilter;
    const matchesPayment = paymentStatusFilter === 'All' || o.paymentStatus === paymentStatusFilter;
    const matchesDelivery = deliveryStatusFilter === 'All' || o.deliveryStatus === deliveryStatusFilter;

    return matchesSearch && matchesType && matchesPayment && matchesDelivery;
  });

  return (
    <div className="space-y-6 text-left animate-fadeIn" id="orders-registry-component">
      
      {/* Top Ledger Financial Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-stone-200 p-4 rounded-lg flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-pottery-ivory text-pottery-terracotta rounded">
            <ShoppingBag size={20} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Total Ordered Volume', 'Tổng số Đơn hàng')}</span>
            <strong className="text-xl font-serif text-stone-800">{orders.length} {t('Orders', 'Đơn hàng')}</strong>
            <span className="text-[9px] text-stone-400 block mt-0.5">{t('Retail + B2B contracts', 'Đơn lẻ & Hợp đồng sỉ')}</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-4 rounded-lg flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Collected Cash', 'Tổng tiền đã thanh toán')}</span>
            <strong className="text-xl font-serif text-emerald-800">US$ {totalCollectedRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            <span className="text-[9px] text-emerald-600 block font-semibold mt-0.5">{t('30% Deposits + Full settles', 'Đã lưu kho thực thu')}</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-4 rounded-lg flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-amber-50 text-amber-700 rounded">
            <CreditCard size={20} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Accounts Receivable', 'Công nợ chưa thu')}</span>
            <strong className="text-xl font-serif text-amber-800">US$ {totalOutstandingReceivables.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            <span className="text-[9px] text-amber-600 font-semibold block mt-0.5">{t('Outstanding B2B Balances', 'Dự thu hạn ngạch đại lý')}</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-4 rounded-lg flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-blue-50 text-blue-700 rounded">
            <Truck size={20} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Active Shipments', 'Hàng đang vận hành')}</span>
            <strong className="text-xl font-serif text-blue-800">{activeShipmentsCount} {t('Cargoes', 'Chuyến hàng')}</strong>
            <span className="text-[9px] text-blue-500 font-semibold block mt-0.5">{t('In production or ocean transit', 'Lịch gốm nung & vượt biển')}</span>
          </div>
        </div>

      </div>

      {/* Control Filter Panel & Creation Button */}
      <div className="bg-stone-50 border border-stone-200 rounded p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search bar */}
        <div className="relative w-full lg:max-w-xs shrink-0">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            placeholder={t('Search order ID, buyer, SKU...', 'Tìm mã đơn, người mua, SKU...')}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-250 text-xs rounded focus:outline-none focus:border-pottery-terracotta placeholder-stone-400"
          />
        </div>

        {/* Detailed filters columns */}
        <div className="w-full flex flex-wrap gap-3 items-center justify-start lg:justify-end">
          
          {/* Order Type */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <span>{t('Type:', 'Loại:')}</span>
            <select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value as any)}
              className="bg-white border border-stone-200 p-1 rounded text-[11px] focus:outline-none"
            >
              <option value="All">{t('All Forms', 'Tất cả')}</option>
              <option value="Retail">{t('Retail Buy', 'Mua lẻ')}</option>
              <option value="B2B Wholesale">{t('B2B Wholesale', 'Bán sỉ FOB')}</option>
            </select>
          </div>

          {/* Payment Filter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <span>{t('Payment:', 'Thanh toán:')}</span>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="bg-white border border-stone-200 p-1 rounded text-[11px] focus:outline-none"
            >
              <option value="All">{t('All Terms', 'Mọi trạng thái')}</option>
              <option value="Unpaid">{t('Unpaid', 'Chưa thanh toán')}</option>
              <option value="Deposit Paid 30%">{t('Deposit Paid 30%', 'Đã đặt cọc 30%')}</option>
              <option value="Fully Paid">{t('Fully Paid', 'Đã tất toán')}</option>
              <option value="Refunded">{t('Refunded', 'Đã trả hàng')}</option>
            </select>
          </div>

          {/* Delivery Filter */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <span>{t('Delivery:', 'Giao hàng:')}</span>
            <select
              value={deliveryStatusFilter}
              onChange={(e) => setDeliveryStatusFilter(e.target.value)}
              className="bg-white border border-stone-200 p-1 rounded text-[11px] focus:outline-none"
            >
              <option value="All">{t('All Milestones', 'Mọi hoạt trình')}</option>
              <option value="Clay Forming">{t('Clay Forming', 'Tạo phôi đất mộc')}</option>
              <option value="Kiln Firing">{t('Kiln Firing', 'Nung lò hỏa biến')}</option>
              <option value="Quality Inspecting">{t('Quality Inspecting', 'Kiểm chứng cốt gốm')}</option>
              <option value="Custom Crating">{t('Custom Crating', 'Đóng hòm pallet gỗ')}</option>
              <option value="Out for Delivery / Port FOB">{t('Port FOB / Handover', 'Bàn giao FOB Cảng')}</option>
              <option value="Shipping Transit">{t('Shipping Transit', 'Vượt biển khơi / Transit')}</option>
              <option value="Delivered">{t('Delivered', 'Đã giao bến')}</option>
            </select>
          </div>

          {/* Manual New Order draft */}
          <button
            onClick={() => setIsAddOrderOpen(true)}
            className="ml-auto lg:ml-2 bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider rounded flex items-center gap-1 transition"
          >
            <Plus size={12} />
            <span>{t('Draft New Order', 'Tạo đơn mới')}</span>
          </button>

        </div>

      </div>

      {/* Main Grid / Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Orders list card */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs">
          
          <div className="p-4 bg-stone-50/55 border-b border-stone-200 flex justify-between items-center">
            <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>{t('Active Orders Ledger', 'Sổ cái & Hồ sơ thanh toán')}</span>
              <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-mono text-[9px] font-bold">{filteredOrders.length}</span>
            </h3>
            <span className="text-[10px] text-stone-400 font-mono uppercase">{t('System synced', 'Thời gian thực')}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse divide-y divide-stone-100">
              
              <thead>
                <tr className="bg-stone-50/20 text-stone-550 font-mono border-b border-stone-200 uppercase tracking-widest text-[9px]">
                  <th className="p-3 pl-4">{t('ORDER ID', 'MÃ ĐƠN/NGÀY')}</th>
                  <th className="p-3">{t('BUYER / ACCOUNT', 'ĐỐI TÁC MUA')}</th>
                  <th className="p-3 text-right">{t('OUTSTANDING DEBT', 'ĐÃ TRẢ / CÔNG NỢ')}</th>
                  <th className="p-3 text-center">{t('STATUS INDICATORS', 'TRẠNG THÁI GIAO VẬN')}</th>
                  <th className="p-3 text-right pr-4">{t('CONTROL', 'PHẤN QUYẾT')}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center italic py-20 text-stone-400">
                      {t('No orders matched your search criteria.', 'Không có đơn đặt hàng nào khớp bộ lọc.')}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => {
                    const balanceDue = order.totalAmount - order.paidAmount;
                    
                    return (
                      <tr 
                        key={order.id} 
                        onClick={() => setViewingOrderDetails(order)}
                        className={`hover:bg-stone-50/50 cursor-pointer transition ${viewingOrderDetails?.id === order.id ? 'bg-pottery-ivory/20' : ''}`}
                      >
                        {/* ID / Date */}
                        <td className="p-3 pl-4 font-mono text-[11px] space-y-0.5">
                          <strong className="text-stone-900 block group-hover:underline">{order.id}</strong>
                          <span className="text-[9px] text-stone-400 block">{order.orderDate}</span>
                          <span className={`inline-block px-1.5 py-0.2 rounded text-[8px] font-bold uppercase ${
                            order.orderType === 'B2B Wholesale' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.orderType === 'B2B Wholesale' ? 'WHOLESALE' : 'RETAIL'}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="p-3">
                          <div className="font-sans font-semibold text-stone-800 max-w-[150px] truncate">{order.customerName}</div>
                          <div className="text-[10px] text-stone-400 font-mono truncate max-w-[150px]">{order.customerEmail}</div>
                        </td>

                        {/* Financial Debt */}
                        <td className="p-3 text-right leading-relaxed font-mono">
                          <div className="font-bold text-stone-900">US$ {order.totalAmount.toFixed(2)}</div>
                          <div className="text-[9px] text-stone-400">
                            {t('Paid:', 'Đã trả:')} <span className="text-emerald-700 font-bold">${order.paidAmount.toFixed(2)}</span>
                          </div>
                          {balanceDue > 0 ? (
                            <div className="text-[9px] text-amber-700 font-semibold">
                              {t('Due:', 'Còn nợ:')} ${balanceDue.toFixed(2)}
                            </div>
                          ) : (
                            <div className="text-[9px] text-emerald-800 font-bold flex items-center justify-end gap-0.5">
                              <span>✓ {t('Settle', 'Tất toán')}</span>
                            </div>
                          )}
                        </td>

                        {/* Tracking Milestones */}
                        <td className="p-3 text-center space-y-1">
                          
                          {/* Payment status badge */}
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            order.paymentStatus === 'Fully Paid' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : order.paymentStatus === 'Deposit Paid 30%' 
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : order.paymentStatus === 'Refunded' ? 'bg-stone-100 text-stone-600' : 'bg-rose-100 text-rose-800'
                          }`}>
                            💳 {t(order.paymentStatus, order.paymentStatus)}
                          </span>

                          {/* Delivery state badge */}
                          <div className={`text-[9px] font-sans font-medium px-2 py-0.5 rounded-full ${
                            order.deliveryStatus === 'Delivered' 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : order.deliveryStatus === 'Shipping Transit'
                                ? 'bg-cyan-50 text-cyan-800 border border-cyan-150 animate-pulse'
                                : 'bg-stone-100 text-stone-600'
                          }`}>
                            🚢 {t(order.deliveryStatus, order.deliveryStatus)}
                          </div>
                          
                          <div className="text-[8px] text-stone-400 font-mono">
                            ETA: {order.deliveryDate}
                          </div>

                        </td>

                        {/* Controls */}
                        <td className="p-3 text-right pr-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-1.5">
                            
                            <button
                              onClick={() => setEditingOrder(order)}
                              className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-150 border border-stone-200 rounded transition"
                              title={t('Adjust billing / delivery status', 'Cập nhật trạng thái')}
                            >
                              <Edit size={12} />
                            </button>

                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded transition"
                              title={t('Delete completely', 'Xóa vĩnh viễn')}
                            >
                              <Trash2 size={12} />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>

        </div>

        {/* Detailed audit right workbench */}
        <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-lg p-5 space-y-6 text-left">
          
          <div className="border-b border-stone-200 pb-3">
            <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-pottery-terracotta block">
              🏺 {t('Dossier, Trackers & Receipts', 'Lịch sử Vận hành & Vấn tin')}
            </h4>
            <p className="text-[10px] text-stone-400 mt-0.5">{t('Select any order record on the left to trace details.', 'Chọn một đơn hàng bên trái để kiểm tra phiếu thanh toán, xuất cảng.')}</p>
          </div>

          {viewingOrderDetails ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Order Metadata summary */}
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] text-stone-400 font-mono block">{viewingOrderDetails.orderDate}</span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 leading-tight">{viewingOrderDetails.id}</h3>
                    <span className="text-[10px] font-mono text-stone-500 block underline">{viewingOrderDetails.orderType} • {viewingOrderDetails.paymentMethod}</span>
                  </div>
                  
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded ${
                     viewingOrderDetails.paymentStatus === 'Fully Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {viewingOrderDetails.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Items ledger list */}
              <div className="bg-white border border-stone-150 rounded overflow-hidden">
                <div className="bg-stone-50/70 p-2 font-mono text-[9px] text-stone-500 uppercase border-b border-stone-150 tracking-wider">
                  🛒 {t('Selected Porcelain & Clay wares', 'Danh sách sản phẩm gốm sỉ')}
                </div>
                <div className="divide-y divide-stone-100 max-h-[200px] overflow-y-auto">
                  {viewingOrderDetails.items.map((it, idx) => (
                    <div key={idx} className="p-2 flex items-center justify-between text-[11px] hover:bg-stone-50/50">
                      <div className="flex items-center gap-2">
                        <img src={it.image} className="w-8 h-8 object-cover rounded" alt={it.productName} />
                        <div>
                          <span className="font-semibold text-stone-800 line-clamp-1">{it.productName}</span>
                          <span className="text-[9px] text-stone-400 font-mono block">{it.sku}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono font-medium shrink-0">
                        <div>{it.quantity} {t('pcs', 'cái')}</div>
                        <div className="text-[9px] text-stone-400">@ ${it.price.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-stone-50 p-2.5 flex justify-between items-baseline border-t border-stone-150 text-xs font-semibold">
                  <span>{t('Total Invoice Value:', 'Tổng giá trị hóa đơn:')}</span>
                  <span className="font-mono text-stone-950 font-bold text-sm">US$ {viewingOrderDetails.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Carrier Route Schedule */}
              <div className="bg-white p-4 border border-stone-150 rounded space-y-4">
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">🚢 {t('Shipping Route Timeline', 'Lộ trình Giao hàng & ETA')}</span>
                  <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-mono">{viewingOrderDetails.carrierName}</span>
                </div>

                {/* Timeline Stepper Visualizer */}
                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Step 1: Prepping */}
                  <div className="flex gap-3 relative">
                    <div className="absolute top-[14px] left-[7px] w-0.5 h-[calc(100%-8px)] bg-stone-200"></div>
                    <span className="w-4.5 h-4.5 rounded-full bg-emerald-500 text-white font-mono text-[9px] flex items-center justify-center shrink-0 z-10">✓</span>
                    <div className="text-stone-800 leading-normal">
                      <strong className="block text-[11px]">{t('Clay & Glaze Formulation', 'Nhào đất & Sét phôi chất')}</strong>
                      <span className="text-[9px] text-stone-400 font-mono block">Finished on {viewingOrderDetails.orderDate}</span>
                    </div>
                  </div>

                  {/* Step 2: Firing */}
                  <div className="flex gap-3 relative">
                    <div className="absolute top-[14px] left-[7px] w-0.5 h-[calc(100%-8px)] bg-stone-200"></div>
                    <span className={`w-4.5 h-4.5 rounded-full font-mono text-[9px] flex items-center justify-center shrink-0 z-10 ${
                      ['Kiln Firing', 'Quality Inspecting', 'Custom Crating', 'Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered'].includes(viewingOrderDetails.deliveryStatus)
                        ? 'bg-emerald-500 text-white' 
                        : viewingOrderDetails.deliveryStatus === 'Clay Forming' ? 'bg-amber-400 text-stone-900 border border-amber-300 animate-pulse' : 'bg-stone-200 text-stone-400'
                    }`}>
                      {['Kiln Firing', 'Quality Inspecting', 'Custom Crating', 'Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered'].includes(viewingOrderDetails.deliveryStatus) ? '✓' : '2'}
                    </span>
                    <div className="text-stone-700 leading-normal">
                      <strong className="block text-[11px]">{t('Chamber Kiln Firing & Hot Stress', 'Nung lò hỏa biến cao nhiệt')}</strong>
                      <span className="text-[9px] text-stone-400 font-mono block">1200°C charcoal / gas control chamber</span>
                    </div>
                  </div>

                  {/* Step 3: Packing */}
                  <div className="flex gap-3 relative">
                    <div className="absolute top-[14px] left-[7px] w-0.5 h-[calc(100%-8px)] bg-stone-200"></div>
                    <span className={`w-4.5 h-4.5 rounded-full font-mono text-[9px] flex items-center justify-center shrink-0 z-10 ${
                      ['Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered'].includes(viewingOrderDetails.deliveryStatus)
                        ? 'bg-emerald-500 text-white' 
                        : ['Quality Inspecting', 'Custom Crating'].includes(viewingOrderDetails.deliveryStatus) ? 'bg-amber-400 text-stone-900 border border-amber-300 animate-pulse' : 'bg-stone-200 text-stone-400'
                    }`}>
                      {['Out for Delivery / Port FOB', 'Shipping Transit', 'Delivered'].includes(viewingOrderDetails.deliveryStatus) ? '✓' : '3'}
                    </span>
                    <div className="text-stone-700 leading-normal">
                      <strong className="block text-[11px]">{t('Rigid Foam Wood Crating & Testing', 'Khung Pallet Gỗ & Kiểm tra đóng hòm')}</strong>
                      <span className="text-[9px] text-stone-400 font-mono block">Fumigation certified drop-test baselines</span>
                    </div>
                  </div>

                  {/* Step 4: Dispatched out / Ocean Transit */}
                  <div className="flex gap-3 relative">
                    <span className={`w-4.5 h-4.5 rounded-full font-mono text-[9px] flex items-center justify-center shrink-0 z-10 ${
                      viewingOrderDetails.deliveryStatus === 'Delivered' 
                        ? 'bg-emerald-500 text-white' 
                        : ['Out for Delivery / Port FOB', 'Shipping Transit'].includes(viewingOrderDetails.deliveryStatus) ? 'bg-amber-400 text-stone-900 border border-amber-300 animate-pulse' : 'bg-stone-200 text-stone-400'
                    }`}>
                      {viewingOrderDetails.deliveryStatus === 'Delivered' ? '✓' : '4'}
                    </span>
                    <div className="text-stone-750 leading-normal">
                      <strong className="block text-[11px]">{t('Cargo Vessel Ocean Transit', 'Bồng bềnh vượt trùng trùng khơi')}</strong>
                      <span className="text-[9px] text-stone-500 font-mono block">
                        {t('Tracking ID:', 'Mã vận đơn:')} <strong className="text-stone-700">{viewingOrderDetails.trackingCode || 'Pending'}</strong>
                      </span>
                    </div>
                  </div>

                </div>

                <div className="border-t border-stone-100 pt-3 flex justify-between text-xs text-stone-500 leading-normal">
                  <div>
                    <span className="text-[9px] text-stone-400 block font-mono uppercase">{t('Shipping Destination Address', 'Địa chỉ bến cảng')}</span>
                    <span className="italic block mt-1 text-stone-600 font-sans max-w-[200px] text-[11px]">{viewingOrderDetails.shippingAddress}</span>
                  </div>
                </div>

              </div>

              {/* Transactions Ledger Payment Details */}
              <div className="bg-white p-4 border border-stone-150 rounded space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">💰 {t('Corporate Transaction Ledgers', 'Dòng tiền giao dịch công nợ')}</span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-baseline py-1 border-b border-dashed border-stone-100 text-stone-600">
                    <span>{t('Original Invoice Balance', 'Giá gốc hóa đơn')}</span>
                    <span className="font-mono">$ {viewingOrderDetails.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline py-1 border-b border-dashed border-stone-100 text-emerald-700">
                    <span>{t('Total Recieved Capital', 'Thực thu chuyển khoản')}</span>
                    <span className="font-mono font-bold">$ {viewingOrderDetails.paidAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline py-1 font-semibold text-amber-800">
                    <span>{t('Accounts Receivable Due', 'Công nợ đại lý chưa đóng')}</span>
                    <span className="font-mono">$ {(viewingOrderDetails.totalAmount - viewingOrderDetails.paidAmount).toFixed(2)}</span>
                  </div>
                </div>

                {/* Audit notes */}
                {viewingOrderDetails.notes && (
                  <div className="bg-stone-50 border border-stone-200 p-2 text-[10px] text-stone-500 rounded font-serif italic">
                    "{viewingOrderDetails.notes}"
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-stone-200 rounded bg-white text-stone-400 text-xs">
              <ShieldAlert className="mx-auto mb-2 text-stone-300" size={24} />
              <p>{t('No order highlighted.', 'Trống thông tin phân tích.')}</p>
            </div>
          )}

        </div>

      </div>

      {/*********** MODAL: MANUAL DRAFT NEW ORDER ***********/}
      {isAddOrderOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-lg max-w-2xl w-full p-6 space-y-5 shadow-2xl text-left scale-up max-h-[85vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-stone-150 pb-3">
              <h3 className="font-serif font-bold text-stone-900 text-base">
                ✍️ {t('Compile New Simulated Sale Order', 'Lên Phiếu Đơn Hàng Mới (Giả lập)')}
              </h3>
              <button 
                onClick={() => setIsAddOrderOpen(false)} 
                className="text-stone-400 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs font-sans">
              
              {/* Type toggle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Order category', 'Phân dải Đơn hàng')}</label>
                  <select
                    value={newOrderForm.orderType}
                    onChange={(e) => {
                      const ot = e.target.value as Order['orderType'];
                      setNewOrderForm(prev => ({ ...prev, orderType: ot }));
                      // Update current selected item default price too
                      const activeProd = products.find(p => p.id === itemSelectState.productId);
                      if (activeProd) {
                        setItemSelectState(prev => ({
                          ...prev,
                          negotiatedPrice: ot === 'Retail' ? (activeProd.retailPrice || 35) : (activeProd.fobPriceTier1 || 12)
                        }));
                      }
                    }}
                    className="w-full bg-white border border-stone-300 p-2 rounded"
                  >
                    <option value="Retail">Retail Buy (Mua lẻ trực tiếp)</option>
                    <option value="B2B Wholesale">B2B Wholesale (Xuất hợp đồng Sỉ FOB)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Assign to Client account', 'Giao cho Hội viên')}</label>
                  <select
                    value={newOrderForm.customerId}
                    onChange={(e) => {
                      const uId = e.target.value;
                      const u = registeredUsers.find(ru => ru.id === uId);
                      setNewOrderForm(prev => ({
                        ...prev,
                        customerId: uId,
                        guestName: u ? u.fullName : '',
                        guestEmail: u ? u.email : '',
                        shippingAddress: u ? `${u.companyName || u.fullName}, ${u.country}` : ''
                      }));
                    }}
                    className="w-full bg-white border border-stone-300 p-2 rounded"
                  >
                    <option value="">-- {t('Non-member Guest (Khách lẻ ngoài)', 'Khách lẻ ngoài')} --</option>
                    {registeredUsers.map(ru => (
                      <option key={ru.id} value={ru.id}>{ru.fullName} ({ru.companyName || 'Retail Customer'})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest detail defaults */}
              {!newOrderForm.customerId && (
                <div className="grid grid-cols-2 gap-4 bg-stone-50 p-3 rounded border border-stone-200">
                  <div>
                    <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Guest Client Fullname *', 'Tên khách ngoại *')}</label>
                    <input
                      type="text"
                      required
                      value={newOrderForm.guestName}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, guestName: e.target.value }))}
                      className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Guest Client Email Address', 'Thư điện tử email')}</label>
                    <input
                      type="email"
                      value={newOrderForm.guestEmail}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, guestEmail: e.target.value }))}
                      className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none focus:border-stone-500"
                    />
                  </div>
                </div>
              )}

              {/* Add wares builder inside checkout */}
              <div className="border border-stone-200 rounded p-4 space-y-3 bg-stone-550/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block font-bold">🛒 {t('Insert Ceramic Wares to Order', 'Nạp sản phẩm vào đơn')}</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                  <div className="sm:col-span-6">
                    <label className="block text-stone-500 text-[10px] mb-1">{t('Clay Product model', 'Kiểu mẫu gốm sứ')}</label>
                    <select
                      value={itemSelectState.productId}
                      onChange={(e) => handleUpdateItemPrice(e.target.value)}
                      className="w-full bg-white border border-stone-300 p-1.5 rounded text-xs focus:outline-none"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.SKU})</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-500 text-[10px] mb-1">{t('Quantity', 'Số lượng')}</label>
                    <input
                      type="number"
                      min={1}
                      value={itemSelectState.quantity}
                      onChange={(e) => setItemSelectState(prev => ({ ...prev, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-full bg-white border border-stone-300 p-1.5 rounded focus:outline-none font-mono text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-500 text-[10px] mb-1">{t('Price UNIT (US$)', 'Đơn giá sỉ lẻ')}</label>
                    <input
                      type="number"
                      step="0.1"
                      min={1}
                      value={itemSelectState.negotiatedPrice}
                      onChange={(e) => setItemSelectState(prev => ({ ...prev, negotiatedPrice: Math.max(0, parseFloat(e.target.value) || 0) }))}
                      className="w-full bg-white border border-stone-300 p-1.5 rounded focus:outline-none font-mono text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddItemToForm}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 py-1.5 rounded font-mono uppercase text-[10px] font-bold tracking-wider active:scale-95 transition"
                    >
                      + {t('Add item', 'Thêm mẫu')}
                    </button>
                  </div>
                </div>

                {/* Sub items display */}
                {newOrderForm.selectedItems.length > 0 ? (
                  <div className="border border-stone-200 rounded divide-y divide-stone-150 max-h-[140px] overflow-y-auto bg-white font-mono text-[10px]">
                    {newOrderForm.selectedItems.map((si, idx) => {
                      const p = products.find(prod => prod.id === si.productId)!;
                      return (
                        <div key={idx} className="p-2 flex justify-between items-center text-stone-650 hover:bg-stone-50">
                          <div>
                            <span className="font-bold text-stone-800">{p.name}</span>
                            <span className="text-stone-400 block">{p.SKU}</span>
                          </div>
                          <div className="flex items-center gap-4 shrink-0">
                            <span>Qty: <strong className="text-stone-800">{si.quantity}</strong></span>
                            <span>@ ${si.negotiatedPrice.toFixed(2)}</span>
                            <strong className="text-stone-900 font-bold">${(si.quantity * si.negotiatedPrice).toFixed(2)}</strong>
                            <button
                              type="button"
                              onClick={() => handleRemoveFormItem(idx)}
                              className="text-red-500 hover:text-red-700 font-bold p-1"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[10px] text-stone-400 italic text-center py-2 bg-white rounded border">{t('Add products step-by-step above.', 'Chưa ghi nhận sản phẩm mộc nào vào giỏ nợ.')}</p>
                )}

              </div>

              {/* Shipping logistics and payment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Shipping address *', 'Địa điểm giao hàng *')}</label>
                  <input
                    type="text"
                    required
                    value={newOrderForm.shippingAddress}
                    placeholder={t('Port of Tokyo Warehouse, Japan...', 'Thành phố Hồ CHí Minh, Quận 3...')}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, shippingAddress: e.target.value }))}
                    className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Desired Payment Option', 'Phương thức thanh toán B2B')}</label>
                  <select
                    value={newOrderForm.paymentMethod}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                    className="w-full bg-white border border-stone-300 p-2 rounded"
                  >
                    <option value="Direct Bank Transfer">Telegraphic Wire / Bank Transfer (Chuyển khoản Vietcombank)</option>
                    <option value="TT (Telegraphic Transfer)">TT (Telegraphic Transfer) 30%/70% Contract</option>
                    <option value="L/C (Letter of Credit)">L/C (Letter of Credit) International</option>
                    <option value="Cash on Delivery">{t('Cash on Delivery', 'Thanh toán tiền mặt COD')}</option>
                  </select>
                </div>
              </div>

              {/* ETA logistics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Logistics carrier name', 'Nhà cung ứng vận tải')}</label>
                  <input
                    type="text"
                    value={newOrderForm.carrierName}
                    placeholder="DHL, Evergreen, Cosco..."
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, carrierName: e.target.value }))}
                    className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Est delivery / ETA Date', 'Lịch ETA cập cảng dự kiến')}</label>
                  <input
                    type="date"
                    value={newOrderForm.etaDate}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, etaDate: e.target.value }))}
                    className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-450 uppercase font-mono text-[9px] font-bold mb-1">{t('Special glaze/kiln instructions or comments', 'Ghi chú nung đặc thù hoặc gia cố gỗ')}</label>
                <textarea
                  rows={2}
                  value={newOrderForm.notes}
                  placeholder={t('Strict glazed testing requested...', 'Gia cố foam dày góc chậu sành...')}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none text-xs"
                />
              </div>

              <div className="pt-4 border-t border-stone-150 flex justify-end gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setIsAddOrderOpen(false)}
                  className="px-4 py-2 border border-stone-250 hover:bg-stone-50 rounded text-stone-700 font-bold"
                >
                  {t('Cancel', 'Bỏ qua')}
                </button>
                <button
                  type="submit"
                  className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-5 py-2 rounded font-bold uppercase transition"
                >
                  {t('Create Order Record', 'Phát hành đơn hàng')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/*********** MODAL: EDIT / DISPATCH ORDER DATA ***********/}
      {editingOrder && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-lg max-w-md w-full p-6 space-y-5 shadow-2xl text-left scale-up">
            
            <div className="flex justify-between items-center border-b border-stone-150 pb-3">
              <h3 className="font-serif font-bold text-stone-900 text-base">
                ⚙️ {t('Calibrate Billing & Milestones', 'Kiểm soát Công nợ & Hoạt trình')} ({editingOrder.id})
              </h3>
              <button 
                onClick={() => setEditingOrder(null)} 
                className="text-stone-400 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateOrderState} className="space-y-4 text-xs font-sans">
              
              {/* Financial Capital Paid */}
              <div className="bg-stone-50 p-3 rounded space-y-2 border border-stone-150">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold block text-stone-500">💰 {t('Audit payments', 'Hạch toán chuyển khoản')}</span>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-stone-400 text-[10px] mb-1">{t('Total Balance', 'Tổng giá trị')}</label>
                    <span className="font-mono block text-sm font-bold text-stone-800">$ {editingOrder.totalAmount.toFixed(2)}</span>
                  </div>
                  <div>
                    <label className="block text-stone-500 text-[10px] mb-1">{t('Paid Amount (US$)', 'Đã thanh toán (US$)')}</label>
                    <input
                      type="number"
                      step="0.1"
                      min={0}
                      max={editingOrder.totalAmount}
                      value={editingOrder.paidAmount}
                      onChange={(e) => {
                        const amt = Math.min(editingOrder.totalAmount, Math.max(0, parseFloat(e.target.value) || 0));
                        let paymentStatus: Order['paymentStatus'] = 'Unpaid';
                        if (amt === editingOrder.totalAmount) {
                          paymentStatus = 'Fully Paid';
                        } else if (amt > 0) {
                          paymentStatus = 'Deposit Paid 30%';
                        }
                        setEditingOrder({
                          ...editingOrder,
                          paidAmount: amt,
                          paymentStatus
                        });
                      }}
                      className="w-full bg-white border border-stone-300 p-1.5 rounded focus:outline-none font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-stone-500 text-[9px] uppercase font-mono tracking-wider font-bold mb-1">{t('Override payment status', 'Trạng thái thanh toán cưỡng bức')}</label>
                  <select
                    value={editingOrder.paymentStatus}
                    onChange={(e) => {
                      const pay = e.target.value as Order['paymentStatus'];
                      let paidAmount = editingOrder.paidAmount;
                      if (pay === 'Fully Paid') {
                        paidAmount = editingOrder.totalAmount;
                      } else if (pay === 'Unpaid') {
                        paidAmount = 0;
                      } else if (pay === 'Deposit Paid 30%') {
                        paidAmount = editingOrder.totalAmount * 0.3;
                      }
                      setEditingOrder({ ...editingOrder, paymentStatus: pay, paidAmount });
                    }}
                    className="w-full bg-white border border-stone-300 p-1.5 rounded text-xs focus:outline-none"
                  >
                    <option value="Unpaid">{t('Unpaid (Chưa thanh toán)', 'Chưa thanh toán')}</option>
                    <option value="Deposit Paid 30%">{t('Deposit Paid 30% (Đã đặt cọc 30%)', 'Đã đặt cọc 30%')}</option>
                    <option value="Fully Paid">{t('Fully Paid (Tất toán xong)', 'Tất toán xong')}</option>
                    <option value="Refunded">{t('Refunded (Đã hoàn tiền)', 'Đã hoàn tiền')}</option>
                  </select>
                </div>
              </div>

              {/* Delivery Milestones */}
              <div className="space-y-2">
                <label className="block text-stone-500 text-[9px] uppercase font-mono tracking-wider font-bold">{t('Calibrate production and dispatch route', 'Trạng thái sản xuất & xuất cảng')}</label>
                <select
                  value={editingOrder.deliveryStatus}
                  onChange={(e) => setEditingOrder({ ...editingOrder, deliveryStatus: e.target.value as any })}
                  className="w-full bg-white border border-stone-300 p-2 rounded text-xs focus:outline-none"
                >
                  <option value="Clay Forming">{t('Clay Forming - Tạo hình mộc', 'Clay Forming - Tạo khối mộc')}</option>
                  <option value="Kiln Firing">{t('Kiln Firing - Nung lò cao nhiệt', 'Kiln Firing - Trực nung lò')}</option>
                  <option value="Quality Inspecting">{t('Quality Inspecting - Thử sấy hỏa nứt', 'Quality Inspecting - Thử sấy hỏa nứt')}</option>
                  <option value="Custom Crating">{t('Custom Crating - Gom kiện pallet chèn lót', 'Custom Crating - Gom kiện pallet sồi')}</option>
                  <option value="Out for Delivery / Port FOB">{t('Port FOB / Out for Delivery - Chờ cảng', 'Port FOB / Bàn giao xe bãi')}</option>
                  <option value="Shipping Transit">{t('Shipping Transit - Đang hải trình viễn dương', 'Shipping Transit - Hải trình viễn dương')}</option>
                  <option value="Delivered">{t('Delivered - Đã giao cập bến nhận', 'Delivered - Đã giao đầu cảng nhận')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-500 text-[10px] mb-1">{t('Logistics Carrier Code', 'Vận chuyển bởi')}</label>
                  <input
                    type="text"
                    value={editingOrder.carrierName}
                    onChange={(e) => setEditingOrder({ ...editingOrder, carrierName: e.target.value })}
                    placeholder="Evergreen, DHL..."
                    className="w-full bg-white border border-stone-300 p-1.5 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-500 text-[10px] mb-1">{t('Tracking Number / Carrier ID', 'Mã vận đơn')}</label>
                  <input
                    type="text"
                    value={editingOrder.trackingCode}
                    onChange={(e) => setEditingOrder({ ...editingOrder, trackingCode: e.target.value })}
                    placeholder="COSU91230..."
                    className="w-full bg-white border border-stone-300 p-1.5 rounded focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-500 text-[10px] mb-1">{t('ETA Delivery Date', 'Lịch ETA dự tính')}</label>
                <input
                  type="date"
                  value={editingOrder.deliveryDate}
                  onChange={(e) => setEditingOrder({ ...editingOrder, deliveryDate: e.target.value })}
                  className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 border-t border-stone-150 flex justify-end gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-3 py-1.5 border border-stone-250 hover:bg-stone-50 rounded text-stone-750 font-bold"
                >
                  {t('Cancel', 'Bỏ qua')}
                </button>
                <button
                  type="submit"
                  className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-4 py-1.5 rounded font-bold uppercase transition"
                >
                  {t('Apply changes', 'Cập nhật ngay')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
