"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Car, Briefcase, Truck, Loader2, CheckCircle, ChevronRight } from 'lucide-react';
import { saveAppointment, getTakenSlots } from '@/app/actions';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);

  // Get Today's Date (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    category: 'Private Car',
    identity: '', 
    name: '',
    phone: '',
    description: '',
    date: '',
    slot: ''
  });

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset Logic
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setFormData(prev => ({ ...prev, date: '', slot: '' }));
        setTakenSlots([]);
      }, 300);
    }
  }, [isOpen]);

  // --- NEW: AUTO-REFRESH LOGIC ---
  // This keeps the slots "Live" without clicking submit
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOpen && step === 2 && formData.date) {
      // Function to silently refresh slots
      const refreshSlots = async () => {
        const booked = await getTakenSlots(formData.date);
        setTakenSlots(booked || []);
      };

      // Run immediately
      refreshSlots();

      // Then run every 3 seconds
      interval = setInterval(refreshSlots, 3000);
    }

    return () => clearInterval(interval);
  }, [isOpen, step, formData.date]); // Re-run if Date changes or Step changes


  // --- SLOT GENERATOR ---
  const generateSlots = () => {
    const slots = [];
    const startHour = 10;
    const endHour = 17; // 5 PM
    const interval = 20; // Minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const displayHour = hour > 12 ? hour - 12 : hour;
        const displayMin = min === 0 ? '00' : min;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        slots.push(`${displayHour}:${displayMin} ${ampm}`);
      }
    }
    return slots;
  };

  const ALL_SLOTS = generateSlots();

  // --- DATE HANDLING ---
  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const day = new Date(selectedDate).getDay();
    if (day === 0 || day === 6) {
      alert("We are available Monday to Friday only.");
      e.target.value = '';
      return;
    }
    
    // Clear slot and set new date
    setFormData({ ...formData, date: selectedDate, slot: '' });
    
    // Initial fetch for loading state (Auto-refresh takes over after)
    if (selectedDate) {
      setIsLoadingSlots(true);
      const booked = await getTakenSlots(selectedDate);
      setTakenSlots(booked || []);
      setIsLoadingSlots(false);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  // --- FIREWALL SUBMIT ---
  const handleFinalSubmit = async () => {
    if (!formData.date || !formData.slot) return;
    setIsSubmitting(true);

    const result = await saveAppointment(formData);

    if (!result || !result.success) {
      alert("⚠️ This slot was just taken by someone else! Refreshing list...");
      
      // Immediate Refresh
      setIsLoadingSlots(true);
      const booked = await getTakenSlots(formData.date);
      setTakenSlots(booked || []);
      setIsLoadingSlots(false);
      
      setIsSubmitting(false);
      return; 
    }

    setIsSubmitting(false);
    setStep(3);
  };

  // --- GOOGLE LINK ---
  const getGoogleCalendarUrl = () => {
    if (!formData.date || !formData.slot) return "#";
    const [timeStr, modifier] = formData.slot.split(' ');
    let [hoursStr, minutesStr] = timeStr.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (hours === 12 && modifier === 'AM') hours = 0;
    if (hours !== 12 && modifier === 'PM') hours += 12;

    const dateClean = formData.date.replace(/-/g, '');
    const formatTime = (h: number, m: number) => String(h).padStart(2, '0') + String(m).padStart(2, '0') + '00';

    const startTime = formatTime(hours, minutes);
    let endHours = hours;
    let endMinutes = minutes + 20;
    if (endMinutes >= 60) { endHours += 1; endMinutes -= 60; }
    const endTime = formatTime(endHours, endMinutes);

    const dates = `${dateClean}T${startTime}/${dateClean}T${endTime}`;
    const title = encodeURIComponent("Consultation: The Insurance Guy");
    const details = encodeURIComponent(`Client: ${formData.name}\nPhone: ${formData.phone}\nReq: ${formData.description}`);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=Phone+Call`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-emerald-900 p-6 flex justify-between items-start shrink-0 relative">
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-white">
                  {step === 1 ? "Book Consultation" : step === 2 ? "Select Time" : "Confirmed"}
                </h3>
                <p className="text-emerald-200/80 text-sm mt-1">
                  {step === 1 ? "Expert advice. No sales pressure." : step === 2 ? "Mon-Fri, 10 AM - 5 PM" : "Added to our schedule."}
                </p>
              </div>
              
              <button 
                onClick={onClose} 
                className="absolute right-6 top-6 p-2 bg-white/10 hover:bg-white text-white hover:text-emerald-900 rounded-full transition-all duration-300 hover:rotate-90 shadow-lg cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 relative p-6 md:p-8">
              
              {/* STEP 1: DETAILS */}
              {step === 1 && (
                <motion.form 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleNext} 
                  className="space-y-5"
                >
                  <div className="grid grid-cols-3 gap-2">
                    {['Private Car', 'Commercial', 'Fleet'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, category: type})}
                        className={`p-3 rounded-xl border text-[10px] md:text-xs font-bold flex flex-col items-center gap-2 transition-all hover:border-emerald-500 hover:text-emerald-700 hover:shadow-md hover:scale-[1.02] ${
                          formData.category === type 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md ring-1 ring-emerald-500' 
                            : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        {type === 'Private Car' && <Car size={20} />}
                        {type === 'Commercial' && <Briefcase size={20} />}
                        {type === 'Fleet' && <Truck size={20} />}
                        <span className="uppercase">{type}</span>
                      </button>
                    ))}
                  </div>

                  <input required className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all uppercase placeholder:normal-case font-serif"
                    placeholder="Vehicle Number / Company Name" value={formData.identity} onChange={(e) => setFormData({...formData, identity: e.target.value})} />

                  <div className="grid grid-cols-2 gap-4">
                    <input required className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                      placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <input required type="tel" className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                      placeholder="Mobile" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>

                  <textarea className="w-full p-4 bg-white border border-slate-200 rounded-xl font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all h-20 resize-none"
                    placeholder="Brief requirement..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />

                  <button type="submit" className="w-full py-4 bg-emerald-900 text-white rounded-xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-xl cursor-pointer hover:shadow-2xl hover:-translate-y-1">
                    Next: Select Slot
                  </button>
                </motion.form>
              )}

              {/* STEP 2: PRECISE SLOTS */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Date (Mon-Fri)</label>
                    <div className="relative group cursor-pointer">
                      <style jsx>{`
                        input[type="date"]::-webkit-calendar-picker-indicator {
                          opacity: 0; cursor: pointer; position: absolute; left: 0; top: 0; width: 100%; height: 100%;
                        }
                      `}</style>
                      <input 
                        type="date" 
                        min={today}
                        className="w-full p-4 pl-14 bg-emerald-50/50 border-2 border-emerald-100 rounded-xl font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all cursor-pointer h-16 text-lg"
                        onChange={handleDateChange} 
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 pointer-events-none">
                        <CalendarIcon size={18} />
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300 pointer-events-none">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Times</label>
                      {isLoadingSlots && <span className="text-xs text-emerald-600 font-bold animate-pulse">Checking...</span>}
                    </div>
                    
                    {!formData.date ? (
                      <div className="p-8 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                        Select a date to see slots.
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2 pb-2 p-1">
                        {ALL_SLOTS.map((time) => {
                          const isBooked = takenSlots.includes(time);
                          return (
                            <button
                              key={time}
                              onClick={() => !isBooked && setFormData({...formData, slot: time})}
                              disabled={isBooked}
                              className={`py-3 rounded-lg text-[11px] font-bold border transition-all relative ${
                                isBooked
                                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through'
                                  : formData.slot === time 
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg z-10' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700 hover:shadow-md'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handleFinalSubmit}
                    disabled={!formData.date || !formData.slot || isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all ${
                      (!formData.date || !formData.slot) 
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                        : 'bg-emerald-900 text-white hover:bg-emerald-800 cursor-pointer hover:shadow-2xl hover:-translate-y-1'
                    }`}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm & Book"}
                  </button>
                </motion.div>
              )}

              {/* STEP 3: SUCCESS */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle size={40} className="animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-serif text-emerald-900 mb-2">Booking Confirmed!</h3>
                  <p className="text-slate-500 mb-6 max-w-xs text-sm">
                    <strong>{formData.slot}</strong> on <strong>{formData.date}</strong>.
                    <br/>We have sent a confirmation to your WhatsApp.
                  </p>
                  
                  <a 
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg mb-4 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <CalendarIcon size={16} /> Add to Google Calendar
                  </a>

                  <button onClick={onClose} className="text-slate-400 font-bold text-xs hover:text-slate-600 cursor-pointer p-2">
                    Close Window
                  </button>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}