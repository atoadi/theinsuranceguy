const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-100',
    contacted: 'bg-blue-50 text-blue-700 border-blue-100',
    converted: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    lost: 'bg-slate-50 text-slate-500 border-slate-100',
    new: 'bg-violet-50 text-violet-700 border-violet-100',
};

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const normalised = (status || 'pending').toLowerCase();
    const style = STATUS_STYLES[normalised] ?? STATUS_STYLES['pending'];

    return (
        <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${style}`}>
            {normalised}
        </span>
    );
}
