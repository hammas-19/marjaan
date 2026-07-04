import { serverSupabaseClient } from '#supabase/server'
import type { Product } from '../../../types/product'

/**
 * GET /api/products/:slug
 * Returns a single product by slug.
 * Cached in Upstash Redis for 10 minutes.
 */
export default defineCachedEventHandler(
  async (event) => {
    const slug = getRouterParam(event, 'slug')
    if (!slug) {
      throw createError({ statusCode: 400, statusMessage: 'Product slug is required' })
    }

    const client = await serverSupabaseClient(event)

    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('slug', slug)
      .limit(1)

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message })
    }

    if (!data || data.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }

    return data[0] as Product
  },
  {
    base: 'redis',
    name: 'products-detail',
    getKey: (event) => getRouterParam(event, 'slug')?.toLowerCase() || 'unknown',
    maxAge: 60 * 10
  }
)
