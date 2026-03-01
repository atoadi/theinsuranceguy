'use client';

import { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/app/admin/login/actions';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        // The exact auth process is handled securely in a server action
        const result = await loginAction(email, password);

        if (result?.error) {
            setErrorMsg(result.error);
            setLoading(false);
        } else if (result?.success) {
            router.push('/admin');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">

            {/* Background Ornaments */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-md">

                {/* Logo/Icon */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-2xl">
                        <ShieldCheck size={32} className="text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-serif text-white mb-2">Admin Portal</h1>
                    <p className="text-slate-400 text-sm">Sign in to manage your network and leads.</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {errorMsg && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                                <p className="text-sm font-bold text-red-400">{errorMsg}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                                placeholder="you@theinsuranceguy.in"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3.5 text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Secure Sign In'}
                        </button>

                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-500 mt-8 font-medium">
                    Protected by Supabase Auth &middot; RLS Enforced
                </p>

            </div>
        </div>
    );
}
