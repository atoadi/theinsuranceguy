"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from 'next/link';
import EmergencyModal from '../ui/emergency-modal';


interface NavLink { name: string; href: string; }

// --- ANIMATION VARIANTS ---
const line1Variants: Variants = {
  closed: { rotate: 0, y: -6, transition: { rotate: { duration: 0.2 }, y: { delay: 0.2, duration: 0.2 } } },
  opened: { rotate: 45, y: 0, transition: { y: { duration: 0.2 }, rotate: { delay: 0.2, duration: 0.25, ease: [0.22, 1, 0.36, 1] } } },
};
const line2Variants: Variants = {
  closed: { rotate: 0, y: 6, transition: { rotate: { duration: 0.2 }, y: { delay: 0.2, duration: 0.2 } } },
  opened: { rotate: -45, y: 0, transition: { y: { duration: 0.2 }, rotate: { delay: 0.2, duration: 0.25, ease: [0.22, 1, 0.36, 1] } } },
};
const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: 'Private Car', href: '/private-car' },
    { name: 'Warranty', href: '/warranty' },
    { name: 'Garages', href: '/garages' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-colors duration-500 ${
        isOpen ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -10 : 0, pointerEvents: isOpen ? 'none' : 'auto' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="z-[10001]"
          >
            <Link href="/" className="text-2xl font-serif font-bold text-emerald-900 tracking-tight">
              TheInsuranceGuy<span className="text-emerald-500">.</span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-bold text-slate-600 hover:text-emerald-700 transition-colors">
                {link.name}
              </Link>
            ))}
            <button onClick={() => setShowEmergency(true)} className="bg-red-50 text-red-600 px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Emergency
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[10001] flex h-10 w-10 flex-col items-center justify-center bg-transparent md:hidden outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"} /* FIX: Added aria-label */
          >
            <div className="relative w-6 flex items-center justify-center">
              <motion.span variants={line1Variants} animate={isOpen ? "opened" : "closed"} className="absolute h-[2px] w-6 rounded-full bg-emerald-900" />
              <motion.span variants={line2Variants} animate={isOpen ? "opened" : "closed"} className="absolute h-[2px] w-6 rounded-full bg-emerald-900" />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-white flex flex-col pt-32 px-10"
          >
            <motion.div variants={listVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link href={link.href} className="text-[2.5rem] font-serif text-emerald-900 border-b border-slate-100 py-6 flex justify-between items-center" onClick={() => setIsOpen(false)}>
                    {link.name} <span className="text-lg opacity-20">→</span>
                  </Link>
                </motion.div>
              ))}
              <motion.button variants={itemVariants} onClick={() => { setIsOpen(false); setShowEmergency(true); }} className="mt-8 text-left text-red-600 font-serif text-3xl">
                 Emergency Mode
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
    </>
  );
};
export default Navbar;