import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

// Setup VAPID keys for web push
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';

if (vapidPublicKey && vapidPrivateKey) {
    webpush.setVapidDetails(
        'mailto:hello@theinsuranceguy.in',
        vapidPublicKey,
        vapidPrivateKey
    );
}

// Admin Supabase Client (bypasses RLS)
const getAdminSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
};

export async function notifyAdmin(title: string, body: string, url: string = '/admin/leads') {
    if (!vapidPublicKey || !vapidPrivateKey) {
        console.warn('[Push] VAPID keys missing. Cannot send notification.');
        return;
    }

    const supabase = getAdminSupabase();
    if (!supabase) return;

    try {
        // 1. Fetch all admin devices
        const { data: devices, error } = await supabase
            .from('admin_devices')
            .select('subscription');

        if (error) {
            console.error('[Push] Failed to fetch devices:', error);
            return;
        }

        if (!devices || devices.length === 0) {
            console.log('[Push] No admin devices registered.');
            return;
        }

        // 2. Prepare payload
        const payload = JSON.stringify({ title, body, url });

        // 3. Send out to all devices in parallel
        const promises = devices.map(async (device) => {
            try {
                await webpush.sendNotification(device.subscription, payload);
            } catch (err: any) {
                // If the subscription expired or user revoked permission, remove it from DB
                if (err.statusCode === 404 || err.statusCode === 410) {
                    console.log('[Push] Subscription expired or revoked. Cleaning up.');
                    await supabase
                        .from('admin_devices')
                        .delete()
                        .eq('subscription->>endpoint', device.subscription.endpoint);
                } else {
                    console.error('[Push] Send error:', err);
                }
            }
        });

        await Promise.all(promises);
        console.log(`[Push] Sent "${title}" to ${devices.length} devices.`);
    } catch (err) {
        console.error('[Push] General error:', err);
    }
}
