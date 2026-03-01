'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Car,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Inbox },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  { label: 'Garages', href: '/admin/garages', icon: Car },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

// ─── ANIMATIONS — Stolen directly from his public navbar ───
const line1Variants: Variants = {
  closed: { rotate: 0, y: -5, transition: { rotate: { duration: 0.2 }, y: { delay: 0.2, duration: 0.2 } } },
  opened: { rotate: 45, y: 0, transition: { y: { duration: 0.2 }, rotate: { delay: 0.2, duration: 0.25, ease: [0.22, 1, 0.36, 1] } } },
};
const line2Variants: Variants = {
  closed: { rotate: 0, y: 5, transition: { rotate: { duration: 0.2 }, y: { delay: 0.2, duration: 0.2 } } },
  opened: { rotate: -45, y: 0, transition: { y: { duration: 0.2 }, rotate: { delay: 0.2, duration: 0.25, ease: [0.22, 1, 0.36, 1] } } },
};
const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};


export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open — same as his navbar
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────
          DESKTOP SIDEBAR
      ───────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-[260px] bg-emerald-950 min-h-screen shrink-0 border-r border-emerald-900/50">

        {/* Brand */}
        <div className="px-7 pt-9 pb-7">
          <Link href="/admin" className="block">
            <p className="font-serif text-[22px] text-white tracking-tight leading-none">
              TheInsuranceGuy<span className="text-emerald-500">.</span>
            </p>
          </Link>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600/80">
              Command Centre
            </span>
          </div>
        </div>

        <div className="mx-5 h-px bg-gradient-to-r from-emerald-800/50 via-emerald-700/20 to-transparent" />

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-emerald-700/60 px-3 mb-3">
            Operations
          </p>
          <div className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold
                    transition-all duration-150 relative
                    ${active
                      ? 'bg-emerald-900/60 text-white'
                      : 'text-emerald-400/60 hover:text-emerald-300 hover:bg-emerald-900/30'
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full" />
                  )}
                  <item.icon size={17} strokeWidth={active ? 2.2 : 1.6} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-4 pb-6">
          <div className="mx-1 mb-4 h-px bg-gradient-to-r from-emerald-800/50 via-emerald-700/20 to-transparent" />
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-emerald-600/50 hover:text-emerald-400 hover:bg-emerald-900/30 transition-all"
          >
            <ExternalLink size={15} strokeWidth={1.6} />
            View Live Site
          </Link>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────
          MOBILE — TOP BAR + ANIMATED HAMBURGER
      ───────────────────────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100] bg-emerald-950 px-5 py-3.5 flex items-center justify-between border-b border-emerald-900/50">
        <motion.div
          initial={false}
          animate={{
            opacity: mobileOpen ? 0 : 1,
            y: mobileOpen ? -10 : 0,
            pointerEvents: mobileOpen ? 'none' as const : 'auto' as const,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Link href="/admin">
            <p className="font-serif text-lg text-white tracking-tight">
              TheInsuranceGuy<span className="text-emerald-500">.</span>
            </p>
          </Link>
        </motion.div>

        {/* Animated hamburger — exact same animation as his public navbar */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-[101] flex h-10 w-10 flex-col items-center justify-center outline-none"
          aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
        >
          <div className="relative w-5 flex items-center justify-center">
            <motion.span
              variants={line1Variants}
              animate={mobileOpen ? 'opened' : 'closed'}
              className="absolute h-[2px] w-5 rounded-full bg-emerald-400"
            />
            <motion.span
              variants={line2Variants}
              animate={mobileOpen ? 'opened' : 'closed'}
              className="absolute h-[2px] w-5 rounded-full bg-emerald-400"
            />
          </div>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────
          MOBILE — FULLSCREEN MENU (same as his public nav)
      ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[90] bg-emerald-950 flex flex-col pt-28 px-8"
          >
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className={`
                        text-[2rem] font-serif border-b border-emerald-800/30 py-5
                        flex justify-between items-center transition-colors
                        ${active ? 'text-emerald-400' : 'text-white/80'}
                      `}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                      <span className={`text-lg ${active ? 'opacity-80' : 'opacity-20'}`}>→</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* View Site link at bottom */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/"
                  target="_blank"
                  className="mt-6 flex items-center gap-2 text-emerald-600/60 font-medium text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <ExternalLink size={14} /> View Live Site
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
