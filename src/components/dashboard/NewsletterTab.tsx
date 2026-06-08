import React, { useState, useEffect } from 'react';
import { Mail, Send, Sparkles, Plus, Trash2, Search, DownloadCloud, CheckCircle, Smartphone, Monitor, ChevronRight, ListFilter, AlertCircle, RefreshCw } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  dateSubscribed: string;
  status: 'Active' | 'Unsubscribed';
  source: 'Home' | 'Footer' | 'Catalog Download' | 'Manual Registration';
}

interface NewsletterTabProps {
  language: 'en' | 'vi';
  newsletterSubscribers: Subscriber[];
  setNewsletterSubscribers: React.Dispatch<React.SetStateAction<Subscriber[]>>;
}

export default function NewsletterTab({ language, newsletterSubscribers, setNewsletterSubscribers }: NewsletterTabProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Search filter
  const [subSearch, setSubSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Manual sub
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubSource, setNewSubSource] = useState<'Home' | 'Footer' | 'Catalog Download' | 'Manual Registration'>('Manual Registration');

  // Campaign parameters
  const [campaignSubject, setCampaignSubject] = useState(
    t('Autumn Kiln Updates: Premium Metallic Copper Glazes Released', 'Bản Tin Lò Nung Gốm Thu: Khai Hỏa Cực Phẩm Men Hỏa Biến Kim Đồng')
  );
  const [campaignPreheader, setCampaignPreheader] = useState(
    t('Exclusive wholesale FOB price lists and packing specifications inside.', 'Bản giá chi tiết xuất khẩu container dòng lộc trĩ hoàng cung.')
  );
  const [campaignContent, setCampaignContent] = useState(
    t(
      `We represent Vietnamese pottery standard shapes from Bát Tràng and Bình Dương. This fall, our craft engineers present a customized metallic copper drip glaze that stands up well to sub-zero freeze climates.\n\nInside this dispatch:\n- Premium Tall Cylindrical Pots specification sheets\n- Frost-proof clay compound tests\n- Curated B2B FOB Ho Chi Minh port quote parameters\n\nSubmit your order requirements online or download the Autumn Catalogue.`,
      `Nhà chế tác POTTERY.VN chính thức khai hỏa dải sản phẩn chậu cỡ đại tráng men hỏa biến ánh kim, đúc từ cốt sét cao lanh chịu nhiệt của vùng mỏ đá Hải Dương.\n\nBản tin gồm các cập nhật:\n- Kỹ thuật dải men bóng chảy không rạn nứt dưới thời tiết đại băng giá\n- Báo giá FOB Ho Chi Minh - Hải Phòng áp dụng quý III\n- Catalog mẫu bento đôn gốm tráng men vàng hoàng gia`
    )
  );
  const [selectedTemplate, setSelectedTemplate] = useState<'editorial' | 'minimal' | 'catalog'>('editorial');

  // Broadcast animation states
  const [broadcasting, setBroadcasting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [completedCampaigns, setCompletedCampaigns] = useState<number>(3);

  // Add subscriber
  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newSubEmail.trim().toLowerCase();
    if (!email) return;
    if (newsletterSubscribers.some(s => s.email === email)) {
      alert(t('Email is already registered!', 'Email này đã có trong danh sách!'));
      return;
    }

    const newSub: Subscriber = {
      id: 'SUB-' + Math.floor(Math.random() * 900 + 100),
      email,
      dateSubscribed: new Date().toISOString().split('T')[0],
      status: 'Active',
      source: newSubSource
    };

    setNewsletterSubscribers([newSub, ...newsletterSubscribers]);
    setNewSubEmail('');
    alert(t('Subscriber registered successfully!', 'Đăng ký địa chỉ email vào danh sách thành công!'));
  };

  // Toggle subscriber status
  const handleToggleStatus = (id: string) => {
    setNewsletterSubscribers(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Unsubscribed' : 'Active' } : s));
  };

  // Delete subscriber
  const handleDeleteSubscriber = (id: string) => {
    if (confirm(t('Are you sure you want to remove this subscriber permanently?', 'Bạn có chắc chắn muốn loại bỏ email này khỏi phân hệ gửi thư?'))) {
      setNewsletterSubscribers(prev => prev.filter(s => s.id !== id));
    }
  };

  // Simulate CSV download
  const handleCSVDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8,ID,Email,Date Subscribed,Status,Source\n" + 
      newsletterSubscribers.map(s => `${s.id},${s.email},${s.dateSubscribed},${s.status},${s.source}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pottery_subscribers_report_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger Campaign Broadcast
  const handleStartBroadcast = () => {
    const activeSubs = newsletterSubscribers.filter(s => s.status === 'Active');
    if (activeSubs.length === 0) {
      alert(t('No active subscribers available!', 'Không có người đăng ký hoạt động để gửi đi!'));
      return;
    }

    setBroadcasting(true);
    setProgress(0);
    setLogs([t('Initializing Vietnam back-office relay SMTP tunnel...', 'Đang khởi động cổng truyền SMTP lò nung POTTERY.VN...')]);

    // Fast-loading interval animations
    let curProgress = 0;
    const interval = setInterval(() => {
      curProgress += 4;
      if (curProgress > 100) {
        clearInterval(interval);
        setTimeout(() => {
          setBroadcasting(false);
          setProgress(100);
          setCompletedCampaigns(prev => prev + 1);
          alert(t('Campaign successfully broadcasted to all active subscribers!', 'Bản tin mẫu lò đã được chuyển phát thành công tới các hòm thư sỉ lẻ!'));
        }, 500);
      } else {
        setProgress(curProgress);
        // Add periodic logs
        if (curProgress === 20) {
          setLogs(prev => [...prev, t('Relay established securely under TLS/SSL protocols.', 'Kết nối bảo mật mã hóa giao thức TLS/SSL chuẩn xuất khẩu.')]);
        } else if (curProgress === 40) {
          setLogs(prev => [...prev, t('Drafting responsive HTML layouts to nodes...', 'Nạp bản vẽ phân bổ lưới di động responsive cho mã lò...')]);
        } else if (curProgress === 60) {
          const randomEmail = activeSubs[Math.floor(Math.random() * activeSubs.length)].email;
          setLogs(prev => [...prev, `[Relay] Dispatched and delivered to: ${randomEmail} [OK]`]);
        } else if (curProgress === 80) {
          const randomEmail2 = activeSubs[Math.max(0, activeSubs.length - 2)].email;
          setLogs(prev => [...prev, `[Relay] Dispatched and delivered to: ${randomEmail2} [OK]`]);
        } else if (curProgress === 96) {
          setLogs(prev => [...prev, t(`Finished streaming to ${activeSubs.length} active sockets successfully.`, `Đã phân luồng thành công tới toàn bộ ${activeSubs.length} hòm thư hoạt động.`)]);
        }
      }
    }, 120);
  };

  // Filter
  const filteredSubs = newsletterSubscribers.filter(s => {
    const matchesSearch = s.email.toLowerCase().includes(subSearch.toLowerCase());
    const matchesSource = sourceFilter === 'all' || s.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div id="newsletter-tab-container" className="space-y-6 text-left animate-fadeIn">
      
      {/* KPI counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Total Subscribers', 'Tổng Email Đăng Ký')}</span>
          <span id="metric-total-subs" className="text-2xl font-serif font-bold text-stone-900">{newsletterSubscribers.length}</span>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Active Audiences', 'Danh Sách Hoạt Động')}</span>
          <span id="metric-active-subs" className="text-2xl font-serif font-bold text-emerald-600">
            {newsletterSubscribers.filter(s => s.status === 'Active').length}
          </span>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Campaigns Broadcasted', 'Số Bản Tin Đã Gửi')}</span>
          <span id="metric-campaigns-sent" className="text-2xl font-serif font-bold text-pottery-terracotta">{completedCampaigns}</span>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Relay Port Mode', 'SMTP Lò Nung')}</span>
          <span id="metric-relay-mode" className="text-2xl font-serif font-bold text-stone-700 font-mono">25-SSL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Subscribers Desk (Span 5) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-lg p-5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-stone-100">
            <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Sparkles size={15} className="text-pottery-terracotta" />
              <span>{t('Active Subscribers Lists', 'Danh Sách Nhận Tin')}</span>
            </h3>
            <button
              id="btn-export-csv"
              onClick={handleCSVDownload}
              className="text-stone-500 hover:text-stone-800 text-xs font-mono font-medium flex items-center gap-1 transition"
              title="Download CSV"
            >
              <DownloadCloud size={14} />
              <span>CSV</span>
            </button>
          </div>

          {/* Quick email manual addition */}
          <form onSubmit={handleAddSubscriber} className="space-y-2">
            <label className="text-[9px] font-mono font-bold text-stone-400 block uppercase">{t('Add Subscriber Manually', 'Thêm Email Thủ Công')}</label>
            <div className="flex gap-1.5">
              <input
                id="manual-email-input"
                type="email"
                required
                value={newSubEmail}
                onChange={(e) => setNewSubEmail(e.target.value)}
                placeholder="e.g. buyer@luxurygardens.de"
                className="flex-grow border border-stone-300 p-2 text-xs rounded focus:outline-none focus:border-pottery-terracotta"
              />
              <button
                type="submit"
                className="bg-pottery-terracotta hover:bg-pottery-deepclay text-white px-3 text-xs font-mono font-bold rounded shrink-0 transition"
              >
                {t('Add', 'Thêm')}
              </button>
            </div>
          </form>

          {/* Search bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              id="search-sub-input"
              type="text"
              value={subSearch}
              onChange={(e) => setSubSearch(e.target.value)}
              placeholder="🔍 Search emails..."
              className="w-full bg-stone-50 border border-stone-250 p-2 text-xs rounded focus:outline-none font-mono"
            />
            <select
              id="filter-sources-select"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-stone-50 border border-stone-210 p-2 text-xs rounded focus:outline-none"
            >
              <option value="all">Sourcing Nodes</option>
              <option value="Home">Home Node</option>
              <option value="Footer">Footer Node</option>
              <option value="Catalog Download">Catalog Download</option>
              <option value="Manual Registration">Manual Addition</option>
            </select>
          </div>

          {/* Subscriber Table */}
          <div className="overflow-x-auto max-h-[350px] border border-stone-150 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-400 font-mono border-b border-stone-150 uppercase tracking-widest text-[9px]">
                  <th className="p-2 font-semibold">Subscriber Email</th>
                  <th className="p-2 font-semibold">{t('Source', 'Nguồn')}</th>
                  <th className="p-2 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150 font-mono">
                {filteredSubs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-stone-400 font-sans italic text-[11px]">
                      {t('No registered emails found.', 'Vui lòng cung cấp hòm thư kiểm thị.')}
                    </td>
                  </tr>
                ) : (
                  filteredSubs.map((sub) => (
                    <tr key={sub.id} className="hover:bg-stone-50/50 transition text-[11px]">
                      <td className="p-2 truncate max-w-[150px]">
                        <span className={`block truncate ${sub.status === 'Unsubscribed' ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                          {sub.email}
                        </span>
                        <span className="text-[9px] text-stone-400 block">{sub.dateSubscribed}</span>
                      </td>
                      <td className="p-2">
                        <span className="text-[9px] text-stone-500 font-sans block bg-stone-100 px-1 py-0.5 rounded truncate">
                          {sub.source}
                        </span>
                      </td>
                      <td className="p-2 text-right space-x-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          id={`btn-toggle-sub-${sub.id}`}
                          onClick={() => handleToggleStatus(sub.id)}
                          className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-tight transition ${
                            sub.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {sub.status === 'Active' ? 'Active' : 'Muted'}
                        </button>
                        <button
                          id={`btn-del-sub-${sub.id}`}
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          className="text-stone-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Broadcaster Studio & Luxurious Live Email Client Preview Frame (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-4">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                <Send size={15} className="text-pottery-terracotta" />
                <span>{t('Campaign Broadcaster Studio', 'Phòng Thư Tín & Soạn Lịch Phát Tin')}</span>
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {t('Broadcast custom HTML design newsletters, catalogues, or exclusive price announcements dynamically.', 'Phát hành thông điệp đúc gốm mới, dải chiết khấu hoặc bản PDF cuốn trưng bày tới các đại lý.')}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                  {t('Campaign Subject Line *', 'Tiêu đề Gửi Thư *')}
                </label>
                <input
                  id="campaign-subject-input"
                  type="text"
                  required
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  className="w-full border border-stone-300 p-2 text-xs rounded focus:outline-none focus:border-pottery-terracotta"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                    {t('Preheader snippet text', 'Đoạn tóm tắt Email')}
                  </label>
                  <input
                    id="campaign-preheader-input"
                    type="text"
                    value={campaignPreheader}
                    onChange={(e) => setCampaignPreheader(e.target.value)}
                    className="w-full border border-stone-300 p-2 text-xs rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                    {t('Template Design Vibe', 'Giao diện Thiết kế')}
                  </label>
                  <select
                    id="campaign-template-select"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value as any)}
                    className="w-full bg-white border border-stone-300 p-2 text-sm rounded focus:outline-none"
                  >
                    <option value="editorial">👑 Luxury Editorial (Beige Dark)</option>
                    <option value="minimal">🍂 Clean Swiss Minimal</option>
                    <option value="catalog">📦 B2B Sourcing Catalog Spec</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-stone-600 block uppercase">
                  {t('Dispatch Contents (Markdown / Plain Text)', 'Nội dung thông điệp chi tiết')}
                </label>
                <textarea
                  id="campaign-content-textarea"
                  rows={4}
                  value={campaignContent}
                  onChange={(e) => setCampaignContent(e.target.value)}
                  className="w-full border border-stone-300 p-2 text-xs rounded focus:outline-none font-sans"
                />
              </div>

              {/* Broadcast command panel */}
              <div className="pt-2">
                {broadcasting ? (
                  <div className="space-y-3 bg-stone-900 text-stone-100 p-4 rounded-lg font-mono text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-bold text-pottery-sand animate-pulse">
                        <RefreshCw size={13} className="animate-spin" />
                        <span>RELAY DISPATCHING...</span>
                      </span>
                      <span>{progress}%</span>
                    </div>
                    {/* Progress track */}
                    <div className="w-full bg-stone-850 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pottery-terracotta h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                    </div>
                    {/* Diagnostic log box */}
                    <div className="max-h-[80px] overflow-y-auto space-y-1 text-stone-400 text-[10px] pr-1">
                      {logs.map((logStr, lIdx) => (
                        <div key={lIdx} className="flex gap-1.5 items-start">
                          <ChevronRight size={10} className="mt-0.5 shrink-0 text-stone-500" />
                          <span>{logStr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    id="btn-perform-broadcast"
                    type="button"
                    onClick={handleStartBroadcast}
                    className="w-full bg-pottery-terracotta hover:bg-pottery-deepclay text-white font-mono font-bold text-xs uppercase tracking-widest py-3 rounded transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>{t('Emit Broadcast Now to Active Subscribers', 'Khởi chạy phát tin gửi đại lý ngay')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Luxurious responsive mockup live viewer */}
          <div className="border border-stone-250 rounded-xl overflow-hidden shadow-md">
            <div className="bg-stone-100 px-4 py-2 border-b border-stone-250 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              </div>
              <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-widest">
                ✉️ Live Email Viewport Mockup
              </span>
              <span className="text-[10px] text-stone-400 font-mono">100% desktop</span>
            </div>

            <div className={`p-8 text-left ${selectedTemplate === 'editorial' ? 'bg-[#FAF6F0]' : 'bg-white'}`}>
              <div className="max-w-xl mx-auto space-y-6">
                
                {/* Header brand name */}
                <div className="text-center pb-4 border-b border-stone-200">
                  <h1 className="text-xl tracking-[0.2em] font-serif font-extrabold text-stone-900">POTTERY.VN</h1>
                  <span className="text-[9px] font-mono font-bold text-pottery-terracotta tracking-wider uppercase block mt-1">
                    Authentic Vietnamese Ceramic Sourcing
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-stone-400 font-mono italic block truncate">
                    Subject: {campaignSubject || t('(No Subject Line Assigned)', '(Chưa đăng ký tiêu đề)')}
                  </span>
                  
                  <h2 className="text-[18px] font-serif font-bold text-stone-900 leading-tight">
                    {campaignSubject}
                  </h2>
                  
                  {campaignPreheader && (
                    <p className="text-xs italic text-stone-600 border-l-2 border-pottery-terracotta pl-3 font-medium">
                      {campaignPreheader}
                    </p>
                  )}
                </div>

                {/* Body message content rendering with breaks preservation */}
                <div className="text-xs text-stone-700 leading-relaxed font-sans space-y-3 whitespace-pre-line">
                  {campaignContent || t('Please insert email newsletter body text content inside dispatcher form fields to compile dynamic layout...', 'Vui lòng điền nội dung bản tin để phân tích bản xem thử.')}
                </div>

                {/* Aesthetic footer CTA button block */}
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="inline-block bg-[#1C1917] hover:bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest px-6 py-3 rounded"
                    onClick={() => alert(t('Simulated Link click from mock client.', 'Tính năng kiểm đếm liên kết ngoài của hòm thư ảo.'))}
                  >
                    📥 {t('Download Wholesale FOB Catalogue', 'Tải Bảng Giá & Catalogue')}
                  </button>
                </div>

                <div className="text-center pt-6 border-t border-stone-200 space-y-1">
                  <p className="text-[10px] text-stone-400 font-mono">
                    © 2026 POTTERY.VN – Vietnam Pottery Join Stock Company.
                  </p>
                  <p className="text-[9px] text-stone-500 font-sans">
                    You are receiving this exclusive wholesale sourcing gazette because you requested digital catalogues.
                  </p>
                  <p className="text-[9px] text-pottery-terracotta underline font-mono cursor-pointer mt-2 block">
                    Unsubscribe instantly from this list
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
