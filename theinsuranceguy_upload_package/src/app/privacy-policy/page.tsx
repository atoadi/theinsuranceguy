"use client";
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="pt-20 min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-serif text-emerald-900 mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last Updated: January 2026</p>

        <div className="prose prose-slate prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600">
          <h3>1. Who We Are</h3>
          <p>TheInsuranceGuy ("we", "us") is an independent insurance advisory. We are not an insurance company. We act as a bridge between you and the technicalities of your policy.</p>

          <h3>2. Data Collection</h3>
          <p>We collect only the data necessary to provide accurate quotes and claim assistance:</p>
          <ul>
            <li>Vehicle Registration Number (to fetch technical specs).</li>
            <li>Previous Policy Details (to verify NCB).</li>
            <li>Contact Information (to send the audit report).</li>
          </ul>

          <h3>3. No Spam Promise</h3>
          <p>We do not sell your data to call centers. You will never receive a robo-call from us. Communication is initiated only by you or by our expert upon your request.</p>

          <h3>4. Third Parties</h3>
          <p>We may share your vehicle details with insurance partners (Tata AIG, ICICI, etc.) solely for the purpose of generating a premium quote. We do not authorize them to use this data for marketing outside this scope.</p>
        </div>
      </section>
    </main>
  );
}