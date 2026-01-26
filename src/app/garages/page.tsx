"use client";
import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Phone, ChevronDown, MapPin, Building2, CarFront, RefreshCcw } from 'lucide-react';
// Referencing your final data files
import GARAGE_DATA from '@/data/garages_final.json';
import OPTIONS from '@/data/filter_options_final.json';

export default function GaragesPage() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const [cityOpen, setCityOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  // Update your filteredResults logic
// [cite: 81] logic upgrade
const filteredResults = useMemo(() => {
  // Requirement: No results shown initially 
  if (!search && !selectedCity && !selectedBrand) return [];

  return (GARAGE_DATA as any[]).filter((g) => {
    // 1. Check Dropdown Constraints first
    const matchesCity = !selectedCity || 
      g.c.toLowerCase().includes(selectedCity.toLowerCase());
    
    const matchesBrand = !selectedBrand || 
      g.b.toLowerCase().includes(selectedBrand.toLowerCase());

    // 2. Global Search logic: now RESTRICTED by the above dropdowns
    const searchMatch = !search || (
      g.n.toLowerCase().includes(search.toLowerCase()) || 
      g.c.toLowerCase().includes(search.toLowerCase())
    );

    // Only return true if it passes the dropdown filters AND the text search
    return matchesCity && matchesBrand && searchMatch;
  });
}, [search, selectedCity, selectedBrand]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCity('');
    setSelectedBrand('');
    setCityOpen(false);
    setBrandOpen(false);
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
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- SEARCH BOX SECTION --- */}
        <div className="bg-white rounded-[48px] shadow-2xl border border-slate-100 mb-10 relative">
          
          {/* TOP BAR MASK: Locked to prevent leak, but only occupies the top edge */}
          
          
          <div className="p-10 md:p-14 pt-12 md:pt-16 relative">
            <h1 className="text-4xl font-bold mb-2">Verified Networks</h1>
            
            <div className="flex items-center gap-2 mb-10">
              <p className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                {filteredResults.length > 0 && (search || selectedCity || selectedBrand) 
                  ? `${filteredResults.length} ${selectedBrand || ''} Centers Found` 
                  : `Total ${GARAGE_DATA.length} verified dealers PAN India`}
              </p>
            </div>
            
            
            {/* GRID: Dropdowns will now float freely over the results below */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-50">
              
              {/* BRAND SELECT */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2 flex items-center gap-2"><CarFront size={14}/> Car Brand</label>
                <button 
                  onClick={() => { setBrandOpen(!brandOpen); setCityOpen(false); }}
                  className="w-full h-16 px-6 rounded-[24px] bg-slate-50 border-2 border-slate-100 text-left font-bold flex justify-between items-center hover:border-emerald-500 transition-all focus:bg-white"
                >
                  <span className="truncate">{selectedBrand || "All India Brands"}</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 flex-shrink-0 ${brandOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {brandOpen && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border-2 border-emerald-500 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[100] dropdown-animate overflow-hidden">
                    <div className="p-1 max-h-72 overflow-y-auto no-scrollbar">
                      <button onClick={() => { setSelectedBrand(''); setBrandOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 rounded-[22px] font-bold text-slate-700 underline-none">All India Brands</button>
                      {OPTIONS.brands.map(b => (
                        <button key={b} onClick={() => { setSelectedBrand(b); setBrandOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 rounded-[22px] font-bold text-slate-700">{b}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CITY SELECT */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2 flex items-center gap-2"><Building2 size={14}/> Major Hubs</label>
                <button 
                  onClick={() => { setCityOpen(!cityOpen); setBrandOpen(false); }}
                  className="w-full h-16 px-6 rounded-[24px] bg-slate-50 border-2 border-slate-100 text-left font-bold flex justify-between items-center hover:border-emerald-500 transition-all focus:bg-white"
                >
                  <span className="truncate">{selectedCity || "Select City"}</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 flex-shrink-0 ${cityOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {cityOpen && (
                  <div className="absolute top-[110%] left-0 w-full bg-white border-2 border-emerald-500 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[100] dropdown-animate overflow-hidden">
                    <div className="p-1 max-h-72 overflow-y-auto no-scrollbar">
                      <button onClick={() => { setSelectedCity(''); setCityOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 rounded-[22px] font-bold text-slate-700">Select City</button>
                      {OPTIONS.cities.map(c => (
                        <button key={c} onClick={() => { setSelectedCity(c); setCityOpen(false); }} className="w-full text-left p-4 hover:bg-emerald-50 rounded-[22px] font-bold text-slate-700">{c}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* GLOBAL SEARCH */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2 flex items-center gap-2"><Search size={14}/> Global Search</label>
                <input 
                  type="text"
                  placeholder="Search Garage or Village..."
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResults.slice(0, 40).map((garage: any, i: number) => (
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

        {/* RESET ACTION */}
        {(search || selectedCity || selectedBrand) && filteredResults.length === 0 && (
          <div className="mt-10 text-center">
            <button onClick={resetFilters} className="flex items-center gap-2 text-emerald-600 font-bold mx-auto bg-emerald-50 px-6 py-3 rounded-full hover:bg-emerald-100 transition-all">
              <RefreshCcw size={18} /> No results. Reset Filters?
            </button>
          </div>
        )}
      </div>
    </main>
  );
}