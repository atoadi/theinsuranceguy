"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// OPTIMIZATION: Use 'm' instead of 'motion' and wrap in LazyMotion
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import EmergencyModal from '../ui/emergency-modal';
import { Menu, X, Phone, Shield, FileText, Wrench, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Private Car', href: '/private-car', icon: Shield },
    { name: 'Warranty', href: '/warranty', icon: FileText },
    { name: 'Garages', href: '/garages', icon: Wrench },
    { name: 'Resources', href: '/resources', icon: ChevronRight },
  ];

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // WRAPPER: This tells Framer Motion to load only the DOM animation code (lightweight)
    <LazyMotion features={domAnimation}>
      <>
        <m.nav 
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex items-center gap-2 group">
              <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors">
                TheInsuranceGuy<span className="text-emerald-600">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-emerald-800 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <button 
                onClick={() => setShowEmergency(true)}
                className="bg-red-50 text-red-600 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-2 animate-pulse"
              >
                <Phone size={16} /> Emergency
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 p-2 text-slate-800"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </m.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6 flex flex-col"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <m.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-2xl font-serif text-slate-900 border-b border-slate-100 pb-4"
                    >
                      <span className="flex items-center gap-3">
                        <link.icon size={24} className="text-emerald-600" />
                        {link.name}
                      </span>
                      <ChevronRight size={20} className="text-slate-300" />
                    </Link>
                  </m.div>
                ))}

                <m.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => { setIsOpen(false); setShowEmergency(true); }}
                  className="mt-4 w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                >
                  <Phone size={20} /> Emergency Support
                </m.button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
      </>
    </LazyMotion>
  );
};

export default Navbar;