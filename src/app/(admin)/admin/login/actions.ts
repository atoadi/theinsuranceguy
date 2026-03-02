'use server';

import { createClient } from '@/utils/supabase/server';

export async function loginAction(email: string, password: string) {
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error('Login action failed:', err);
        return { error: 'An unexpected error occurred during login.' };
    }
}
