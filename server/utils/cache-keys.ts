/**
 * Centralized, type-safe cache key helpers.
 * Keeps cache key names consistent across routes and invalidation logic.
 */
export const CacheKeys = {
  products: {
    featured: 'cache:products:featured:v1',
    list: (filters: string = 'all') => `cache:products:list:v1:${filters}`,
    detail: (slug: string) => `cache:products:detail:v1:${slug}`,
    category: (category: string) => `cache:products:category:v1:${category.toLowerCase()}`,
    collection: (collection: string, category: string) => `cache:products:collection:v1:${collection.toLowerCase()}:${category.toLowerCase()}`
  },
  categories: {
    all: 'cache:categories:all:v1'
  }
} as const
