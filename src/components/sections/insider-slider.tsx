"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const CARS = [
  {
    id: 1,
    name: "Honda Elevate",
    tag: "Reliability King",
    dealerPrice: "₹45,000+",
    tigPrice: "₹35,000",
    features: ["Zero Dep", "Consumables", "Key Protect", "24/7 Assist"],
    image: "/images/honda-elevate.webp" 
  },
  {
    id: 2,
    name: "Kia Seltos",
    tag: "Tech Loaded",
    dealerPrice: "₹50,000+",
    tigPrice: "₹45,000",
    features: ["Zero Dep", "RTI Cover", "Engine Protect", "Cashless"],
    image: "/images/seltos-2026.webp" 
  }
];

export default function InsiderSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % CARS.length);
  };

  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-emerald-900 mb-2">See The Difference</h2>
          <p className="text-slate-500 text-sm">Real quotes vs Dealer quotes.</p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* IMAGE SIDE - Transparent & Rounded */}
              <div className="relative h-[250px] md:h-[400px] rounded-[32px] overflow-hidden shadow-2xl">
                <Image 
                  src={CARS[index].image} 
                  alt={CARS[index].name} 
                  fill
                  className="object-cover"
                  priority 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                   <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">{CARS[index].tag}</span>
                </div>
              </div>

              {/* INFO SIDE */}
              <div>
                <h3 className="text-4xl font-serif text-slate-900 mb-6 leading-none">{CARS[index].name}</h3>
                
                <div className="bg-white border border-emerald-100 p-6 rounded-3xl shadow-sm mb-8">
                  <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Dealer Quote</p>
                        <p className="text-slate-400 line-through font-bold">{CARS[index].dealerPrice}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-emerald-700 uppercase tracking-wide mb-1 font-bold">Our Price</p>
                        <p className="text-4xl font-black text-emerald-700 leading-none">{CARS[index].tigPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {CARS[index].features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                      <Check size={16} className="text-emerald-500 shrink-0" /> {f}
                    </div>
                  ))}
                </div>

                {/* --- RESTORED MINIMALIST BUTTON --- */}
                <button onClick={nextSlide} className="group flex items-center gap-3 text-emerald-900 font-bold hover:gap-5 transition-all">
                  Next Vehicle 
                  <div className="w-12 h-12 rounded-full border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-colors bg-white shadow-sm">
                    <ChevronRight size={20} />
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}