"use client";
import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, Phone, ChevronDown, MapPin, Building2, CarFront, RefreshCcw, XCircle } from 'lucide-react';
import OPTIONS from '@/data/filter_options_final.json'; // Keep this small file for dropdowns
import { getGarages } from '@/app/actions';

interface Garage {
  id: number;
  n: string;
  b: string;
  c: string;
  p: string;
  a?: string;
}

export default function GaragesPage() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const [cityOpen, setCityOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  
  const [results, setResults] = useState<Garage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // --- THE CLOUD ENGINE ---
  useEffect(() => {
    // If no filters, show empty state
    if (!search && !selectedCity && !selectedBrand) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setHasSearched(true);
      
      const data = await getGarages(selectedCity, selectedBrand, search);
      setResults(data);
      setIsLoading(false);
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500); // Debounce to prevent too many requests

    return () => clearTimeout(timeoutId);
  }, [search, selectedCity, selectedBrand]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCity('');
    setSelectedBrand('');
    setCityOpen(false);
    setBrandOpen(false);
    setResults([]);
    setHasSearched(false);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-24 text-slate-900">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .dropdown-animate { animation: fadeInScale 0.15s ease-out forwards; }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.99) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .shimmer { animation: shimmer 2s infinite linear; background: linear-gradient(to right, #f1f5f9 4%, #e2e8f0 25%, #f1f5f9 36%); background-size: 1000px 100%; }
        @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
      `}</style>

      {/* CLICK OUTSIDE TO CLOSE DROPDOWNS */}
      {(cityOpen || brandOpen) && <div className="fixed inset-0 z-40" onClick={() => {setCityOpen(false); setBrandOpen(false)}} />}

      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- SEARCH HEADER --- */}
        <div className="bg-white rounded-[48px] shadow-2xl border border-slate-100 mb-10 relative z-50">
          <div className="p-8 md:p-14 pt-12 relative">
            <h1 className="text-4xl font-bold mb-2">Verified Networks</h1>
            
            {/* ACTIVE FILTERS BAR */}
            <div className="flex flex-wrap items-center gap-2 mb-10 min-h-[32px]">
              <p className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 flex items-center gap-2">
                <ShieldCheck size={14}/>
                {hasSearched ? `${results.length} Centers Found` : "Search to find dealers"}
              </p>
              {selectedBrand && (
                <button onClick={() => setSelectedBrand('')} className="bg-slate-100 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-red-100 hover:text-red-600 transition-colors">
                  {selectedBrand} <XCircle size={12}/>
                </button>
              )}
              {selectedCity && (
                <button onClick={() => setSelectedCity('')} className="bg-slate-100 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-red-100 hover:text-red-600 transition-colors">
                  {selectedCity} <XCircle size={12}/>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* BRAND */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2 flex items-center gap-2"><CarFront size={14}/> Car Brand</label>
                <button 
                  onClick={() => { setBrandOpen(!brandOpen); setCityOpen(false); }}
                  className={`w-full h-16 px-6 rounded-[24px] border-2 text-left font-bold flex justify-between items-center transition-all ${brandOpen ? 'border-emerald-500 bg-white ring-4 ring-emerald-50' : 'bg-slate-50 border-slate-100 hover:border-emerald-500'}`}
                >
                  <span className="truncate">{selectedBrand || "All India Brands"}</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${brandOpen ? 'rotate-180' : ''}`} />
                </button>
                {brandOpen && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border-2 border-emerald-500 rounded-[28px] shadow-2xl z-[100] overflow-hidden max-h-80 overflow-y-auto no-scrollbar">
                    <button onClick={() => { setSelectedBrand(''); setBrandOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 rounded-[22px] font-bold text-slate-700 underline-none">All India Brands</button>
                    {OPTIONS.brands.map(b => (
                      <button key={b} onClick={() => { setSelectedBrand(b); setBrandOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 font-bold text-slate-700 border-b border-slate-50">{b}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* CITY */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2 flex items-center gap-2"><Building2 size={14}/> Major Hubs</label>
                <button 
                  onClick={() => { setCityOpen(!cityOpen); setBrandOpen(false); }}
                  className={`w-full h-16 px-6 rounded-[24px] border-2 text-left font-bold flex justify-between items-center transition-all ${cityOpen ? 'border-emerald-500 bg-white ring-4 ring-emerald-50' : 'bg-slate-50 border-slate-100 hover:border-emerald-500'}`}
                >
                  <span className="truncate">{selectedCity || "Select City"}</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${cityOpen ? 'rotate-180' : ''}`} />
                </button>
                {cityOpen && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border-2 border-emerald-500 rounded-[28px] shadow-2xl z-[100] overflow-hidden max-h-80 overflow-y-auto no-scrollbar">
                    <button onClick={() => { setSelectedCity(''); setCityOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 rounded-[22px] font-bold text-slate-700">Select City</button>
                    {OPTIONS.cities.map(c => (
                      <button key={c} onClick={() => { setSelectedCity(c); setCityOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 font-bold text-slate-700 border-b border-slate-50">{c}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* SEARCH */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2 flex items-center gap-2"><Search size={14}/> Global Search</label>
                <input 
                  type="text"
                  placeholder="Search Garage or Area..."
                  className="w-full h-16 pl-14 pr-6 rounded-[24px] bg-slate-50 border-2 border-slate-100 text-slate-900 font-bold focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-5 bottom-5 text-slate-300" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* --- RESULTS SECTION --- */}
        {isLoading ? (
          // LOADING SKELETON
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm h-48 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-slate-100 rounded-full shimmer"></div>
                  <div className="h-8 w-3/4 bg-slate-100 rounded-lg shimmer"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="h-4 w-1/2 bg-slate-100 rounded shimmer"></div>
                  <div className="h-14 w-14 bg-slate-100 rounded-2xl shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.map((garage, i) => (
              <div 
                key={i} 
                className="bg-white p-10 rounded-[40px] border border-slate-100 transition-all duration-300 ease-out group cursor-default hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ShieldCheck size={12} className="inline mr-1" /> Cashless Verified
                      </span>
                      <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-tighter">{garage.b}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{garage.n}</h3>
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs uppercase tracking-wider">
                      <MapPin size={14} className="text-emerald-500" /> {garage.c}
                    </div>
                  </div>
                  <a 
                    href={`tel:${garage.p}`} 
                    className="w-16 h-16 flex-shrink-0 bg-slate-900 text-white rounded-[22px] flex items-center justify-center hover:bg-emerald-600 transition-all shadow-xl hover:-rotate-6"
                  >
                    <Phone size={26} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && hasSearched && results.length === 0 && (
          <div className="mt-10 text-center py-20">
            <div className="inline-flex bg-slate-50 p-6 rounded-full mb-4">
              <Search size={40} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-2">No garages found.</h3>
            <p className="text-slate-500 mb-6">Try changing the brand or city filter.</p>
            <button onClick={resetFilters} className="flex items-center gap-2 text-white font-bold mx-auto bg-emerald-700 px-8 py-4 rounded-full hover:bg-emerald-800 transition-all shadow-lg hover:-translate-y-1">
              <RefreshCcw size={18} /> Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}