interface AdminHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, children }: AdminHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-6 border-b border-slate-100">
            <div>
                <h1 className="text-2xl md:text-[28px] font-serif text-emerald-950 tracking-tight leading-tight">{title}</h1>
                {subtitle && (
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1.5">{subtitle}</p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
}
