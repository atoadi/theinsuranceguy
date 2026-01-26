"use client";
import React, { useState, useEffect, Suspense } from 'react'; // Added Suspense
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Car, ShieldCheck, RefreshCw, ClipboardCheck } from 'lucide-react';

// 1. CONFIGURATION: The "Million-Dollar" Questions
const FUNNEL_DATA = {
  new: { title: "New Car Protection", q1: "Expected Delivery Date?", q2: "Showroom Price (IDV)?", icon: <Car /> },
  used: { title: "Used Car History", q1: "Registration Number?", q2: "Current Odometer (KMs)?", icon: <ClipboardCheck /> },
  renewal: { title: "Policy Renewal", q1: "Policy Expiry Date?", q2: "Existing Insurer Name?", icon: <RefreshCw /> },
  warranty: { title: "Extended Warranty", q1: "Year of Manufacture?", q2: "Engine CC / Model?", icon: <ShieldCheck /> }
};

// --- PART 1: THE LOGIC COMPONENT (Renamed from SmartFunnelPage) ---
function FunnelContent() {
  const searchParams = useSearchParams();
  // Safe to cast here because we are wrapped in Suspense
  const initialType = searchParams.get('type') as keyof typeof FUNNEL_DATA | null;

  // State Management
  const [step, setStep] = useState(initialType ? 1 : 0);
  const [flow, setFlow] = useState<keyof typeof FUNNEL_DATA | null>(initialType);
  const [formData, setFormData] = useState({ q1: '', q2: '', name: '', phone: '' });

  // Reset if the URL changes
  useEffect(() => { 
    if (initialType && FUNNEL_DATA[initialType]) { 
      setFlow(initialType); 
      setStep(1); 
    } 
  }, [initialType]);

  const handleNext = () => setStep((s) => s + 1);

  // 2. TELEGRAM INTEGRATION
  const submitToTelegram = async () => {
    if (!flow) return;
    
    const message = `🚀 *New Lead: ${flow.toUpperCase()}*\n\n` +
                    `👤 Name: ${formData.name}\n` +
                    `📞 Phone: ${formData.phone}\n` +
                    `📋 ${FUNNEL_DATA[flow].q1}: ${formData.q1}\n` +
                    `💰 ${FUNNEL_DATA[flow].q2}: ${formData.q2}`;

    console.log("Sending to Telegram:", message);
    setStep(4);
  };

  return (
    <div className="max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        
        {/* STEP 0: THE SELECTION */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h1 className="text-4xl font-serif text-emerald-900 mb-8 text-center">How can we help?</h1>
            <div className="grid gap-4">
              {Object.entries(FUNNEL_DATA).map(([key, item]) => (
                <button key={key} onClick={() => { setFlow(key as any); setStep(1); }} className="p-6 bg-white border border-slate-100 rounded-2xl text-left flex items-center gap-6 hover:shadow-premium transition-all">
                  <div className="text-emerald-600">{item.icon}</div>
                  <div><h3 className="font-bold text-slate-800">{item.title}</h3></div>
                  <ArrowRight className="ml-auto text-slate-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 1 & 2: DYNAMIC QUESTIONS */}
        {(step === 1 || step === 2) && flow && (
          <motion.div key="questions" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100">
            <span className="text-emerald-600 font-bold text-xs tracking-tighter uppercase">Step {step} of 3</span>
            <h2 className="text-2xl font-serif text-slate-900 mt-2 mb-6">
              {step === 1 ? FUNNEL_DATA[flow].q1 : FUNNEL_DATA[flow].q2}
            </h2>
            <input 
              autoFocus
              className="w-full p-4 rounded-xl border border-slate-200 mb-6 outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => setFormData({ ...formData, [step === 1 ? 'q1' : 'q2']: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            />
            <button onClick={handleNext} className="w-full bg-emerald-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2">
              Continue <ArrowRight size={18}/>
            </button>
          </motion.div>
        )}

        {/* STEP 3: CONTACT INFO */}
        {step === 3 && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100">
            <h2 className="text-2xl font-serif text-slate-900 mb-6">Where should we send your quote?</h2>
            <input placeholder="Full Name" className="w-full p-4 rounded-xl border border-slate-200 mb-4 outline-none focus:ring-2 focus:ring-emerald-500" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input placeholder="Phone Number" className="w-full p-4 rounded-xl border border-slate-200 mb-6 outline-none focus:ring-2 focus:ring-emerald-500" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <button onClick={submitToTelegram} className="w-full bg-emerald-900 text-white font-bold py-4 rounded-xl">Confirm & Submit</button>
          </motion.div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <motion.div key="success" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-10">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40}/></div>
            <h2 className="text-3xl font-serif text-emerald-900 mb-2">You're All Set!</h2>
            <p className="text-slate-500">Our expert will contact you shortly.</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// --- PART 2: THE WRAPPER COMPONENT (The Fix) ---
export default function SmartFunnelPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-900"></div>
        </div>
      }>
        <FunnelContent />
      </Suspense>
    </main>
  );
}
