"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const TABS = [
  { id: 'new', label: 'New Car' },
  { id: 'renewal', label: 'Renewal' },
  { id: 'used', label: 'Used Car' }
];

const CONTENT = {
  new: {
    title: "New Car Protection",
    desc: "Dealers bundle 'junk covers' to inflate premiums. We strip the fat and double the protection.",
    features: [
      { bold: "Return to Invoice", text: "Get the full on-road price if stolen, not just IDV." },
      { bold: "Zero Depreciation", text: "100% payout on all parts, including airbags and plastic." },
      { bold: "Engine Protect", text: "Essential for water damage cover." }
    ],
    cta: "Get New Car Options",
    mode: "new"
  },
  renewal: {
    title: "Renewal Audit",
    desc: "Insurers often reduce your IDV too much to lower premiums. This hurts you during a total loss.",
    features: [
      { bold: "NCB Recovery", text: "Did you claim last year? We might still save your bonus." },
      { bold: "IDV Correction", text: "We manually adjust IDV to reflect real market value." },
      { bold: "Add-on Shuffle", text: "Remove useless roadside assist if you already have it." }
    ],
    cta: "Audit My Renewal",
    mode: "renewal"
  },
  used: {
    title: "Used Car Shield",
    desc: "The previous owner's policy is dangerous. It likely has hidden deductibles you don't know about.",
    features: [
      { bold: "Ownership Transfer", text: "We handle the policy name transfer paperwork." },
      { bold: "Claim History Check", text: "We verify if the car was crashed before you bought it." },
      { bold: "Unlock Zero Dep", text: "Yes, we can add Zero Dep to used cars up to 7 years old." }
    ],
    cta: "Shield Used Car",
    mode: "used"
  }
};

export default function PrivateCarPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'renewal' | 'used'>('new');

  return (
    <main className="pt-20 min-h-screen bg-slate-50">
      
      {/* HERO SECTION */}
      <section className="text-center pt-24 pb-16 px-6 bg-white border-b border-slate-100">
        <h1 className="text-5xl md:text-7xl font-serif text-emerald-900 mb-6">Expert Guidance.</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Don't just "buy insurance." Build a fortress around your financial liability.
        </p>

        {/* GLIDER NAV */}
        <div className="inline-flex bg-slate-100 p-2 rounded-full relative shadow-inner overflow-x-auto max-w-full">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative z-10 px-6 md:px-8 py-3 rounded-full font-bold text-sm transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id ? "text-white" : "text-slate-500 hover:text-emerald-700"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="glider"
                  className="absolute inset-0 bg-emerald-700 rounded-full shadow-lg shadow-emerald-900/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-20">{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* DYNAMIC CONTENT AREA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[40px] p-8 md:p-14 border border-slate-200 shadow-xl"
            >
              {/* FLEX COLUMN ON MOBILE, ROW ON DESKTOP */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                
                {/* LEFT: TEXT */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                    <Shield size={12} /> Expert Recommendation
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">
                    {CONTENT[activeTab].title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-lg mb-8">
                    {CONTENT[activeTab].desc}
                  </p>

                  <ul className="space-y-6 mb-10">
                    {CONTENT[activeTab].features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 group">
                        <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                           <CheckCircle size={14} />
                        </div>
                        <span className="text-slate-600 text-base leading-snug">
                          <strong className="text-slate-900 font-bold block mb-1">{item.bold}</strong> 
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={`/diamond-wizard?mode=${CONTENT[activeTab].mode}`} 
                    className="inline-flex items-center gap-2 bg-emerald-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-800 hover:-translate-y-1 transition-all shadow-xl shadow-emerald-900/10 w-full md:w-auto justify-center"
                  >
                    {CONTENT[activeTab].cta} <ChevronRight size={18} />
                  </Link>
                </div>

                {/* RIGHT: THE WARNING BOX */}
                <div className="w-full md:w-72 bg-slate-50 rounded-2xl p-6 border border-slate-200 shrink-0">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest mb-4">
                    <AlertTriangle size={14} /> Warning
                  </div>
                  <p className="text-sm font-bold text-slate-900 mb-2">Standard Policy Gaps</p>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Buying directly from a portal often defaults to "Standard IDV" which is 15% lower than what you should get.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Tyre Cut</span>
                      <span className="text-red-500 font-bold">Rejected</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Key Loss</span>
                      <span className="text-red-500 font-bold">Rejected</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Rat Bite</span>
                      <span className="text-red-500 font-bold">50% Ded.</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 text-center">
                      <span className="text-xs font-bold text-emerald-700">We Cover All This.</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}