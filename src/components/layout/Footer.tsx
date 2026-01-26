import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
        
        {/* COLUMN 1: BRAND AUTHORITY */}
        <div className="space-y-6">
          <div className="text-3xl font-serif font-bold tracking-tight">
            TheInsuranceGuy<span className="text-brand-primary">.</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            The truth about insurance, stripped of jargon. <br />
            <span className="text-white font-bold">Anonymous Advisory. No Spam. No Sales Calls.</span>
          </p>
        </div>

        {/* COLUMN 2: INTELLIGENCE HUB */}
        <div className="grid grid-cols-2 gap-8 text-sm font-medium text-slate-400 pt-2">
          <div className="flex flex-col gap-4">
            <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-2">How I Help</span>
            <Link href="/private-car" className="hover:text-brand-primary transition-colors">Private Car</Link>
            <Link href="/warranty" className="hover:text-brand-primary transition-colors">Warranty</Link>
            <Link href="/garages" className="hover:text-brand-primary transition-colors">Garage Locator</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-2">Resources</span>
            <Link href="/resources" className="hover:text-brand-primary transition-colors">Knowledge Hub</Link>
            <Link href="/privacy-policy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <a href="mailto:expert@theinsuranceguy.in" className="hover:text-brand-primary transition-colors text-white font-bold">Talk to me</a>
          </div>
        </div>

        {/* COLUMN 3: RE-ALIGNED SIERRA BOX */}
        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 relative overflow-hidden flex flex-col items-start text-left">
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-2 mb-4">
               <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-3">Sierra Launch 2026</p>
            </div>
            
            <p className="text-slate-300 text-sm leading-snug mb-6">
              Don't let the dealership pressure you into a bad policy. While 2,000 owners are joining, I only personally verify <span className="text-white font-bold underline decoration-brand-primary/40">10 quotes per day.</span>
            </p>
            
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">The Promise</p>
              <p className="text-white font-bold text-lg leading-tight">
                Same Cashless Network.<br /> 
                <span className="text-brand-primary">47% Lower Premium.</span>
              </p>
            </div>
          </div>
          
          {/* Visual depth element */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-primary/5 blur-[60px] rounded-full"></div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] text-slate-500 font-bold tracking-[0.4em] uppercase">
          © 2026 The Insurance Guy
        </div>
        <div className="flex gap-6 text-[10px] text-slate-600 font-bold tracking-widest uppercase">
          <span>Pan India Advisory</span>
        
      
        </div>
      </div>
    </footer>
  );
}