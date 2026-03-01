import { createClient } from '@supabase/supabase-js';
import { Inbox, Car, FileText, ChevronRight, Phone } from 'lucide-react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import StatCard from '@/components/admin/StatCard';

const getSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const supabase = getSupabase();

    let leadCount = 0;
    let garageCount = 0;
    let blogCount = 0;
    let recentLeads: any[] = [];

    if (supabase) {
        const [leadsRes, garagesRes, blogsRes, recentRes] = await Promise.all([
            supabase.from('appointments').select('id', { count: 'exact', head: true }),
            supabase.from('garages').select('id', { count: 'exact', head: true }),
            supabase.from('blogs').select('id', { count: 'exact', head: true }).eq('is_published', true),
            supabase
                .from('appointments')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5),
        ]);

        leadCount = leadsRes.count ?? 0;
        garageCount = garagesRes.count ?? 0;
        blogCount = blogsRes.count ?? 0;
        recentLeads = recentRes.data ?? [];
    }

    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <>
            <AdminHeader title="Dashboard" subtitle={today} />

            {/* ─── STAT CARDS ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <StatCard
                    label="Pipeline"
                    value={leadCount}
                    icon={Inbox}
                    detail="Consultation requests"
                />
                <StatCard
                    label="Verified Network"
                    value={garageCount.toLocaleString('en-IN')}
                    icon={Car}
                    detail="Cashless garages"
                />
                <StatCard
                    label="Published"
                    value={blogCount}
                    icon={FileText}
                    detail="Knowledge hub articles"
                />
            </div>

            {/* ─── RECENT LEADS ─── */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        Recent Activity
                    </p>
                    <Link
                        href="/admin/leads"
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 transition-colors"
                    >
                        View all <ChevronRight size={12} />
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    {recentLeads.length > 0 ? (
                        <div className="divide-y divide-slate-50">
                            {recentLeads.map((lead: any, i: number) => (
                                <div key={lead.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/60 transition-colors">
                                    {/* Number */}
                                    <span className="text-[10px] font-bold text-slate-300 w-5 text-right tabular-nums">{i + 1}</span>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-bold text-slate-800 truncate">{lead.name || 'Anonymous'}</p>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            {lead.phone && (
                                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                                    <Phone size={10} strokeWidth={1.5} /> {lead.phone}
                                                </span>
                                            )}
                                            {lead.category && (
                                                <span className="text-[11px] text-slate-400">
                                                    {lead.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${lead.status === 'converted'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : lead.status === 'contacted'
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'bg-amber-50 text-amber-700'
                                        }`}>
                                        {lead.status || 'pending'}
                                    </span>

                                    {/* Date */}
                                    <span className="text-[10px] text-slate-300 font-medium tabular-nums hidden sm:block">
                                        {lead.created_at
                                            ? new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
                                            : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-14 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3">
                                <Inbox size={22} className="text-slate-300" />
                            </div>
                            <p className="text-sm font-serif text-slate-900 mb-1">No leads yet</p>
                            <p className="text-[11px] text-slate-400">
                                Consultations booked on the site will appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── QUICK ACTIONS ─── */}
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">
                Quick Actions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href="/admin/blogs"
                    className="group bg-white rounded-2xl border border-slate-100 p-5 hover:border-emerald-200 transition-all duration-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <FileText size={18} className="text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[13px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                Write New Post
                            </p>
                            <p className="text-[11px] text-slate-400">Draft with AI or paste Gemini code</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                </Link>
                <Link
                    href="/admin/garages"
                    className="group bg-white rounded-2xl border border-slate-100 p-5 hover:border-emerald-200 transition-all duration-200"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                            <Car size={18} className="text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[13px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                Manage Network
                            </p>
                            <p className="text-[11px] text-slate-400">Add, remove, or upload CSV</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                </Link>
            </div>
        </>
    );
}
