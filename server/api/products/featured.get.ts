import { serverSupabaseClient } from '#supabase/server'
import type { Product } from '../../../types/product'

/**
 * GET /api/products/featured
 * Returns products flagged as new or bestseller for homepage sections.
 * Cached in Upstash Redis for 2 minutes.
 */
export default defineCachedEventHandler(
  async (event) => {
    const client = await serverSupabaseClient(event)

    const { data, error } = await client
      .from('products')
      .select('*')
      .or('is_new.eq.true,is_bestseller.eq.true')
      .order('id', { ascending: false })
      .limit(50)

    if (error) {
      console.error('[featured] Supabase error:', error.message)
      throw createError({ statusCode: 500, statusMessage: error.message })
    }

    return (data || []) as Product[]
  },
  {
    base: 'redis',
    name: 'products-featured',
    maxAge: 60 * 2
  }
)
