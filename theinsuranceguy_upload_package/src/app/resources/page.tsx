"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogs';

// FIX: Added explicit type definition to satisfy TypeScript
const TAG_STYLES: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-800",
  ruby: "bg-red-100 text-red-800",
  amber: "bg-amber-100 text-amber-800",
  slate: "bg-slate-100 text-slate-800",
  blue: "bg-blue-100 text-blue-800",
};

export default function ResourcesPage() {
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
          {BLOG_POSTS.map((post) => (
            <Link 
              href={`/resources/${post.slug}`} 
              key={post.slug}
              className="group flex flex-col bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm hover:shadow-premium hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                {/* FIX: Added fallback to slate if color is undefined */}
                <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${TAG_STYLES[post.tagColor] || TAG_STYLES.slate}`}>
                  {post.tag}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                   <Clock size={12} /> {post.readTime}
                </span>
              </div>
              
              <h3 className="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-slate-500 mb-8 leading-relaxed flex-grow">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mt-auto group-hover:gap-3 transition-all">
                Read Analysis <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}