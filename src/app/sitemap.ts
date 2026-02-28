import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blogs';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.theinsuranceguy.in';

  // 1. SUPABASE CONNECTION
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data: cities } = await supabase.from('garages').select('c');
  
  // Clean up: unique, lowercase, and handle URL-safe encoding
  const uniqueCities = Array.from(new Set(cities?.map(item => item.c?.toLowerCase().trim()).filter(Boolean)));

  // 2. CITY URL GENERATION (The Virtual Engine)
  const cityUrls = uniqueCities.map((city) => ({
    // Use encodeURIComponent to handle cities with spaces correctly
    url: `${baseUrl}/garages/${encodeURIComponent(city!)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 3. BLOG URL GENERATION
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/resources/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 4. CORE PAGES
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/garages`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/emergency`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/private-car`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/warranty`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  return [...corePages, ...blogUrls, ...cityUrls];
}