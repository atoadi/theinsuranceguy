"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

// DATA STRUCTURE (Easy to edit text here)
const TABS = [
  { id: 'new', label: 'New Car' },
  { id: 'renewal', label: 'Renewal' },
  { id: 'used', label: 'Used Car' }
];

const CONTENT = {
  new: {
    title: "New Car Protection",
    desc: "Standard policies often miss critical protections. We present comprehensive options to keep your new machine secure.",
    features: [
      { bold: "Zero Depreciation", text: "Full payout for parts without age deduction." },
      { bold: "Return to Invoice", text: "Protects the on-road price if stolen." },
      { bold: "Engine Protect", text: "Essential for water damage cover." }
    ],
    cta: "Get New Car Options",
    mode: "new"
  },
  renewal: {
    title: "Renewal Quote Checker",
    desc: "We check if your Car's Value (IDV) is correct and ensure your No Claim Bonus is intact before you pay.",
    features: [
      { bold: "NCB Check", text: "Ensure your 20-50% discount is applied." },
      { bold: "Correct IDV", text: "We adjust IDV so you don't overpay." },
      { bold: "Add-on Audit", text: "We help you decide which covers to keep." }
    ],
    cta: "Check Renewal Rate",
    mode: "renewal"
  },
  used: {
    title: "Used Car Insurance",
    desc: "Inheriting a policy? We verify claim history and help you find the right policy for your pre-owned car.",
    features: [
      { bold: "Unlock Zero Dep", text: "Available even for used cars." },
      { bold: "History Check", text: "Verify past claims before you buy." },
      { bold: "Simple Process", text: "Just share the car number to start." }
    ],
    cta: "Get Used Car Quote",
    mode: "used"
  }
};

export default function PrivateCarPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'renewal' | 'used'>('new');

  return (
    <main className="pt-20 min-h-screen bg-slate-50">
      
      {/* HERO */}
      <section className="text-center pt-20 pb-12 px-6 bg-white border-b border-slate-100">
        <h1 className="text-5xl md:text-7xl font-serif text-emerald-900 mb-6">Expert Guidance.</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
          We provide clear options so you can choose the right coverage for your machine.
        </p>

        {/* GLIDER NAV */}
        <div className="inline-flex bg-slate-100 p-2 rounded-full relative">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm transition-colors duration-200 ${
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
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-200 shadow-premium"
            >
              <div className="border-l-4 border-emerald-600 pl-6 mb-8">
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">
                  {CONTENT[activeTab].title}
                </h2>
                <p className="text-slate-500 leading-relaxed text-lg">
                  {CONTENT[activeTab].desc}
                </p>
              </div>

              <ul className="space-y-6 mb-12">
                {CONTENT[activeTab].features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle className="text-emerald-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700 text-lg">
                      <strong className="text-slate-900 font-bold">{item.bold}:</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a 
                href={`/diamond-wizard?mode=${CONTENT[activeTab].mode}`} 
                className="block w-full text-center bg-emerald-700 text-white font-bold py-4 rounded-xl hover:bg-emerald-800 hover:-translate-y-1 transition-all shadow-lg shadow-emerald-900/10"
              >
                {CONTENT[activeTab].cta}
              </a>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </main>
  );
}

