"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WarrantyPage() {
  const [plan, setPlan] = useState<'std' | 'lux'>('std');

  return (
    <main className="pt-20 min-h-screen bg-slate-50">
      
      {/* HERO */}
      <section className="text-center pt-24 pb-12 px-6 bg-white border-b border-slate-100">
        <h1 className="text-5xl md:text-7xl font-serif text-emerald-900 mb-6">Protect your machine.</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Choose coverage based on vehicle value. Mechanical failure is the new financial risk.
        </p>

        {/* TOGGLE SWITCH */}
        <div className="inline-flex bg-slate-100 p-1.5 rounded-full relative shadow-inner">
          <button
            onClick={() => setPlan('std')}
            className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
              plan === 'std' ? "text-emerald-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {plan === 'std' && (
              <motion.div layoutId="toggle-bg" className="absolute inset-0 bg-white rounded-full" />
            )}
            <span className="relative z-20">Standard (&lt; 50L)</span>
          </button>
          
          <button
            onClick={() => setPlan('lux')}
            className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
              plan === 'lux' ? "text-gold-warning shadow-sm" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {plan === 'lux' && (
              <motion.div layoutId="toggle-bg" className="absolute inset-0 bg-white rounded-full" />
            )}
            <span className="relative z-20">Luxury (&gt; 50L)</span>
          </button>
        </div>
      </section>

      {/* CONTENT AREA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* STANDARD PLAN CONTENT */}
            {plan === 'std' ? (
              <motion.div
                key="std"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[32px] border border-slate-200 p-8 md:p-12 shadow-premium"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-700"><ShieldCheck size={32} /></div>
                  <h2 className="text-3xl font-serif text-slate-900">The Standard Shield</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Core Coverage</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3 text-slate-600"><CheckCircle className="text-emerald-600 shrink-0" size={20} /> Engine & Gearbox Internals</li>
                      <li className="flex gap-3 text-slate-600"><CheckCircle className="text-emerald-600 shrink-0" size={20} /> Differential Assembly</li>
                      <li className="flex gap-3 text-slate-600"><CheckCircle className="text-emerald-600 shrink-0" size={20} /> Turbocharger Unit</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Electricals</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3 text-slate-600"><CheckCircle className="text-emerald-600 shrink-0" size={20} /> Alternator & Starter Motor</li>
                      <li className="flex gap-3 text-slate-600"><CheckCircle className="text-emerald-600 shrink-0" size={20} /> Fuel Pump System</li>
                      <li className="flex gap-3 text-slate-600"><CheckCircle className="text-emerald-600 shrink-0" size={20} /> AC Compressor</li>
                    </ul>
                  </div>
                </div>

                <Link href="/diamond-wizard?mode=warranty" className="w-full py-4 text-center bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-emerald-900/10">
                   Check Eligibility <ChevronRight size={18} />
                </Link>
              </motion.div>
            ) : (
              /* LUXURY PLAN CONTENT */
              <motion.div
                key="lux"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-900 rounded-[32px] border border-slate-800 p-8 md:p-12 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gold-warning/20 rounded-2xl text-gold-warning"><Star size={32} fill="currentColor" /></div>
                  <h2 className="text-3xl font-serif text-white">The Advanced Shield</h2>
                </div>

                <p className="text-slate-400 mb-8">Designed for German & British engineering where a single sensor failure costs ₹1 Lakh+.</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gold-warning uppercase tracking-widest text-sm">Advanced Tech</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3 text-slate-300"><Star className="text-gold-warning shrink-0" size={18} /> Air Suspension Units</li>
                      <li className="flex gap-3 text-slate-300"><Star className="text-gold-warning shrink-0" size={18} /> ADAS Modules & Sensors</li>
                      <li className="flex gap-3 text-slate-300"><Star className="text-gold-warning shrink-0" size={18} /> Digital Instrument Cluster</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-gold-warning uppercase tracking-widest text-sm">Control Units</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3 text-slate-300"><Star className="text-gold-warning shrink-0" size={18} /> All ECU Suites</li>
                      <li className="flex gap-3 text-slate-300"><Star className="text-gold-warning shrink-0" size={18} /> Transmission Mechatronics</li>
                      <li className="flex gap-3 text-slate-300"><Star className="text-gold-warning shrink-0" size={18} /> Sunroof Motor Assembly</li>
                    </ul>
                  </div>
                </div>

                <Link href="/diamond-wizard?mode=warranty&tier=luxury" className="w-full py-4 text-center bg-gold-warning text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-yellow-500/20">
                   Check Luxury Eligibility <ChevronRight size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}