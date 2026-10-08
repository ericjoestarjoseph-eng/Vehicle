import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vuzfakgfmrsflshmvgpb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Y28HqPPul_XoH5s899Arlg_HsMxyHuq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
