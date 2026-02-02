import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag, ChevronRight, ShieldCheck } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogs';
import ShareButtons from '@/components/ui/ShareButtons';

// 1. DYNAMIC METADATA
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | TheInsuranceGuy`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['TheInsuranceGuy'],
    },
  };
}

// 2. STATIC PARAMS
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// 3. THE PAGE COMPONENT
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = BLOG_POSTS.indexOf(post);
  const nextPost = BLOG_POSTS[(currentIndex + 1) % BLOG_POSTS.length];

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* READING PROGRESS BAR */}
      <div className="fixed top-20 left-0 w-full h-1 bg-slate-200 z-40">
        <div className="h-full bg-emerald-600 w-1/3" /> 
      </div>

      <article className="max-w-3xl mx-auto px-6">
        
        {/* BACK LINK */}
        <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-700 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Hub
        </Link>

        {/* HEADER */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-4 items-center mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <span className={`px-3 py-1 rounded-md text-emerald-800 bg-emerald-100 flex items-center gap-1.5`}>
              <Tag size={12} /> {post.tag}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-emerald-900 leading-[1.1] mb-8">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed border-l-4 border-emerald-500 pl-6 italic">
            {post.excerpt}
          </p>
        </header>

        {/* CONTENT ENGINE */}
        <div 
          className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-serif prose-headings:text-emerald-950 
            prose-p:text-slate-600 prose-p:leading-8
            prose-li:text-slate-600
            prose-strong:text-emerald-800 prose-strong:font-black
            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
            marker:text-emerald-500"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        {/* --- SHARE BUTTONS --- */}
        <ShareButtons title={post.title} slug={post.slug} />

      </article>

      {/* --- READ NEXT SECTION (Border Removed to fix line issue) --- */}
      <section className="max-w-3xl mx-auto px-6 pt-16">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Read This Next</p>
        <Link 
          href={`/resources/${nextPost.slug}`}
          className="group block bg-white rounded-3xl p-8 border border-slate-200 hover:border-emerald-500 hover:shadow-premium transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-serif text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {nextPost.title}
              </h3>
              <p className="text-slate-500 line-clamp-2">{nextPost.excerpt}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0 ml-4">
              <ChevronRight size={20} />
            </div>
          </div>
        </Link>
      </section>

      {/* --- PREMIUM CTA CARD (Replaces IG No Spam) --- */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-emerald-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
           
           {/* Background Glow Effect */}
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

           <div className="relative z-10">
             <div className="inline-flex p-3 bg-white/10 backdrop-blur-sm text-emerald-300 rounded-full mb-6">
               <ShieldCheck size={32} />
             </div>
             
             <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
               Don't wait for a claim rejection.
             </h2>
             
             <p className="text-emerald-100/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
               We analyze your specific policy wording to find the hidden clauses before they cost you money.
             </p>

             <Link 
               href="/diamond-wizard?mode=new" 
               className="inline-flex items-center gap-2 bg-white text-emerald-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 hover:-translate-y-1 transition-all shadow-xl"
             >
               Get Quote <ChevronRight size={18} />
             </Link>
           </div>
        </div>
      </section>

    </main>
  );
}