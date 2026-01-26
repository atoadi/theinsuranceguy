"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyModal = ({ isOpen, onClose }: EmergencyModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] w-[90%] max-w-md bg-white rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif text-ruby-alert">Emergency.</h2>
              <button onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-600">&times;</button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-slate-100">
                <span className="font-bold text-slate-700">Tata AIG</span>
                <a href="tel:022-6489-8282" className="bg-ruby-alert text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-red-600">Call</a>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-100">
                <span className="font-bold text-slate-700">Reliance General</span>
                <a href="tel:022-4890-3009" className="bg-ruby-alert text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-red-600">Call</a>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-100">
                <span className="font-bold text-slate-700">ICICI Lombard</span>
                <a href="tel:18002666" className="bg-ruby-alert text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-red-600">Call</a>
              </div>
            </div>

            <a href="/emergency" className="block text-center mt-8 text-emerald-700 font-bold text-sm border border-slate-200 rounded-lg py-3 hover:bg-emerald-50 transition-colors">
              Open Full Emergency Guide &rarr;
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmergencyModal;