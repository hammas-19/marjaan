/**
 * IP-based rate limiting middleware.
 * Runs on every `/api/*` request before the route handler.
 * Uses a fixed window counter stored in Upstash Redis.
 */
export default defineEventHandler(async (event) => {
  // Only rate-limit API routes
  if (!event.path.startsWith('/api/')) {
    return
  }

  const config = useRuntimeConfig()
  const redis = useUpstashRedis()

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const key = `rate-limit:ip:${ip}`

  const windowSeconds = Number(config.rateLimitWindowSeconds || 60)
  const maxRequests = Number(config.rateLimitMaxRequests || 100)

  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, windowSeconds)
  }

  if (current > maxRequests) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests'
    })
  }
})
