import type { Product, ProductFilters } from '~/types/product'

/**
 * Client-side composables for fetching products from the Nitro API layer.
 * All requests go through `/api/products/*` and are cached in Upstash Redis.
 */

export const useProducts = async (filters?: ProductFilters) => {
  const query: Record<string, string> = {}
  if (filters?.category) query.category = filters.category
  if (filters?.collection) query.collection = filters.collection
  if (filters?.isBestseller) query.isBestseller = 'true'
  if (filters?.isCreatorSelector) query.isCreatorSelector = 'true'
  if (filters?.isNew) query.isNew = 'true'
  if (filters?.limit) query.limit = String(filters.limit)

  return await $fetch<Product[]>('/api/products', { query })
}

export const useProductBySlug = async (slug: string) => {
  return await $fetch<Product>(`/api/products/${slug}`)
}

export const useProductsByCategory = async (category: string) => {
  return await $fetch<Product[]>(`/api/products/category/${category}`)
}

export const useFeaturedProducts = async () => {
  return await $fetch<Product[]>('/api/products/featured')
}
