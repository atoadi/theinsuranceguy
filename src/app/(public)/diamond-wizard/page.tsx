import React, { Suspense } from 'react';
import DiamondWizard from '@/components/wizard/DiamondWizard';

export default function WizardPage() {
  return (
    <main className="bg-white">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center font-serif text-emerald-900 bg-white">
          <div className="text-center space-y-6">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2">
              <p className="font-black uppercase tracking-[0.4em] text-[10px] text-emerald-600/40">Initializing</p>
              <h2 className="text-2xl italic">Private Reality Check...</h2>
            </div>
          </div>
        </div>
      }>
        <DiamondWizard />
      </Suspense>
    </main>
  );
}