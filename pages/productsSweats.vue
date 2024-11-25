<template>
  <div class="bg-linen">

    <!-- Gallery -->
    <section class="max-w-7xl mx-auto px-2 py-10">
      <div class="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:gap-10 gap-1">
        <!-- The poster -->
        <div
          class="relative bg-moss rounded-3xl w-full max-w-3xl overflow-hidden opacity-90 hover:opacity-100 transition-all duration-300 col-span-2">
          <img
            src="https://alphaleteathletics.com/cdn/shop/collections/m_better_in_black_2500x1050_crop_center.jpg?v=1725726009"
            class="object-cover h-full w-full" alt="">
          <div
            class="absolute md:bottom-5 bottom-2 left-5 flex flex-col md:gap-2 gap-1 md:max-w-[250px] max-w-[180px] bg-graphite p-5 rounded-2xl bg-opacity-40 backdrop-blur-md">

            <h1 class="md:text-6xl text-2xl font-headings font-bold text-white">Sweatshirts</h1>
            <span class="text-white md:text-lg text-sm">
              Your State of Mind
            </span>

          </div>

        </div>

        <ProductCard :product-data="teesData" />


      </div>
    </section>

  </div>
</template>
<script setup>
import axios from 'axios'

const teesData = ref([])

// Fetch the data and sort in descending order
axios.get('https://marjan-backend.up.railway.app/products/?category=SweatShirts')
  .then(response => {
    teesData.value = response.data.data.sort((a, b) => {
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