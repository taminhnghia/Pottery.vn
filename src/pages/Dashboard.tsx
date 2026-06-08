/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, TradeApplication, CustomDevelopmentBrief, UserRole, User, Order } from '../types';
import { 
  ShieldAlert, Users, TrendingUp, Sliders, CheckCircle2, Lock, Save, Trash2, 
  Plus, Edit, Search, Filter, Layers, Briefcase, RefreshCw, Eye, X, Check,
  ChevronRight, Calendar, Info, Award, Settings, Database, FolderPlus, Copy, Mail
} from 'lucide-react';

import CatalogTab from '../components/dashboard/CatalogTab';
import CustomersTab from '../components/dashboard/CustomersTab';
import NewsletterTab from '../components/dashboard/NewsletterTab';
import OrdersTab from '../components/dashboard/OrdersTab';

interface DashboardProps {
  language: 'en' | 'vi';
  currentRole: UserRole;
  products: Product[];
  tradeApplications: TradeApplication[];
  customBriefs: CustomDevelopmentBrief[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onNavigate: (path: string) => void;
  onApproveApplication: (id: string) => void;
  onRejectApplication: (id: string) => void;
  onUpdateProductPrice: (productId: string, newRetail: number, newTrade?: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setTradeApplications: React.Dispatch<React.SetStateAction<TradeApplication[]>>;
  setCustomBriefs: React.Dispatch<React.SetStateAction<CustomDevelopmentBrief[]>>;
  registeredUsers: User[];
  setRegisteredUsers: React.Dispatch<React.SetStateAction<User[]>>;
  newsletterSubscribers: {
    id: string;
    email: string;
    dateSubscribed: string;
    status: 'Active' | 'Unsubscribed';
    source: 'Home' | 'Footer' | 'Catalog Download' | 'Manual Registration';
  }[];
  setNewsletterSubscribers: React.Dispatch<React.SetStateAction<{
    id: string;
    email: string;
    dateSubscribed: string;
    status: 'Active' | 'Unsubscribed';
    source: 'Home' | 'Footer' | 'Catalog Download' | 'Manual Registration';
  }[]>>;
}

type AdminTab = 'overview' | 'products' | 'catalog' | 'wholesalers' | 'custom_briefs' | 'customers' | 'newsletter' | 'orders' | 'system';

export default function Dashboard({
  language,
  currentRole,
  products,
  tradeApplications,
  customBriefs,
  orders,
  setOrders,
  onNavigate,
  onApproveApplication,
  onRejectApplication,
  onUpdateProductPrice,
  setProducts,
  setTradeApplications,
  setCustomBriefs,
  registeredUsers,
  setRegisteredUsers,
  newsletterSubscribers,
  setNewsletterSubscribers
}: DashboardProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Active Admin tab state
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search, filter states for Products CMS
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Modal active states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingApp, setViewingApp] = useState<TradeApplication | null>(null);
  const [isAddAppOpen, setIsAddAppOpen] = useState(false);
  const [isAddBriefOpen, setIsAddBriefOpen] = useState(false);

  // New Product Form Initial state
  const initialProductForm = {
    name: '',
    SKU: '',
    category: 'Outdoor Planters' as Product['category'],
    collection: 'Premium Glaze Collection',
    indoorOutdoor: 'Indoor/Outdoor',
    dimensions: '30 x 30 x 42 cm',
    material: 'Glazed Terracotta',
    finish: 'Smooth Glass Glaze',
    colourDirection: 'Mixed Metallic Earthy tones',
    retailPrice: 45.00,
    fobPriceTier1: 12.50,
    fobPriceTier2: 10.20,
    moq: 15,
    mainImage: 'https://images.unsplash.com/photo-1545241047-6083a3684587',
    active: true,
    retailEligible: true,
    tradeEligible: true,
    fobPricingEnabled: true,
    priceUnit: 'piece' as Product['priceUnit'],
    galleryImages: [] as string[],
    lifestyleImage: 'https://images.unsplash.com/photo-1545241047-6083a3684587',
    relatedItems: [] as string[]
  };

  const [productForm, setProductForm] = useState(initialProductForm);

  // New Trade App Manual form state
  const [appForm, setAppForm] = useState({
    companyName: '',
    companyWebsite: '',
    country: t('United States', 'Hoa Kỳ'),
    businessRegistrationNumber: '',
    businessType: 'Importer',
    primarySalesChannel: 'Landscape Sourcing',
    contactName: '',
    jobTitle: '',
    email: '',
    phone: '',
    preferredIncoterm: 'FOB'
  });

  // New Brief Form state
  const [briefForm, setBriefForm] = useState({
    fullName: '',
    company: '',
    email: '',
    country: t('Australia', 'Úc'),
    productCategory: 'Outdoor Planters',
    estimatedQuantity: 150,
    customizationDetails: ''
  });

  if (currentRole !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto shadow-sm">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-serif text-pottery-charcoal">
          {t('Access Restricted - Administrator Path Only', 'Không Thể Truy Cập - Hãy Đóng Vai Admin')}
        </h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
          {t(
            'Under Section 32 parameters, you must toggle your Role to "Admin" in the top Control Center to access this interface.',
            'Theo thiết lập hệ thống, bạn cần hoán chuyển vai trò người dùng (User Role) ở dải điều phối phía trên thành "Admin" để mở khóa bảng tính toán.'
          )}
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-6 rounded transition shadow-sm"
        >
          {t('Back to Landing Page', 'Quay lại Trang chủ')}
        </button>
      </div>
    );
  }

