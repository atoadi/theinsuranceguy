"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';

const CARS = [
  {
    id: 1,
    name: "Honda Elevate",
    tag: "Reliability King",
    dealerPrice: "₹45,000+",
    tigPrice: "₹35,000",
    features: ["Zero Dep", "Consumables", "Key Protect", "24/7 Assist"],
    image: "/images/honda-elevate.webp" // Real Image
  },
  {
    id: 2,
    name: "Kia Seltos",
    tag: "Tech Loaded",
    dealerPrice: "₹50,000+",
    tigPrice: "₹45,000",
    features: ["Zero Dep", "RTI Cover", "Engine Protect", "Cashless"],
    image: "/images/seltos-2026.webp" // Real Image
  }
];

export default function InsiderSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % CARS.length);
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-emerald-900 mb-4">See The Difference</h2>
          <p className="text-slate-500">Real quotes vs Dealer quotes.</p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* IMAGE SIDE */}
              <div className="relative h-[300px] md:h-[400px] rounded-[32px] overflow-hidden shadow-2xl">
                <img src={CARS[index].image} alt={CARS[index].name} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* INFO SIDE */}
              <div>
                <span className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2 block">{CARS[index].tag}</span>
                <h3 className="text-5xl font-serif text-slate-900 mb-6 leading-none">{CARS[index].name}</h3>
                
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl mb-8">
                  <div className="text-slate-400 line-through text-sm mb-1">Dealer Quote: {CARS[index].dealerPrice}</div>
                  <div className="text-4xl font-bold text-emerald-700">{CARS[index].tigPrice}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {CARS[index].features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                      <Check size={18} className="text-emerald-500" /> {f}
                    </div>
                  ))}
                </div>

                <button onClick={nextSlide} className="group flex items-center gap-3 text-emerald-900 font-bold hover:gap-5 transition-all">
                  Next <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-colors"><ChevronRight /></div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}