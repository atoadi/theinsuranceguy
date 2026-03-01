import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import LeadInboxClient from '@/components/admin/LeadInboxClient';

const getSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

export const dynamic = 'force-dynamic';

// Server action to update appointment status
async function updateAppointmentStatus(id: number | string, status: string) {
    'use server';
    const supabase = getSupabase();
    if (!supabase) return;

    await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

    revalidatePath('/admin/leads');
    revalidatePath('/admin');
}

export default async function LeadInboxPage() {
    const supabase = getSupabase();

    let appointments: any[] = [];
    let leads: any[] = [];

    if (supabase) {
        const [appointmentsRes, leadsRes] = await Promise.all([
            supabase
                .from('appointments')
                .select('*')
                .order('created_at', { ascending: false }),
            supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false }),
        ]);

        console.log('[Admin Leads] Appointments:', appointmentsRes.data?.length, 'error:', appointmentsRes.error?.message);
        console.log('[Admin Leads] Leads:', leadsRes.data?.length, 'error:', leadsRes.error?.message);

        appointments = appointmentsRes.data ?? [];
        leads = leadsRes.data ?? [];
    }

    return (
        <LeadInboxClient
            appointments={appointments}
            leads={leads}
            updateAppointmentStatus={updateAppointmentStatus}
        />
    );
}
