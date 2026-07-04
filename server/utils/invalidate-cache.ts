/**
 * Helpers to invalidate Redis cache entries after product mutations.
 * Uses the `redis` Nitro storage mount configured in nuxt.config.ts.
 */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Remove specific keys from the Redis cache.
 */
export const invalidateCacheKeys = async (keys: string[]) => {
  const storage = useStorage('redis')
  await Promise.all(keys.map((key) => storage.removeItem(key)))
}

/**
 * Remove all cache keys that start with `cache:`.
 * Use sparingly — this scans the entire Redis namespace.
 */
export const invalidateAllCache = async () => {
  const storage = useStorage('redis')

  // Scan ALL keys — Nitro stores defineCachedEventHandler entries without the `cache:` prefix
  const keys = await storage.getKeys()
  await Promise.all(keys.map((key) => storage.removeItem(key)))

  if (keys.length > 100) {
    await sleep(200)
  }

  return keys.length
}

/**
 * Invalidate product-related caches after a product changes.
 */
export const invalidateProductCache = async (slug: string, category?: string, collection?: string) => {
  const keys = [
    CacheKeys.products.featured,
    CacheKeys.products.list(),
    CacheKeys.products.detail(slug)
  ]

  if (category) {
    keys.push(CacheKeys.products.category(category))
  }
  if (collection && category) {
    keys.push(CacheKeys.products.collection(collection, category))
  }

  await invalidateCacheKeys(keys)
}