  // --- handlers for Product --
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.SKU) {
      alert(t('Please fill in product Name and unique SKU', 'Vui lòng điền Tên sản phẩm và mã SKU đặc thù'));
      return;
    }
    const newProduct: Product = {
      ...productForm,
      id: 'SKU-' + Math.floor(Math.random() * 90000 + 10000),
      galleryImages: [],
      relatedItems: [],
      buyerApplication: productForm.category,
      customizationNote: 'Original design request customisable on-demand.'
    };
    setProducts(prev => [newProduct, ...prev]);
    setIsAddProductOpen(false);
    setProductForm(initialProductForm);
    alert(t('Product created successfully! This item is now dynamic in shop & lists.', 'Khởi tạo sản phẩm thành công! Mẫu đã cập nhật trên Toàn hệ thống.'));
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    alert(t('Product configuration updated successfully.', 'Cấu hình sản phẩm đã được cập nhật thành công.'));
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(t(`Are you sure you want to delete ${name}?`, `Bạn có chắc chắn muốn xóa sản phẩm ${name}?`))) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleDuplicateProduct = (prod: Product) => {
    const duplicated: Product = {
      ...prod,
      id: 'SKU-' + Math.floor(Math.random() * 90000 + 10000),
      SKU: `${prod.SKU}-COPY-${Math.floor(Math.random() * 1000)}`,
      name: `${prod.name} (Copy)`
    };
    setProducts(prev => [duplicated, ...prev]);
    alert(t('Product duplicated.', 'Đã nhân bản sản phẩm thành công.'));
  };

  // --- handlers for Applications --
  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.companyName || !appForm.email || !appForm.contactName) {
      alert(t('Please fill in Company, Contact, and Email fields.', 'Vui lòng điền đầy đủ Tên doanh nghiệp, Người liên hệ, và Email.'));
      return;
    }
    const newApp: TradeApplication = {
      ...appForm,
      id: 'APP-' + Math.floor(Math.random() * 9000 + 1000),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setTradeApplications(prev => [newApp, ...prev]);
    setIsAddAppOpen(false);
    setAppForm({
      companyName: '',
      companyWebsite: '',
      country: t('United States', 'Hoa Kỳ'),
      businessRegistrationNumber: '',
      businessType: 'Importer',
      primarySalesChannel: 'Landscape Sourcing',
      contactName: '',
      jobTitle: '',
      email: '',
      phone: '',
      preferredIncoterm: 'FOB'
    });
    alert(t('New Wholesaler registration ticket added manually.', 'Đã lên hồ sơ đại lý B2B ngoại tuyến thủ công thành công.'));
  };

  const handleUpdateAppStatus = (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setTradeApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    alert(t('Application status changed to ' + status.toUpperCase(), 'Trạng thái đại lý được chuyển sang: ' + status.toUpperCase()));
  };

  const handleDeleteApp = (id: string) => {
    if (confirm(t('Are you sure you want to remove this wholesaler ticket?', 'Bạn có chắc chắn muốn xóa hồ sơ đăng ký sỉ này?'))) {
      setTradeApplications(prev => prev.filter(a => a.id !== id));
      if (viewingApp?.id === id) setViewingApp(null);
    }
  };

  // --- handlers for OEM Briefs --
  const handleCreateBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!briefForm.fullName || !briefForm.customizationDetails) {
      alert(t('Please fill in complete contact name & tech instructions.', 'Vui lòng nhập tên người liên hệ và mô tả mẫu gia công sỉ.'));
      return;
    }
    const newBrief: CustomDevelopmentBrief = {
      ...briefForm,
      id: 'RFD-' + Math.floor(Math.random() * 9000 + 1000),
      status: 'New'
    };
    setCustomBriefs(prev => [newBrief, ...prev]);
    setIsAddBriefOpen(false);
    setBriefForm({
      fullName: '',
      company: '',
      email: '',
      country: t('Australia', 'Úc'),
      productCategory: 'Outdoor Planters',
      estimatedQuantity: 150,
      customizationDetails: ''
    });
    alert(t('Offline R&D brief compiled! Queued for factory draft masters.', 'Khởi tạo thành công phiếu trình gia công gốm sứ OEM.'));
  };

  const handleUpdateBriefStatus = (id: string, newStatus: string) => {
    setCustomBriefs(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleDeleteBrief = (id: string) => {
    if (confirm(t('Remove this R&D customization project?', 'Gỡ bỏ đề án OEM đặc thù này khỏi danh sách?'))) {
      setCustomBriefs(prev => prev.filter(b => b.id !== id));
    }
  };

  // Category counts extraction
  const categoriesList = [
    'Outdoor Planters',
    'Indoor Pots',
    'Decorative Vases',
    'Ceramic Stools',
    'Decorative Objects',
    'Large Garden Pieces'
  ];

  const getProductsCountByCategory = (cat: string) => {
    return products.filter(p => p.category === cat).length;
  };

  // Dynamic filter lists
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.SKU.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pottery-ivory pb-6">
        <div className="space-y-2 text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-pottery-terracotta uppercase bg-pottery-ivory px-3 py-1 rounded">
            <ShieldAlert size={14} />
            <span>{t('POTTERY.VN ENTERPRISE CONSOLE', 'BẢNG TRỊ SỰ DOANH NGHIỆP')}</span>
          </span>
          <h1 className="text-3xl font-serif text-pottery-charcoal font-medium">
            {t('Administrative Controls & CMS Hub', 'Trung Tâm Điều Hành Cổng CMS Sỉ & Lẻ')}
          </h1>
          <p className="text-xs text-stone-500 max-w-2xl">
            {t(
              'Back-office engine to manage active global portfolios, evaluate trade license verification registries, update FOB price sheets in real-time, and assign design briefs to the physical kiln teams.',
              'Giao diện quản lý phân hệ sản phẩm, đối tác xuất khẩu, bảng giá hỏa biến và điều khiển các dự án đúc lu đại sảnh.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/')}
            className="border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-mono font-bold uppercase tracking-wider py-2 px-4 rounded transition"
          >
            {t('Public View', 'Trang chủ')}
          </button>
          <div className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-mono font-bold px-3 py-2 rounded-lg flex items-center gap-2 border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CMS STATUS: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2 no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'overview' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          📊 {t('Analytics Overview', 'Thông số & Tổng quan')}
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'products' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          🏺 {t('Products Catalog CMS', 'Quản lý Bộ sản phẩm')} ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'catalog' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          📦 {t('Catalog Management', 'Quản lý Catalog')}
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'customers' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          👥 {t('Customers & CRM', 'Quản lý Khách hàng')} ({registeredUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('newsletter')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'newsletter' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          ✉️ {t('Newsletter Desk', 'Quản lý Newsletter')} ({newsletterSubscribers.length})
        </button>
        <button
          onClick={() => setActiveTab('wholesalers')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'wholesalers' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          🤝 {t('Wholesaler Registry', 'Pháp nhân & Khách sỉ')} ({tradeApplications.length})
        </button>
        <button
          onClick={() => setActiveTab('custom_briefs')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'custom_briefs' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          🎨 {t('OEM Custom R&D Queue', 'Gia công & Chế tác OEM')} ({customBriefs.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'orders' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          🛒 {t('Orders & Deliveries', 'Đơn hàng & Giao vận')} ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold shrink-0 border-b-2 transition ${
            activeTab === 'system' 
              ? 'border-pottery-terracotta text-pottery-terracotta bg-pottery-ivory/30' 
              : 'border-transparent text-stone-500 hover:text-stone-850 hover:bg-stone-50'
          }`}
        >
          ⚙️ {t('Control panel config', 'Thông tin hệ thống')}
        </button>
      </div>

      {/*********** TAB 1: OVERVIEW ***********/}
      {activeTab === 'overview' && (
        <div className="space-y-8 text-left animate-fadeIn">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white border border-pottery-ivory rounded p-5 space-y-2 shadow-xs">
              <span className="text-[10px] text-stone-400 font-mono tracking-wider block uppercase">{t('POTTERY CATALOGUE', 'INVENTORY SẢN PHẨM')}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-serif font-bold text-pottery-charcoal">{products.length}</span>
                <span className="text-xs text-emerald-600 font-mono">SKUs Active</span>
              </div>
              <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                <div className="bg-pottery-terracotta h-full rounded" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="bg-white border border-pottery-ivory rounded p-5 space-y-2 shadow-xs">
              <span className="text-[10px] text-stone-400 font-mono tracking-wider block uppercase">{t('B2B TRADE REGISTRY', 'TỔNG ĐỐI TÁC KHÁCH SỈ')}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-serif font-bold text-pottery-charcoal">{tradeApplications.length}</span>
                <span className="text-xs text-amber-600 font-mono font-bold">
                  {tradeApplications.filter(a => a.status === 'pending').length} {t('Pending', 'Chờ duyệt')}
                </span>
              </div>
              <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div className="bg-white border border-pottery-ivory rounded p-5 space-y-2 shadow-xs">
              <span className="text-[10px] text-stone-400 font-mono tracking-wider block uppercase">{t('OEM DESIGNS ON KILN', 'DỰ ÁN OEM ĐANG LÊN KHUÔN')}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-serif font-bold text-pottery-charcoal">{customBriefs.length}</span>
                <span className="text-xs text-cyan-600 font-mono">In Kiln R&D</span>
              </div>
              <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="bg-white border border-pottery-ivory rounded p-5 space-y-2 shadow-xs">
              <span className="text-[10px] text-stone-400 font-mono tracking-wider block uppercase">{t('SHIPMENT TARGET PORTS', 'SÂN CẢNG HỖ TRỢ')}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-serif font-bold text-pottery-charcoal">02</span>
                <span className="text-xs text-stone-500 font-mono">FOB Baselines</span>
              </div>
              <p className="text-[9px] text-stone-400 underline decoration-dotted font-mono">Cát Lái, Hải Phòng Ports</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Inventory Category Distribution Chart */}
            <div className="lg:col-span-8 bg-white border border-pottery-ivory rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Database size={15} className="text-pottery-terracotta" />
                  <span>{t('Inventory Category Distribution', 'Phân Phối Cơ Cấu Nhóm Gốm Đúc')}</span>
                </h3>
                <span className="text-[10px] text-stone-400 font-mono">Visual Ratio Breakdown</span>
              </div>

              {/* Dynamic bar chart based on actual sizes */}
              <div className="space-y-3.5">
                {categoriesList.map((cat, i) => {
                  const count = getProductsCountByCategory(cat);
                  const percentage = Math.max(8, (count / (products.length || 1)) * 100);
                  const colors = [
                    'bg-amber-600', 'bg-orange-600', 'bg-amber-700', 'bg-orange-850', 'bg-amber-900', 'bg-stone-600'
                  ];

                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-stone-700 font-sans font-medium">{t(cat, cat)}</span>
                        <span className="font-mono text-stone-500 font-semibold">{count} SKUs</span>
                      </div>
                      <div className="w-full bg-stone-50 h-3.5 rounded border border-stone-150 overflow-hidden relative">
                        <div 
                          className={`${colors[i % colors.length]} h-full transition-all duration-1000`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick system alerts & operational logging logs */}
            <div className="lg:col-span-4 bg-white border border-pottery-ivory rounded-lg p-6 space-y-4 text-left">
              <h3 className="font-serif font-bold text-stone-900 text-sm border-b border-stone-100 pb-3">
                {t('Administrative Logs', 'Nhật Ký Đột Biến & Hoạt Động')}
              </h3>

              <div className="space-y-3 font-mono text-[10px] text-stone-500 max-h-[300px] overflow-y-auto">
                <div className="border-l-2 border-emerald-500 pl-2.5 space-y-0.5">
                  <span className="text-[8px] text-stone-400 block">Today, 04:12 UTC</span>
                  <p className="text-stone-800 font-medium">System loaded catalog with {products.length} base pieces.</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-2.5 space-y-0.5">
                  <span className="text-[8px] text-stone-400 block">Today, 03:20 UTC</span>
                  <p className="text-stone-800">Approved trade sourcing application ID #APP-0128 for Earthy Vistas.</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-2.5 space-y-0.5">
                  <span className="text-[8px] text-stone-400 block">Yesterday, 14:02 UTC</span>
                  <p className="text-stone-850">Kaito Yamamoto requested emerald-crackle design brief #RFD-9810.</p>
                </div>
                <div className="border-l-2 border-stone-300 pl-2.5 space-y-0.5">
                  <span className="text-[8px] text-stone-400 block">Yesterday, 09:30 UTC</span>
                  <p className="text-stone-500">Local environment cache initialised. Static assets synced with standard CDN endpoints.</p>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => alert(t('Operational logs compiled under ISO standards.', 'Hồ sơ lưu trữ vận hành đã được kết xuất tĩnh.'))}
                  className="w-full text-center bg-stone-100 border border-stone-200 hover:bg-stone-200 text-stone-700 py-1.5 rounded font-mono text-[9px] font-bold uppercase transition"
                >
                  {t('Export Security Manifest', 'Xuất bản hồ sơ bảo mật')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*********** MODULAR TABS CONTROLS ***********/}
      {activeTab === 'catalog' && (
        <CatalogTab
          language={language}
          products={products}
          setProducts={setProducts}
        />
      )}

      {activeTab === 'customers' && (
        <CustomersTab
          language={language}
          registeredUsers={registeredUsers}
          setRegisteredUsers={setRegisteredUsers}
        />
      )}

      {activeTab === 'newsletter' && (
        <NewsletterTab
          language={language}
          newsletterSubscribers={newsletterSubscribers}
          setNewsletterSubscribers={setNewsletterSubscribers}
        />
      )}

      {activeTab === 'orders' && (
        <OrdersTab
          language={language}
          orders={orders}
          setOrders={setOrders}
          products={products}
          registeredUsers={registeredUsers}
        />
      )}

      {/*********** TAB 2: PRODUCTS CATALOG CMS (CRUD) ***********/}
      {activeTab === 'products' && (
        <div className="space-y-6 text-left animate-fadeIn">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-50 p-4 border border-stone-200 rounded">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs shrink-0">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder={t('Search by Name, SKU...', 'Tìm theo Tên hoặc SKU...')}
                className="w-full pl-9 pr-4 py-2 bg-white border border-stone-250 text-xs rounded focus:outline-none focus:border-pottery-terracotta"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <span className="text-xs text-stone-500 font-mono flex items-center gap-1 shrink-0">
                <Filter size={12} />
                <span>{t('Category:', 'Nhóm gốm:')}</span>
              </span>
              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="bg-white border border-stone-250 py-1.5 px-3 rounded text-xs focus:outline-none"
              >
                <option value="all">{t('All Categories', 'Tất cả danh mục')}</option>
                {categoriesList.map((cat, i) => (
                  <option key={i} value={cat}>{t(cat, cat)}</option>
                ))}
              </select>

              {/* Add New Product Trigger */}
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 shrink-0 transition"
              >
                <Plus size={14} />
                <span>{t('Add Product SKU', 'Thêm sản phẩm')}</span>
              </button>
            </div>

          </div>

          {/* Core Table Grid for Products */}
          <div className="bg-white border border-pottery-ivory rounded overflow-hidden">
            <div className="p-3 bg-stone-100 text-stone-600 text-xs font-mono border-b border-stone-200 grid grid-cols-12 gap-2 font-bold select-none text-left">
              <span className="col-span-5 sm:col-span-4">{t('PRODUCT ITEM & SKU', 'SẢN PHẨM & MÃ SKU')}</span>
              <span className="col-span-4 sm:col-span-3">{t('CATEGORY', 'DANH MỤC')}</span>
              <span className="col-span-3 sm:col-span-2 text-right">{t('RETAIL PRICE', 'GIÁ LẺ RETAIL')}</span>
              <span className="hidden sm:inline sm:col-span-1 text-center font-mono">MOQ</span>
              <span className="col-span-12 sm:col-span-2 text-center">{t('ACTIONS', 'QUẢN TRỊ')}</span>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-xs text-stone-400 italic py-16 text-center border-t border-stone-100">
                {t('No product matches your active filter query.', 'Không tìm thấy sản phẩm nào khớp với bộ lọc.')}
              </p>
            ) : (
              <div className="divide-y divide-stone-100">
                {filteredProducts.map((prod) => (
                  <div key={prod.id} className="p-3 grid grid-cols-12 gap-2 text-xs items-center hover:bg-stone-50/50">
                    
                    {/* Item cell */}
                    <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                      <img src={prod.mainImage} className="w-10 h-10 object-cover rounded border border-stone-200 shrink-0" alt={prod.name} />
                      <div className="truncate">
                        <strong className="block text-stone-850 truncate leading-tight">{prod.name}</strong>
                        <span className="text-[10px] text-stone-400 font-mono block mt-0.5">{prod.SKU} • {prod.dimensions}</span>
                      </div>
                    </div>

                    {/* Category cell */}
                    <div className="col-span-4 sm:col-span-3">
                      <span className="inline-block bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[10px] font-medium max-w-full truncate">
                        {t(prod.category, prod.category)}
                      </span>
                    </div>

                    {/* Pricing cell */}
                    <div className="col-span-3 sm:col-span-2 text-right">
                      <strong className="font-mono text-stone-800 text-xs block">US$ {prod.retailPrice?.toFixed(2)}</strong>
                      <span className="text-[9px] text-emerald-700 font-mono block">Trade: {prod.fobPriceTier1 ? `FOB $${prod.fobPriceTier1.toFixed(2)}` : 'Contact'}</span>
                    </div>

                    {/* MOQ (desktop only) */}
                    <div className="hidden sm:block sm:col-span-1 text-center font-mono font-bold text-stone-600">
                      {prod.fobTier1MinimumQuantity || prod.moq || 10}
                    </div>

                    {/* Actions cell */}
                    <div className="col-span-12 sm:col-span-2 flex items-center justify-end sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100 mt-2 sm:mt-0">
                      
                      <button
                        onClick={() => handleDuplicateProduct(prod)}
                        title={t('Duplicate SKU', 'Nhân bản')}
                        className="p-1 sm:p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded transition"
                      >
                        <Copy size={13} />
                      </button>

                      <button
                        onClick={() => setEditingProduct(prod)}
                        className="p-1 sm:p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded flex items-center gap-1 transition text-[10px] font-mono"
                      >
                        <Edit size={13} />
                        <span className="hidden sm:inline">{t('EDIT', 'SỬA')}</span>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="p-1 sm:p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={13} />
                      </button>

                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/*********** TAB 3: WHOLESALER REGISTRY ***********/}
      {activeTab === 'wholesalers' && (
        <div className="space-y-6 text-left animate-fadeIn">
          
          {/* Header Action bar */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Users size={16} className="text-pottery-terracotta" />
              <span>{t('Wholesaler Trade Dossier & Applications Manager', 'Cơ sở quản lý các Đơn đề xuất & Đại lý sỉ')}</span>
            </h3>

            <button
              onClick={() => setIsAddAppOpen(true)}
              className="bg-stone-900 hover:bg-stone-850 text-white text-xs font-mono font-bold uppercase tracking-wider py-1.5 px-3 rounded flex items-center gap-1.5 transition"
            >
              <FolderPlus size={13} />
              <span>{t('New Offline Merchant', 'Thêm đối tác sỉ')}</span>
            </button>
          </div>

          {/* Core CRM Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* List columns */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400 block border-b border-stone-100 pb-1">
                {t('Awaiting & Active Sourcing Request Entries', 'Hồ sơ đại lý cần xử lý')}
              </h4>

              {tradeApplications.length === 0 ? (
                <p className="text-xs text-stone-400 italic py-8 text-center bg-stone-50 rounded border border-dashed">
                  {t('No Wholesalers currently registered.', 'Chưa ghi nhận đối tác sỉ nào trong hệ thống.')}
                </p>
              ) : (
                <div className="space-y-3.5">
                  {tradeApplications.map((app) => (
                    <div 
                      key={app.id} 
                      onClick={() => setViewingApp(app)}
                      className={`cursor-pointer bg-white border rounded p-4 text-left transition ${
                        viewingApp?.id === app.id ? 'border-pottery-terracotta ring-1 ring-pottery-terracotta' : 'border-pottery-ivory hover:border-stone-400'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[9px] text-stone-400 font-mono block">{app.id} • {app.date}</span>
                          <h4 className="font-serif font-bold text-stone-900 text-sm leading-tight">{app.companyName}</h4>
                          <span className="text-[10px] text-stone-500 font-mono">{app.country}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase rounded ${
                          app.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status === 'approved' ? t('APPROVED', 'ĐÃ PHÊ DUYỆT B2B') : app.status === 'rejected' ? t('REJECTED', 'TỪ CHỐI') : t('PENDING', 'CHỜ DUYỆT')}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-3 border-t border-stone-50 text-stone-500">
                        <span>Rep: <strong className="text-stone-700">{app.contactName}</strong></span>
                        <span className="underline text-pottery-terracotta font-bold flex items-center gap-0.5">
                          {t('View dossier', 'Hồ sơ chi tiết')} <ChevronRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inspect / Process Dossier panel */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-5">
              <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400 block border-b border-stone-200 pb-2 mb-4">
                🔍 {t('Dossier Audit Workbench', 'Chi tiết Pháp nhân & Quyết định sỉ')}
              </h4>

              {viewingApp ? (
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-stone-400 font-mono block">{viewingApp.id}</span>
                      <h3 className="text-xl font-serif font-bold text-stone-900 leading-tight">{viewingApp.companyName}</h3>
                      <a href={`https://${viewingApp.companyWebsite}`} target="_blank" rel="noreferrer" className="text-xs text-pottery-terracotta underline font-mono mt-0.5 block">
                        {viewingApp.companyWebsite || 'No website designated'}
                      </a>
                    </div>

                    <button 
                      onClick={() => handleDeleteApp(viewingApp.id)}
                      className="text-red-500 p-2 hover:bg-white rounded border border-transparent hover:border-stone-200 transition"
                      title={t('Delete Applicant Record', 'Xóa vĩnh viễn')}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Registry metadata block */}
                  <div className="grid grid-cols-2 gap-4 bg-white border border-stone-150 p-4 rounded text-xs leading-normal">
                    <div>
                      <span className="text-[9px] text-stone-400 font-mono uppercase block">{t('Business Registry Certificate', 'Đăng ký Kinh doanh')}</span>
                      <strong className="text-stone-700 font-mono">{viewingApp.businessRegistrationNumber || 'N/A'}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 font-mono uppercase block">{t('Business Type', 'Tính chất doanh nghiệp')}</span>
                      <strong className="text-stone-700">{viewingApp.businessType}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 font-mono uppercase block">{t('Sales Channel', 'Kênh phát hành')}</span>
                      <strong className="text-stone-700">{viewingApp.primarySalesChannel}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 font-mono uppercase block">{t('Contact Person', 'Người chịu trách nhiệm')}</span>
                      <strong className="text-stone-700">{viewingApp.contactName} ({viewingApp.jobTitle})</strong>
                    </div>
                    <div className="col-span-2 border-t border-stone-100 pt-2 grid grid-cols-2 gap-2 text-stone-600">
                      <div>
                        <span className="text-[9px] text-stone-400 font-mono uppercase block">Email Address</span>
                        <span className="underline break-all">{viewingApp.email}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-400 font-mono uppercase block">Phone Contact</span>
                        <span>{viewingApp.phone || 'No phone recorded'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Decision engine Area */}
                  <div className="bg-white p-4 border border-stone-150 rounded space-y-3">
                    <span className="text-[10px] text-stone-400 font-mono tracking-widest block uppercase font-bold">{t('DECISION DESK ACTIONS', 'XỬ LÝ HỒ SƠ')}</span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateAppStatus(viewingApp.id, 'rejected')}
                        disabled={viewingApp.status === 'rejected'}
                        className={`flex-1 text-center py-2 text-xs font-mono font-bold uppercase rounded border transition ${
                          viewingApp.status === 'rejected' 
                            ? 'bg-red-50 text-red-500 border-red-200 cursor-not-allowed' 
                            : 'bg-white hover:bg-red-50 text-red-600 border-stone-200'
                        }`}
                      >
                        {t('Reject / Deny Trade', 'Từ chối cấp')}
                      </button>
                      <button
                        onClick={() => handleUpdateAppStatus(viewingApp.id, 'pending')}
                        disabled={viewingApp.status === 'pending'}
                        className={`flex-1 text-center py-2 text-xs font-mono font-bold uppercase rounded border transition ${
                          viewingApp.status === 'pending' 
                            ? 'bg-amber-50 text-amber-500 border-amber-200 cursor-not-allowed' 
                            : 'bg-white hover:bg-stone-100 text-stone-600 border-stone-200'
                        }`}
                      >
                        {t('Set Pending Audit', 'Chờ hậu kiểm')}
                      </button>
                    </div>

                    <button
                      onClick={() => handleUpdateAppStatus(viewingApp.id, 'approved')}
                      disabled={viewingApp.status === 'approved'}
                      className={`w-full text-center py-2.5 text-xs font-mono font-bold uppercase rounded transition focus:outline-none ${
                        viewingApp.status === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 cursor-not-allowed' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      {viewingApp.status === 'approved' ? '✓ ' + t('APPROVED MEMBER ACTIVE', 'HỘI VIÊN ĐÃ ĐƯỢC PHÊ DUYỆT') : t('Verify & Approve member', 'Phê duyệt & Chấp thuận ')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-stone-400 italic text-xs">
                  {t('Select an application card from the list to audit credentials dossiers and assign decisions.', 'Vui lòng chọn một pháp nhân ở hành lang trái để thanh tra hồ sơ.')}
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/*********** TAB 4: CUSTOM BRIEF QUEUE ***********/}
      {activeTab === 'custom_briefs' && (
        <div className="space-y-6 text-left animate-fadeIn">
          
          <div className="flex justify-between items-center border-b border-stone-200 pb-3">
            <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Briefcase size={16} className="text-pottery-terracotta" />
              <span>{t('OEM Client Custom Specifications (Kiln R&D Center)', 'Đề án Gia Công Mỹ Nghệ OEM & Sản xuất ngoài bảng')}</span>
            </h3>

            <button
              onClick={() => setIsAddBriefOpen(true)}
              className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white text-xs font-mono font-bold uppercase tracking-wider py-1.5 px-3 rounded flex items-center gap-1.5 transition"
            >
              <Plus size={14} />
              <span>{t('Log Custom Brief', 'Phiếu Trình Mới')}</span>
            </button>
          </div>

          {/* Core dynamic Brief table */}
          {customBriefs.length === 0 ? (
            <div className="py-16 text-center text-stone-400 border border-dashed border-stone-200 rounded">
              {t('No bespoke R&D requests loaded.', 'Hệ thống chưa ghi nhận đề án OEM nào mới.')}
            </div>
          ) : (
            <div className="space-y-4">
              {customBriefs.map((brief) => (
                <div key={brief.id} className="bg-white border border-pottery-ivory rounded-lg p-5 shadow-xs text-left grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  
                  {/* Brief Dossier */}
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-pottery-terracotta text-sm">{brief.id}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                      <span className="text-[10px] text-stone-400 font-mono uppercase">{t('OEM SPECIFICATION SHEET', 'ĐỀ ÁN GIA CÔNG CỦA KHÁCH')}</span>
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-base">{brief.company || brief.fullName}</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-stone-50 p-2.5 rounded border border-stone-150 font-mono text-[10px]">
                      <div>{t('Contact:', 'Đại diện:')} <strong className="text-stone-700 font-sans block mt-0.5">{brief.fullName}</strong></div>
                      <div>Email: <strong className="text-stone-700 underline block mt-0.5 break-all">{brief.email}</strong></div>
                      <div>{t('Est. Volume:', 'MOQ dự tính:')} <strong className="text-stone-700 block mt-0.5 font-mono">{brief.estimatedQuantity} LOT</strong></div>
                      <div>{t('Category Target:', 'Dòng gốm:')} <strong className="text-stone-700 font-sans block mt-0.5">{brief.productCategory}</strong></div>
                    </div>

                    <div className="bg-white border border-stone-200 rounded p-3 text-xs text-stone-600 leading-relaxed font-sans mt-2">
                      <strong className="text-[8px] font-mono uppercase tracking-wider text-stone-400 block mb-1">{t('Mould & Glaze Technical details description:', 'Thông số mộc & phối liệu men hỏa biến của khách:')}</strong>
                      {brief.customizationDetails}
                    </div>
                  </div>

                  {/* Kiln Master Assignment controls */}
                  <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3 h-full">
                    <span className="text-[9px] text-stone-400 font-mono tracking-wider block uppercase font-bold">{t('KILN ENGINEERING CONTROLS', 'TRẠM KIỂM SOÁT LÒ ĐẮT')}</span>

                    <div>
                      <label className="text-[10px] text-stone-500 font-mono block mb-1">{t('Production status:', 'Tiến độ gia công:')}</label>
                      <select
                        value={brief.status}
                        onChange={(e) => handleUpdateBriefStatus(brief.id, e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded p-1.5 text-xs focus:outline-none"
                      >
                        <option value="New">📥 {t('New / Specifications Review', 'Đơn Mới / Kiểm duyệt Bản vẽ kỹ thuật')}</option>
                        <option value="Mold Prototyping">📐 {t('Mould Drafting & Prototyping', 'Đang Tiện Khuôn mộc & Thử phôi sét')}</option>
                        <option value="Kiln Firing">🔥 {t('Kiln Firing Batch F1', 'Đang nung sấy mộc lò củi/ga')}</option>
                        <option value="Quality Controls passed">✓ {t('QC Verification Passed', 'Đã Qua Sát Kiểm Đầu ra Chất lượng')}</option>
                        <option value="Sample Despatched">✈️ {t('Client Sample Dispatched', 'Đã Đóng thùng chuyển phát mẫu nội địa/FOB')}</option>
                        <option value="Completed">🎉 {t('Completed / Standard order ready', 'Đã hoàn thành / Sẵn sàng Sourcing đại trà')}</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-stone-200/50">
                      <span className="bg-pottery-ivory border border-stone-200 text-stone-700 text-[9px] font-mono px-2 py-1 rounded block truncate w-full">
                        {t('Status: ', 'Tiến trình: ')}<strong>{brief.status}</strong>
                      </span>
                      <button 
                        onClick={() => handleDeleteBrief(brief.id)}
                        className="text-red-500 bg-white hover:bg-red-50 p-2 border border-stone-200 hover:border-red-200 rounded shrink-0 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/*********** TAB 5: SYSTEM CONFIGURATION ***********/}
      {activeTab === 'system' && (
        <div className="bg-white border border-pottery-ivory rounded-lg p-8 max-w-3xl mx-auto space-y-6 text-left animate-fadeIn">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
              <Settings size={18} className="text-pottery-terracotta" />
              <span>{t('Back-office Database Configuration Settings', 'Thiết lập tham số lõi hệ thống đại lý')}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Configuration endpoints and parameters assigned specifically under Vietnam Export Standards (VES-2026).
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="border border-stone-200 p-4 rounded bg-stone-50/50 space-y-1">
                <span className="text-stone-400 block uppercase font-bold text-[9px]">API INTERACTION MODE</span>
                <strong className="text-emerald-700">SANDBOX MEMORY_STATE</strong>
                <p className="text-[10px] text-stone-500 font-sans leading-relaxed mt-1">
                  Updates persist on-screen during the active browser turn session. Ideal for presentation and auditor sandbox tests.
                </p>
              </div>

              <div className="border border-stone-200 p-4 rounded bg-stone-50/50 space-y-1">
                <span className="text-stone-400 block uppercase font-bold text-[9px]">COMPATIBLE INCOTERMS</span>
                <strong className="text-stone-850">FOB (Incoterms® 2020)</strong>
                <p className="text-[10px] text-stone-500 font-sans leading-relaxed mt-1">
                  All trade calculations align with FOB bases on Vietnamese loading ports (Ho Chi Minh City, Haiphong).
                </p>
              </div>
            </div>

            <div className="p-4 border border-stone-200 rounded leading-relaxed text-xs text-stone-605 bg-stone-50/20">
              <span className="font-bold text-stone-850 block mb-1">🏺 Sourcing Safety Limit and Buffer Controls</span>
              To comply with the physical kiln capacities of POTTERY.VN, B2B orders have a default lot restriction of 10-25 containers matching standard export pallet packaging. These ratios can be tailored under formal client contract signatures. Consult with our regional kiln representatives for direct logistics audits.
            </div>

            <button
              onClick={() => {
                if (confirm(t('Reset local collection states to standard seeded assets?', 'Khôi phục toàn bộ danh mục sản phẩm và hồ sơ về dữ liệu mặc định ban đầu?'))) {
                  window.location.reload();
                }
              }}
              className="bg-stone-900 hover:bg-stone-800 text-white font-mono font-bold text-xs uppercase tracking-widest px-5 py-3.5 rounded transition shadow-sm flex items-center gap-2"
            >
              <RefreshCw size={13} className="animate-spin-slow" />
              <span>{t('Reset Database state to default seed', 'Khôi phục dữ liệu catalog gốc')}</span>
            </button>
          </div>
        </div>
      )}


      {/*********** MODAL: ADD PRODUCT SKU ***********/}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 p-4 overflow-y-auto flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-stone-200 rounded-lg max-w-2xl w-full p-6 space-y-4 shadow-2xl text-left scale-up">
            <div className="flex justify-between items-center border-b border-stone-150 pb-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <FolderPlus size={18} className="text-pottery-terracotta" />
                <span>{t('Add New Premium Product SKU', 'Tạo Mới Mã SKU Sản Phẩm Gốm Sứ')}</span>
              </h3>
              <button 
                onClick={() => setIsAddProductOpen(false)}
                className="text-stone-400 hover:text-stone-800 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    placeholder="e.g. Imperial Crackle Garden Urn"
                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-pottery-terracotta"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Unique Product SKU *</label>
                  <input
                    type="text"
                    required
                    value={productForm.SKU}
                    onChange={(e) => setProductForm({...productForm, SKU: e.target.value.toUpperCase()})}
                    placeholder="e.g. P1080-CR"
                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-pottery-terracotta font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Category Select *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value as Product['category']})}
                    className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none"
                  >
                    {categoriesList.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Dimensions overview *</label>
                  <input
                    type="text"
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm({...productForm, dimensions: e.target.value})}
                    placeholder="e.g. 50 x 50 x 70 cm"
                    className="w-full border border-stone-300 p-2 rounded focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Primary Material *</label>
                  <input
                    type="text"
                    value={productForm.material}
                    onChange={(e) => setProductForm({...productForm, material: e.target.value})}
                    placeholder="e.g. Chamotte Stoneware"
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Glaze / Finish Technique *</label>
                  <input
                    type="text"
                    value={productForm.finish}
                    onChange={(e) => setProductForm({...productForm, finish: e.target.value})}
                    placeholder="e.g. Salt Glaze Drip"
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Retail Public Price ($ USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={productForm.retailPrice}
                    onChange={(e) => setProductForm({...productForm, retailPrice: parseFloat(e.target.value) || 0})}
                    className="w-full border border-stone-300 p-2 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">FOB Trade Price Tier 1 ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.fobPriceTier1}
                    onChange={(e) => setProductForm({...productForm, fobPriceTier1: parseFloat(e.target.value) || 0})}
                    className="w-full border border-stone-300 p-2 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Minimum Order Qty MOQ (pieces)</label>
                  <input
                    type="number"
                    value={productForm.moq}
                    onChange={(e) => setProductForm({...productForm, moq: parseInt(e.target.value) || 10})}
                    className="w-full border border-stone-300 p-2 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Main Image URL / Source Unsplash</label>
                  <select
                    value={productForm.mainImage}
                    onChange={(e) => setProductForm({...productForm, mainImage: e.target.value})}
                    className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none"
                  >
                    <option value="https://images.unsplash.com/photo-1545241047-6083a3684587">🏺 Planter Green Moss Base</option>
                    <option value="https://images.unsplash.com/photo-1485955900006-10f4d324d411">🍃 Small Tableware Pot</option>
                    <option value="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c">🌀 Crackle Vintage Vase Blue</option>
                    <option value="https://images.unsplash.com/photo-1502082553048-f009c37129b9">🌳 Giant Clay Urn Vessel</option>
                    <option value="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85">🪑 Luxury Hollow Sitting Stool</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-150 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-stone-250 hover:bg-stone-50 rounded text-stone-700 font-mono font-bold"
                >
                  {t('Cancel', 'Hủy')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pottery-terracotta hover:bg-pottery-deepclay text-white rounded font-mono font-bold uppercase transition"
                >
                  {t('Publish SKU Live', 'Khai sinh SKU Lên Kệ')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*********** MODAL: EDIT PRODUCT SKU ***********/}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 p-4 overflow-y-auto flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-stone-200 rounded-lg max-w-2xl w-full p-6 space-y-4 shadow-2xl text-left scale-up">
            <div className="flex justify-between items-center border-b border-stone-150 pb-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <Edit size={18} className="text-pottery-terracotta" />
                <span>{t('Amend Product configuration', 'Hiệu Chỉnh Thông Số Lò Gốm')}</span>
              </h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="text-stone-400 hover:text-stone-800 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-pottery-terracotta"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Product SKU * (Unique)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.SKU}
                    onChange={(e) => setEditingProduct({...editingProduct, SKU: e.target.value.toUpperCase()})}
                    className="w-full border border-stone-300 p-2 rounded font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value as Product['category']})}
                    className="w-full bg-white border border-stone-300 p-2 rounded focus:outline-none"
                  >
                    {categoriesList.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Dimensions overview *</label>
                  <input
                    type="text"
                    value={editingProduct.dimensions}
                    onChange={(e) => setEditingProduct({...editingProduct, dimensions: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Material Composition</label>
                  <input
                    type="text"
                    value={editingProduct.material}
                    onChange={(e) => setEditingProduct({...editingProduct, material: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Glaze Technique</label>
                  <input
                    type="text"
                    value={editingProduct.finish}
                    onChange={(e) => setEditingProduct({...editingProduct, finish: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Retail Price ($ USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={editingProduct.retailPrice}
                    onChange={(e) => setEditingProduct({...editingProduct, retailPrice: parseFloat(e.target.value) || 0})}
                    className="w-full border border-stone-300 p-2 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">FOB Tier 1 Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.fobPriceTier1 || 0}
                    onChange={(e) => setEditingProduct({...editingProduct, fobPriceTier1: parseFloat(e.target.value) || 0})}
                    className="w-full border border-stone-300 p-2 rounded font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-150 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-stone-250 hover:bg-stone-50 rounded text-stone-700 font-mono"
                >
                  {t('Discard changes', 'Hủy')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-mono font-bold uppercase transition"
                >
                  {t('Commit alterations', 'Lưu thay đổi')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*********** MODAL: ADD MANUAL merchant ***********/}
      {isAddAppOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 p-4 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-stone-200 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl text-left scale-up">
            <div className="flex justify-between items-center border-b border-stone-150 pb-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <Users size={18} className="text-pottery-terracotta" />
                <span>{t('Create Wholesaler Profiling Manually', 'Hồ Sơ Thương Nhân B2B Ngoại Tuyến')}</span>
              </h3>
              <button onClick={() => setIsAddAppOpen(false)} className="text-stone-400 hover:text-stone-800 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-stone-400 font-mono block mb-1">Company Registered Name *</label>
                  <input
                    type="text"
                    required
                    value={appForm.companyName}
                    onChange={(e) => setAppForm({...appForm, companyName: e.target.value})}
                    placeholder="e.g. Garden World Australia Pty Ltd"
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Company Website</label>
                  <input
                    type="text"
                    value={appForm.companyWebsite}
                    onChange={(e) => setAppForm({...appForm, companyWebsite: e.target.value})}
                    placeholder="www.gardenworld.com.au"
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Representative Name *</label>
                  <input
                    type="text"
                    required
                    value={appForm.contactName}
                    onChange={(e) => setAppForm({...appForm, contactName: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Contact Email Address *</label>
                  <input
                    type="email"
                    required
                    value={appForm.email}
                    onChange={(e) => setAppForm({...appForm, email: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Origin Country</label>
                  <input
                    type="text"
                    value={appForm.country}
                    onChange={(e) => setAppForm({...appForm, country: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-150 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddAppOpen(false)}
                  className="px-4 py-2 border border-stone-250 hover:bg-stone-50 rounded text-stone-700"
                >
                  {t('Cancel', 'Hủy')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-mono font-bold uppercase transition"
                >
                  {t('Add to Wholesaler Desk', 'Phê chuẩn lên Sổ đại lý')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*********** MODAL: ADD OEM BRIEF ***********/}
      {isAddBriefOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 p-4 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-stone-200 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl text-left scale-up">
            <div className="flex justify-between items-center border-b border-stone-150 pb-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <Briefcase size={18} className="text-pottery-terracotta" />
                <span>{t('Register Custom OEM Factory Order', 'Đàm Phán Mẫu Vẽ & Đề Án Gia Công OEM')}</span>
              </h3>
              <button onClick={() => setIsAddBriefOpen(false)} className="text-stone-400 hover:text-stone-800 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateBrief} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Company / Org Name</label>
                  <input
                    type="text"
                    value={briefForm.company}
                    onChange={(e) => setBriefForm({...briefForm, company: e.target.value})}
                    placeholder="e.g. Kyoto Zen Gardens"
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Auditor / Sourcing Agent *</label>
                  <input
                    type="text"
                    required
                    value={briefForm.fullName}
                    onChange={(e) => setBriefForm({...briefForm, fullName: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Inquiry Email *</label>
                  <input
                    type="email"
                    required
                    value={briefForm.email}
                    onChange={(e) => setBriefForm({...briefForm, email: e.target.value})}
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="text-stone-400 font-mono block mb-1">Target Category</label>
                  <select
                    value={briefForm.productCategory}
                    onChange={(e) => setBriefForm({...briefForm, productCategory: e.target.value})}
                    className="w-full bg-white border border-stone-300 p-2 rounded"
                  >
                    {categoriesList.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-stone-400 font-mono block mb-1">Drafting Technical Specifications *</label>
                  <textarea
                    rows={4}
                    required
                    value={briefForm.customizationDetails}
                    onChange={(e) => setBriefForm({...briefForm, customizationDetails: e.target.value})}
                    placeholder="e.g. Ribbed hollow ceramic drum side-tables with deep ocean blue running glazes. Volume requirement: 150 matching pieces."
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-150 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddBriefOpen(false)}
                  className="px-4 py-2 border border-stone-250 hover:bg-stone-50 rounded text-stone-700"
                >
                  {t('Cancel', 'Hủy')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pottery-terracotta hover:bg-pottery-deepclay text-white rounded font-mono font-bold uppercase transition"
                >
                  {t('Issue factory order draft', 'Duyệt Chuyển Bản Vẽ Lò Nung')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
