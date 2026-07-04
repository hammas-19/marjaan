# Rechik — Nuxt 3 + Supabase + Upstash Redis

Nuxt 3 storefront with Supabase as the primary database, Upstash Redis for API response caching and IP-based rate limiting, and Netlify as the deployment target.

## Architecture

```
Client (Vue/Nuxt) → Nitro API route → Redis Rate Limit → Redis Cache → Supabase (on cache miss) → Client
```

- **Supabase**: Primary database and auth.
- **Upstash Redis**: Serverless Redis used by Nitro for `defineCachedEventHandler` response caching and a fixed-window IP rate limiter.
- **Nuxt Nitro**: Server engine for API routes, middleware, and storage mounts.
- **Rate limiting**: Every `/api/*` request is counted by IP; exceeding the configured window returns `429`.
- **Cache invalidation**: Mutations (`POST`, `PUT`, `DELETE`) clear product cache keys; an admin endpoint can clear all cache keys.

## Environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Rate limiting
RATE_LIMIT_WINDOW_SECONDS=60
RATE_LIMIT_MAX_REQUESTS=100
```

## Setup

```bash
npm install
```

The project uses the following key dependencies:

- `@nuxtjs/supabase` — Nuxt module for Supabase client/server integration.
- `@supabase/supabase-js` — Direct Supabase client for service-role operations.
- `@upstash/redis` — Raw Redis client for rate-limit counters.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run preview
```

## Server routes

| Method | Route | Description | Cache |
|---|---|---|---|
| GET | `/api/products` | List products with optional filters | 5 min |
| GET | `/api/products/featured` | New + bestseller products | 2 min |
| GET | `/api/products/category/:category` | Products by category | 5 min |
| GET | `/api/products/:slug` | Single product by slug | 10 min |
| POST | `/api/products` | Create a product (admin) | Invalidates product cache |
| PUT | `/api/products/:slug` | Update a product (admin) | Invalidates product cache |
| DELETE | `/api/products/:slug` | Delete a product (admin) | Invalidates product cache |
| POST | `/api/admin/cache/clear` | Clear all `cache:*` keys | — |

## Important folders

- `server/utils/redis.ts` — Reusable Upstash Redis client.
- `server/utils/cache-keys.ts` — Type-safe cache key helpers.
- `server/utils/invalidate-cache.ts` — Cache invalidation helpers.
- `server/utils/supabase.ts` — Service-role Supabase client for trusted server operations.
- `server/middleware/rate-limit.ts` — IP-based rate limiting on `/api/*`.
- `server/api/products/` — Cached read routes and mutation routes.
- `composables/useApi.ts` — Client-side composables for calling `/api/products/*`.
- `types/product.ts` — Shared product TypeScript types.
- `types/database.types.ts` — Placeholder for Supabase generated types.

## Migration notes

- The old `composables/strapi.ts` and Strapi backend calls have been replaced by the Supabase-backed Nitro API layer.
- Update `types/database.types.ts` with your Supabase-generated types when your schema is ready.
- Protect `POST /api/admin/cache/clear` with authentication before exposing it to production.

## Deployment

Deploy the `.output` directory to Netlify, or use the [Nuxt Netlify preset](https://nuxt.com/docs/getting-started/deployment#netlify) by setting `NITRO_PRESET=netlify` during build.
