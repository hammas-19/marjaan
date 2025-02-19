<template>
  <div class="bg-linen">
    <div class="max-w-7xl mx-auto md:px-6 px-3 md:py-5 py-2">
      <!-- Collections grid -->
      <div class="grid grid-cols-3 md:gap-3 gap-1 pb-5">
        <NuxtLink v-for="(collection, cindex) in collectins" :key="cindex"
          :to="{ path: '/collection', query: { collection: collection.slug, category: activeCategory } }"
          class="relative bg-linen md:rounded-3xl h-[110px] rounded-md md:h-[280px] w-full overflow-hidden hover:opacity-80 transition-all"
          :class="activeCollection === collection.slug ? 'opacity-100' : 'opacity-50'">
          <h1 class="text-xs sm:text-sm font-medium  mt-5 text-center border rounded-t-lg border-codGrey border-b-0 block md:hidden">
            {{ collection.name }}
          </h1>
          <img :src="collection.image" class="object-cover h-full w-full" alt="">
          <div
            class="hidden absolute bottom-2 left-2 md:flex flex-col gap-2 md:max-w-[250px] max-w-[80px] bg-graphite md:p-5 p-2 md:rounded-2xl rounded-md backdrop-blur-md">
            <h1 class="lg:text-3xl text-sm font-headings md:font-bold font-medium text-white">
              {{ collection.name }}
            </h1>
            <span class="text-white md:text-lg text-xs">
              {{ collection.slogan }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Tabs for product categories -->
      <section class="min-h-[calc(100vh-250px)]">
        <div class="md:mb-10 mb-4 text-base font-headings flex justify-center items-center sticky md:top-3 top-1 z-20">
          <div class="md:border-2 border border-graphite p-1 flex rounded-full gap-3 bg-linen">
            <NuxtLink v-for="(category, index) in categories" :key="index"
              :to="{ path: '/collection', query: { collection: activeCollection, category: category.slug } }"
              class="font-medium md:text-sm text-xs text-black md:px-8 px-1 md:py-1 py-[2px] rounded-full transition-all duration-300"
              :class="{ 'text-graphite bg-bisonHide': activeCategory === category.slug }">
              {{ category.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Products Display -->
        <div class="mt-4 grid grid-cols-2 sm:grid-cols-3  justify-center md:gap-10 gap-1 justify-items-center">
          <ProductCard v-if="filteredProducts.length" :product-data="filteredProducts" />
          <p v-else>
            No products found for this category.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const categories = [
  { name: 'T-Shirts', slug: 'tshirts' },
  { name: 'Hoodies', slug: 'hoodies' },
  { name: 'Sweatshirts', slug: 'sweatshirts' }
]

const collectins = [
  {
    id: 1,
    name: 'Nyctophile',
    slug: 'nyctophile',
    slogan: 'Where Darkness Inspires',
    image: 'https://rechik.s3.ap-southeast-2.amazonaws.com/images/collections/flora.png'
  },
  {
    id: 2,
    name: 'AURA',
    slug: 'aura',
    slogan: 'Radiate Confidence',
    image: 'https://rechik.s3.ap-southeast-2.amazonaws.com/images/collections/RestoredPurple1.png'
  },
  {
    id: 3,
    name: 'Restored',
    slug: 'restored',
    slogan: 'Elegance, Renewed',
    image: 'https://rechik.s3.ap-southeast-2.amazonaws.com/images/collections/levisStripesSkin1.png'
  }
]

const products = ref([])
const filteredProducts = ref([])
const route = useRoute()
const activeCategory = ref(route.query.category || categories[0].slug)
const activeCollection = ref(route.query.collection || collectins[0].slug)

// Fetch products from API based on the active collection name
const fetchProducts = async () => {
  try {
    const activeCollectionName = collectins.find(
      collection => collection.slug === activeCollection.value
    )?.name || collectins[0].name

    const response = await $fetch(
      `https://marjan-backend-production.up.railway.app/products/?collection=${encodeURIComponent(activeCollectionName)}`
    )
    products.value = response.data
    filterProducts()
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// Filter products by category
const filterProducts = () => {
  filteredProducts.value = products.value.filter(
    product => product.category.toLowerCase() === activeCategory.value
  )
}

// Watch for route changes
watch(
  () => [route.query.collection, route.query.category],
  ([newCollection, newCategory]) => {
    activeCollection.value = newCollection || collectins[0].slug
    activeCategory.value = newCategory || categories[0].slug
    fetchProducts()
  }
)

// Initial fetch and filtering
fetchProducts()
</script>
