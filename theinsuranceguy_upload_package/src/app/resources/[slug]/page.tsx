import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogs';


export async function generateMetadata({ params }: { params:
    Promise<{ slug:string }> }):
    Promise<Metadata> {
        const { slug } = await params;
        const post = BLOG_POSTS.find((p) => p.slug === slug);
        return {
            title: post ? `${post.title} |
            Insurance Site` : 'Blog Post',
            description: post?.excerpt ||
            'Expert Insurance advice and resources.',
        };
    }

// This function tells Next.js which pages to build at compile time (Static Site Generation)
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise< { slug: string }> }) {
    const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-20 min-h-screen bg-white">
      
      {/* ARTICLE HEADER */}
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/resources" className="inline-flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-emerald-700 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Hub
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-serif text-emerald-900 mb-6 leading-[1.1]">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-12 border-b border-slate-100 pb-12">
          <span className="font-bold text-emerald-700">{post.tag}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        {/* CONTENT RENDERER */}
        <div 
          className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-emerald-700 hover:prose-a:text-emerald-800 prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {/* SHARE SECTION */}
<div className="mt-12 pt-8 border-t border-slate-100">
  <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
    Share this article
  </p>
  <div className="flex gap-4">
    {/* WhatsApp */}
    <a 
      href={`https://wa.me/?text=Check out this article: ${post.title} - ${process.env.NEXT_PUBLIC_SITE_URL}/resources/${post.slug}`}
      target="_blank"
      className="p-3 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors"
      title="Share on WhatsApp"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

    {/* LinkedIn */}
    <a 
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_SITE_URL}/resources/${post.slug}`}
      target="_blank"
      className="p-3 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
      title="Share on LinkedIn"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    </a>
  </div>
</div>
      </article>

      {/* FOOTER CTA */}
      <section className="bg-slate-50 py-20 text-center border-t border-slate-100">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-3xl font-serif text-slate-900 mb-4">Confused by the fine print?</h3>
          <p className="text-slate-500 mb-8">We analyze your specific policy wording to find hidden clauses like this.</p>
          <Link href="/diamond-wizard?mode=${CONTENT[activeTab].mode}" className="inline-block bg-emerald-700 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/10">
            Get a Policy Audit
          </Link>
        </div>
      </section>

    </main>
  );
}