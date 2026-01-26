import React from 'react';

const Translator = () => {
  const translations = [
    { say: "This is the cashless and hassle free insurance plan.", mean: "Don’t look for online quotes, just buy from me." },
    { say: "Just pay the price and we will handle it.", mean: "Give us money without any quote breakdown; trust us blindly." }
  ];

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-emerald-900 mb-4">The Dealer Translator</h2>
        <p className="text-slate-500">We speak fluent "Salesman". Here is the truth.</p>
      </div>

      <div className="space-y-8">
        {translations.map((item, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-4 items-stretch">
            <div className="p-8 bg-slate-50 rounded-3xl border-l-4 border-slate-300">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">What They Say</span>
              <p className="text-xl font-serif italic text-slate-700">"{item.say}"</p>
            </div>
            <div className="p-8 bg-emerald-50 rounded-3xl border-l-4 border-emerald-600">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-4">What It Means</span>
              <p className="text-xl font-outfit font-medium text-emerald-900">{item.mean}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Translator;