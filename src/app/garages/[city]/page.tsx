import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, ChevronRight, Calendar } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE (Server-side, safe to use here) ---
const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

interface Garage {
  id: number;
  n: string;
  b: string;
  c: string;
  p: string;
  a?: string;
}

interface Props {
  params: Promise<{ city: string }>;
}

// --- 1. STATIC PARAMS: Tells Next.js every valid city at build time ---
export async function generateStaticParams() {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('garages').select('c');
  if (!data) return [];

  const uniqueCities = Array.from(
    new Set(data.map((r) => r.c?.toLowerCase().trim()).filter(Boolean))
  );

  return uniqueCities.map((city) => ({ city: encodeURIComponent(city!) }));
}

// --- 2. DYNAMIC METADATA: Unique title + description per city ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawCity } = await params;
  const decoded = decodeURIComponent(rawCity);
  const city = decoded.charAt(0).toUpperCase() + decoded.slice(1);

  const supabase = getSupabase();
  const data = supabase
    ? (await supabase.from('garages').select('b', { count: 'exact' }).ilike('c', decoded)).data
    : null;

  const count = data?.length ?? 0;
  const brands = [...new Set(data?.map((r: any) => r.b).filter(Boolean))].slice(0, 3).join(', ');

  return {
    title: `${count > 0 ? count + ' ' : ''}Cashless Garages in ${city} — Verified Network | TheInsuranceGuy`,
    description: `Find verified cashless car insurance garages in ${city}${brands ? ` for ${brands}` : ''}. Claim-ready network verified Feb 2026. Expert advisory by TheInsuranceGuy.`,
    alternates: {
      canonical: `https://www.theinsuranceguy.in/garages/${rawCity.toLowerCase()}`,
    },
    openGraph: {
      title: `Cashless Garages in ${city} | TheInsuranceGuy`,
      description: `${count} verified garages in ${city}. Don't get stuck with a reimbursement claim — check your cashless network first.`,
      type: 'website',
    },
  };
}

// --- 3. PAGE COMPONENT ---
export default async function CityGaragePage({ params }: Props) {
  const { city: rawCity } = await params;
  const decoded = decodeURIComponent(rawCity);
  const cityDisplay = decoded.charAt(0).toUpperCase() + decoded.slice(1);

  const supabase = getSupabase();
  const garages = supabase
    ? (await supabase.from('garages').select('*').ilike('c', decoded).order('b').limit(100)).data
    : null;

  // If city exists in sitemap but has zero garages in DB, still render (not 404)
  const results: Garage[] = garages ?? [];

  // Get unique brands for this city
  const brands = [...new Set(results.map((g) => g.b).filter(Boolean))];

  // --- JSON-LD: LocalBusiness for each garage ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Cashless Garages in ${cityDisplay}`,
    description: `Verified cashless car insurance garages in ${cityDisplay}, India.`,
    numberOfItems: results.length,
    itemListElement: results.slice(0, 20).map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': ['LocalBusiness', 'AutoRepair'],
        name: g.n,
        telephone: g.p,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityDisplay,
          addressCountry: 'IN',
          streetAddress: g.a ?? '',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Cashless Insurance Networks',
        },
        brand: { '@type': 'Brand', name: g.b },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6">

        {/* --- HERO HEADER --- */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-3">
            Verified Network · Feb 2026
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-emerald-900 mb-4 leading-tight">
            Cashless Garages<br />
            <span className="text-slate-700">in {cityDisplay}</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            {results.length > 0
              ? `${results.length} verified cashless service centres in ${cityDisplay}${brands.length > 0 ? ` covering ${brands.slice(0, 3).join(', ')}${brands.length > 3 ? ' and more' : ''}` : ''}.`
              : `We're building our verified network for ${cityDisplay}. Book a consultation — we'll manually verify the right garage for your claim.`}
          </p>

          {/* Brand pills */}
          {brands.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {brands.map((b) => (
                <span key={b} className="text-[10px] font-black bg-white border border-slate-200 text-slate-500 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* --- GARAGE GRID --- */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {results.map((garage, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                        <ShieldCheck size={10} /> Cashless Verified
                      </span>
                      {garage.b && (
                        <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-full border border-slate-100 uppercase">
                          {garage.b}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                      {garage.n}
                    </h2>
                    {garage.a && (
                      <div className="flex items-start gap-1.5 text-slate-400 text-xs font-medium">
                        <MapPin size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{garage.a}</span>
                      </div>
                    )}
                  </div>
                  {garage.p && (
                    <a
                      href={`tel:${garage.p}`}
                      className="w-14 h-14 shrink-0 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg hover:-rotate-6 group/btn"
                      aria-label={`Call ${garage.n}`}
                    >
                      <Phone size={22} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-16 text-center mb-16">
            <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
              <ShieldCheck size={32} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-serif text-slate-900 mb-2">Network audit in progress</h2>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              We're manually verifying Tata AIG and ICICI Lombard tie-ups in {cityDisplay}.
              Book a consultation — we'll call you before you file any claim.
            </p>
          </div>
        )}

        {/* --- LEAD CTA --- */}
        <div className="bg-emerald-900 rounded-[40px] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-4">
              Not sure which garage to use?
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
              Get the right cashless garage<br />in {cityDisplay} — verified.
            </h2>
            <p className="text-emerald-100/70 text-base mb-8 max-w-lg mx-auto">
              We confirm live tie-ups before your claim. One wrong garage choice can turn a cashless claim into a 60-day reimbursement battle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diamond-wizard?mode=new"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-base hover:bg-emerald-50 hover:-translate-y-1 transition-all shadow-xl"
              >
                Get Quote <ChevronRight size={16} />
              </Link>
              <Link
                href="/"
                onClick={() => { }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all border border-white/20"
              >
                <Calendar size={16} /> Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* --- BREADCRUMB + BACK LINK --- */}
        <div className="mt-10 text-center">
          <Link
            href="/garages"
            className="text-sm text-slate-400 font-bold hover:text-emerald-700 transition-colors"
          >
            ← Back to all cities
          </Link>
        </div>

      </div>
    </main>
  );
}