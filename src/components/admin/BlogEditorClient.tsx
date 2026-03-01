'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Sparkles, Wand2 } from 'lucide-react';
import Link from 'next/link';

interface BlogEditorClientProps {
    initialData?: any;
    saveBlog: (data: any) => Promise<{ success: boolean; id?: string; error?: string }>;
    generateDraft: (topic: string, apiKey: string, prompt: string) => Promise<{ success: boolean; content?: string; title?: string; error?: string }>;
}

export default function BlogEditorClient({ initialData, saveBlog, generateDraft }: BlogEditorClientProps) {
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        id: initialData?.id || '',
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        tag: initialData?.tag || '',
        tag_color: initialData?.tag_color || 'slate',
        read_time: initialData?.read_time || '3 mins',
        published_date: initialData?.published_date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: initialData?.content || '',
        is_published: initialData?.is_published || false,
    });

    // UI State
    const [isSaving, setIsSaving] = useState(false);
    const [aiTopic, setAiTopic] = useState('');
    const [isDrafting, setIsDrafting] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [customPrompt, setCustomPrompt] = useState('');

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) setApiKey(storedKey);

        const storedPrompt = localStorage.getItem('gemini_system_prompt');
        if (storedPrompt) {
            setCustomPrompt(storedPrompt);
        } else {
            setCustomPrompt(`You are an expert copywriter for a premium Indian boutique insurance advisory firm.
Write a highly empathetic, SEO-optimized, 800-word blog post on the following topic: "{topic}".

Crucial Requirements:
1. Format the output ENTIRELY in HTML, using Tailwind CSS classes for styling. Do not use markdown backticks around the output.
2. Use <p> tags with 'mb-4 text-slate-700 leading-relaxed' for paragraphs.
3. Use <h2> tags with 'text-xl font-bold mt-8 mb-4 text-slate-900 border-l-4 border-emerald-500 pl-3' for subheadings.
4. Use <ul> and <li> for lists, styled elegantly.
5. Add at least one visual callout box using a <div> with 'my-8 p-6 bg-slate-50 border-emerald-100 border rounded-2xl'. Include a <strong> heading and regular text inside.
6. Include a suggested Title at the very beginning wrapped in a specific tag like <title-metadata>TITLE HERE</title-metadata>.

Write as 'TheInsuranceGuy'. Be contrarian, brutally honest about insurance traps, and focus on high-ticket vehicles or health insurance problems in India (like GST traps, zero dep reality).
Return purely the HTML string and the <title-metadata> tag, nothing else.`);
        }
    }, []);

    // Auto-generate slug from title if empty
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                : prev.slug
        }));
    };

    const handleSave = async (publish: boolean) => {
        if (!formData.title || !formData.slug || !formData.content) {
            alert('Title, slug, and content are required.');
            return;
        }

        setIsSaving(true);
        const dataToSave = { ...formData, is_published: publish };
        const res = await saveBlog(dataToSave);

        if (res.success) {
            router.push('/admin/blogs');
        } else {
            alert(res.error || 'Failed to save blog');
            setIsSaving(false);
        }
    };

    const handleAiDraft = async () => {
        if (!aiTopic) return;
        if (!apiKey) {
            alert('Please configure your Gemini API Key in the Admin Settings page first.');
            return;
        }

        setIsDrafting(true);

        const res = await generateDraft(aiTopic, apiKey, customPrompt);
        if (res.success && res.content) {
            setFormData(prev => ({
                ...prev,
                title: res.title || prev.title,
                content: res.content || '',
                slug: prev.slug || (res.title ? res.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '')
            }));
        } else {
            alert(res.error || 'Failed to generate draft. Do you have Gemini API key in .env.local?');
        }

        setIsDrafting(false);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* ─── HEADER ─── */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-serif text-slate-900 tracking-tight">
                            {formData.id ? 'Edit Article' : 'New Article'}
                        </h1>
                        <p className="text-[13px] text-slate-400 font-medium">Content Engine</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSave(false)}
                        disabled={isSaving}
                        className="px-5 py-2.5 rounded-full text-[13px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
                    >
                        <Save size={14} />
                        Save as Draft
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-full text-[13px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:shadow-md flex items-center gap-2"
                    >
                        {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles size={14} />}
                        Publish Now
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ─── MAIN EDITOR COLUMN ─── */}
                <div className="lg:col-span-2 space-y-6">

                    {/* AI Drafting Box */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100/50">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-600">
                                <Wand2 size={16} />
                            </div>
                            <h3 className="font-bold text-indigo-900 text-sm">Draft with AI</h3>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="e.g. Why Zero Dep is useless without Consumables cover..."
                                value={aiTopic}
                                onChange={e => setAiTopic(e.target.value)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-indigo-100 bg-white/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all placeholder:text-slate-400"
                                onKeyDown={e => e.key === 'Enter' && handleAiDraft()}
                            />
                            <button
                                onClick={handleAiDraft}
                                disabled={isDrafting || !aiTopic}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 shrink-0"
                            >
                                {isDrafting ? 'Drafting...' : 'Generate HTML'}
                            </button>
                        </div>
                        <div className="mt-3">
                            <details className="text-xs text-indigo-900/60 group">
                                <summary className="cursor-pointer font-medium hover:text-indigo-600 transition-colors">Edit System Prompt</summary>
                                <textarea
                                    value={customPrompt}
                                    onChange={e => setCustomPrompt(e.target.value)}
                                    rows={5}
                                    className="w-full mt-2 p-3 rounded-xl border border-indigo-100 bg-white/50 text-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-y"
                                />
                            </details>
                        </div>
                        <p className="text-[11px] text-indigo-400/80 mt-2 font-medium">Uses your API key stored in Settings.</p>
                    </div>

                    {/* Title & Excerpt */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-5 shadow-sm">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Article Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Enter an engaging title..."
                                className="w-full font-serif text-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none placeholder:font-sans"
                            />
                        </div>

                        <div className="pt-4 border-t border-slate-50">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Meta Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                                placeholder="A short, catchy summary for the blog card and Google search results..."
                                rows={2}
                                className="w-full text-sm text-slate-600 placeholder:text-slate-300 focus:outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Raw HTML Editor */}
                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col h-[600px]">
                        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Content (HTML + Tailwind)</span>
                            <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded font-mono">raw</span>
                        </div>
                        <textarea
                            value={formData.content}
                            onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                            placeholder="<p>Write your article here...</p>"
                            className="flex-1 w-full p-5 font-mono text-[13px] text-slate-700 bg-slate-900 leading-relaxed focus:outline-none resize-none placeholder:text-slate-600"
                            style={{ color: '#e2e8f0' }} // force light text on dark bg for code feel
                        />
                    </div>
                </div>

                {/* ─── SIDEBAR COLUMN ─── */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-50 pb-3">SEO & Meta</h3>

                        <div>
                            <label className="block text-[11px] font-bold lowercase text-slate-400 mb-1.5">/slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
                                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:border-emerald-300 focus:bg-white transition-all font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Category Tag</label>
                            <input
                                type="text"
                                value={formData.tag}
                                onChange={e => setFormData(p => ({ ...p, tag: e.target.value }))}
                                placeholder="e.g. Claims"
                                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:border-emerald-300 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Tag Color</label>
                            <select
                                value={formData.tag_color}
                                onChange={e => setFormData(p => ({ ...p, tag_color: e.target.value }))}
                                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:border-emerald-300 focus:bg-white transition-all appearance-none"
                            >
                                <option value="emerald">Emerald (Green)</option>
                                <option value="ruby">Ruby (Red)</option>
                                <option value="amber">Amber (Yellow)</option>
                                <option value="indigo">Indigo (Purple)</option>
                                <option value="sky">Sky (Blue)</option>
                                <option value="slate">Slate (Grey)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Read Time</label>
                                <input
                                    type="text"
                                    value={formData.read_time}
                                    onChange={e => setFormData(p => ({ ...p, read_time: e.target.value }))}
                                    placeholder="3 mins"
                                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:border-emerald-300 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Pub Date</label>
                                <input
                                    type="text"
                                    value={formData.published_date}
                                    onChange={e => setFormData(p => ({ ...p, published_date: e.target.value }))}
                                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:border-emerald-300 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
