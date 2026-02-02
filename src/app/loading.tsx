import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-8">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        
        {/* Spinning Segment */}
        <div className="absolute inset-0 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Inner Pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-emerald-50 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif text-emerald-950 animate-pulse">
          TheInsuranceGuy<span className="text-emerald-600">.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Decrypting Market Rates
        </p>
      </div>
    </div>
  );
}