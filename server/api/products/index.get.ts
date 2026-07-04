import { serverSupabaseClient } from '#supabase/server'
import type { Product } from '../../../types/product'

/**
 * GET /api/products
 * Returns all products, optionally filtered by query params.
 * Cached in Upstash Redis for 5 minutes.
 */
export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    const client = await serverSupabaseClient(event)

    const category = query.category?.toString()
    const collection = query.collection?.toString()
    const isBestseller = query.isBestseller === 'true'
    const isCreatorSelector = query.isCreatorSelector === 'true'
    const isNew = query.isNew === 'true'
    const limit = query.limit ? Number(query.limit) : 100

    let sbQuery = client.from('products').select('*').limit(limit)

    if (category) {
      sbQuery = sbQuery.eq('category', category)
    }
    if (collection) {
      sbQuery = sbQuery.eq('collection', collection)
    }
    if (isBestseller) {
      sbQuery = sbQuery.eq('is_bestseller', true)
    }
    if (isCreatorSelector) {
      sbQuery = sbQuery.eq('is_creator_selector', true)
    }
    if (isNew) {
      sbQuery = sbQuery.eq('is_new', true)
    }

    const { data, error } = await sbQuery.order('id', { ascending: false })

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message })
    }

    return (data || []) as Product[]
  },
  {
    base: 'redis',
    name: 'products-list',
    getKey: (event) => {
      const query = getQuery(event)
      const parts = []
      if (query.category) parts.push(`category=${query.category}`)
      if (query.collection) parts.push(`collection=${query.collection}`)
      if (query.isBestseller) parts.push('bestseller')
      if (query.isCreatorSelector) parts.push('creator')
      if (query.isNew) parts.push('new')
      if (query.limit) parts.push(`limit=${query.limit}`)
      return parts.length ? parts.join(':') : 'all'
    },
    maxAge: 60 * 5
  }
)
