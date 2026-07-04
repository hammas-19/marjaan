import { serverSupabaseClient } from '#supabase/server'
import type { Product } from '../../../../types/product'

/**
 * GET /api/products/category/:category
 * Returns products for a given category (Graphic, Drop, Basic).
 * Cached in Upstash Redis for 5 minutes.
 */
export default defineCachedEventHandler(
  async (event) => {
    const category = getRouterParam(event, 'category')
    if (!category) {
      throw createError({ statusCode: 400, statusMessage: 'Category is required' })
    }

    const client = await serverSupabaseClient(event)

    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('category', category)
      .order('id', { ascending: false })
      .limit(100)

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message })
    }

    return (data || []) as Product[]
  },
  {
    base: 'redis',
    name: 'products-category',
    getKey: (event) => getRouterParam(event, 'category')?.toLowerCase() || 'unknown',
    maxAge: 60 * 5
  }
)
