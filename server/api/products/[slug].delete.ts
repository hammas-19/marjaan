import { useSupabaseServiceClient } from '../../utils/supabase'
import { invalidateProductCache } from '../../utils/invalidate-cache'

/**
 * DELETE /api/products/:slug
 * Deletes a product by slug (admin/trusted route).
 * Clears relevant product caches on success.
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Product slug is required' })
  }

  const client = useSupabaseServiceClient()

  // Delete and return the deleted rows in one query to avoid a separate fetch
  const { data: deleted, error } = await client
    .from('products')
    .delete()
    .eq('slug', slug)
    .select('category, collection')

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  if (!deleted || deleted.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const { category, collection } = deleted[0] as { category?: string; collection?: string }
  await invalidateProductCache(slug, category, collection)

  return { success: true }
})
