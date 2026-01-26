import React from 'react';
import Link from 'next/link';
import InsiderSlider from '@/components/sections/insider-slider';
import { CircleCheck, } from 'lucide-react';

export default function Home() {
  return (
    <main className="pt-20">
      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 text-center bg-brand-bg relative overflow-hidden">
  <div className="max-w-5xl mx-auto relative z-10">
    {/* Sierra Urgency Badge */}
    <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-brand-primary/20">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
      </span>
      Sierra Launch Offer: 2,000 Slots
    </div>
    
    <h1 className="text-6xl md:text-8xl font-serif text-brand-dark leading-[1.1] mb-8 tracking-tight">
      Your Dealer Quote is <br />
      <span className="text-brand-primary italic">Overpriced.</span> <span className="text-brand-accent underline decoration-brand-accent/30 italic">Check the Math.</span>
    </h1>

    <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
      Tata Sierra buyers are saving <strong className="text-brand-dark">₹51,000</strong> compared to their showroom quotes. Same cashless network, better pricing.
    </p>

    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
      <Link href="/diamond-wizard?mode=new" className="w-full sm:w-auto h-16 bg-brand-primary text-white px-10 rounded-full font-bold text-lg shadow-xl shadow-brand-primary/20 hover:bg-brand-dark hover:-translate-y-1 transition-all flex items-center justify-center">
        Audit My Sierra Quote
      </Link>
      <Link href="/resources" className="w-full sm:w-auto h-16 border-2 border-brand-primary text-brand-primary px-10 rounded-full font-bold text-lg hover:bg-brand-primary/5 transition-all flex items-center justify-center">
        Read the Truth
      </Link>
    </div>
  </div>
</section>
{/* BUFFETT QUOTE */}
<section className="py-32 text-center px-6 relative overflow-visible">
  <div className="max-w-4xl mx-auto relative">
    
    {/* Top Quote: Reduced to 8rem, Increased opacity to 30%, Adjusted position */}
    <span className="absolute -top-10 -left-4 text-[8rem] font-serif opacity-30 text-brand-primary select-none leading-none">
      “
    </span>
    
    <blockquote className="relative z-10 text-4xl md:text-6xl font-serif italic text-slate-900 mb-8 leading-[1.2]">
      Price is what you pay. <br className="hidden md:block" /> 
      <span className="text-brand-primary">Value is what you get.</span>
    </blockquote>
    
    {/* Bottom Quote: Reduced to 8rem, Increased opacity to 30%, Adjusted position */}
    <span className="absolute -bottom-14 -right-4 text-[8rem] font-serif opacity-30 text-brand-primary select-none leading-none">
      ”
    </span>
    
    <cite className="block mt-12 text-brand-primary font-black tracking-[0.3em] uppercase text-xs">
      — Warren Buffett
    </cite>
  </div>
</section>

{/*Sierra comparison table */}

<section className="py-24 bg-brand-bg border-y border-slate-100">
  <div className="max-w-5xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-serif text-emerald-900 mb-4 tracking-tight">The Sierra Savings </h2>
      <p className="text-slate-500 font-sans">Verified comparison for Gurgaon Dealer</p>
    </div>

    <div className="overflow-x-auto rounded-[32px] border border-slate-200 bg-white shadow-premium">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Policy Segment</th>
            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Showroom Quote</th>
            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-brand-primary">Our Quote</th>
          </tr>
        </thead>
        <tbody className="text-slate-600 font-sans">
          <tr className="border-b border-slate-50">
            <td className="p-8 font-bold text-brand-dark text-lg">Total Premium</td>
            <td className="p-8 text-ruby-alert font-bold line-through">₹1,09,000</td>
            <td className="p-8">
              <span className="bg-brand-primary text-white px-5 py-2.5 rounded-full text-xl font-black shadow-lg shadow-brand-primary/20">
                ₹58311
              </span>
            </td>
          </tr>
          <tr className="border-b border-slate-50">
            <td className="p-8 font-bold text-brand-dark">Cashless Network</td>
            <td className="p-8 text-slate-400">"Dealer Promised"</td>
            <td className="p-8 font-black text-brand-primary flex items-center gap-2">
              <CircleCheck size={18} /> Verified Network List
            </td>
          </tr>
          <tr>
            <td className="p-8 font-bold text-brand-dark">Hidden Margins</td>
            <td className="p-8 text-ruby-alert font-bold">~₹51,200 High</td>
            <td className="p-8 font-black text-brand-primary">₹0.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

      {/* REALITY CHECK TABLE */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-emerald-900 mb-4">The Reality Check</h2>
            <p className="text-slate-500">Direct comparison based on market realities.</p>
          </div>
          <div className="overflow-x-auto rounded-[24px] border border-slate-200 bg-white shadow-sm">
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
                  <td className="p-6 font-bold text-slate-900">Transparency</td>
                  <td className="p-6 text-red-500 font-bold">Low</td>
                  <td className="p-6 text-orange-500 font-bold">Medium</td>
                  <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">High</span></td>
                </tr>
                <tr className="border-b border-slate-50">
                  <td className="p-6 font-bold text-slate-900">Claim Clarity</td>
                  <td className="p-6 text-red-500 font-bold">Ambiguous</td>
                  <td className="p-6 text-orange-500 font-bold">Ambiguous</td>
                  <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Crystal Clear</span></td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-slate-900">Sales Pressure</td>
                  <td className="p-6 text-red-500 font-bold">High</td>
                  <td className="p-6 text-orange-500 font-bold">Medium</td>
                  <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Zero</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <InsiderSlider />

      {/* STORY SECTION */}
      <section className="py-24 px-6 bg-emerald-950 text-white text-center rounded-[40px] md:rounded-[60px] mx-4 md:mx-10 my-10 overflow-hidden relative shadow-2xl">
        <div className="max-w-3xl mx-auto">
          <span className="bg-emerald-500 text-emerald-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-8 inline-block">My Mistake</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">"I once paid ₹500 for a single bolt. Here is why."</h2>
          <p className="text-emerald-100/70 text-lg leading-relaxed mb-10">
            I forgot the "Consumables Cover". It costs less than a coffee, but without it, you pay for every screw, washer, and liter of oil.
            <br /><br />
            <strong className="text-white">I don't let my clients make the same mistake.</strong>
          </p>
        </div>
      </section>
    </main>
  );
}