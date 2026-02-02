import React from 'react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 text-center bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[1.1] mb-8 tracking-tight">
          Your Dealer Said It’s <br />
          <span className="text-emerald-700 italic">"Cashless"</span>. <span className="text-orange-600">Check Again.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-light">
          Showroom promises don't guarantee claims. It depends on active insurer tie-ups, not the dealer's promise.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button className="w-full sm:w-auto min-h-[60px] bg-emerald-800 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-emerald-900/20 flex items-center justify-center">
            Audit My Dealer Quote
          </button>
          
          <a href="/resources" className="w-full sm:w-auto min-h-[60px] border-2 border-emerald-800 text-emerald-800 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center text-center no-underline">
            Read The Truth
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;