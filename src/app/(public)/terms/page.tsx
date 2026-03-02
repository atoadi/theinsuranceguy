"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, ShieldAlert, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6">
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-700 mb-8">
          <ArrowLeft size={16} /> Back Home
        </Link>

        <h1 className="text-5xl font-serif text-emerald-900 mb-6">Terms of Engagement.</h1>
        <p className="text-lg text-slate-500 mb-12">
          Effective Date: January 2026. <br/>
          We don't do hidden clauses. Here is exactly how we work.
        </p>

        <div className="space-y-12">
          
          {/* SECTION 1 */}
          <section className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700">
              <Scale size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Advisory vs. Sales</h3>
              <p className="text-slate-600 leading-relaxed">
                TheInsuranceGuy is an <strong>advisory platform</strong>. We analyze quotes and verify garage networks. We do not issue insurance policies directly; authorized insurance companies do. We are paid a standard commission by the insurer, which allows us to keep this service free for you.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-ruby-50 rounded-xl flex items-center justify-center text-ruby-alert">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Accuracy of Data</h3>
              <p className="text-slate-600 leading-relaxed">
                Our "Cashless Garage" lists are updated weekly. However, insurers can delist garages without notice. We recommend calling the garage before towing your vehicle. We are not liable for last-minute network changes by the insurer.
              </p>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Your Responsibility</h3>
              <p className="text-slate-600 leading-relaxed">
                You must declare truthful information (Claims history, CNG kits, etc.). If you hide a past claim to get a cheaper quote, your policy will be void. We cannot protect you from fraud misrepresentation.
              </p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            Questions? <a href="mailto:hello@theinsuranceguy.in" className="text-emerald-700 font-bold hover:underline">hello@theinsuranceguy.in</a>
          </p>
        </div>

      </div>
    </main>
  );
}