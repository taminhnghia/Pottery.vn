/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole } from '../types';
import { Shield, UserCheck, Eye, Clock, Key, ArrowRight, Table } from 'lucide-react';

interface RoleSimulatorProps {
  currentRole: UserRole;
  onChangeRole: (newRole: UserRole) => void;
  pendingApplicationsCount: number;
  totalInquiriesCount: number;
}

export default function RoleSimulator({
  currentRole,
  onChangeRole,
  pendingApplicationsCount,
  totalInquiriesCount
}: RoleSimulatorProps) {
  const [collapsed, setCollapsed] = useState(false);

  const rolesList: { role: UserRole; name: string; icon: any; color: string; desc: string }[] = [
    {
      role: 'guest',
      name: 'Guest Visitor',
      icon: Eye,
      color: 'bg-stone-500 text-white',
      desc: 'Browses public site & catalog. FOB prices are completely masked.',
    },
    {
      role: 'retail_customer',
      name: 'Retail Customer',
      icon: UserCheck,
      color: 'bg-emerald-600 text-white',
      desc: 'Views public list & retail shop prices. Shopping cart enabled.',
    },
    {
      role: 'trade_applicant',
      name: 'B2B Applicant',
      icon: Clock,
      color: 'bg-amber-500 text-white',
      desc: 'Applied but pending approval. Displays a custom "Under Review" banner.',
    },
    {
      role: 'approved_b2b_buyer',
      name: 'Approved B2B Buyer',
      icon: Shield,
      color: 'bg-blue-600 text-white',
      desc: 'Approved trade wholesaler. Displays raw FOB tier pricing and export Specs.',
    },
    {
      role: 'admin',
      name: 'Portal Administrator',
      icon: Key,
      color: 'bg-rose-600 text-white',
      desc: 'Can edit catalog products, manage orders/RFQs, and approve B2B accounts.',
    }
  ];

  if (collapsed) {
    return (
      <div id="role-simulator-bar-collapsed" className="fixed bottom-4 right-4 z-50 bg-pottery-charcoal text-white rounded-full p-3 shadow-2xl flex items-center gap-2 border border-pottery-sand/50">
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 text-xs font-mono tracking-wider hover:text-pottery-terracotta"
        >
          <Table size={16} />
          <span>SIMULATOR ({currentRole.replace('_', ' ').toUpperCase()})</span>
        </button>
      </div>
    );
  }

  return (
    <div id="role-simulator-bar" className="bg-pottery-charcoal border-b border-pottery-terracotta/20 text-white px-4 py-3 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Status header */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 className="text-xs font-mono font-bold tracking-wider text-pottery-sand">
              POTTERY.VN DEMO CONTROL CENTRE
            </h4>
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Test buyer journeys, protected FOB Pricing, and Admin operations instantly.
          </p>
        </div>

        {/* Profiles selections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center gap-2 w-full lg:w-auto">
          {rolesList.map((item) => {
            const IconComponent = item.icon;
            const isSelected = currentRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => onChangeRole(item.role)}
                title={item.desc}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono transition-all text-left group ${
                  isSelected
                    ? `${item.color} ring-2 ring-pottery-sand ring-offset-2 ring-offset-pottery-charcoal`
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <IconComponent size={12} className={isSelected ? 'animate-bounce' : 'text-stone-500 group-hover:text-stone-300'} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard statistics */}
        <div className="flex items-center gap-3 text-xs font-mono bg-stone-950/60 py-1.5 px-3 rounded text-stone-400">
          <div>
            App: <span className="text-amber-500 font-bold">{pendingApplicationsCount}</span>
          </div>
          <div className="w-px h-3 bg-stone-800"></div>
          <div>
            RFQs: <span className="text-blue-400 font-bold">{totalInquiriesCount}</span>
          </div>
          <div className="w-px h-3 bg-stone-800 font-mono"></div>
          
          <button
            id="quick-admin-redirect-btn"
            onClick={() => onChangeRole('admin')}
            className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded transition flex items-center gap-1 active:scale-95"
            title="Go to administrator backend panels"
          >
            <span>👉 {currentRole === 'admin' ? 'Dashboard' : 'Vào Admin'}</span>
          </button>

          <div className="w-px h-3 bg-stone-800 font-mono"></div>
          
          <button
            onClick={() => setCollapsed(true)}
            className="text-[10px] uppercase font-bold text-stone-500 hover:text-white transition"
          >
            Hide [x]
          </button>
        </div>
      </div>
      
      {/* Short explainer details about active flow */}
      <div className="bg-stone-950/30 border-t border-stone-800/40 px-4 py-1 text-[11px] text-stone-400 flex items-center justify-between mt-2 -mx-4 -mb-3 rounded-b">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-pottery-sand font-mono uppercase">
              {currentRole.replace('_', ' ')} Profile Actions Available:
            </span>
            <span className="text-stone-400 italic">
              {currentRole === 'guest' && "Masked FOB pricing. Can search, apply as B2B, or view standard design inspirations."}
              {currentRole === 'retail_customer' && "Public Retail catalog view with active pricing $ and checkout cart support."}
              {currentRole === 'trade_applicant' && "Simulates a submitted business account. Pricing says \"Under Review\" dynamically."}
              {currentRole === 'approved_b2b_buyer' && "Fully approved. Displays Incoterms FOB tiers, Packaging CBMs, and container loading specs."}
              {currentRole === 'admin' && "Complete shop control! Edit products, approve applicants, view submitted RFQ briefs."}
            </span>
          </div>
          {currentRole === 'admin' && (
            <div className="text-rose-400 text-[10px] animate-pulse">
              ★ ADMIN TAB ACTIVE in navigation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
