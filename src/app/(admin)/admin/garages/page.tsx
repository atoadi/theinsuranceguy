import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import GarageListClient from '@/components/admin/GarageListClient';
import GarageUploadClient from '@/components/admin/GarageUploadClient';
import { Suspense } from 'react';

const getSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

export const dynamic = 'force-dynamic';

async function uploadGarages(garages: any[]) {
    'use server';
    const supabase = getSupabase();
    if (!supabase || !garages.length) return { success: false, error: 'Invalid data' };

    try {
        const { error } = await supabase.from('garages').insert(garages);
        let count = garages.length;
        if (error) throw error;

        revalidatePath('/admin/garages');
        revalidatePath('/admin');
        revalidatePath('/diamond-wizard');
        return { success: true, inserted: count || garages.length };
    } catch (err: any) {
        console.error('Bulk Upload Error:', err);
        return { success: false, error: err.message || 'Database insertion failed' };
    }
}

async function saveGarage(data: any) {
    'use server';
    const supabase = getSupabase();
    if (!supabase) return { success: false, error: 'DB connection error' };

    try {
        if (data.id) {
            const { error } = await supabase.from('garages').update({
                n: data.n, b: data.b, c: data.c, a: data.a
            }).eq('id', data.id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('garages').insert([{
                n: data.n, b: data.b, c: data.c, a: data.a
            }]);
            if (error) throw error;
        }

        revalidatePath('/admin/garages');
        revalidatePath('/admin');
        revalidatePath('/diamond-wizard');
        return { success: true };
    } catch (err: any) {
        console.error('Save Garage Error:', err);
        return { success: false, error: err.message };
    }
}

async function deleteGarages(ids: string[]) {
    'use server';
    const supabase = getSupabase();
    if (!supabase || !ids.length) return { success: false, error: 'Invalid request' };

    try {
        const { error } = await supabase.from('garages').delete().in('id', ids);
        if (error) throw error;

        revalidatePath('/admin/garages');
        revalidatePath('/admin');
        return { success: true };
    } catch (err: any) {
        console.error('Delete Garages Error:', err);
        return { success: false, error: err.message };
    }
}

async function GaragesData() {
    const supabase = getSupabase();
    let garages: any[] = [];
    let totalCount = 0;

    if (supabase) {
        const { data, count, error } = await supabase
            .from('garages')
            .select('id, n, b, c, a', { count: 'exact' })
            .order('n', { ascending: true })
            .limit(50); // Hard limit to prevent massive payload freeze

        if (error) {
            console.error('[Admin Garages] Fetch error:', error);
        } else {
            garages = data || [];
            totalCount = count || garages.length;
        }
    }

    return (
        <GarageListClient
            initialGarages={garages}
            totalCount={totalCount}
            saveGarage={saveGarage}
            deleteGarages={deleteGarages}
        />
    );
}

function GaragesSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="h-8 w-48 bg-slate-200/50 rounded-lg mb-2"></div>
                    <div className="h-4 w-32 bg-slate-200/50 rounded-lg"></div>
                </div>
                <div className="h-10 w-32 bg-slate-200/50 rounded-xl"></div>
            </div>
            <div className="h-[70vh] w-full bg-white border border-slate-100 rounded-2xl p-4">
                <div className="h-10 bg-slate-50 rounded-lg mb-4"></div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="h-12 bg-slate-50/50 rounded-lg border border-slate-50"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function AdminGaragesPage() {
    return (
        <>
            <GarageUploadClient uploadGarages={uploadGarages} />
            <Suspense fallback={<GaragesSkeleton />}>
                <GaragesData />
            </Suspense>
        </>
    );
}
