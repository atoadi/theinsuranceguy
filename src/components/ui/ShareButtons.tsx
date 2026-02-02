"use client";
import React, { useState } from 'react';
import { Check, Copy, Facebook, Linkedin, Instagram } from 'lucide-react';

interface ShareProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareProps) {
  const [copied, setCopied] = useState(false);
  
  // Safe URL generation (Client-side)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theinsuranceguy.in';
  const shareUrl = `${siteUrl}/resources/${slug}`;
  const shareText = `Read this: ${title}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-100">
      <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
        Share this article
      </p>
      <div className="flex gap-3">
        
        {/* WhatsApp (Green Hover) */}
        <a 
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#25D366] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
          title="Share on WhatsApp"
        >
          {/* Custom WhatsApp Path for "Real" Look */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>

        {/* Reddit (Orange Hover) */}
        <a 
          href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#FF4500] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
          title="Share on Reddit"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.248 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
        </a>

        {/* LinkedIn (Blue Hover) */}
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#0077b5] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        {/* Facebook (Blue Hover) */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
          title="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>

        {/* Instagram (Copy Link - Gradient Hover) */}
        <button
          onClick={copyLink}
          className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-gradient-to-tr hover:from-[#FFDC80] hover:via-[#FD1D1D] hover:to-[#833AB4] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
          title="Copy Link for Instagram"
        >
          {copied ? <Check className="w-5 h-5" /> : <Instagram className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}