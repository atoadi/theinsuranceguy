import { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import AdminLayoutShell from './admin/AdminLayoutShell';
import '../globals.css';

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap"
});

export const metadata: Metadata = {
    title: 'Command Centre | TheInsuranceGuy',
    description: 'Admin Dashboard for TheInsuranceGuy',
    robots: { index: false, follow: false },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Command Centre',
    },
};

export const viewport: Viewport = {
    themeColor: '#022c22',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={outfit.variable}>
            <body className="font-sans antialiased text-slate-900 overflow-hidden bg-slate-50 overscroll-none">
                <AdminLayoutShell>
                    {children}
                </AdminLayoutShell>
            </body>
        </html>
    );
}
