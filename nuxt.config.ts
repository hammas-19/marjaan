export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			supabase: {
				url: process.env.SUPABASE_URL,
				key: process.env.SUPABASE_KEY
			}
		},
		supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
		upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL,
		upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
		rateLimitWindowSeconds: Number(process.env.RATE_LIMIT_WINDOW_SECONDS || 60),
		rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100)
	},
	app: {
		head: {
			title: 'Rechik',
			titleTemplate: '%s | Outfit levels unlocked',
			htmlAttrs: {
				lang: 'en'
			},
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				},
				{
					name: 'description',
					content: 'Shop the latest in fashion at Rechik. Your one-stop online store for trendy outfits.'
				},
				{
					property: 'og:title',
					content: 'Rechik | Outfit levels unlocked'
				},
				{
					property: 'og:description',
					content: 'Shop the latest in fashion at Rechik. Your one-stop online store for trendy outfits.'
				},
				{
					property: 'og:image',
					content: '/Logo_Mascot_lite.webp'
				},
				{
					property: 'og:url',
					content: 'https://rechik.pk'
				}
			],
			link: [
				{
					rel: 'icon',
					type: 'image/webp',
					href: '/Logo_Mascot_lite.webp'
				}
			],
			script: [
				{
					type: 'application/ld+json',
					innerHTML: JSON.stringify({
						'@context': 'http://schema.org',
						'@type': 'WebSite',
						name: 'Rechik',
						url: 'https://rechik.pk',
						potentialAction: {
							'@type': 'SearchAction',
							target: 'https://rechik.pk/search?q={search_term_string}',
							'query-input': 'required name=search_term_string'
						}
					})
				}
			]
		}
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/supabase'
	],
	supabase: {
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
		redirect: false,
		client: {
			auth: {
				persistSession: true,
				autoRefreshToken: true
			}
		}
	},
	nitro: {
		storage: {
			redis: {
				driver: 'upstash',
				url: process.env.UPSTASH_REDIS_REST_URL,
				token: process.env.UPSTASH_REDIS_REST_TOKEN
			}
		}
	},
	tailwindcss: {
		cssPath: '~/assets/css/main.css',
		configPath: '~/tailwind.config.js',
		exposeConfig: true,
		injectPosition: 0,
		viewer: true
	}
})
