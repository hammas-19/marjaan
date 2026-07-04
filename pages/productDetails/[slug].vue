<template>
  <div class="bg-linen relative z-0 h-screen" :class="!apiData ? 'overflow-hidden h-screen' : 'overflow-auto h-auto'">
    <div v-if="isSizeGuideOpen" class="w-full h-screen absolute z-20 inset-0 flex justify-center items-center">
      <SizeGuide>
        <template #closeModal>
          <span class="cursor-pointer hover:text-tango transition-all flex w-full justify-end"
            @click="isSizeGuideOpen = false">
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

    <!-- Loading Skeleton -->
    <template v-if="!apiData">
      <div class="flex md:flex-row flex-col justify-center items-center h-screen space-x-4 max-w-7xl px-3 mx-auto gap-5 md:gap-0">
        <!-- Skeleton Placeholder for Product Description -->
        <div class="space-y-4 w-full md:w-1/3 animate-pulse">
          <div class="h-6 bg-bisonHide rounded w-3/4"></div>
          <div class="h-8 bg-bisonHide rounded w-1/2"></div>
          <div class="h-6 bg-bisonHide rounded w-2/3"></div>
          <div class="h-6 bg-bisonHide rounded w-4/5"></div>
        </div>

        <!-- Skeleton Placeholder for Product Images -->
        <div class="flex flex-col gap-4 w-full md:w-1/3 animate-pulse">
          <div class="h-64 bg-bisonHide rounded w-full"></div>
          <div class="h-64 bg-bisonHide rounded w-full"></div>
        </div>

        <!-- Skeleton Placeholder for Add to Cart -->
        <div class="space-y-4 w-full md:w-1/3 animate-pulse">
          <div class="h-10 bg-bisonHide rounded w-full"></div>
          <div class="h-10 bg-bisonHide rounded w-1/2"></div>
          <div class="h-10 bg-bisonHide rounded w-1/2"></div>
        </div>
      </div>
    </template>

    <!-- Show content once API data is loaded -->
    <template v-else>
      <section class="max-w-7xl mx-auto md:px-6 px-3 md:py-8 py-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start">

          <!-- LEFT: Description (sticky) -->
          <div class="md:sticky md:top-6 flex flex-col gap-4">
            <div>
              <p class="text-xs font-semibold text-osloGrey uppercase tracking-widest mb-1">{{ apiData.category }}</p>
              <h1 class="text-2xl sm:text-3xl font-headings font-bold text-codGrey leading-tight">{{ apiData.name }}</h1>
              <p class="text-xs text-osloGrey mt-1">
                Collection: <span class="text-tango font-medium font-headings">{{ apiData.collection }}</span>
              </p>
            </div>
            <p class="text-2xl font-titles font-bold text-codGrey">
              Rs <span>{{ apiData.price }}</span>
            </p>
            <p class="text-sm text-codGrey/80 leading-relaxed">{{ apiData.description }}</p>
            <button @click="isSizeGuideOpen = true" class="text-xs font-semibold underline underline-offset-2 text-osloGrey w-fit hover:text-tango transition-colors">
              Size Guide →
            </button>
            <!-- OOS banner -->
            <div v-if="apiData.is_out_of_stock" class="rounded-xl bg-osloGrey/10 border border-osloGrey/20 px-4 py-3 text-sm text-osloGrey font-medium">
              This item is currently out of stock.
            </div>
          </div>

          <!-- CENTER: Images -->
          <div class="hiddenScroll flex md:flex-col flex-row gap-3 md:max-h-[85vh] md:overflow-y-auto overflow-x-auto">
            <img
              :src="apiData.image"
              class="md:w-full w-[75vw] shrink-0 aspect-square rounded-2xl object-cover"
              :alt="apiData.name"
            />
            <img
              v-if="apiData.image2"
              :src="apiData.image2"
              class="md:w-full w-[75vw] shrink-0 aspect-square rounded-2xl object-cover"
              :alt="apiData.name"
            />
            <p class="md:hidden text-[10px] text-osloGrey text-center mt-1 shrink-0 self-center">← swipe →</p>
          </div>

          <!-- RIGHT: Add to Cart (sticky) -->
          <div class="md:sticky md:top-6 flex flex-col gap-5">

            <!-- Cart feedback -->
            <Transition name="slide-fade">
              <div v-if="AddedtoCart" class="flex items-center gap-2 rounded-xl bg-tango/10 border border-tango/20 px-4 py-3 text-sm text-tango font-medium">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Added to cart!
              </div>
            </Transition>

            <!-- Validation error -->
            <Transition name="slide-fade">
              <div v-if="validationError" class="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-500 font-medium">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                {{ validationError }}
              </div>
            </Transition>

            <!-- Colors -->
            <fieldset>
              <legend class="text-xs font-semibold text-codGrey uppercase tracking-widest mb-2">Color</legend>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="(color, index) in apiData.available_colours"
                  :key="index"
                  :to="'/productDetails/' + color.slug"
                  class="w-8 h-8 rounded-full border-2 transition-all duration-200 shadow-sm"
                  :class="color.slug === apiData.slug ? 'border-codGrey scale-110 ring-2 ring-codGrey/30' : 'border-white ring-1 ring-codGrey/20 hover:scale-110'"
                  :style="{ backgroundColor: color.color }"
                  :title="color.slug"
                />
              </div>
            </fieldset>

            <!-- Sizes -->
            <fieldset>
              <legend class="text-xs font-semibold text-codGrey uppercase tracking-widest mb-2">Size</legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(size, index) in apiData.available_size"
                  :key="index"
                  type="button"
                  @click="selectedSize = size"
                  class="h-9 min-w-[36px] px-3 rounded-lg border text-xs font-semibold transition-all duration-200"
                  :class="selectedSize === size
                    ? 'bg-codGrey text-white border-codGrey'
                    : 'bg-white text-codGrey border-gray-200 hover:border-codGrey'"
                >
                  {{ size }}
                </button>
              </div>
            </fieldset>

            <!-- Quantity + Actions -->
            <div class="flex items-center gap-3 mt-1">
              <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button type="button" @click="selectedQuantity = Math.max(1, selectedQuantity - 1)" class="px-3 py-2.5 text-codGrey hover:bg-gray-50 transition-colors text-sm font-bold">−</button>
                <span class="px-3 py-2 text-sm font-medium text-codGrey min-w-[32px] text-center">{{ selectedQuantity }}</span>
                <button type="button" @click="selectedQuantity++" class="px-3 py-2.5 text-codGrey hover:bg-gray-50 transition-colors text-sm font-bold">+</button>
              </div>
              <button
                type="button"
                class="flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-300"
                :class="apiData.is_out_of_stock
                  ? 'bg-gray-100 text-osloGrey cursor-not-allowed'
                  : 'bg-tango text-white hover:bg-tango/90 active:scale-95'"
                :disabled="apiData.is_out_of_stock"
                @click="addToCart"
              >
                {{ apiData.is_out_of_stock ? 'Out of Stock' : 'Add to Cart' }}
              </button>
            </div>

            <NuxtLink to="/cart" class="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-codGrey hover:border-codGrey transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              Go to Cart
            </NuxtLink>
          </div>

        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/CartStore'

const route = useRoute()
const apiData = ref(null)
const selectedColor = ref(null)
const selectedSize = ref(null)
const AddedtoCart = ref(false)
const isSizeGuideOpen = ref(false)
const selectedQuantity = ref(1)
const validationError = ref('')

const cartStore = useCartStore()

onMounted(async () => {
  try {
    const product = await useProductBySlug(route.params.slug)
    apiData.value = product
    selectedColor.value = product.slug
  } catch (err) {
    console.error('Error fetching product:', err)
  }
})

const addToCart = () => {
  validationError.value = ''
  if (!selectedSize.value) {
    validationError.value = 'Please select a size.'
    setTimeout(() => { validationError.value = '' }, 3000)
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

  AddedtoCart.value = true
  setTimeout(() => { AddedtoCart.value = false }, 3000)
}


const clearCart = () => {
  cartStore.clearCart()
}
</script>

<style scoped>
.hiddenScroll::-webkit-scrollbar { display: none; }
.hiddenScroll { -ms-overflow-style: none; scrollbar-width: none; }

.slide-fade-enter-active,
.slide-fade-leave-active { transition: all 0.25s ease; }
.slide-fade-enter-from,
.slide-fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
