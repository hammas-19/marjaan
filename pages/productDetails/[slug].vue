<template>
  <div class="bg-linen">
    <!-- Debugging -->
    <pre>{{ stringifyCartItems }}</pre>
<!-- <pre>{{ apiData }}</pre> -->
    <section v-if="apiData" class="max-w-7xl mx-auto md:px-6 px-2 md:py-5 py-2">
      <div class="relative mx-auto py-8">
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          <!-- Description -->
          <div class="sticky flex flex-col justify-center h-full px-4">
            <div class="mt-8 flex justify-between">
              <div class="space-y-1">
                <h1 class="text-xl sm:text-3xl font-headings">
                  {{ apiData.name }}
                </h1>
                <p class="text-xs font-semibold">
                  Collection: <span class="font-headings text-tango font-normal text-sm">{{ apiData.collection }}</span>
                </p>
              </div>
              <p class="text-base font-semibold">
                Rs <span class="font-bold text-2xl font-titles">{{ apiData.price }}</span>
              </p>
            </div>
            <div class="mt-4">
              <div class="prose max-w-none">
                <p>{{ apiData.description }}</p>
              </div>
              <button class="mt-2 text-sm font-medium underline">
                Read More
              </button>
            </div>
          </div>

          <!-- Images -->
          <div
            class="hiddenScroll relative flex md:flex-col flex-row gap-4 max-h-screen md:overflow-y-scroll overflow-x-scroll">
            <span class="flex justify-center items-center w-full md:sticky absolute top-1">
              <strong class="rounded-full bg-gray-100 w-fit px-3 py-0.5 text-xs font-medium tracking-wide text-tango">
                <span class="hidden md:block">Swipe Down</span>
                <span class="block md:hidden">Swipe left</span>
              </strong>
            </span>
            <img :src="apiData.image" class="aspect-square w-full rounded-lg object-cover" :alt="apiData.name">
            <img :src="apiData.image2" class="aspect-square w-full rounded-lg object-cover" :alt="apiData.name">
          </div>

          <!-- Add to Cart -->
          <div class="sticky flex flex-col justify-center h-full">
            <div class="p-4">
              <form class="mt-8">
                <fieldset>
                  <legend class="mb-1 text-sm font-medium">
                    Color
                  </legend>
                  <div class="flex flex-wrap gap-1">
                    <label v-for="(color, index) in apiData.available_colours" :key="index" class="cursor-pointer">
                      <input type="radio" name="color" class="peer sr-only" />
                      
                        <NuxtLink :to="'/productDetails/' + color.slug">
                        
                      <span
                        class="group inline-block rounded-full border px-3 py-2 text-xs font-medium peer-checked:bg-black peer-checked:text-white hover:text-white hover:bg-[#BF5700] transition-all"
                          :style="{ backgroundColor: color.color }">
                        </span>
                      </NuxtLink>
                    </label>
                  </div>
                </fieldset>
                <fieldset class="mt-4">
                  <legend class="mb-1 text-sm font-medium">
                    Size
                  </legend>
                  <div class="flex flex-wrap gap-1">
                    <label v-for="(size, index) in apiData.available_size" :key="index" class="cursor-pointer">
                      <input v-model="selectedSize" type="radio" name="size" class="peer sr-only" :value="size">
                      <span
                        class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                        {{ size }}
                      </span>
                    </label>
                  </div>
                </fieldset>
                <div class="mt-8 flex gap-4">
                  <div>
                    <label for="quantity" class="sr-only">Qty</label>
                    <input id="quantity" v-model="selectedQuantity" type="number" min="1"
                      class="w-12 rounded border-gray-200 py-3 text-center text-xs">
                  </div>
                  <button type="button"
                    class="block rounded bg-tango px-5 py-3 text-xs font-medium text-white hover:bg-bisonHide transition-all duration-300"
                    @click="addToCart">
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
            <button type="button"
              class="block rounded bg-tango px-5 py-3 text-xs font-medium text-white hover:bg-bisonHide transition-all duration-300"
              @click="clearCart">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/CartStore'

const route = useRoute()
const apiData = ref(null)
const selectedColor = ref(null)
const selectedSize = ref(null)
const selectedQuantity = ref(1)

const cartStore = useCartStore()

// Safely stringify cart items for debugging
const stringifyCartItems = computed(() =>
  JSON.stringify(cartStore.items, null, 2)
)

onMounted(() => {
  const url = `https://marjan-backend.up.railway.app/products/${route.params.slug}`

  axios
    .get(url)
    .then((response) => {
      apiData.value = response.data.data
      selectedColor.value = response.data.data.slug
    })
    .catch((err) => {
      console.error('Error fetching data:', err)
    })
})

const addToCart = () => {
  if (!selectedSize.value || !selectedColor.value || selectedQuantity.value <= 0) {
    alert('Please select size, color, and a valid quantity.')
    return
  }

  cartStore.addToCart(
    {
      id: apiData.value.id,
      name: apiData.value.name,
      price: apiData.value.price
    },
    selectedSize.value,
    selectedColor.value,
    selectedQuantity.value
  )

  alert('Product added to cart!')
}

const clearCart = () => {
  cartStore.clearCart()
}
</script>

<style scoped>
/* Hide scrollbars */
.hiddenScroll::-webkit-scrollbar {
  display: none;
}

.hiddenScroll {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.hiddenScroll img {
  transition: transform 0.3s ease-in-out;
}

/* .hiddenScroll img:hover { */
/* transform: scale(1.8); */
/* Scale image on hover */
/* z-index: 10; */
/* Bring the image to front when scaled */
/* } */
</style>
