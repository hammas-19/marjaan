<template>
   <div class="bg-linen">
      <!-- Hero -->
      <section class="max-w-7xl mx-auto md:px-6 px-3 md:py-5 py-2">
         <Hero />
      </section>
      <!-- Creators Selected -->
      <section class="py-5 md:px-5 px-2">
         <!-- Desc & Handle -->
         <ClientOnly>
            <div class="max-w-7xl mx-auto  px-3 flex justify-between items-end md:pb-5 pb-3">
               <div class="flex flex-col text-black">
                  <span class="md:text-xl text-sm font-headings">Mixed</span>
                  <h1 class="md:text-4xl text-xl font-titles">
                     Creators Selected
                  </h1>
               </div>
               <!-- <NuxtLink class="md:text-xl text-sm ">
                  View All
               </NuxtLink> -->
            </div>
         </ClientOnly>
         <Tabs>
            <template #cat1>
               T-Shirts
            </template>
            <template #cat2>
               Hoodies
            </template>
            <template #cat3>
               SweatShirts
            </template>
            <template #category1>
               <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
                  <template v-if="isLoading">
                     <div v-for="(items) in 10" :key="items"
                        class="w-[120px] md:w-[140px] lg:w-[210px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
                  </template>
                  <template v-else>
                     <ProductCard :product-data="teesData" class="" />
                  </template>
               </div>
               <!-- <ProductSlider1 /> -->
            </template>
            <template #category2>
               <!-- <ProductSlider2 /> -->
               <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
                  <template v-if="isLoading">
                     <div v-for="(items) in 10" :key="items"
                        class="w-[120px] md:w-[140px] lg:w-[210px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
                  </template>
                  <template v-else>
                     <ProductCard :product-data="hoodData" class="" />
                  </template>
               </div>
            </template>
            <template #category3>
               <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
                  <template v-if="isLoading">
                     <div v-for="(items) in 10" :key="items"
                        class="w-[120px] md:w-[140px] lg:w-[210px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
                  </template>
                  <template v-else>
                     <ProductCard :product-data="sweatData" class="" />
                  </template>
               </div>
               <!-- <ProductSlider1 /> -->
            </template>
         </Tabs>
      </section>

      <!--Display 01  -->
      <section id="collections" class="max-w-7xl mx-auto md:px-6 px-3 md:py-10 py-5">
         <Display1 />
      </section>

      <!-- BestSellers -->
      <section class="py-5 md:px-5 px-2">
         <!-- Desc & Handle -->
         <ClientOnly>
            <div class="max-w-7xl mx-auto  px-3 flex justify-between items-end md:pb-5 pb-3">
               <div class="flex flex-col text-black">
                  <span class="md:text-xl text-sm font-headings">Shop</span>
                  <h1 class="md:text-4xl text-xl font-titles">
                     Best Sellers
                  </h1>
               </div>
               <!-- <NuxtLink class="md:text-xl text-sm ">
                  View All
               </NuxtLink> -->
            </div>
         </ClientOnly>
         <Tabs class="">
            <template #cat1>
               T-Shirts
            </template>
            <template #cat2>
               Hoodies
            </template>
            <template #cat3>
               SweatShirts
            </template>
            <template #category1>
               <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
                  <template v-if="isLoading">
                     <div v-for="(items) in 10" :key="items"
                        class="w-[120px] md:w-[140px] lg:w-[210px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
                  </template>
                  <template v-else>
                     <ProductCard :product-data="teesData" />
                  </template>
               </div>
               <!-- <ProductSlider1 /> -->
            </template>
            <template #category2>
               <!-- <ProductSlider2 /> -->
               <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
                  <template v-if="isLoading">
                     <div v-for="(items) in 10" :key="items"
                        class="w-[120px] md:w-[140px] lg:w-[210px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
                  </template>
                  <template v-else>
                     <ProductCard :product-data="hoodData" />
                  </template>
               </div>
            </template>
            <template #category3>
               <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
                  <template v-if="isLoading">
                     <div v-for="(items) in 10" :key="items"
                        class="w-[120px] md:w-[140px] lg:w-[210px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
                  </template>
                  <template v-else>
                     <ProductCard :product-data="sweatData" />
                  </template>
               </div>
               <!-- <ProductSlider1 /> -->
            </template>
         </Tabs>
      </section>

      <section class="max-w-7xl mx-auto md:px-6 px-3 md:py-10 py-5">
         <Desc&handle class="border-b-0" />
         <Display2 />
      </section>

      <!-- Testimonials -->
      <section class="w-full mx-auto md:py-10 py-5 px-2 md:mt-40">
         <Testimonials />
      </section>
   </div>
</template>
<script setup>
import axios from 'axios'
import { useUserStore } from '~/stores/UserStore'

const teesData = ref([])
const isLoading = ref(true) // To track loading state

// Fetch data using promises
axios.get('https://marjan-backend.up.railway.app/products/?category=Tshirts')
   .then((response) => {
      teesData.value = response.data.data.sort((a, b) => {
         return b.id - a.id // For numeric values
         // Or for string properties, use:
         // return b.property.localeCompare(a.property)
      })
   })
   .catch((error) => {
      console.error('Error fetching data:', error)
   })
   .finally(() => {
      isLoading.value = false // Set loading to false when data is fetched
   })
const hoodData = ref([])

// Fetch data using promises
axios.get('https://marjan-backend.up.railway.app/products/?category=Hoodies')
   .then((response) => {
      hoodData.value = response.data.data.sort((a, b) => {
         return b.id - a.id // For numeric values
         // Or for string properties, use:
         // return b.property.localeCompare(a.property)
      })
   })
   .catch((error) => {
      console.error('Error fetching data:', error)
   })
   .finally(() => {
      isLoading.value = false // Set loading to false when data is fetched
   })
const sweatData = ref([])

// Fetch data using promises
axios.get('https://marjan-backend.up.railway.app/products/?category=SweatShirts')
   .then((response) => {
      sweatData.value = response.data.data.sort((a, b) => {
         return b.id - a.id // For numeric values
         // Or for string properties, use:
         // return b.property.localeCompare(a.property)
      })
   })
   .catch((error) => {
      console.error('Error fetching data:', error)
   })
   .finally(() => {
      isLoading.value = false // Set loading to false when data is fetched
   })
</script>
<style scoped>
.main::-webkit-scrollbar {
   display: none;
}

.main {
   -ms-overflow-style: none;

   scrollbar-width: none;

}
</style>
