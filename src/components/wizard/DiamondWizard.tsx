"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, X, ShieldCheck, Zap, Star, 
  Settings, Fingerprint, CarFront, CircleCheckBig, Lock,
  AlertCircle, Smartphone, Mail, FileText, Edit2, 
  Check, Info, Users
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sendTelegramLead } from '@/app/actions';

type Mode = 'new' | 'renewal' | 'used' | 'warranty';

export default function DiamondWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') as Mode) || 'new';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [viewers, setViewers] = useState(14); // Default
  
  // Data State
  const [formData, setFormData] = useState({
    rto: '', carNumber: '', bhRto: '', makeModel: '', variant: '',
    dealerQuote: '', budget: '', email: '', whatsapp: '',
    hasRC: false, prevNCB: '0%', claimedLastYear: 'No',
    isBH: false, isLuxury: false,
    consent: false 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => { 
    setIsMounted(true);
    // Randomize viewers between 12 and 28 for realism
    setViewers(Math.floor(Math.random() * (28 - 12 + 1) + 12));
    
    document.documentElement.classList.add('lock-body-scroll');
    document.body.classList.add('lock-body-scroll');
    return () => {
      document.documentElement.classList.remove('lock-body-scroll');
      document.body.classList.remove('lock-body-scroll');
    };
  }, []);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    const plateRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
    
    if (step === 0) {
      if (mode === 'new') {
        if (formData.rto.length < 4) newErrors.rto = "Enter valid RTO (e.g., GJ01)";
      }
      if (mode === 'renewal' || mode === 'used') {
        if (!formData.carNumber) newErrors.carNumber = "Plate number required";
        else if (!formData.isBH && !plateRegex.test(formData.carNumber)) newErrors.carNumber = "Invalid Plate Format";
        if (formData.isBH && formData.bhRto.length < 4) newErrors.bhRto = "Original RTO required";
      }
    }
    if (step === 1) {
      if (formData.makeModel.length < 3) newErrors.makeModel = "Enter full model name";
      if (formData.variant.length < 2) newErrors.variant = "Variant required";
    }
    if (step === 2) {
      if (!formData.budget) newErrors.budget = "Amount required";
      else if (formData.budget.length < 4) newErrors.budget = "Invalid amount";
    }
    if (step === 3) {
      if (!formData.email.includes('@') || !formData.email.includes('.')) newErrors.email = "Valid email required";
      if (formData.whatsapp && formData.whatsapp.length < 10) newErrors.whatsapp = "Invalid mobile number";
    }
    if (step === 4) {
      if (!formData.consent) newErrors.consent = "Please agree to proceed";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (field: string, val: string) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    const needsUpper = ['rto', 'carNumber', 'bhRto', 'makeModel', 'variant'].includes(field);
    const finalVal = needsUpper ? val.toUpperCase() : val;
    setFormData(prev => ({ 
      ...prev, [field]: finalVal,
      isBH: field === 'carNumber' ? finalVal.startsWith('BH') : prev.isBH 
    }));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep) || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await sendTelegramLead({ ...formData, mode });
      setIsSuccess(true);
    } catch (error) {
      alert("Connection Error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const next = () => { if (validateStep(currentStep)) setCurrentStep(s => s + 1); };
  const back = () => currentStep > 0 ? setCurrentStep(s => s - 1) : router.back();

  const getSuccessTitle = () => mode === 'warranty' ? "Check Requested" : "Quote Request Received";
  const getSuccessMessage = () => {
    if (mode === 'warranty') return `Details for ${formData.makeModel} received. I'm verifying eligibility now.`;
    return `Details for ${formData.makeModel} received. I'm checking the best market rates manually.`;
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-50 flex flex-col font-sans h-full w-full overflow-hidden">
      
      {/* HEADER */}
      <nav className="flex-none px-6 py-4 flex justify-between items-center bg-white border-b border-slate-200 shadow-sm z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 transition-colors">
            <X size={20}/>
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800">The Insurance Guy</span>
            {/* HUMANIZED TEXT */}
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Your Insurance Guide</span>
          </div>
        </div>
        {!isSuccess && (
          <div className="flex items-center gap-4">
            {/* LIVE SAVINGS REMOVED AS REQUESTED */}
            {/* <div className="hidden md:flex flex-col items-end">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Est. Savings</span>
               <span className="text-sm font-black text-emerald-600 flex items-center gap-1">
                 <TrendingDown size={14} /> ₹{estimatedSavings.toLocaleString()}
               </span>
            </div> 
            */}
            
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
              <Users size={12} className="text-slate-400"/>
              <span className="text-[10px] font-bold text-slate-500">{viewers} Online</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-emerald-600" animate={{ width: `${(currentStep + 1) * 20}%` }} />
              </div>
              <span className="text-[10px] font-black text-slate-900 tabular-nums">0{currentStep + 1}/05</span>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center p-4 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-xl bg-white rounded-[32px] border border-slate-200 shadow-xl flex flex-col relative z-10 overflow-hidden my-auto min-h-[500px]">
          
          <div className="p-8 md:p-10 flex-grow flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  
                  {/* --- STEP 0: IDENTITY --- */}
                  {currentStep === 0 && (
                    <div className="space-y-8">
                      {mode === 'used' ? (
                        <>
                          <div className="p-4 bg-emerald-50 rounded-2xl flex gap-3 border border-emerald-100">
                            <Zap className="shrink-0 text-emerald-600 mt-0.5" size={18} />
                            <div>
                              <p className="text-xs font-bold text-emerald-900 uppercase">Verification Check</p>
                              <p className="text-xs text-emerald-800 mt-1">Manual plate verification required for used vehicles.</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Vehicle Plate</label>
                            <input 
                              className={`w-full text-3xl font-serif border-b-2 outline-none pb-2 uppercase placeholder:text-slate-300 ${errors.carNumber ? 'border-red-500 text-red-600' : 'border-slate-300 focus:border-emerald-600 text-slate-900'}`}
                              value={formData.carNumber} 
                              onChange={(e) => handleInput('carNumber', e.target.value)} 
                              placeholder="GJ01AA0000" 
                              autoFocus 
                              onKeyDown={(e) => e.key === 'Enter' && next()}
                            />
                            {errors.carNumber && <p className="text-red-500 text-xs font-bold flex items-center gap-1"><AlertCircle size={10}/> {errors.carNumber}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setFormData({...formData, hasRC: true})} className={`p-4 rounded-xl border-2 font-bold text-xs transition-all ${formData.hasRC ? 'bg-emerald-700 text-white border-emerald-700 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'}`}>I Have RC</button>
                            <button onClick={() => router.push('/diamond-wizard?mode=renewal')} className="p-4 rounded-xl border-2 border-slate-200 bg-white font-bold text-xs text-slate-500 hover:text-red-600 hover:border-red-200">No / Redirect</button>
                          </div>
                        </>
                      ) : mode === 'warranty' ? (
                        <div className="space-y-6">
                           <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto text-emerald-700 mb-3"><Star size={24} fill="currentColor" /></div>
                            <h3 className="text-2xl font-serif text-slate-900">Which class does your car belong to?</h3>
                          </div>
                          <div className="grid gap-3">
                            <button onClick={() => { setFormData({...formData, isLuxury: false}); next(); }} className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-600 bg-white text-left flex justify-between items-center group transition-all">
                              <div><span className="block font-black text-slate-900 text-sm">Standard</span><span className="text-[10px] text-slate-500 font-bold uppercase">Value &lt; {'\u20B9'}50L</span></div>
                              <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-600" />
                            </button>
                            <button onClick={() => { setFormData({...formData, isLuxury: true}); next(); }} className="p-4 rounded-xl border-2 border-slate-800 hover:border-gold-warning bg-slate-900 text-left flex justify-between items-center group transition-all">
                              <div><span className="block font-black text-gold-warning text-sm">Luxury</span><span className="text-[10px] text-slate-400 font-bold uppercase">Value &gt; {'\u20B9'}50L</span></div>
                              <ChevronRight size={16} className="text-slate-500 group-hover:text-gold-warning" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center"><CarFront size={18}/></div>
                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">{mode === 'new' ? "New Vehicle RTO" : "Active Plate Check"}</span>
                          </div>
                          <div>
                            <input 
                              className={`w-full text-4xl font-serif border-b-2 outline-none pb-2 uppercase placeholder:text-slate-300 ${errors.rto || errors.carNumber ? 'border-red-500 text-red-600' : 'border-slate-300 focus:border-emerald-600 text-slate-900'}`}
                              value={mode === 'new' ? formData.rto : formData.carNumber} 
                              onChange={(e) => handleInput(mode === 'new' ? 'rto' : 'carNumber', e.target.value)} 
                              placeholder={mode === 'new' ? "GJ01" : "MH01AA0000"} 
                              autoFocus 
                              onKeyDown={(e) => e.key === 'Enter' && next()}
                            />
                            {(errors.rto || errors.carNumber) && <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.rto || errors.carNumber}</p>}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* --- STEP 1: CAR DETAILS --- */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Make & Model</label>
                          <input 
                            className={`w-full text-2xl font-serif border-b-2 outline-none pb-1 uppercase bg-transparent placeholder:text-slate-300 ${errors.makeModel ? 'border-red-500' : 'border-slate-300 focus:border-emerald-600'}`}
                            placeholder="e.g. TATA SIERRA" 
                            value={formData.makeModel} 
                            onChange={(e) => handleInput('makeModel', e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && next()}
                          />
                          {errors.makeModel && <p className="text-red-500 text-xs font-bold">{errors.makeModel}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Variant</label>
                          <input 
                            className={`w-full text-2xl font-serif border-b-2 outline-none pb-1 uppercase bg-transparent placeholder:text-slate-300 ${errors.variant ? 'border-red-500' : 'border-slate-300 focus:border-emerald-600'}`}
                            placeholder="e.g. EV ADVENTURE" 
                            value={formData.variant} 
                            onChange={(e) => handleInput('variant', e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && next()}
                          />
                          {errors.variant && <p className="text-red-500 text-xs font-bold">{errors.variant}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- STEP 2: BUDGET --- */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                       <label className="block space-y-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                          {mode === 'used' ? "Target Budget" : "Dealer Quote"}
                        </span>
                        <div className="relative">
                          <span className="absolute left-0 bottom-2 text-2xl text-slate-400">{'\u20B9'}</span>
                          <input 
                            type="number" 
                            className={`w-full text-5xl font-serif border-b-2 outline-none pb-2 pl-8 placeholder:text-slate-200 ${errors.budget ? 'border-red-500 text-red-600' : 'border-slate-300 focus:border-emerald-600 text-slate-900'}`}
                            placeholder="00,000" 
                            value={formData.budget} 
                            onChange={(e) => handleInput('budget', e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && next()}
                          />
                        </div>
                        {errors.budget && <p className="text-red-500 text-xs font-bold">{errors.budget}</p>}
                      </label>
                      <div className="p-4 bg-slate-50 rounded-xl flex items-start gap-3">
                         <Info size={16} className="text-slate-400 mt-0.5 shrink-0"/>
                         <p className="text-xs text-slate-500 leading-relaxed">
                           We use this to compare against our private database. If we can't beat this price, we will advise you to buy from the dealer.
                         </p>
                      </div>
                    </div>
                  )}

                  {/* --- STEP 3: CONTACT (FIXED FORMATTING) --- */}
                  {currentStep === 3 && (
                    <div className="space-y-8 text-center">
                      <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl"><ShieldCheck size={32} /></div>
                      <div>
                        <h3 className="text-2xl font-serif text-slate-900">Final Step.</h3>
                        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">Where should I send the review?</p>
                      </div>
                      <div className="space-y-4 text-left">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                              type="email" 
                              placeholder="name@example.com" 
                              className={`w-full p-4 pl-12 rounded-xl border outline-none font-bold text-slate-900 transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-emerald-600 focus:shadow-md'}`}
                              value={formData.email} 
                              onChange={(e) => handleInput('email', e.target.value)} 
                              onKeyDown={(e) => e.key === 'Enter' && next()}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">WhatsApp (Optional)</label>
                          <div className="relative">
                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                              type="tel" 
                              placeholder="9876543210" 
                              className="w-full p-4 pl-12 rounded-xl border border-slate-200 outline-none focus:border-emerald-600 font-bold text-slate-900 transition-all focus:shadow-md" 
                              value={formData.whatsapp} 
                              onChange={(e) => handleInput('whatsapp', e.target.value)} 
                              onKeyDown={(e) => e.key === 'Enter' && next()}
                            />
                          </div>
                        </div>
                        {(errors.email || errors.whatsapp) && <p className="text-red-500 text-xs font-bold text-center mt-2">{errors.email || errors.whatsapp}</p>}
                      </div>
                    </div>
                  )}

                  {/* --- STEP 4: REVIEW --- */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif text-slate-900">Confirm Request</h3>
                          <p className="text-xs text-slate-500">Check details before sending.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
                         <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                           <span className="text-xs font-bold text-slate-400 uppercase">Vehicle</span>
                           <span className="text-sm font-bold text-slate-900 text-right">{formData.makeModel} {formData.variant}</span>
                         </div>
                         <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                           <span className="text-xs font-bold text-slate-400 uppercase">Identity</span>
                           <span className="text-sm font-bold text-slate-900 text-right">{mode === 'new' ? formData.rto : formData.carNumber}</span>
                         </div>
                         <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                           <span className="text-xs font-bold text-slate-400 uppercase">Target</span>
                           <span className="text-sm font-bold text-emerald-700 text-right">₹{formData.budget}</span>
                         </div>
                         <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-slate-400 uppercase">Contact</span>
                           <span className="text-sm font-bold text-slate-900 text-right">{formData.email}</span>
                         </div>
                         <button onClick={() => setCurrentStep(1)} className="w-full py-2 text-xs font-bold text-emerald-600 flex items-center justify-center gap-1 hover:bg-emerald-50 rounded-lg transition-colors">
                           <Edit2 size={12} /> Edit Details
                         </button>
                      </div>

                      <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 shrink-0 ${formData.consent ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                          {formData.consent && <Check size={14} />}
                        </div>
                        <input type="checkbox" className="hidden" checked={formData.consent} onChange={(e) => setFormData({...formData, consent: e.target.checked})} />
                        <span className="text-xs text-slate-500 leading-relaxed">
                          I authorize <strong>TheInsuranceGuy</strong> to review this. I understand this is an advisory service.
                        </span>
                      </label>
                      {errors.consent && <p className="text-red-500 text-xs font-bold">{errors.consent}</p>}
                    </div>
                  )}

                </motion.div>
              ) : (
                // --- SUCCESS ---
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CircleCheckBig size={48} className="animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-serif text-slate-900 leading-tight">{getSuccessTitle()}</h3>
                  <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">{getSuccessMessage()}</p>
                  <button onClick={() => router.push('/')} className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-colors">Back to Home</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER NAV */}
          {!isSuccess && (
            <div className="p-6 md:p-10 border-t border-slate-50 bg-white flex gap-3">
              {currentStep > 0 && (
                <button onClick={back} className="px-6 py-4 rounded-xl border border-slate-200 font-bold text-xs text-slate-500 hover:text-slate-900">Back</button>
              )}
              <button 
                onClick={() => currentStep < 4 ? next() : handleSubmit()} 
                className={`flex-grow py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-slate-300 text-white cursor-not-allowed' : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg'}`}
              >
                {isSubmitting ? "Processing..." : (currentStep === 4 ? "Secure My Quote" : "Continue")} 
                {!isSubmitting && <ChevronRight size={14}/>}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}