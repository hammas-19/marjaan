import { createClient, SupabaseClient } from '@supabase/supabase-js'

let serviceClient: SupabaseClient | null = null

/**
 * Server-side Supabase client using the service role key.
 * Use this only for trusted server operations (e.g., admin routes, mutations).
 */
export const useSupabaseServiceClient = () => {
  const config = useRuntimeConfig()
  const url = config.public.supabase?.url as string | undefined
  const serviceKey = config.supabaseServiceRoleKey as string | undefined

  if (!url || !serviceKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in runtime config'
    })
  }

  if (!serviceClient) {
    serviceClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  }

  return serviceClient
}
