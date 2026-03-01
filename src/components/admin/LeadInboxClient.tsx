'use client';

import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import LeadRow from '@/components/admin/LeadRow';
import { Inbox, Users, Search } from 'lucide-react';

type TabType = 'appointments' | 'leads';

interface LeadInboxClientProps {
    appointments: any[];
    leads: any[];
    updateAppointmentStatus: (id: number | string, status: string) => Promise<void>;
}

export default function LeadInboxClient({ appointments, leads, updateAppointmentStatus }: LeadInboxClientProps) {
    const [activeTab, setActiveTab] = useState<TabType>('appointments');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const currentData = activeTab === 'appointments' ? appointments : leads;

    // Filter by search
    const filtered = currentData.filter((item: any) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const searchable = [
            item.name, item.phone, item.email, item.whatsapp,
            item.category, item.make_model, item.description,
        ].filter(Boolean).join(' ').toLowerCase();
        return searchable.includes(q);
    }).filter((item: any) => {
        if (statusFilter === 'all') return true;
        return (item.status || 'pending') === statusFilter;
    });

    const counts = {
        all: currentData.length,
        pending: currentData.filter((i: any) => (i.status || 'pending') === 'pending').length,
        contacted: currentData.filter((i: any) => i.status === 'contacted').length,
        converted: currentData.filter((i: any) => i.status === 'converted').length,
    };

    return (
        <>
            <AdminHeader
                title="Lead Inbox"
                subtitle={`${appointments.length} consultations · ${leads.length} quote requests`}
            />

            {/* ─── TABS ─── */}
            <div className="flex items-center gap-1 mb-6 border-b border-slate-100">
                <button
                    onClick={() => { setActiveTab('appointments'); setSearchQuery(''); setStatusFilter('all'); }}
                    className={`flex items-center gap-2 px-4 py-3 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'appointments'
                            ? 'border-emerald-600 text-emerald-700'
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <Inbox size={15} />
                    Consultations
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">
                        {appointments.length}
                    </span>
                </button>
                <button
                    onClick={() => { setActiveTab('leads'); setSearchQuery(''); setStatusFilter('all'); }}
                    className={`flex items-center gap-2 px-4 py-3 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'leads'
                            ? 'border-emerald-600 text-emerald-700'
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <Users size={15} />
                    Quote Requests
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">
                        {leads.length}
                    </span>
                </button>
            </div>

            {/* ─── FILTERS ─── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
                {/* Search */}
                <div className="relative flex-1 w-full sm:max-w-xs">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search name, phone, or vehicle..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 text-[13px] bg-white border border-slate-100 rounded-xl font-medium text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50 transition-all"
                    />
                </div>

                {/* Status filter pills */}
                <div className="flex items-center gap-1.5">
                    {(['all', 'pending', 'contacted', 'converted'] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`text-[11px] font-bold capitalize px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'text-slate-400 hover:bg-slate-50 border border-transparent'
                                }`}
                        >
                            {s} {s !== 'all' && <span className="text-[10px] opacity-60 ml-0.5">({counts[s]})</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── LIST ─── */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                {filtered.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                        {filtered.map((item: any, i: number) => (
                            <LeadRow
                                key={item.id}
                                lead={item}
                                index={i + 1}
                                type={activeTab === 'appointments' ? 'appointment' : 'lead'}
                                onStatusChange={updateAppointmentStatus}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-16 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3">
                            <Inbox size={22} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-serif text-slate-900 mb-1">
                            {searchQuery ? 'No results' : 'No leads yet'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                            {searchQuery
                                ? `No matches for "${searchQuery}"`
                                : 'Leads will appear here when customers interact with the site.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
