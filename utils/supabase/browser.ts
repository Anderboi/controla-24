import { SupabaseClient, createClient } from "@supabase/supabase-js";

let cachedSupabaseClient: SupabaseClient | null = null;
let lastToken: string | null = null;

const createBrowserClient = async (supabaseToken: string | null) => {
  if (supabaseToken === lastToken && cachedSupabaseClient !== null) {
    return cachedSupabaseClient;
  }
  lastToken = supabaseToken;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${supabaseToken}` },
      },
    }
  );
  cachedSupabaseClient = supabase

  return supabase
};

export default createBrowserClient;
