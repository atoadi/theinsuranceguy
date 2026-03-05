import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import LeadInboxClient from '@/components/admin/LeadInboxClient';
import { Suspense } from 'react';

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

async function LeadsData() {
    const supabase = getSupabase();
    let appointments: any[] = [];
    let leads: any[] = [];

    if (supabase) {
        // Limited to 50 for performance
        const [appointmentsRes, leadsRes] = await Promise.all([
            supabase
                .from('appointments')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50),
            supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50),
        ]);

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

function LeadsSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-16 w-1/3 bg-slate-200/50 rounded-xl mb-4"></div>
            <div className="h-10 w-full bg-slate-200/50 rounded-xl mb-6"></div>
            <div className="space-y-3 bg-white border border-slate-100 p-4 rounded-2xl">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-16 bg-slate-50 rounded-xl"></div>
                ))}
            </div>
        </div>
    );
}

export default function LeadInboxPage() {
    return (
        <div className="pb-20">
            <Suspense fallback={<LeadsSkeleton />}>
                <LeadsData />
            </Suspense>
        </div>
    );
}
