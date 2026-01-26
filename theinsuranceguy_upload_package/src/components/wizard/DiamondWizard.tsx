"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowLeft, ShieldCheck, Zap, Star, 
  Settings, Cpu, Activity, GanttChartSquare, X, 
  ShieldAlert, Fingerprint, CarFront, UploadCloud, 
  CircleCheckBig, Lock
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
  const [formData, setFormData] = useState({
    rto: '', carNumber: '', bhRto: '', makeModel: '', variant: '',
    dealerQuote: '', budget: '', email: '', whatsapp: '',
    hasRC: false, prevNCB: '0%', claimedLastYear: 'No',
    isBH: false, isLuxury: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => { 
    setIsMounted(true);
    // --- NUCLEAR SCROLLBAR KILLER ---
    document.documentElement.classList.add('lock-body-scroll');
    document.body.classList.add('lock-body-scroll');
    
    return () => {
      document.documentElement.classList.remove('lock-body-scroll');
      document.body.classList.remove('lock-body-scroll');
    };
  }, []);

  const isDataValid = () => {
    const plateRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
    if (currentStep === 0) {
      if ( mode ==='warranty') return true;
      if (mode === 'new') return formData.rto.length >= 4;
      if (mode === 'renewal' || mode === 'used') {
        if (formData.isBH) return formData.carNumber.length >= 8 && formData.bhRto.length >= 4;
        return plateRegex.test(formData.carNumber);
      }
      return true;
    }
    if (currentStep === 1) return formData.makeModel.length > 2 && formData.variant.length > 2;
    if (currentStep === 2) return formData.budget.length >= 1;
    if (currentStep === 3) return formData.email.includes('@') && formData.email.includes('.');
    return true;
  };

  const handleUpper = (field: string, val: string) => {
    const upperVal = val.toUpperCase();
    setFormData(prev => ({ 
      ...prev, [field]: upperVal,
      isBH: field === 'carNumber' ? upperVal.startsWith('BH') : prev.isBH 
    }));
  };

  const handleSubmit = async () => {
    if (!isDataValid() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await sendTelegramLead({ ...formData, mode });
      setIsSuccess(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const next = () => isDataValid() && setCurrentStep(s => s + 1);
  const back = () => currentStep > 0 ? setCurrentStep(s => s - 1) : router.back();

  // --- DYNAMIC TEXT HELPER ---
  const getSuccessTitle = () => mode === 'warranty' ? "Audit Request" : "Quote Request";
  const getSuccessMessage = () => {
    if (mode === 'warranty') {
      return `I have received your details for the ${formData.makeModel}. I'll get the warranty quote and share it with you on your Email/WhatsApp within 24 hours.`;
    }
    return `I have received your details for the ${formData.makeModel}. I'll check the best market rates and share the quote on your Email/WhatsApp within 24 hours.`;
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-50 flex flex-col font-sans h-full w-full overflow-hidden">
      
      {/* HEADER */}
      <nav className="flex-none px-6 py-4 flex justify-between items-center bg-white border-b border-slate-200 shadow-sm z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            aria-label="Close Wizard"
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X size={20}/>
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800">The Insurance Guy</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Private Intelligence Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {!isSuccess && (
             <>
                <div className="hidden md:flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                  <Fingerprint size={12}/> Secure Session
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-emerald-600" animate={{ width: `${(currentStep + 1) * 25}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 tabular-nums">0{currentStep + 1}/04</span>
                </div>
             </>
           )}
        </div>
      </nav>

      {/* CONTENT AREA */}
      <main className="flex-grow flex items-center justify-center p-4 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-xl bg-white rounded-[32px] border border-slate-200 shadow-xl flex flex-col relative z-10 overflow-hidden my-auto">
          
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                // --- FORM STEPS ---
                <motion.div 
                  key="wizard-steps"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-grow"
                >
                  
                  {/* --- STEP 0 --- */}
                  {currentStep === 0 && (
                    <div className="space-y-8">
                      {mode === 'used' ? (
                        <>
                          <div className="p-4 bg-emerald-50 rounded-2xl flex gap-3 border border-emerald-100">
                            <Zap className="shrink-0 text-emerald-600 mt-0.5" size={18} />
                            <div>
                              <p className="text-xs font-bold text-emerald-900 uppercase">Verification Protocol</p>
                              <p className="text-xs text-emerald-800 mt-1">We need the plate number to manually verify Zero-Dep eligibility.</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label htmlFor="carNumberUsed" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Vehicle Plate</label>
                            <input 
                              type="text"
                              id="carNumberUsed"
                              name="carNumber"
                              className="w-full text-3xl font-serif border-b-2 border-slate-300 focus:border-emerald-600 outline-none pb-2 uppercase text-slate-900 placeholder:text-slate-300" 
                              value={formData.carNumber} 
                              onChange={(e) => handleUpper('carNumber', e.target.value)} 
                              placeholder="GJ01AA0000" 
                              autoFocus 
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && isDataValid()) {
                                  e.preventDefault();
                                  next();
                                }
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setFormData({...formData, hasRC: true})} className={`p-4 rounded-xl border-2 font-bold text-xs ${formData.hasRC ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-500 border-slate-200'}`}>I Have RC</button>
                            <button onClick={() => router.push('/diamond-wizard?mode=renewal')} className="p-4 rounded-xl border-2 border-slate-200 bg-white font-bold text-xs text-slate-500 hover:text-red-600">No / Redirect</button>
                          </div>
                        </>
                      ) : mode === 'warranty' ? (
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto text-emerald-700 mb-3"><Star size={24} fill="currentColor" /></div>
                            <h3 className="text-2xl font-serif text-slate-900">Asset Segment</h3>
                          </div>
                          <div className="grid gap-3">
                            <button onClick={() => { setFormData({...formData, isLuxury: false}); next(); }} className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-600 bg-white text-left flex justify-between items-center group">
                              <div><span className="block font-black text-slate-900 text-sm">Standard</span><span className="text-[10px] text-slate-500 font-bold uppercase">Value &lt; {'\u20B9'}50L</span></div>
                              <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-600" />
                            </button>
                            <button onClick={() => { setFormData({...formData, isLuxury: true}); next(); }} className="p-4 rounded-xl border-2 border-slate-800 hover:border-gold-warning bg-slate-900 text-left flex justify-between items-center group">
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
                          <input 
                            type="text" 
                            id="rtoOrPlate"
                            name={mode === 'new' ? "rto" : "carNumber"}
                            className="w-full text-4xl font-serif border-b-2 border-slate-300 focus:border-emerald-600 outline-none pb-2 uppercase text-slate-900 placeholder:text-slate-300" 
                            value={mode === 'new' ? formData.rto : formData.carNumber} 
                            onChange={(e) => handleUpper(mode === 'new' ? 'rto' : 'carNumber', e.target.value)} 
                            placeholder={mode === 'new' ? "GJ01" : "MH01AA0000"} 
                            autoFocus 
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && isDataValid()) {
                                e.preventDefault();
                                next();
                              }
                            }}
                          />
                          {formData.isBH && (
                            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                              <label htmlFor="bhRto" className="text-[9px] font-black text-slate-500 uppercase mb-2 block">Original RTO (BH-Series)</label>
                              <input 
                                type="text" 
                                id="bhRto"
                                name="bhRto"
                                placeholder="GJ01" 
                                className="w-full text-2xl font-serif bg-transparent border-b border-slate-300 outline-none uppercase" 
                                value={formData.bhRto} 
                                onChange={(e) => handleUpper('bhRto', e.target.value)} 
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && isDataValid()) {
                                    e.preventDefault();
                                    next();
                                  }
                                }}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* --- STEP 1 --- */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <label htmlFor="makeModel" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Make & Model</label>
                          <input 
                            type="text" 
                            id="makeModel"
                            name="makeModel"
                            placeholder="e.g. TATA SIERRA" 
                            className="w-full text-2xl font-serif border-b-2 border-slate-300 focus:border-emerald-600 outline-none pb-1 uppercase bg-transparent text-slate-900 placeholder:text-slate-300" 
                            value={formData.makeModel} 
                            onChange={(e) => handleUpper('makeModel', e.target.value)} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && isDataValid()) {
                                  e.preventDefault();
                                  next();
                                }
                              }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="variant" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Variant</label>
                          <input 
                            type="text" 
                            id="variant"
                            name="variant"
                            placeholder="e.g. EV ADVENTURE" 
                            className="w-full text-2xl font-serif border-b-2 border-slate-300 focus:border-emerald-600 outline-none pb-1 uppercase bg-transparent text-slate-900 placeholder:text-slate-300" 
                            value={formData.variant} 
                            onChange={(e) => handleUpper('variant', e.target.value)} 
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && isDataValid()) {
                                e.preventDefault();
                                next();
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* SIERRA INTELLIGENCE BOX - Hides in Warranty mode */}
                      <AnimatePresence>
                        {formData.makeModel.includes('SIERRA') && mode !== 'warranty' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3 shadow-sm"
                          >
                            <div className="bg-emerald-600 text-white p-2 rounded-lg h-fit">
                              <ShieldCheck size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-emerald-900 uppercase tracking-tight">Sierra Launch Detected</p>
                              <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                                ₹51,000 savings applicable. Cashless network verified for Jan-15 deliveries.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {mode === 'renewal' && (
                        <div className="flex gap-4 pt-4 border-t border-slate-100">
                          <div className="w-1/2">
                            <label htmlFor="claimStatus" className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Claim Status</label>
                            <select id="claimStatus" name="claimStatus" className="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold" onChange={(e) => setFormData({...formData, claimedLastYear: e.target.value})}>
                              <option>No Claims</option>
                              <option>Claimed</option>
                            </select>
                          </div>
                          <div className="w-1/2">
                            <label htmlFor="ncb" className="text-[9px] font-bold text-emerald-700 uppercase block mb-1">NCB</label>
                            <select id="ncb" name="ncb" className="w-full p-2 bg-emerald-50 rounded-lg text-sm font-bold text-emerald-900" onChange={(e) => setFormData({...formData, prevNCB: e.target.value})}>
                              <option>0%</option><option>20%</option><option>25%</option><option>35%</option><option>45%</option><option>50%</option>
                            </select>
                          </div>
                        </div>
                      )}
                    
                      {mode === 'warranty' && (
                        <div className={`p-5 rounded-2xl border text-xs font-bold ${formData.isLuxury ? 'bg-slate-900 text-white border-slate-800' : 'bg-emerald-50 text-emerald-900 border-emerald-100'}`}>
                          <div className="flex items-center gap-2 mb-3">
                            {formData.isLuxury ? <Settings size={16} className="text-gold-warning"/> : <ShieldCheck size={16}/>}
                            <span className="uppercase tracking-widest">{formData.isLuxury ? 'Luxury Audit' : 'Standard Audit'}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 opacity-80">
                            <span>• Engine</span><span>• Gearbox</span><span>• {formData.isLuxury ? 'Air Suspension' : 'Alternator'}</span><span>• {formData.isLuxury ? 'ADAS Modules' : 'AC Compressor'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- STEP 2 --- */}
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
                            id="budget"
                            name="budget"
                            className="w-full text-5xl font-serif border-b-2 border-slate-300 focus:border-emerald-600 outline-none pb-2 pl-8 text-slate-900 placeholder:text-slate-200" 
                            placeholder="00,000" 
                            value={formData.budget} 
                            onChange={(e) => setFormData({...formData, budget: e.target.value})} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && isDataValid()) {
                                  e.preventDefault();
                                  next();
                                }
                              }}
                          />
                        </div>
                      </label>
                    </div>
                  )}

                  {/* --- STEP 3 (FINAL STEP) --- */}
                  {currentStep === 3 && (
                    <div className="space-y-8 text-center">
                      <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl"><ShieldCheck size={32} /></div>
                      <div>
                        <h3 className="text-2xl font-serif text-slate-900">Analysis Activated</h3>
                        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">Manual quote is being processed. You will receive in 24 hrs.</p>
                      </div>
                      <div className="space-y-3">
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          placeholder="Email (Required)" 
                          className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-emerald-600 text-center text-sm font-bold text-slate-900" 
                          required 
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})} 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && isDataValid()) {
                              e.preventDefault();
                              handleSubmit(); 
                            }
                          }}
                        />
                        <input 
                          type="tel" 
                          id="whatsapp"
                          name="whatsapp"
                          placeholder="WhatsApp (Optional)" 
                          className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-emerald-600 text-center text-sm font-bold text-slate-900" 
                          value={formData.whatsapp} 
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && isDataValid()) {
                              e.preventDefault();
                              handleSubmit();
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                </motion.div>
              ) : (
                // --- SUCCESS SCREEN (DYNAMIC) ---
                <motion.div 
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CircleCheckBig size={48} className="animate-bounce" />
                  </div>
                  <h3 className="text-4xl font-serif text-slate-900 leading-tight">
                    {getSuccessTitle()} <br /> <span className="text-emerald-700">Sent!</span>
                  </h3>
                  <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
                    {getSuccessMessage()}
                  </p>
                  <button 
                    onClick={() => router.push('/')}
                    className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-colors"
                  >
                    Back to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER NAV - Hides when success screen is active */}
          {!isSuccess && (
            <div className="p-6 md:p-10 border-t border-slate-50 bg-white flex gap-3">
              {currentStep > 0 && (
                <button onClick={back} aria-label="Go Back" className="px-6 py-4 rounded-xl border border-slate-200 font-bold text-xs text-slate-500 hover:text-slate-900">Back</button>
              )}
              <button 
                disabled={!isDataValid() || isSubmitting}
                onClick={() => currentStep < 3 ? next() : handleSubmit()} 
                className={`flex-grow py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${
                  isDataValid() && !isSubmitting
                    ? "bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                     Processing...
                  </span>
                ) : (
                  <>
                    {currentStep === 3 ? "Finish" : "Continue"} 
                    {isDataValid() ? <ChevronRight size={14}/> : <Lock size={12}/>}
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}