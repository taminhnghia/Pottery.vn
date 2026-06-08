/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, User, UserRole, TradeApplication, CustomDevelopmentBrief } from './types';
import { generateAllProducts } from './data/products';

import RoleSimulator from './components/RoleSimulator';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import Collections from './pages/Collections';
import Shop from './pages/Shop';
import TradePortal from './pages/TradePortal';
import ApplyTrade from './pages/ApplyTrade';
import ExportCapabilities from './pages/ExportCapabilities';
import CustomDevelopment from './pages/CustomDevelopment';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Inspiration from './pages/Inspiration';
import Catalogue from './pages/Catalogue';
import Legal from './pages/Legal';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

export default function App() {
  // Master states
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [products, setProducts] = useState<Product[]>(generateAllProducts());
  
  // Shopping cart bag state
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  // RFQ inquiry state (products added to wholesale list)
  const [inquiry, setInquiry] = useState<Product[]>([]);
  // Favorite saved products
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
  // Active modal focus inside products page
  const [selectedProductSKU, setSelectedProductSKU] = useState<string | null>(null);

  // Seed initial trade applications for Admin Dashboard
  const [tradeApplications, setTradeApplications] = useState<TradeApplication[]>([
    {
      id: 'APP-0128',
      date: '2026-05-18',
      companyName: 'Earthy Vistas Australia',
      companyWebsite: 'www.earthyvistas.com.au',
      country: 'Australia',
      businessRegistrationNumber: 'AU-ABN-82910',
      businessType: 'Importer',
      primarySalesChannel: 'Landscape Sourcing',
      contactName: 'Nigel Green',
      jobTitle: 'Sourcing Director',
      email: 'nigel@earthyvistas.com.au',
      phone: '+61 412 890 210',
      preferredIncoterm: 'FOB',
      status: 'approved'
    },
    {
      id: 'APP-4318',
      date: '2026-05-24',
      companyName: 'Munich Botanical Yards',
      companyWebsite: 'www.munichbotanical.de',
      country: 'Germany',
      businessRegistrationNumber: 'DE-TAX-432190',
      businessType: 'Garden Centre',
      primarySalesChannel: 'Lifestyle Retail',
      contactName: 'Karla Schmidt',
      jobTitle: 'Category Importer',
      email: 'k.schmidt@botanicalyards.de',
      phone: '+49 89 241982',
      preferredIncoterm: 'FOB',
      status: 'pending'
    },
    {
      id: 'APP-9812',
      date: '2026-06-01',
      companyName: 'WestCoast Stoneware Inc.',
      companyWebsite: 'www.westcoaststone.us',
      country: 'United States',
      businessRegistrationNumber: 'US-EIN-982190',
      businessType: 'Distributor',
      primarySalesChannel: 'Wholesale Division',
      contactName: 'Dylan Carter',
      jobTitle: 'VP Procurement',
      email: 'd.carter@westcoaststone.me',
      phone: '+1 (415) 390-2810',
      preferredIncoterm: 'CIF',
      status: 'pending'
    }
  ]);

  // Seed initial custom R&D brains logs
  const [customBriefs, setCustomBriefs] = useState<CustomDevelopmentBrief[]>([
    {
      id: 'RFD-0210',
      fullName: 'Charlotte Miller',
      company: 'Miller Architectural Design',
      email: 'cmiller@millerdecor.com',
      country: 'United States',
      productCategory: 'Outdoor Planters',
      estimatedQuantity: 200,
      customizationDetails: 'Tall cylindrical outdoor planters with customized matte-iron glazes to mimic natural volcanic rocks. Drainage holes must reside strictly 5cm from the bottom walls.',
      status: 'New'
    },
    {
      id: 'RFD-9810',
      fullName: 'Kaito Yamamoto',
      company: 'Tokyo Tea Rituals',
      email: 'yamamoto@tearituals.jp',
      country: 'Japan',
      productCategory: 'Decorative Vases',
      estimatedQuantity: 120,
      customizationDetails: 'Fine-walled sand wash teahouse flower vessels featuring a heavy emerald crackle interior drip glaze.',
      status: 'New'
    }
  ]);

  // Seed registered customers & accounts
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([
    {
      id: 'USR-8901',
      email: 'nigel@earthyvistas.com.au',
      role: 'strategic_distributor',
      fullName: 'Nigel Green',
      companyName: 'Earthy Vistas Australia',
      companyWebsite: 'www.earthyvistas.com.au',
      country: 'Australia',
      phone: '+61 412 890 210',
      approvalStatus: 'approved',
      assignedBuyerGroup: 'Platinum Importers Alliance',
      registrationNumber: 'AU-ABN-82910',
      businessType: 'Importer'
    },
    {
      id: 'USR-1289',
      email: 'k.schmidt@botanicalyards.de',
      role: 'trade_applicant',
      fullName: 'Karla Schmidt',
      companyName: 'Munich Botanical Yards',
      country: 'Germany',
      phone: '+49 89 241982',
      approvalStatus: 'pending',
      registrationNumber: 'DE-TAX-432190',
      businessType: 'Garden Centre'
    },
    {
      id: 'USR-9023',
      email: 'd.carter@westcoaststone.me',
      role: 'trade_applicant',
      fullName: 'Dylan Carter',
      companyName: 'WestCoast Stoneware Inc.',
      country: 'United States',
      phone: '+1 (415) 390-2810',
      approvalStatus: 'pending',
      registrationNumber: 'US-EIN-982190',
      businessType: 'Distributor'
    },
    {
      id: 'USR-0452',
      email: 'elena.petrova@decorlux.cz',
      role: 'retail_customer',
      fullName: 'Elena Petrova',
      country: 'Czech Republic',
      phone: '+420 224 811 111'
    },
    {
      id: 'USR-3420',
      email: 'alex.minh@vietdecor.com',
      role: 'approved_b2b_buyer',
      fullName: 'Nguyên Minh Anh',
      companyName: 'VietDecor Design Studio',
      country: 'Vietnam',
      phone: '+84 903 881 992',
      approvalStatus: 'approved',
      businessType: 'Designer/Architect'
    }
  ]);

  // Seed newsletter subscribers
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<{
    id: string;
    email: string;
    dateSubscribed: string;
    status: 'Active' | 'Unsubscribed';
    source: 'Home' | 'Footer' | 'Catalog Download' | 'Manual Registration';
  }[]>([
    { id: 'SUB-01', email: 'architect@luxespaces.co', dateSubscribed: '2026-05-12', status: 'Active', source: 'Home' },
    { id: 'SUB-02', email: 'sourcing@homepots.com', dateSubscribed: '2026-05-20', status: 'Active', source: 'Catalog Download' },
    { id: 'SUB-03', email: 'contact@bostongardens.us', dateSubscribed: '2026-06-02', status: 'Active', source: 'Footer' },
    { id: 'SUB-04', email: 'info@danangclay.vn', dateSubscribed: '2026-06-04', status: 'Active', source: 'Manual Registration' },
    { id: 'SUB-05', email: 'sydney.landscapes@design.com.au', dateSubscribed: '2026-06-07', status: 'Active', source: 'Catalog Download' }
  ]);

  // Sync scroll positioning on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  // Handle page path triggers
  const executeNavigation = (path: string) => {
    setCurrentPath(path);
  };

  // Logout callback
  const handleLogout = () => {
    setCurrentRole('guest');
    setCart([]);
    setInquiry([]);
    setSavedProductIds([]);
    setCurrentPath('/');
    alert(language === 'en' ? 'Logged out successfully!' : 'Đã thoát chương trình quản trị!');
  };

  // Approved role trigger
  const handleLoginAsRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'admin') {
      executeNavigation('/admin');
    }
  };

  // Add application trigger
  const handleAddNewApplication = (app: TradeApplication) => {
    setTradeApplications([app, ...tradeApplications]);
  };

  // Add Brief R&D trigger
  const handleAddNewBrief = (brief: CustomDevelopmentBrief) => {
    setCustomBriefs([brief, ...customBriefs]);
  };

  // Wholesaler Sourcing license approvals
  const handleApproveApplication = (id: string) => {
    setTradeApplications(tradeApplications.map(app => {
      if (app.id === id) {
        return { ...app, status: 'approved' };
      }
      return app;
    }));
  };

  const handleRejectApplication = (id: string) => {
    setTradeApplications(tradeApplications.filter(app => app.id !== id));
  };

  // In-app price changes (Administrator dashboard)
  const handleUpdateProductPrice = (productId: string, newRetail: number, newTrade?: number) => {
    setProducts(products.map(prod => {
      if (prod.id === productId) {
        return {
          ...prod,
          retailPrice: newRetail,
          // If custom B2B tradePrice parameters need mapping
        };
      }
      return prod;
    }));
  };

  // Cart bag quantity modifiers
  const handleAddToCart = (product: Product) => {
    const exists = cart.find(item => item.product.id === product.id);
    if (exists) {
      setCart(cart.map(item => {
        if (item.product.id === product.id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      }));
    } else {
      setCart([...cart, { product, qty: 1 }]);
    }
    
    // Auto shift to retail mode or suggest shopping bag
    if (currentRole === 'guest') {
      setCurrentRole('retail_customer');
    }
    alert(language === 'en' ? `${product.name} added to cart bag!` : `Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleUpdateCartQty = (productId: string, qty: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, qty: Math.max(1, qty) };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wholesale inquiry RFQ managers
  const handleAddToInquiry = (product: Product) => {
    const exists = inquiry.find(item => item.id === product.id);
    if (exists) {
      alert(language === 'en' ? 'SKU is already in inquiry list!' : 'Mã sản phẩm này đã có trong phiếu hỏi giá!');
    } else {
      setInquiry([...inquiry, product]);
      alert(language === 'en' ? `${product.name} added to B2B Inquiry pool!` : `Đã thêm ${product.name} vào phiếu hỏi giá!`);
    }
  };

  const handleRemoveFromInquiry = (productId: string) => {
    setInquiry(inquiry.filter(item => item.id !== productId));
  };

  const handleClearInquiry = () => {
    setInquiry([]);
  };

  const handleSubmitInquiry = () => {
    alert(language === 'en' 
      ? 'RFQ Sourcing Inquiry transmitted under code #RFQ-2026. A sales engineer will respond shortly.' 
      : 'Thư hỏi giá đã chuyển đến bộ phận dự án của lò nung! Mã số theo dõi: #RFQ-2026.'
    );
    setInquiry([]);
    executeNavigation('/account');
  };

  // Save/unsave favorite
  const handleSaveProduct = (product: Product) => {
    if (savedProductIds.includes(product.id)) {
      setSavedProductIds(savedProductIds.filter(id => id !== product.id));
    } else {
      setSavedProductIds([...savedProductIds, product.id]);
    }
  };

  const isSaved = (product: Product) => savedProductIds.includes(product.id);

  // Compile items arrays mapping ids
  const savedProductsList = products.filter(p => savedProductIds.includes(p.id));

  // Determine count parameters inside simulators
  const pendingApplicationsCount = tradeApplications.filter(app => app.status === 'pending').length;
  const totalInquiriesCount = inquiry.length;

  return (
    <div id="pottery-root" className="min-h-screen flex flex-col font-sans antialiased text-pottery-charcoal bg-pottery-warmwhite">
      
      {/* Interactive QA auditor control panel */}
      <RoleSimulator
        currentRole={currentRole}
        onChangeRole={handleLoginAsRole}
        pendingApplicationsCount={pendingApplicationsCount}
        totalInquiriesCount={totalInquiriesCount}
      />

      {/* Styled Headroom headers */}
      <Navbar
        currentRole={currentRole}
        language={language}
        setLanguage={setLanguage}
        cartCount={cart.reduce((s, c) => s + c.qty, 0)}
        inquiryCount={inquiry.length}
        onNavigate={executeNavigation}
        currentPath={currentPath}
        onLogout={handleLogout}
      />

      {/* Primary layout viewport container */}
      <main className="flex-grow">
        
        {currentPath === '/' && (
          <Home
            products={products}
            language={language}
            currentRole={currentRole}
            onNavigate={executeNavigation}
            onSelectFlow={(flow) => {
              if (flow === 'retail') {
                setCurrentRole('retail_customer');
                executeNavigation('/shop');
              } else {
                executeNavigation('/trade');
              }
            }}
            onAddToInquiry={handleAddToInquiry}
            onSaveProduct={handleSaveProduct}
            isSaved={isSaved}
          />
        )}

        {currentPath === '/products' && (
          <Products
            products={products}
            language={language}
            currentRole={currentRole}
            onNavigate={executeNavigation}
            onAddToInquiry={handleAddToInquiry}
            onSaveProduct={handleSaveProduct}
            isSaved={isSaved}
            selectedProductSKU={selectedProductSKU}
            setSelectedProductSKU={setSelectedProductSKU}
          />
        )}

        {currentPath === '/collections' && (
          <Collections
            language={language}
            onNavigate={executeNavigation}
          />
        )}

        {currentPath === '/shop' && (
          <Shop
            products={products}
            language={language}
            currentRole={currentRole}
            onNavigate={executeNavigation}
            onAddToCart={handleAddToCart}
            onSaveProduct={handleSaveProduct}
            isSaved={isSaved}
          />
        )}

        {currentPath === '/trade' && (
          <TradePortal
            products={products}
            language={language}
            currentRole={currentRole}
            onNavigate={executeNavigation}
            onAddToInquiry={handleAddToInquiry}
          />
        )}

        {currentPath === '/trade/apply' && (
          <ApplyTrade
            language={language}
            currentRole={currentRole}
            onNavigate={executeNavigation}
            onSubmitApplication={handleAddNewApplication}
          />
        )}

        {currentPath === '/export-capabilities' && (
          <ExportCapabilities
            language={language}
            onNavigate={executeNavigation}
          />
        )}

        {currentPath === '/custom-development' && (
          <CustomDevelopment
            language={language}
            onNavigate={executeNavigation}
            onSubmitBrief={handleAddNewBrief}
          />
        )}

        {currentPath === '/about-us' && (
          <AboutUs
            language={language}
          />
        )}

        {currentPath === '/contact' && (
          <Contact
            language={language}
          />
        )}

        {currentPath === '/inspiration' && (
          <Inspiration
            language={language}
            onNavigate={executeNavigation}
          />
        )}

        {currentPath === '/catalogue' && (
          <Catalogue
            language={language}
          />
        )}

        {currentPath === '/privacy-policy' && (
          <Legal
            language={language}
            mode="privacy"
          />
        )}

        {currentPath === '/terms-of-use' && (
          <Legal
            language={language}
            mode="terms"
          />
        )}

        {currentPath === '/cookie-policy' && (
          <Legal
            language={language}
            mode="cookie"
          />
        )}

        {currentPath === '/account' && (
          <Account
            language={language}
            currentRole={currentRole}
            cart={cart}
            inquiry={inquiry}
            savedProducts={savedProductsList}
            tradeApplications={tradeApplications}
            onNavigate={executeNavigation}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onRemoveFromInquiry={handleRemoveFromInquiry}
            onAddToCart={handleAddToCart}
            onClearCart={handleClearCart}
            onClearInquiry={handleClearInquiry}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}

        {/* Dynamic redirection triggers */}
        {currentPath === '/trade/request-fob-quote' && (
          <Account
            language={language}
            currentRole={currentRole}
            cart={cart}
            inquiry={inquiry}
            savedProducts={savedProductsList}
            tradeApplications={tradeApplications}
            onNavigate={executeNavigation}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onRemoveFromInquiry={handleRemoveFromInquiry}
            onAddToCart={handleAddToCart}
            onClearCart={handleClearCart}
            onClearInquiry={handleClearInquiry}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}

        {currentPath === '/sign-in' && (
          <SignIn
            language={language}
            onNavigate={executeNavigation}
            onLoginAsRole={handleLoginAsRole}
          />
        )}

        {currentPath === '/admin' && (
          <Dashboard
            language={language}
            currentRole={currentRole}
            products={products}
            tradeApplications={tradeApplications}
            customBriefs={customBriefs}
            onNavigate={executeNavigation}
            onApproveApplication={handleApproveApplication}
            onRejectApplication={handleRejectApplication}
            onUpdateProductPrice={handleUpdateProductPrice}
            setProducts={setProducts}
            setTradeApplications={setTradeApplications}
            setCustomBriefs={setCustomBriefs}
            registeredUsers={registeredUsers}
            setRegisteredUsers={setRegisteredUsers}
            newsletterSubscribers={newsletterSubscribers}
            setNewsletterSubscribers={setNewsletterSubscribers}
          />
        )}

      </main>

      {/* High contrast, luxury, editorial Footer */}
      <Footer
        language={language}
        onNavigate={executeNavigation}
      />

    </div>
  );
}
