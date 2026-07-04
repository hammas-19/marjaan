import { useSupabaseServiceClient } from '../../utils/supabase'
import { invalidateProductCache } from '../../utils/invalidate-cache'
import type { Product } from '../../../types/product'

/**
 * PUT /api/products/:slug
 * Updates a product by slug (admin/trusted route).
 * Clears relevant product caches on success.
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Product slug is required' })
  }

  const body = await readBody(event)
  const client = useSupabaseServiceClient()

  const { data, error } = await client
    .from('products')
    .update(body as any)
    .eq('slug', slug)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const product = data as Product
  await invalidateProductCache(product.slug, product.category, product.collection)

  return product
})
