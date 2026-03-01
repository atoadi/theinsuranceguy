import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import GarageListClient from '@/components/admin/GarageListClient';
import GarageUploadClient from '@/components/admin/GarageUploadClient';

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
        // Supabase can insert an array of objects directly in one request
        const { error } = await supabase
            .from('garages')
            .insert(garages);

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
            // Update
            const { error } = await supabase.from('garages').update({
                n: data.n,
                b: data.b,
                c: data.c,
                a: data.a
            }).eq('id', data.id);
            if (error) throw error;
        } else {
            // Insert
            const { error } = await supabase.from('garages').insert([{
                n: data.n,
                b: data.b,
                c: data.c,
                a: data.a
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

export default async function AdminGaragesPage() {
    const supabase = getSupabase();
    let garages: any[] = [];
    let totalCount = 0;

    if (supabase) {
        const { data, count, error } = await supabase
            .from('garages')
            .select('id, n, b, c, a', { count: 'exact' })
            .order('n', { ascending: true })
            // fetching top 500 for the client to handle, preventing massive payload
            .limit(500);

        if (error) {
            console.error('[Admin Garages] Fetch error:', error);
        } else {
            garages = data || [];
            totalCount = count || garages.length;
        }
    }

    return (
        <>
            <GarageUploadClient uploadGarages={uploadGarages} />
            <GarageListClient
                initialGarages={garages}
                totalCount={totalCount}
                saveGarage={saveGarage}
                deleteGarages={deleteGarages}
            />
        </>
    );
}
