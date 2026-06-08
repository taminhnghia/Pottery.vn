import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { Users, Search, Filter, Plus, Trash2, Edit, Save, Shield, CheckCircle, X, ChevronRight, UserPlus, Heart, BarChart3 } from 'lucide-react';

interface CustomersTabProps {
  language: 'en' | 'vi';
  registeredUsers: User[];
  setRegisteredUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function CustomersTab({ language, registeredUsers, setRegisteredUsers }: CustomersTabProps) {
  const t = (en: string, vi: string) => (language === 'en' ? en : vi);

  // Filter and search variables
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // New customer modal
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    email: '',
    fullName: '',
    role: 'retail_customer' as UserRole,
    companyName: '',
    country: 'Vietnam',
    phone: '',
    businessType: 'Designer/Retailer'
  });

  // Handlers
  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.email || !newUserForm.fullName) {
      alert(t('Please fill in customer Full Name & email address.', 'Vui lòng cung cấp đầy đủ Tên và Email khách hàng.'));
      return;
    }

    const newUser: User = {
      id: 'USR-' + Math.floor(Math.random() * 9000 + 1000),
      ...newUserForm,
      approvalStatus: newUserForm.role !== 'retail_customer' && newUserForm.role !== 'guest' ? 'approved' : undefined
    };

    setRegisteredUsers([newUser, ...registeredUsers]);
    setIsNewUserOpen(false);
    setNewUserForm({
      email: '',
      fullName: '',
      role: 'retail_customer' as UserRole,
      companyName: '',
      country: 'Vietnam',
      phone: '',
      businessType: 'Designer/Retailer'
    });
    alert(t('Account profile registered in-back-office successfully.', 'Hồ sơ tài khoản khách hàng được cập lý thành công.'));
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(t(`Are you sure you want to permanently delete profile for "${name}"?`, `Bạn chắc chắn muốn xóa vĩnh viễn hồ sơ tài khoản "${name}"?`))) {
      setRegisteredUsers(prev => prev.filter(u => u.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  const handleUpdateRole = (id: string, role: UserRole) => {
    setRegisteredUsers(prev => prev.map(u => {
      if (u.id === id) {
        const approvalStatus = role === 'approved_b2b_buyer' || role === 'strategic_distributor' ? 'approved' : u.approvalStatus;
        return { ...u, role, approvalStatus };
      }
      return u;
    }));
    if (selectedUser?.id === id) {
      setSelectedUser(prev => prev ? { ...prev, role, approvalStatus: role === 'approved_b2b_buyer' || role === 'strategic_distributor' ? 'approved' : prev.approvalStatus } : null);
    }
    alert(t('Account upgraded successfully!', 'Cấp quyền tài khoản thành công!'));
  };

  // Filter logic
  const filteredUsers = registeredUsers.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase()) || 
                          (u.companyName || '').toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div id="customers-tab-container" className="space-y-6 text-left animate-fadeIn">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Total Registered Users', 'Tổng Tài khoản')}</span>
          <span id="metric-total-users" className="text-2xl font-serif font-bold text-stone-900">{registeredUsers.length}</span>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('B2B Wholesale accounts', 'Hồ sơ B2B Đối tác')}</span>
          <span id="metric-b2b-users" className="text-2xl font-serif font-bold text-pottery-terracotta">
            {registeredUsers.filter(u => u.role === 'approved_b2b_buyer' || u.role === 'strategic_distributor').length}
          </span>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Retail Shoppers', 'Khách mua lẻ')}</span>
          <span id="metric-retail-users" className="text-2xl font-serif font-bold text-stone-850">
            {registeredUsers.filter(u => u.role === 'retail_customer').length}
          </span>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4 text-left">
          <span className="text-[10px] text-stone-400 font-mono block uppercase">{t('Pending Requests', 'Chờ phê chuẩn sỉ')}</span>
          <span id="metric-pending-users" className="text-2xl font-serif font-bold text-amber-600 font-mono">
            {registeredUsers.filter(u => u.role === 'trade_applicant').length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CRM Accounts List Table */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-lg p-5 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                <Users size={16} className="text-pottery-terracotta" />
                <span>{t('Client Registry Profiles', 'Sổ Danh Bạ Khách Hàng')}</span>
              </h3>
            </div>
            <button
              id="btn-add-customer"
              onClick={() => setIsNewUserOpen(true)}
              className="bg-stone-900 hover:bg-stone-800 text-white font-mono font-bold text-xs uppercase tracking-wider py-2 px-3.5 rounded flex items-center gap-1.5 transition shrink-0"
            >
              <UserPlus size={14} />
              <span>{t('Register Offline Customer', 'Đăng ký tài khoản ngoại tuyến')}</span>
            </button>
          </div>

          {/* Filters controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/3">
              <select
                id="filter-roles-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-stone-50 border border-stone-250 p-2 text-xs rounded focus:outline-none"
              >
                <option value="all">👥 {t('All User Roles', 'Tất cả Vai trò')}</option>
                <option value="retail_customer">{t('Retail Customer', 'Khách mua lẻ')}</option>
                <option value="trade_applicant">{t('Trade Applicant (Pending B2B)', 'Đối tác chờ duyệt sỉ')}</option>
                <option value="approved_b2b_buyer">{t('Approved B2B Buyer', 'Nhà mua sỉ phê duyệt')}</option>
                <option value="strategic_distributor">{t('Strategic Distributor', 'Tổng đại lý phân phối')}</option>
                <option value="admin">{t('Administrator', 'Quản trị viên')}</option>
              </select>
            </div>
            <div className="flex-grow">
              <input
                id="search-customer-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('Search clients by name, email or brand...', 'Tìm kiếm khách hàng theo tên, email, thương hiệu...')}
                className="w-full bg-stone-50 border border-stone-250 p-2 text-xs rounded focus:outline-none"
              />
            </div>
          </div>

          {/* CRM Table */}
          <div className="overflow-x-auto border border-stone-150 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-mono border-b border-stone-150 uppercase tracking-widest text-[9px]">
                  <th className="p-3 font-semibold">{t('Client Details', 'Họ tên & Email')}</th>
                  <th className="p-3 font-semibold">{t('Role', 'Vai trò quyền hạn')}</th>
                  <th className="p-3 font-semibold">{t('Org / Country', 'Tổ chức / Quốc gia')}</th>
                  <th className="p-3 font-semibold text-right">{t('Action', 'Thao tác')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150 font-sans">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-stone-400 font-mono">
                      {t('No customers found matching search details.', 'Không có tài khoản phù hợp với bộ lọc.')}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-stone-50/50 cursor-pointer transition ${selectedUser?.id === user.id ? 'bg-pottery-ivory/40 font-semibold' : ''}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="p-3">
                        <div className="text-stone-900 font-medium">{user.fullName}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{user.email}</div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'strategic_distributor' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'approved_b2b_buyer' ? 'bg-emerald-100 text-emerald-800' :
                          user.role === 'trade_applicant' ? 'bg-amber-100 text-amber-700 font-bold' :
                          'bg-stone-100 text-stone-700'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="text-stone-800">{user.companyName || '-'}</div>
                        <div className="text-[10px] text-stone-400 font-mono uppercase">{user.country || '-'}</div>
                      </td>
                      <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          id={`btn-del-user-${user.id}`}
                          onClick={() => handleDeleteUser(user.id, user.fullName)}
                          className="text-stone-400 hover:text-red-600 p-1.5 transition"
                          title="Permanently remove user"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Customer Detailed Profile Panel */}
        <div className="bg-white border border-stone-200 rounded-lg p-5">
          {selectedUser ? (
            <div className="space-y-6 text-left">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-[9px] font-mono text-pottery-terracotta uppercase tracking-wider bg-pottery-ivory/50 px-2 py-0.5 rounded">
                  {selectedUser.id}
                </span>
                <h4 className="font-serif font-bold text-stone-950 text-base mt-2 truncate">{selectedUser.fullName}</h4>
                <p className="text-xs text-stone-400 font-mono truncate">{selectedUser.email}</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">Role Settings / Elevation</span>
                  <div className="grid grid-cols-1 gap-1 pt-1.5">
                    <button
                      id="opt-role-retail"
                      onClick={() => handleUpdateRole(selectedUser.id, 'retail_customer')}
                      className={`text-left p-2 rounded border text-xs transition ${selectedUser.role === 'retail_customer' ? 'border-amber-600 bg-amber-50/20 text-stone-900' : 'border-stone-200 hover:bg-stone-50'}`}
                    >
                      👤 {t('Retail Customer', 'Khách hàng mua lẻ')}
                    </button>
                    <button
                      id="opt-role-b2b"
                      onClick={() => handleUpdateRole(selectedUser.id, 'approved_b2b_buyer')}
                      className={`text-left p-2 rounded border text-xs transition ${selectedUser.role === 'approved_b2b_buyer' ? 'border-emerald-600 bg-emerald-50/20 text-stone-900' : 'border-stone-200 hover:bg-stone-50'}`}
                    >
                      🤝 {t('Approved B2B Sourcing Buyer', 'Đối tác mua sỉ đã duyệt')}
                    </button>
                    <button
                      id="opt-role-distrib"
                      onClick={() => handleUpdateRole(selectedUser.id, 'strategic_distributor')}
                      className={`text-left p-2 rounded border text-xs transition ${selectedUser.role === 'strategic_distributor' ? 'border-blue-600 bg-blue-50/20 text-stone-900' : 'border-stone-200 hover:bg-stone-50'}`}
                    >
                      👑 {t('Strategic Regional Distributor', 'Tổng đại lý vùng chiến lược')}
                    </button>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-3 space-y-2">
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">{t('Corporate details', 'Thông tin Pháp nhân')}</span>
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-stone-600">
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase block">{t('Company Name', 'Thương hiệu')}</span>
                      <strong className="text-stone-850 font-sans block truncate">{selectedUser.companyName || t('None/Individual', 'Cá nhân')}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase block">{t('Country', 'Đất nước')}</span>
                      <strong className="text-stone-850 font-sans block">{selectedUser.country || '-'}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase block">{t('Website', 'Trang ngoại')}</span>
                      {selectedUser.companyWebsite ? (
                        <a href={`https://${selectedUser.companyWebsite}`} target="_blank" rel="noreferrer" className="text-pottery-terracotta underline truncate block">{selectedUser.companyWebsite}</a>
                      ) : (
                        <span className="text-stone-400 block font-sans">-</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase block">{t('Contact Phone', 'Số máy')}</span>
                      <strong className="text-stone-850 block">{selectedUser.phone || '-'}</strong>
                    </div>
                  </div>
                </div>

                {selectedUser.approvalStatus && (
                  <div className="p-3 bg-stone-50 rounded border border-stone-150 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-mono uppercase tracking-wider">{t('Wholesale Verification', 'Kiểm định sỉ B2B')}</span>
                    <span className={`font-mono font-bold uppercase ${selectedUser.approvalStatus === 'approved' ? 'text-emerald-700' : 'text-amber-600'}`}>
                      {selectedUser.approvalStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-[280px] flex flex-col items-center justify-center text-stone-400 text-center p-4">
              <Users size={32} className="text-stone-300 mb-2" />
              <p className="text-xs font-mono">{t('Select a client from registry table to view and elevate their access rights.', 'Vui lòng chọn một dòng để hiển thị hồ sơ chi tiết và cấp quyền.')}</p>
            </div>
          )}
        </div>

      </div>

      {/* Manual User Modal Addition */}
      {isNewUserOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 p-4 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-stone-200 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl text-left scale-up">
            <div className="flex justify-between items-center border-b border-stone-150 pb-2">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <UserPlus size={18} className="text-pottery-terracotta" />
                <span>{t('Register Custom Client Profile', 'Khai sinh Hồ sơ Tài khoản Mới')}</span>
              </h3>
              <button onClick={() => setIsNewUserOpen(false)} className="text-stone-400 hover:text-stone-800 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs font-sans">
              <div className="space-y-3">
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Full Representative Name *</label>
                  <input
                    id="new-cust-name-input"
                    type="text"
                    required
                    value={newUserForm.fullName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                    placeholder="e.g. Johnathan Smith"
                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-pottery-terracotta"
                  />
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Principal Email Address *</label>
                  <input
                    id="new-cust-email-input"
                    type="email"
                    required
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    placeholder="e.g. j.smith@earthydecor.co.uk"
                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-pottery-terracotta font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-500 font-mono block mb-1">Assign User Role</label>
                    <select
                      id="new-cust-role-select"
                      value={newUserForm.role}
                      onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })}
                      className="w-full bg-white border border-stone-300 p-2 rounded"
                    >
                      <option value="retail_customer">Retail Customer</option>
                      <option value="approved_b2b_buyer">Approved B2B Buyer</option>
                      <option value="strategic_distributor">Global Distributor</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-stone-500 font-mono block mb-1">Country Location</label>
                    <input
                      id="new-cust-country-input"
                      type="text"
                      value={newUserForm.country}
                      onChange={(e) => setNewUserForm({ ...newUserForm, country: e.target.value })}
                      placeholder="e.g. United Kingdom"
                      className="w-full border border-stone-300 p-2 rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-stone-500 font-mono block mb-1">Company / Brand Name (Optional)</label>
                  <input
                    id="new-cust-company-input"
                    type="text"
                    value={newUserForm.companyName}
                    onChange={(e) => setNewUserForm({ ...newUserForm, companyName: e.target.value })}
                    placeholder="e.g. Earthy Decor Inc."
                    className="w-full border border-stone-300 p-2 rounded"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-150 flex justify-end gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setIsNewUserOpen(false)}
                  className="px-4 py-2 border border-stone-250 hover:bg-stone-50 rounded text-stone-700 font-bold"
                >
                  {t('Discard', 'Bỏ qua')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pottery-terracotta hover:bg-pottery-deepclay text-white rounded font-bold uppercase transition"
                >
                  {t('Register Registry Live', 'Ghi Sổ Sách')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
