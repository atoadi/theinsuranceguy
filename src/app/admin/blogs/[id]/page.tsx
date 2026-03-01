import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import BlogEditorClient from '@/components/admin/BlogEditorClient';
import { GoogleGenAI } from '@google/genai';

const getSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

export const dynamic = 'force-dynamic';

export default async function AdminBlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const isNew = resolvedParams.id === 'new';
    const supabase = getSupabase();
    let blogData = null;

    if (!isNew && supabase) {
        const { data } = await supabase.from('blogs').select('*').eq('id', resolvedParams.id).single();
        if (data) {
            blogData = data;
        } else {
            redirect('/admin/blogs');
        }
    }

    // --- SERVER ACTIONS ---

    async function saveBlog(formData: any) {
        'use server';
        const db = getSupabase();
        if (!db) return { success: false, error: 'Database connection failed' };

        const payload = {
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            tag: formData.tag,
            tag_color: formData.tag_color,
            read_time: formData.read_time,
            published_date: formData.published_date,
            content: formData.content,
            is_published: formData.is_published,
            updated_at: new Date().toISOString(),
        };

        let resultId = formData.id;

        if (formData.id) {
            // Update
            const { error } = await db.from('blogs').update(payload).eq('id', formData.id);
            if (error) return { success: false, error: error.message };
        } else {
            // Insert
            const { data, error } = await db.from('blogs').insert([payload]).select().single();
            if (error) return { success: false, error: error.message };
            resultId = data.id;
        }

        revalidatePath('/admin/blogs');
        revalidatePath(`/resources`);
        if (formData.slug) revalidatePath(`/resources/${formData.slug}`);

        return { success: true, id: resultId };
    }

    async function generateDraft(topic: string, apiKey: string, customPrompt: string) {
        'use server';
        if (!apiKey) return { success: false, error: 'GEMINI_API_KEY is missing. Please configure it in the Admin Settings.' };

        try {
            const ai = new GoogleGenAI({ apiKey });
            const prompt = customPrompt.replace('{topic}', topic);

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            let content = response.text || '';

            // Extract title
            let title = '';
            const titleMatch = content.match(/<title-metadata>(.*?)<\/title-metadata>/);
            if (titleMatch) {
                title = titleMatch[1].trim();
                content = content.replace(titleMatch[0], '');
            }

            // Clean up any rogue markdown formatting the model might include despite instructions
            content = content.replace(/^```html\n?/, '').replace(/\n?```$/, '').trim();

            return { success: true, content, title };
        } catch (err: any) {
            console.error('[Gemini API Error]', err);
            return { success: false, error: err.message };
        }
    }

    return (
        <BlogEditorClient
            initialData={blogData}
            saveBlog={saveBlog}
            generateDraft={generateDraft}
        />
    );
}
