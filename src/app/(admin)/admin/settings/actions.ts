'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signOutAction() {
    try {
        const supabase = await createClient();
        await supabase.auth.signOut();
    } catch (err) {
        console.error('Sign out error:', err);
    }

    // Redirect to login page after sign out
    redirect('/admin/login');
}
