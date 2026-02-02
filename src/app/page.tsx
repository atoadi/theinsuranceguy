"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import InsiderSlider from '@/components/sections/insider-slider';
import AppointmentModal from '@/components/ui/appointment-modal';
import { CircleCheck, Hand, Calendar } from 'lucide-react';

export default function Home() {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    // UNIFIED BACKGROUND
    <main className="pt-20 overflow-x-hidden bg-slate-50 min-h-screen">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="pt-28 pb-16 px-6 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-200 cursor-default hover:bg-emerald-200 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            Sierra Launch Offer: 2,000 Slots
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Your Dealer Quote is <br />
            <span className="text-emerald-700 italic">Overpriced.</span> <span className="text-orange-600 underline decoration-orange-200 italic">Check the Math.</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Tata Sierra buyers are saving <strong className="text-slate-900">₹51,000</strong> compared to showroom quotes. Same cashless network, better pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* PRIMARY: GET QUOTE */}
            <Link href="/diamond-wizard?mode=new" className="w-full sm:w-auto h-14 bg-emerald-800 text-white px-8 rounded-full font-bold text-lg shadow-xl shadow-emerald-900/20 hover:bg-emerald-900 hover:scale-105 hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center">
              Get Quote
            </Link>
            
            {/* SECONDARY: BOOK APPOINTMENT (PC Feeling Fixed) */}
            <button 
              onClick={() => setShowAppointment(true)} 
              className="w-full sm:w-auto h-14 bg-white border-2 border-slate-200 text-emerald-900 px-8 rounded-full font-bold text-lg hover:border-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Calendar size={20} className="text-emerald-600 group-hover:scale-110 transition-transform" />
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* --- 2. INSIDER SLIDER --- */}
      <InsiderSlider />

      {/* --- 3. BUFFETT QUOTE --- */}
      <section className="py-20 text-center px-6 relative overflow-visible">
        <div className="max-w-4xl mx-auto relative">
          <span className="absolute -top-10 -left-4 text-[6rem] md:text-[8rem] font-serif opacity-10 text-emerald-900 select-none leading-none">“</span>
          <blockquote className="relative z-10 text-3xl md:text-6xl font-serif italic text-slate-900 mb-8 leading-[1.2]">
            Price is what you pay.
            <br className="hidden md:block" /> 
            <span className="text-emerald-700">Value is what you get.</span>
          </blockquote>
          <span className="absolute -bottom-14 -right-4 text-[6rem] md:text-[8rem] font-serif opacity-10 text-emerald-900 select-none leading-none">”</span>
          <cite className="block mt-12 text-emerald-800 font-black tracking-[0.3em] uppercase text-xs">— Warren Buffett</cite>
        </div>
      </section>

      {/* --- 4. SIERRA SAVINGS TABLE --- */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-emerald-900 mb-4 tracking-tight">The Sierra Savings</h2>
            <p className="text-slate-500 font-sans">Verified comparison for Gurgaon Dealer</p>
          </div>

          <div className="relative">
             <div className="md:hidden absolute -top-8 right-0 flex items-center gap-1 text-slate-400 text-xs font-bold animate-pulse">
               <Hand size={14} /> Swipe
             </div>

             <div className="overflow-x-auto rounded-[32px] border border-slate-200 bg-white shadow-xl">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Policy Segment</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Showroom Quote</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-emerald-700">Our Quote</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 font-sans">
                  <tr className="border-b border-slate-50">
                    <td className="p-8 font-serif text-xl text-emerald-900 font-bold">Total Premium</td>
                    <td className="p-8 text-red-500 font-bold line-through">₹1,09,000</td>
                    <td className="p-8">
                      <span className="bg-emerald-700 text-white px-5 py-2.5 rounded-full text-xl font-black shadow-lg shadow-emerald-900/20">
                        ₹58,311
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="p-8 font-serif text-xl text-emerald-900 font-bold">Cashless Network</td>
                    <td className="p-8 text-slate-400">"Dealer Promised"</td>
                    <td className="p-8 font-black text-emerald-700 flex items-center gap-2">
                      <CircleCheck size={18} /> Verified Network List
                    </td>
                  </tr>
                  <tr>
                    <td className="p-8 font-serif text-xl text-emerald-900 font-bold">Hidden Margins</td>
                    <td className="p-8 text-red-500 font-bold">~₹51,200 High</td>
                    <td className="p-8 font-black text-emerald-700">₹0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. REALITY CHECK TABLE --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-emerald-900 mb-4">The Reality Check</h2>
            <p className="text-slate-500">Direct comparison based on market realities.</p>
          </div>
          
          <div className="relative">
             <div className="md:hidden absolute -top-8 right-0 flex items-center gap-1 text-slate-400 text-xs font-bold animate-pulse">
               <Hand size={14} /> Swipe
             </div>

             <div className="overflow-x-auto rounded-[24px] border border-slate-200 bg-white shadow-xl">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Evaluation Point</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Dealers</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Online Portals</th>
                    <th className="p-6 text-xs font-black uppercase tracking-widest text-emerald-700">TheInsuranceGuy</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-50">
                    <td className="p-6 font-serif text-lg text-emerald-900 font-bold">Transparency</td>
                    <td className="p-6 text-red-500 font-bold">Low</td>
                    <td className="p-6 text-orange-500 font-bold">Medium</td>
                    <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">High</span></td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="p-6 font-serif text-lg text-emerald-900 font-bold">Claim Clarity</td>
                    <td className="p-6 text-red-500 font-bold">Ambiguous</td>
                    <td className="p-6 text-orange-500 font-bold">Ambiguous</td>
                    <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Crystal Clear</span></td>
                  </tr>
                  <tr>
                    <td className="p-6 font-serif text-lg text-emerald-900 font-bold">Sales Pressure</td>
                    <td className="p-6 text-red-500 font-bold">High</td>
                    <td className="p-6 text-orange-500 font-bold">Medium</td>
                    <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Zero</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. STORY SECTION (Fixed Placement) --- */}
      <section className="my-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-emerald-950 text-white rounded-[40px] md:rounded-[60px] p-12 md:p-20 shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
          <span className="bg-emerald-500 text-emerald-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-8 inline-block">My Mistake</span>
          <h2 className="text-3xl md:text-6xl font-serif mb-8">"I once paid ₹500 for a single bolt. Here is why."</h2>
          <p className="text-emerald-100/70 text-lg leading-relaxed mb-10">
            I forgot the "Consumables Cover". It costs less than a coffee, but without it, you pay for every screw, washer, and liter of oil.
            <br /><br />
            <strong className="text-white">I don't let my clients make the same mistake.</strong>
          </p>
        </div>
      </section>

      {/* --- APPOINTMENT MODAL (Invisible until clicked) --- */}
      <AppointmentModal isOpen={showAppointment} onClose={() => setShowAppointment(false)} />
    </main>
  );
}