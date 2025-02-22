<template>
  <div class="bg-linen">

    <!-- Gallery -->
    <section class="max-w-7xl mx-auto px-2 py-10">
      <div class="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:gap-10 gap-1">
        <!-- The poster -->
        <div
          class="relative bg-moss rounded-3xl w-full max-w-3xl overflow-hidden transition-all duration-300 col-span-2 md:h-[385px]">

          <img src="/gridImages/basicPoster.png" class="object-cover h-full w-full"
            alt="Rechik Basic Tees in stylish modern designs">
          <div
            class="absolute md:bottom-5 bottom-2 left-5 flex flex-col md:gap-2 gap-1 md:max-w-[250px] max-w-[180px] bg-graphite p-5 rounded-2xl bg-opacity-40 backdrop-blur-md">

            <h1 class="md:text-4xl text-2xl font-headings font-bold text-white">Basics</h1>
            <span class="text-white md:text-lg text-sm">
              Basic Done Right
            </span>

          </div>

        </div>

        <template v-if="!sweatData.length">
          <div v-for="(items) in 6" :key="items"
            class="md:w-[320px] w-[170px] h-[385px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
        </template>
        <template v-else>
          <ProductCard :product-data="sweatData" />
        </template>


      </div>
    </section>

  </div>
</template>
<script setup>
import axios from 'axios'

const sweatData = ref([])

// Fetch the data and sort in descending order
axios.get('https://marjan-backend-production.up.railway.app/products/?category=Basic')
  .then(response => {
    sweatData.value = response.data.data.sort((a, b) => {
      // Replace 'property' with the actual property you want to sort by
      return b.id - a.id // For numeric values
      // For string properties, use localeCompare:
      // return b.property.localeCompare(a.property)
    })
  })
  .catch(error => {
    console.error('Error fetching data:', error)
  })
</script>