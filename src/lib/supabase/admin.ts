import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// This admin client is for server-side operations that require bypassing RLS.
// It uses the SERVICE_ROLE_KEY, which should be kept secret.
export const createAdminClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('Missing Supabase URL or Service Key for admin client')
  }

  return createClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
