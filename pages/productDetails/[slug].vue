<template>
  <div class="bg-linen relative z-0">
    <div v-if="isSizeGuideOpen" class="w-full h-screen  absolute z-20 inset-o flex justify-center items-center">
      <SizeGuide>
        <template #closeModal>
          <span class="cursor-pointer hover:text-tango transition-all flex w-full justify-end" @click="isSizeGuideOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21">
              <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                transform="translate(2 2)">
                <circle cx="8.5" cy="8.5" r="8" />
                <path d="m5.5 5.5l6 6m0-6l-6 6" />
              </g>
            </svg>
          </span>
        </template>
      </SizeGuide>
    </div>
    <!-- Debugging -->
    <!-- <pre>{{ stringifyCartItems }}</pre> -->
    <!-- <pre>{{ apiData }}</pre> -->
    <section v-if="apiData" class="max-w-7xl mx-auto md:px-6 px-2 md:py-5 py-2">
      <div class="relative mx-auto py-8">
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          <!-- Description -->
          <div class="sticky flex flex-col justify-center h-full px-4">
            <div class="mt-8 flex justify-between">
              <div class="space-y-1">
                <p class="text-xs font-semibold">
                  {{ apiData.category }}
                </p>
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
              <button @click="isSizeGuideOpen = true" class="mt-2 text-sm font-medium underline">
                Size Guide
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
            <div class="h-[45px] self-end w-full">
              <div v-if="AddedtoCart" class="bg-tango rounded-lg px-3 py-3 w-full text-white  text-sm">
                1 item added to cart!
              </div>
            </div>
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
                  <NuxtLink to="/cart"
                    class="border border-tango rounded-md p-2 flex justify-center items-center gap-2">
                    <span class="text-xs">
                      Go to Cart
                    </span>
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="#525252" stroke-width="2" data-v-1eb027a8="">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                      </path>
                    </svg>
                  </NuxtLink>
                </div>
              </form>
            </div>
            <!-- <button type="button"
              class="block rounded bg-tango px-5 py-3 text-xs font-medium text-white hover:bg-bisonHide transition-all duration-300"
              @click="clearCart">
              Clear Cart
            </button> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useCartStore } from '@/stores/CartStore'

const route = useRoute()
const apiData = ref(null)
const selectedColor = ref(null)
const selectedSize = ref(null)
const AddedtoCart = ref(false)
const isSizeGuideOpen = ref(false)
const selectedQuantity = ref(1)

const cartStore = useCartStore()

// Safely stringify cart items for debugging
// const stringifyCartItems = computed(() =>
//   JSON.stringify(cartStore.items, null, 2)
// )

onMounted(() => {
  const url = `https://marjan-backend-production.up.railway.app/products/${route.params.slug}`

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
      price: apiData.value.price,
      category: apiData.value.category,
      image: apiData.value.image
    },
    selectedSize.value,
    selectedColor.value,
    selectedQuantity.value
  )

  // Show the "added to cart" notification
  AddedtoCart.value = true

  // Hide the notification after 3 seconds
  setTimeout(() => {
    AddedtoCart.value = false
  }, 3000)
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
