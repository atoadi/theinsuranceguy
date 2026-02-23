import React from 'react';
import { Metadata } from 'next';
import { getGarages } from '@/app/actions';
import { ShieldCheck, MapPin } from 'lucide-react';

interface Props {
  params: { city: string };
}

// 1. DYNAMIC METADATA FIX
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Decode the city name (e.g., "New%20Delhi" -> "New Delhi")
  const decodedCity = decodeURIComponent(params.city);
  const city = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  
  return {
    title: `Verified Cashless Garages in ${city} | Reliance General Network`,
    description: `View the 2026 verified list of Reliance General cashless garages in ${city}. Expert advisory on claim intimation by TheInsuranceGuy.`,
    alternates: {
      canonical: `https://www.theinsuranceguy.in/garages/${params.city.toLowerCase()}`, //
    },
  };
}

export default async function CityGaragePage({ params }: Props) {
  const decodedCity = decodeURIComponent(params.city);
  const cityDisplayName = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);
  
  // Fetch only Reliance garages for this specific city
  const results = await getGarages(decodedCity, 'Reliance', '');

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-emerald-900 mb-4">
            Cashless Garages in {cityDisplayName}
          </h1>
          <p className="text-slate-500 bg-white p-4 rounded-xl border border-slate-100 shadow-sm inline-block text-sm font-bold">
            <ShieldCheck className="inline mr-2 text-emerald-600" size={16} />
            Verified Reliance General Network (Feb 2026)
          </p>
        </div>

        <div className="grid gap-6">
          {results.length > 0 ? results.map((garage, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:border-emerald-500 transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{garage.n}</h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin size={14} className="text-emerald-500" /> {garage.a}
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">No direct Reliance matches found in {cityDisplayName}.</p>
              <p className="text-xs text-slate-300 mt-2">Checking surrounding network areas...</p>
            </div>
          )}
        </div>

        <div className="mt-12 p-6 bg-emerald-900 text-white rounded-3xl text-center">
          <p className="text-xs uppercase tracking-widest font-black mb-2 opacity-50">Expert Status</p>
          <p className="text-sm leading-relaxed">
            Verification for <strong>Tata AIG</strong> and <strong>ICICI Lombard</strong> networks in {cityDisplayName} is currently underway. 
            Check back weekly for updated lists.
          </p>
        </div>
      </div>
    </main>
  );
}