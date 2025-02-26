export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.STRAPI_API_URL,
			API_READ_TOKEN: process.env.STRAPI_API_KEY
		}
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
					hid: 'description',
					name: 'description',
					content: 'Shop the latest in fashion at Rechik. Your one-stop online store for trendy outfits.'
				},
				{
					hid: 'og:title',
					property: 'og:title',
					content: 'Rechik | Outfit levels unlocked'
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: 'Shop the latest in fashion at Rechik. Your one-stop online store for trendy outfits.'
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: '/Logo_Mascot_lite.webp'
				},
				{
					hid: 'og:url',
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
					children: JSON.stringify({
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
		'@pinia/nuxt'
	],
	tailwindcss: {
		cssPath: '~/assets/css/main.css',
		configPath: '~/tailwind.config.js',
		exposeConfig: true,
		injectPosition: 0,
		viewer: true
	}
})
