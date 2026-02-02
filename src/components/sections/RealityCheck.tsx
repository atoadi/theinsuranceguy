import React from 'react';

const RealityCheck = () => {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-emerald-900 mb-4">The Reality Check</h2>
          <p className="text-slate-500 font-outfit">Direct comparison based on market realities.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Evaluation Point</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Dealers</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Online Portals</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-emerald-700">TheInsuranceGuy</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 font-outfit">
              <tr className="border-b border-slate-50">
                <td className="p-6 font-bold text-slate-900">Transparency</td>
                <td className="p-6 text-red-500">Low</td>
                <td className="p-6 text-orange-500">Medium</td>
                <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">High</span></td>
              </tr>
              <tr className="border-b border-slate-50">
                <td className="p-6 font-bold text-slate-900">Claim Clarity</td>
                <td className="p-6 text-red-500">Ambiguous</td>
                <td className="p-6 text-red-500">Ambiguous</td>
                <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Crystal Clear</span></td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-900">Sales Pressure</td>
                <td className="p-6 text-red-500">High</td>
                <td className="p-6 text-orange-500">Medium</td>
                <td className="p-6"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Zero</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default RealityCheck;