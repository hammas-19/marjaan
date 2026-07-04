import { invalidateAllCache } from '../../../utils/invalidate-cache'

/**
 * POST /api/admin/cache/clear
 * Clears all `cache:*` keys from Upstash Redis.
 * Protect this route with authentication before exposing to production.
 */
export default defineEventHandler(async (event) => {
  // TODO: Add admin authentication/authorization before enabling in production.

  const clearedCount = await invalidateAllCache()

  return {
    success: true,
    cleared: clearedCount
  }
})
