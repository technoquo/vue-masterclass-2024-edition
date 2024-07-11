import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../database/types';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPERBASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

//console.log(import.meta.env.VITE_SUPER_SECRET_KEY);
