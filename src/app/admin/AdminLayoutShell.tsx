'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return (
            <>
                <style>{`
                  nav[class*="fixed"], footer { display: none !important; }
                `}</style>
                {children}
            </>
        );
    }

    return (
        <>
            {/*
        Hide the public site's Navbar + Footer.
        The root layout.tsx renders them globally — instead of modifying it,
        we inject CSS to suppress them when inside /admin.
      */}
            <style>{`
        nav[class*="fixed"], footer { display: none !important; }
      `}</style>

            <div className="fixed inset-0 z-50 flex bg-slate-50/80">
                <Sidebar />

                <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-5xl mx-auto px-5 md:px-10 py-8 md:py-10">
                            {/* Mobile spacer for fixed top bar */}
                            <div className="h-10 md:hidden" />
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
