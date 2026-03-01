'use client';

import { useState } from 'react';
import { Search, Plus, Trash2, Edit2, X, AlertCircle } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

interface Garage {
    id: string;
    n: string; // name
    b: string; // brand
    c: string; // city
    a: string; // address
}

interface GarageListClientProps {
    initialGarages: Garage[];
    totalCount: number;
    saveGarage: (data: Partial<Garage>) => Promise<{ success: boolean; error?: string }>;
    deleteGarages: (ids: string[]) => Promise<{ success: boolean; error?: string }>;
}

export default function GarageListClient({ initialGarages, totalCount, saveGarage, deleteGarages }: GarageListClientProps) {
    const [garages, setGarages] = useState<Garage[]>(initialGarages);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Panel State
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [editingGarage, setEditingGarage] = useState<Partial<Garage> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Derived state
    const filtered = garages.filter(g => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (g.n || '').toLowerCase().includes(q) ||
            (g.c || '').toLowerCase().includes(q) ||
            (g.b || '').toLowerCase().includes(q) ||
            (g.a || '').toLowerCase().includes(q)
        );
    }).slice(0, 100); // Limit rendered items for performance

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(new Set(filtered.map(g => g.id)));
        } else {
            setSelectedIds(new Set());
        }
    };

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const openPanel = (garage: Partial<Garage> | null = null) => {
        setEditingGarage(garage || { n: '', b: '', c: '', a: '' });
        setIsPanelOpen(true);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
        setTimeout(() => setEditingGarage(null), 300);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingGarage?.n || !editingGarage?.c) return;

        setIsSaving(true);
        const res = await saveGarage(editingGarage);
        setIsSaving(false);

        if (res.success) {
            // Optimistic update - in a real app we'd refetch or use the returned full record
            if (editingGarage.id) {
                setGarages(prev => prev.map(g => g.id === editingGarage.id ? { ...g, ...editingGarage } as Garage : g));
            } else {
                // Needs refresh to get real ID, simple reload for now
                window.location.reload();
            }
            closePanel();
        } else {
            alert(res.error || 'Failed to save garage');
        }
    };

    const handleDelete = async (ids: string[]) => {
        if (!confirm(`Are you sure you want to delete ${ids.length} garage(s)?`)) return;

        setIsDeleting(true);
        const res = await deleteGarages(ids);
        setIsDeleting(false);

        if (res.success) {
            setGarages(prev => prev.filter(g => !ids.includes(g.id)));
            setSelectedIds(new Set());
        } else {
            alert(res.error || 'Failed to delete');
        }
    };

    return (
        <div className="pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                <AdminHeader title="Garage Network" subtitle={`${totalCount.toLocaleString('en-IN')} Total Verified Locations`} />

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {selectedIds.size > 0 && (
                        <button
                            onClick={() => handleDelete(Array.from(selectedIds))}
                            disabled={isDeleting}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-red-200/50"
                        >
                            <Trash2 size={16} /> Delete ({selectedIds.size})
                        </button>
                    )}
                    <button
                        onClick={() => openPanel()}
                        className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus size={16} className="text-emerald-400" /> Add Garage
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[70vh]">

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative w-full sm:max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, city, brand, address..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                    </div>
                    <div className="text-xs font-semibold text-slate-400 flex items-center">
                        Showing {filtered.length} of {garages.length}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white sticky top-0 z-10 border-b border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <tr>
                                <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-400 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        checked={filtered.length > 0 && selectedIds.size === filtered.length}
                                        onChange={handleSelectAll}
                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                </th>
                                <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-400 w-48">Insurer Brand</th>
                                <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-400">Garage Name & Address</th>
                                <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-400 w-32">City</th>
                                <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-400 w-24 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(garage => (
                                <tr key={garage.id} className={`hover:bg-slate-50/50 transition-colors ${selectedIds.has(garage.id) ? 'bg-emerald-50/30' : ''}`}>
                                    <td className="py-3 px-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(garage.id)}
                                            onChange={() => toggleSelect(garage.id)}
                                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                                            {garage.b || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <p className="font-bold text-slate-800">{garage.n}</p>
                                        <p className="text-xs text-slate-400 truncate max-w-sm" title={garage.a}>{garage.a}</p>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-slate-600">
                                        {garage.c}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={() => openPanel(garage)}
                                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete([garage.id])}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors ml-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-slate-400">
                                        <AlertCircle size={32} className="mx-auto mb-3 opacity-20" />
                                        No garages found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ─── SLIDE OVER PANEL ─── */}
            {isPanelOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={closePanel} />

                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h2 className="text-lg font-serif font-bold text-slate-900">
                                {editingGarage?.id ? 'Edit Garage' : 'Add New Garage'}
                            </h2>
                            <button onClick={closePanel} className="p-2 -mr-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <form id="garage-form" onSubmit={handleSave} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Garage Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingGarage?.n || ''}
                                        onChange={e => setEditingGarage(p => ({ ...p, n: e.target.value }))}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-400 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">City *</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingGarage?.c || ''}
                                        onChange={e => setEditingGarage(p => ({ ...p, c: e.target.value }))}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-400 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Insurer Brand (e.g. TATA AIG)</label>
                                    <input
                                        type="text"
                                        value={editingGarage?.b || ''}
                                        onChange={e => setEditingGarage(p => ({ ...p, b: e.target.value }))}
                                        placeholder="TATA AIG / HDFC ERGO"
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-400 text-sm uppercase placeholder:normal-case"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Address</label>
                                    <textarea
                                        rows={4}
                                        value={editingGarage?.a || ''}
                                        onChange={e => setEditingGarage(p => ({ ...p, a: e.target.value }))}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-400 text-sm resize-none"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closePanel}
                                className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="garage-form"
                                disabled={isSaving}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save Garage'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
