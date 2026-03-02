import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import BlogListClient from '@/components/admin/BlogListClient';

const getSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

export const dynamic = 'force-dynamic';

async function deleteBlog(id: string) {
    'use server';
    const supabase = getSupabase();
    if (!supabase) return;

    await supabase.from('blogs').delete().eq('id', id);
    revalidatePath('/admin/blogs');
    revalidatePath('/admin');
}

async function togglePublish(id: string, currentStatus: boolean) {
    'use server';
    const supabase = getSupabase();
    if (!supabase) return;

    await supabase
        .from('blogs')
        .update({ is_published: !currentStatus })
        .eq('id', id);

    revalidatePath('/admin/blogs');
    revalidatePath(`/resources`); // Invalidate the public blog list
}

export default async function AdminBlogsPage() {
    const supabase = getSupabase();
    let blogs: any[] = [];

    if (supabase) {
        const { data, error } = await supabase
            .from('blogs')
            .select('id, title, slug, tag, tag_color, read_time, published_date, is_published, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[Admin Blogs] Fetch error payload:', JSON.stringify(error, null, 2));
        } else {
            blogs = data || [];
        }
    }

    return (
        <BlogListClient
            blogs={blogs}
            deleteBlog={deleteBlog}
            togglePublish={togglePublish}
        />
    );
}
