import { useSupabaseServiceClient } from '../../utils/supabase'
import { invalidateProductCache } from '../../utils/invalidate-cache'
import type { Product } from '../../../types/product'

/**
 * POST /api/products
 * Creates a new product (admin/trusted route).
 * Clears relevant product caches on success.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = useSupabaseServiceClient()

  const { data, error } = await client
    .from('products')
    .insert(body)
    .select()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const product = (data?.[0]) as Product
  if (!product) {
    throw createError({ statusCode: 500, statusMessage: 'Insert failed' })
  }

  await invalidateProductCache(product.slug, product.category, product.collection)

  return product
})
