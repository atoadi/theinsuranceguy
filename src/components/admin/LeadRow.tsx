'use client';

import { useState, useTransition } from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { Phone, Mail, Calendar, Clock, ChevronDown, Car, MapPin } from 'lucide-react';

interface LeadRowProps {
    lead: any;
    index: number;
    type: 'appointment' | 'lead';
    onStatusChange: (id: number | string, status: string) => Promise<void>;
}

const STATUSES = ['pending', 'contacted', 'converted', 'lost'];

export default function LeadRow({ lead, index, type, onStatusChange }: LeadRowProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (newStatus: string) => {
        setShowDropdown(false);
        startTransition(async () => {
            await onStatusChange(lead.id, newStatus);
        });
    };

    const name = type === 'appointment'
        ? (lead.name || 'Anonymous')
        : (lead.email || 'Anonymous');

    const phone = type === 'appointment' ? lead.phone : (lead.whatsapp || lead.phone);
    const date = lead.created_at
        ? new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })
        : '—';
    const time = lead.created_at
        ? new Date(lead.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-slate-50/60 transition-colors ${isPending ? 'opacity-50' : ''}`}>

            {/* Index number */}
            <span className="hidden sm:block text-[10px] font-bold text-slate-300 w-5 text-right tabular-nums shrink-0">
                {index}
            </span>

            {/* Lead info */}
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-slate-800 truncate">{name}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    {phone && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Phone size={10} strokeWidth={1.5} /> {phone}
                        </span>
                    )}
                    {type === 'appointment' && lead.category && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Car size={10} strokeWidth={1.5} /> {lead.category}
                        </span>
                    )}
                    {type === 'lead' && lead.make_model && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Car size={10} strokeWidth={1.5} /> {lead.make_model} {lead.variant ? `· ${lead.variant}` : ''}
                        </span>
                    )}
                    {type === 'appointment' && lead.appointment_date && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Calendar size={10} strokeWidth={1.5} /> {lead.appointment_date} {lead.appointment_slot || ''}
                        </span>
                    )}
                    {type === 'lead' && lead.rto && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <MapPin size={10} strokeWidth={1.5} /> {lead.rto}
                        </span>
                    )}
                </div>
                {type === 'appointment' && lead.description && (
                    <p className="text-[11px] text-slate-400 mt-1 truncate max-w-md italic">
                        &ldquo;{lead.description}&rdquo;
                    </p>
                )}
            </div>

            {/* Status dropdown */}
            <div className="relative shrink-0">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-1 group"
                    disabled={isPending}
                >
                    <StatusBadge status={lead.status || 'pending'} />
                    <ChevronDown size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </button>

                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-30" onClick={() => setShowDropdown(false)} />
                        <div className="absolute right-0 top-full mt-1 z-40 bg-white rounded-xl border border-slate-100 shadow-lg py-1 min-w-[120px]">
                            {STATUSES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleStatusChange(s)}
                                    className={`w-full text-left px-3 py-2 text-[12px] font-semibold capitalize hover:bg-slate-50 transition-colors ${(lead.status || 'pending') === s ? 'text-emerald-700' : 'text-slate-600'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Date */}
            <div className="hidden sm:flex flex-col items-end shrink-0 ml-2">
                <span className="text-[10px] text-slate-400 font-medium tabular-nums">{date}</span>
                <span className="text-[9px] text-slate-300 tabular-nums">{time}</span>
            </div>
        </div>
    );
}
