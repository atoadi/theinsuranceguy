import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

export const revalidate = 60; // Revalidate the page every 60 seconds

const TAG_STYLES: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800",
  ruby: "bg-rose-100 text-rose-800",
  amber: "bg-amber-100 text-amber-800",
  slate: "bg-slate-100 text-slate-800",
  blue: "bg-blue-100 text-blue-800",
  indigo: "bg-indigo-100 text-indigo-800",
};

export default async function ResourcesPage() {
  const supabase = getSupabase();
  let posts: any[] = [];

  if (supabase) {
    const { data, error } = await supabase
      .from('blogs')
      .select('slug, title, excerpt, tag, tag_color, read_time, published_date')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Resources Page] Fetch Error:', JSON.stringify(error, null, 2));
    }
    if (data) posts = data;
  }

  return (
    <main className="pt-20 min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="bg-white border-b border-slate-100 pt-20 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-emerald-900 mb-6">The Knowledge Hub.</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Unbiased guides and raw data. No jargon, just the truth.
        </p>
      </section>

      {/* BLOG GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              href={`/resources/${post.slug}`}
              key={post.slug}
              className="group flex flex-col bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm hover:shadow-premium hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${TAG_STYLES[post.tag_color] || TAG_STYLES.slate}`}>
                  {post.tag}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {post.read_time}
                </span>
              </div>

              <h3 className="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                {post.title}
              </h3>

              <p className="text-slate-500 mb-8 leading-relaxed flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mt-auto group-hover:gap-3 transition-all">
                Read Analysis <ArrowRight size={16} />
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-400">
              No articles published yet. Check back soon.
            </div>
          )}
        </div>
      </section>

    </main>
  );
}