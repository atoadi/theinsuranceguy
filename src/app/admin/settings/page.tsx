'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, ShieldCheck, Zap, Key, Save, Sparkles } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

export default function SettingsPage() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [supportMessage, setSupportMessage] = useState('');

    // AI Settings State
    const [apiKey, setApiKey] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [showSavedMsg, setShowSavedMsg] = useState(false);

    useEffect(() => {
        // Load AI settings from local storage
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) setApiKey(storedKey);

        const storedPrompt = localStorage.getItem('gemini_system_prompt');
        if (storedPrompt) {
            setSystemPrompt(storedPrompt);
        } else {
            // Default prompt if none is set
            setSystemPrompt(`You are an expert copywriter for a premium Indian boutique insurance advisory firm.
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
        // Check if currently subscribed
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((sub) => {
                    setIsSubscribed(!!sub);
                });
            });
        } else {
            setSupportMessage('Push notifications are not supported in this browser.');
        }
    }, []);

    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    const handleSubscribe = async () => {
        if (!('serviceWorker' in navigator)) return;
        setLoading(true);

        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('Permission denied. Please enable notifications in your browser settings.');
                setLoading(false);
                return;
            }

            const reg = await navigator.serviceWorker.register('/sw.js');
            await reg.update(); // ensure latest

            const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            if (!vapidKey) throw new Error('VAPID key not configured');

            const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidKey),
            });

            // Send to our backend
            const res = await fetch('/api/push', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscription }),
            });

            if (!res.ok) throw new Error('Failed to save subscription');

            setIsSubscribed(true);
        } catch (err: any) {
            console.error(err);
            alert('Error enabling notifications: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAiSettings = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        localStorage.setItem('gemini_system_prompt', systemPrompt);
        setShowSavedMsg(true);
        setTimeout(() => setShowSavedMsg(false), 3000);
    };

    return (
        <>
            <AdminHeader
                title="Settings"
                subtitle="Command Centre preferences"
            />

            <div className="max-w-2xl space-y-6">

                {/* --- ACCOUNT EXPORT & SIGN OUT --- */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                <ShieldCheck size={24} className="text-slate-400" />
                            </div>
                            <div>
                                <h2 className="font-serif text-lg text-slate-900 tracking-tight">Admin Session</h2>
                                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                                    You are securely logged into the dashboard.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={async () => {
                                const { signOutAction } = await import('@/app/admin/settings/actions');
                                await signOutAction();
                            }}
                            className="px-5 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-500 rounded-xl text-sm font-bold border border-slate-100 hover:border-red-100 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* --- AI & API KEY SETTINGS --- */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                                <Sparkles size={24} className="text-purple-600" />
                            </div>
                            <div>
                                <h2 className="font-serif text-lg text-slate-900 tracking-tight">AI Blogger Settings</h2>
                                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                                    Configure your Gemini API key and default copywriting prompt. These are securely saved in your browser, not the database.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-xs flex items-center gap-2 font-bold text-slate-400 uppercase tracking-widest mb-2">
                                <Key size={14} /> Gemini API Key
                            </label>
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-mono"
                                placeholder="AIzaSy..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Default System Prompt
                            </label>
                            <textarea
                                value={systemPrompt}
                                onChange={(e) => setSystemPrompt(e.target.value)}
                                rows={10}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-mono leading-relaxed resize-y"
                                placeholder="You are an expert copywriter..."
                            />
                            <p className="text-xs text-slate-500 mt-2">
                                Note: Keep the <code className="bg-slate-100 px-1 py-0.5 rounded text-purple-600">{"{topic}"}</code> placeholder where you want the blog topic inserted.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            {showSavedMsg && (
                                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
                                    <ShieldCheck size={16} /> Securely Saved to Browser
                                </span>
                            )}
                            <button
                                onClick={handleSaveAiSettings}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                            >
                                <Save size={16} /> Save AI Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- PUSH NOTIFICATIONS --- */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">

                    <div className="p-6 border-b border-slate-50 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                            <Bell size={24} className="text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="font-serif text-lg text-slate-900 tracking-tight">Native Lead Alerts</h2>
                            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                                Receive instant push notifications on this device whenever a new lead or consultation is booked, even when the dashboard is closed.
                            </p>

                            {supportMessage && (
                                <p className="text-xs text-amber-600 mt-2 font-medium bg-amber-50 inline-block px-3 py-1 rounded-md">
                                    {supportMessage}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                            <span className="text-sm font-bold text-slate-700">
                                {isSubscribed ? 'Active on this device' : 'Not active on this device'}
                            </span>
                        </div>

                        <button
                            onClick={handleSubscribe}
                            disabled={isSubscribed || loading || !!supportMessage}
                            className={`
                px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 justify-center
                ${isSubscribed
                                    ? 'bg-emerald-100/50 text-emerald-700 cursor-not-allowed border border-emerald-200/50'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                                }
              `}
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : isSubscribed ? (
                                <>
                                    <ShieldCheck size={16} /> Enabled
                                </>
                            ) : (
                                <>
                                    <Zap size={16} /> Enable Alerts
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <p className="text-xs text-slate-400 font-medium mt-4 px-2 italic">
                    Note: This relies on browser Push API. For iOS devices, you must "Add to Home Screen" first.
                </p>
            </div>
        </>
    );
}
