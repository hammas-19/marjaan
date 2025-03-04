export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.STRAPI_API_URL,
			API_READ_TOKEN: process.env.STRAPI_API_KEY,
		},
	},
	app: {
		head: {
			title: "Rechik",
			titleTemplate: "%s | Outfit levels unlocked",
			htmlAttrs: {
				lang: "en",
			},
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					hid: "description",
					name: "description",
					content: "meta description",
				},
			],
			link: [
				{
					rel: "icon",
					type: "image/webp",
					href: "/Logo_Mascot_lite.webp",
				},
			],
		},
	},
	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

	tailwindcss: {
		cssPath: "~/assets/css/main.css",
		configPath: "~/tailwind.config.js",
		exposeConfig: true,
		injectPosition: 0,
		viewer: true,
	},
});
