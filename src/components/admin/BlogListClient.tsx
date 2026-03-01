'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Search, MoreHorizontal, Edit2, Trash2, Eye, EyeOff, Globe } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

interface BlogListClientProps {
    blogs: any[];
    deleteBlog: (id: string) => Promise<void>;
    togglePublish: (id: string, currentStatus: boolean) => Promise<void>;
}

export default function BlogListClient({ blogs, deleteBlog, togglePublish }: BlogListClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const filtered = blogs.filter((blog: any) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return blog.title.toLowerCase().includes(q) || blog.tag.toLowerCase().includes(q);
    }).filter((blog: any) => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'published') return blog.is_published;
        if (statusFilter === 'draft') return !blog.is_published;
        return true;
    });

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;
        setIsDeleting(id);
        await deleteBlog(id);
        setIsDeleting(null);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <AdminHeader
                    title="Content Engine"
                    subtitle={`${blogs.filter(b => b.is_published).length} Published · ${blogs.filter(b => !b.is_published).length} Drafts`}
                />
                <Link
                    href="/admin/blogs/new"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md group shrink-0"
                >
                    <Plus size={16} className="text-emerald-400 group-hover:rotate-90 transition-transform" />
                    Write New Post
                </Link>
            </div>

            {/* ─── FILTERS ─── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                    {(['all', 'published', 'draft'] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'text-slate-400 hover:bg-slate-50 border border-transparent'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:max-w-xs focus-within:ring-2 focus-within:ring-emerald-50 rounded-xl">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 text-[13px] bg-white border border-slate-100 rounded-xl font-medium text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-emerald-300 transition-all"
                    />
                </div>
            </div>

            {/* ─── LIST ─── */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                {filtered.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                        {filtered.map((blog: any) => (
                            <div key={blog.id} className={`p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors hover:bg-slate-50/50 ${isDeleting === blog.id ? 'opacity-50 pointer-events-none' : ''}`}>

                                {/* Status Indicator */}
                                <div className="shrink-0 pt-1 sm:pt-0">
                                    {blog.is_published ? (
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100/50">
                                            <Globe size={18} className="text-emerald-600" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100/50">
                                            <EyeOff size={18} className="text-slate-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-[14px] font-bold text-slate-900 truncate pr-4">
                                            {blog.title}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-400">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-${blog.tag_color || 'slate'}-50 text-${blog.tag_color || 'slate'}-700`}>
                                            <span className={`w-1.5 h-1.5 rounded-full bg-${blog.tag_color || 'slate'}-500`} />
                                            {blog.tag || 'Uncategorized'}
                                        </span>
                                        <span>{blog.published_date}</span>
                                        <span className="flex items-center gap-1"><FileText size={10} /> {blog.read_time}</span>
                                        <span className="font-mono text-slate-300">/{blog.slug}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 shrink-0 border-t border-slate-50 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                                    <button
                                        onClick={() => togglePublish(blog.id, blog.is_published)}
                                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                    >
                                        {blog.is_published ? 'Unpublish' : 'Publish'}
                                    </button>

                                    <Link
                                        href={`/admin/blogs/${blog.id}`}
                                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                                    >
                                        <Edit2 size={16} />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                            <FileText size={28} className="text-slate-300" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-serif text-slate-900 mb-1">
                            {searchQuery || statusFilter !== 'all' ? 'No articles found' : 'Blank Canvas'}
                        </h3>
                        <p className="text-[13px] text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Try adjusting your search or filters to find what you are looking for.'
                                : 'You haven\'t published any articles yet. Draft your first piece of content to start bringing in organic traffic.'
                            }
                        </p>
                        {(!searchQuery && statusFilter === 'all') && (
                            <Link
                                href="/admin/blogs/new"
                                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50 px-5 py-2 rounded-full text-[12px] font-bold tracking-wide transition-colors"
                            >
                                Draft First Article
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
