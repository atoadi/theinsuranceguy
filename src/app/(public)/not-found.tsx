import Link from 'next/link';
import { MapPinOff, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-400">
          <MapPinOff size={40} />
        </div>

        <h1 className="text-6xl font-serif text-emerald-900 mb-4">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-4">You've gone off-road.</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          The page you are looking for doesn't exist. It might have been moved or the link is broken.
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            href="/" 
            className="w-full h-14 bg-emerald-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/10"
          >
            <Home size={18} /> Return to Safety
          </Link>
          
          <Link 
            href="/garages" 
            className="w-full h-14 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <Search size={18} /> Find a Garage Instead
          </Link>
        </div>

      </div>
    </main>
  );
}