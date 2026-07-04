import { useSupabaseServiceClient } from '../../../utils/supabase'
import type { Product } from '../../../../types/product'

/**
 * GET /api/admin/products
 * Returns all products directly from Supabase — NO cache.
 * For admin use only.
 */
export default defineEventHandler(async () => {
  const client = useSupabaseServiceClient()

  const { data, error } = await client
    .from('products')
    .select('*')
    .order('id', { ascending: false })
    .limit(500)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return (data || []) as Product[]
})
