<template>
  <div class="bg-linen">
    <!-- Hero -->
    <section class="max-w-7xl mx-auto md:px-6 px-3 md:py-5 py-2">
      <Hero />
    </section>
    <!-- Creators Selected -->
    <section class="py-5 md:px-5 px-2 md:h-[575px] h-[468px]">
      <!-- Desc & Handle -->
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
      <Tabs>
        <template #cat1>
          Graphic
        </template>
        <template #cat2>
          Drop shoulders
        </template>
        <template #cat3>
          Basics
        </template>
        <template #category1>
          <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
            <template v-if="isLoading">
              <div v-for="(items) in 10" :key="items"
                class="md:w-[320px] w-[170px] md:h-[385px] h-[320px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
            </template>
            <template v-else>
              <ProductCard :product-data="CreatorsGraphicData" class="" />
            </template>
          </div>
          <!-- <ProductSlider1 /> -->
        </template>
        <template #category2>
          <!-- <ProductSlider2 /> -->
          <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
            <template v-if="isLoading">
              <div v-for="(items) in 10" :key="items"
                class="md:w-[320px] w-[170px] md:h-[385px] h-[320px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
            </template>
            <template v-else>
              <ProductCard :product-data="CreatorsDropData" class="" />
            </template>
          </div>
        </template>
        <template #category3>
          <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
            <template v-if="isLoading">
              <div v-for="(items) in 10" :key="items"
                class="md:w-[320px] w-[170px] md:h-[385px] h-[320px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
            </template>
            <template v-else>
              <ProductCard :product-data="CreatorsBasicData" class="" />
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
    <section class="py-5 md:px-5 px-2 md:h-[575px] h-[468px]">
      <!-- Desc & Handle -->
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
      <Tabs class="">
        <template #cat1>
          Graphic
        </template>
        <template #cat2>
          Drop shoulders
        </template>
        <template #cat3>
          Basics
        </template>
        <template #category1>
          <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
            <template v-if="isLoading">
              <div v-for="(items) in 10" :key="items"
                class="md:w-[320px] w-[170px] h-[385px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
            </template>
            <template v-else>
              <ProductCard :product-data="BestsellerteesData" />
            </template>
          </div>
          <!-- <ProductSlider1 /> -->
        </template>
        <template #category2>
          <!-- <ProductSlider2 /> -->
          <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
            <template v-if="isLoading">
              <div v-for="(items) in 10" :key="items"
                class="md:w-[320px] w-[170px] h-[385px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
            </template>
            <template v-else>
              <ProductCard :product-data="BestsellerhoodData" />
            </template>
          </div>
        </template>
        <template #category3>
          <div class="main grid grid-flow-col gap-2 overflow-x-scroll place-items-start">
            <template v-if="isLoading">
              <div v-for="(items) in 10" :key="items"
                class="md:w-[320px] w-[170px] h-[385px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
            </template>
            <template v-else>
              <ProductCard :product-data="BestsellersweatData" />
            </template>
          </div>
          <!-- <ProductSlider1 /> -->
        </template>
      </Tabs>
    </section>

    <section class="max-w-7xl mx-auto md:px-6 px-3 md:pt-10 pt-5">
      <Desc&handle class="border-b-0" />
      <Display2 />
    </section>

    <!-- Testimonials -->
    <section class="w-full mx-auto px-2 md:mt-20">
      <Testimonials />
    </section>
  </div>
</template>
<script setup>
import axios from 'axios'

const teesData = ref([])
const BestsellerteesData = ref([])
const CreatorsGraphicData = ref([])
const CreatorsDropData = ref([])
const CreatorsBasicData = ref([])
const isLoading = ref(true) // To track loading state

// Fetch data using promises
axios.get('https://marjan-backend-production.up.railway.app/products/?category=Graphic')
  .then((response) => {
    teesData.value = response.data.data.sort((a, b) => {
      return b.id - a.id // For numeric values
    })
    CreatorsGraphicData.value = response.data.data.filter(item => item.is_creator_selector)
    BestsellerteesData.value = response.data.data.filter(item => item.is_bestseller)
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })
  .finally(() => {
    isLoading.value = false // Set loading to false when data is fetched
  })
const hoodData = ref([])
const BestsellerhoodData = ref([])


// Fetch data using promises
axios.get('https://marjan-backend-production.up.railway.app/products/?category=Drop')
  .then((response) => {
    hoodData.value = response.data.data.sort((a, b) => {
      return b.id - a.id // For numeric values
    })
    CreatorsDropData.value = response.data.data.filter(item => item.is_creator_selector)
    BestsellerhoodData.value = response.data.data.filter(item => item.is_bestseller)

  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })
  .finally(() => {
    isLoading.value = false // Set loading to false when data is fetched
  })
const sweatData = ref([])
const BestsellersweatData = ref([])

// Fetch data using promises
axios.get('https://marjan-backend-production.up.railway.app/products/?category=Basic')
  .then((response) => {
    sweatData.value = response.data.data.sort((a, b) => {
      return b.id - a.id // For numeric values
    })
    BestsellersweatData.value = response.data.data.filter(item => item.is_creator_selector)
    CreatorsBasicData.value = response.data.data.filter(item => item.is_bestseller)
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
