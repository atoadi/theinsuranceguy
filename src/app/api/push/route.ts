import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

const getAdminSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

export async function POST(req: Request) {
    try {
        const { subscription } = await req.json();

        if (!subscription || !subscription.endpoint) {
            return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
        }

        const supabase = getAdminSupabase();
        if (!supabase) {
            return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
        }

        // 1. Delete any existing subscription for this endpoint to prevent duplicates
        // (Using the JSONB ->> operator)

        await supabase.from('admin_devices').delete().eq('subscription->>endpoint', subscription.endpoint);

        const { error: insertError } = await supabase.from('admin_devices').insert({
            subscription: subscription
        });

        if (insertError) {
            console.error('[Push API] Save error:', insertError);
            return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
        }

        // Send a welcome notification instantly
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
        const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
        if (vapidPublicKey && vapidPrivateKey) {
            webpush.setVapidDetails('mailto:hello@theinsuranceguy.in', vapidPublicKey, vapidPrivateKey);
            await webpush.sendNotification(
                subscription,
                JSON.stringify({
                    title: 'Notifications Enabled 🎉',
                    body: 'You will now receive alerts for new leads.',
                    url: '/admin',
                })
            ).catch(e => console.error('[Push API] Welcome ping failed:', e));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Push API] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
