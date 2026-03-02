"use client";
import React from 'react';
import { Phone, AlertTriangle, Camera, FileText, XCircle, CheckCircle, MessageSquare } from 'lucide-react';

export default function EmergencyPage() {
  return (
    <main className="pt-20 min-h-screen bg-white">
      
      {/* ALERT HERO */}
      <section className="bg-ruby-alert text-white py-20 px-6 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-6 animate-pulse">
          <AlertTriangle size={32} />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Don't Panic.</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
          Follow these steps exactly. We will handle the paperwork later.
          <br /><strong>Prioritize safety first.</strong>
        </p>
      </section>

      {/* DIRECT HOTLINES */}
      <section className="py-12 px-6 -mt-10 relative z-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-slate-100">
          <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-slate-100 pb-4">Direct Insurer Hotlines</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="tel:18002667780" className="flex flex-col items-center justify-center bg-slate-50 hover:bg-ruby-50 border border-slate-200 hover:border-ruby-200 p-6 rounded-2xl transition-all group">
              <span className="font-bold text-slate-900 text-lg mb-1">Tata AIG</span>
              <span className="text-sm text-slate-500 mb-4">Claim Intimation</span>
              <div className="flex items-center gap-2 text-ruby-alert font-bold bg-white px-4 py-2 rounded-full shadow-sm group-hover:scale-105 transition-transform"><Phone size={16} /> Call Now</div>
            </a>
            <a href="tel:18003009" className="flex flex-col items-center justify-center bg-slate-50 hover:bg-ruby-50 border border-slate-200 hover:border-ruby-200 p-6 rounded-2xl transition-all group">
              <span className="font-bold text-slate-900 text-lg mb-1">Reliance Gen</span>
              <span className="text-sm text-slate-500 mb-4">Claim Intimation</span>
              <div className="flex items-center gap-2 text-ruby-alert font-bold bg-white px-4 py-2 rounded-full shadow-sm group-hover:scale-105 transition-transform"><Phone size={16} /> Call Now</div>
            </a>
            <a href="tel:18002666" className="flex flex-col items-center justify-center bg-slate-50 hover:bg-ruby-50 border border-slate-200 hover:border-ruby-200 p-6 rounded-2xl transition-all group">
              <span className="font-bold text-slate-900 text-lg mb-1">ICICI Lombard</span>
              <span className="text-sm text-slate-500 mb-4">Claim Intimation</span>
              <div className="flex items-center gap-2 text-ruby-alert font-bold bg-white px-4 py-2 rounded-full shadow-sm group-hover:scale-105 transition-transform"><Phone size={16} /> Call Now</div>
            </a>
          </div>
        </div>
      </section>

      {/* THE SCRIPT (NEW) */}
      <section className="py-12 px-6 max-w-2xl mx-auto">
        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
          <div className="flex items-center gap-3 mb-4">
             <MessageSquare className="text-emerald-700" />
             <h3 className="font-bold text-emerald-900 text-lg">What to say to the Customer Care</h3>
          </div>
          <p className="text-slate-600 mb-4 italic">"My car met with an accident at [Location] around [Time]. I am safe. Please generate a Claim Registration Number."</p>
          <div className="bg-white p-4 rounded-xl border border-emerald-100 text-sm text-emerald-800 font-bold">
            ⚠️ DO NOT ADMIT FAULT on the call. Just state facts: "Collision occurred."
          </div>
        </div>
      </section>

      {/* STEPS GRID */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif text-center text-slate-900 mb-12">Immediate Action Plan</h2>
        
        <div className="space-y-8">
          {/* STEP 1 */}
          <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-50 p-8 rounded-[24px]">
            <div className="bg-white p-4 rounded-full shadow-sm text-emerald-700 shrink-0">
              <Camera size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Step 1: The Evidence (Before Moving)</h3>
              <p className="text-slate-600 mb-4">Unless blocking heavy traffic, <strong>do not move the car</strong> immediately. Take 4 photos:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-500">
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500" /> Wide shot showing the road & car position.</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500" /> Close up of the damage.</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500" /> Number plate of the other vehicle (if involved).</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500" /> Any visible landmarks.</li>
              </ul>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-50 p-8 rounded-[24px]">
            <div className="bg-white p-4 rounded-full shadow-sm text-emerald-700 shrink-0">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Step 2: No Negotiation</h3>
              <p className="text-slate-600">
                Do not negotiate with third parties on the spot. Do not admit liability in writing. Exchange contact details politely and let the insurer handle the legalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE RED ZONE */}
      <section className="py-20 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-ruby-alert mb-8">CRITICAL: Do Not Do This</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="flex items-center gap-2 font-bold text-lg mb-2"><XCircle className="text-ruby-alert" /> Do not drive a leaking car.</h4>
              <p className="text-slate-400 text-sm">If coolant or oil is leaking, driving further will seize the engine. Insurance will reject this as "Consequential Damage". Tow it.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h4 className="flex items-center gap-2 font-bold text-lg mb-2"><XCircle className="text-ruby-alert" /> Do not repair before survey.</h4>
              <p className="text-slate-400 text-sm">Do not let a local mechanic "fix it temporarily" before the surveyor sees it. This voids the claim.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}