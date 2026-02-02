import { createBrowserClient } from '@supabase/ssr';

// These will be set via environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function createClient() {
  if (!isSupabaseConfigured) {
    // Return a mock client that won't do anything
    // This allows the app to build without Supabase configured
    return null as any;
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
