import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('Invalid login credentials')) {
      return 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
    }
    return error.message;
  }
  return 'Ha ocurrido un error inesperado';
};