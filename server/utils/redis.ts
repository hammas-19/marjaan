import { Redis } from '@upstash/redis'

/**
 * Reusable Upstash Redis client for Nitro server code.
 * Use this when you need raw Redis commands (e.g., rate limiting counters).
 * For cached storage, prefer `useStorage('redis')`.
 *
 * Expects `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` env vars.
 */
export const useUpstashRedis = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing Upstash Redis credentials (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)'
    })
  }

  return Redis.fromEnv()
}
