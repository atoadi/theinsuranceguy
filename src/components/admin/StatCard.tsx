import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    detail?: string;
}

export default function StatCard({ label, value, icon: Icon, detail }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 relative overflow-hidden">
            {/* Subtle left accent — his signature callout style */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-600 rounded-r-full" />

            <div className="flex items-center justify-between">
                <div className="pl-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1.5">
                        {label}
                    </p>
                    <p className="text-2xl font-serif text-slate-900 tracking-tight leading-none">{value}</p>
                    {detail && (
                        <p className="text-[11px] text-slate-400 font-medium mt-1.5">{detail}</p>
                    )}
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Icon size={18} className="text-slate-400" strokeWidth={1.6} />
                </div>
            </div>
        </div>
    );
}
