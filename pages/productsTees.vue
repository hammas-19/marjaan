<template>
  <div class="bg-linen">
    <!-- <pre>
    {{ teesData }}
</pre> -->
    <!-- Gallery -->
    <section class="max-w-7xl mx-auto px-2 py-10">
      <div class="flex flex-wrap justify-center md:gap-5 gap-2">
        <!-- The poster -->
        <div
          class="relative bg-moss rounded-3xl w-full max-w-sm lg:max-w-lg overflow-hidden opacity-90 hover:opacity-100 transition-all duration-300 col-span-2">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgI0mcNqamAvThopFCHglVSVRBdOOwizeEbxqg4uImPdruIwkWwGVodzvDXAZbxx8yJxky04_LOjqSlZOn7lvJqiHe_ACnrstnLew9AusJghsGPtLObQrvyeyXHrcdFEU7vXPEQNk62mgIvyvIWXTRVBaXKOAaKTIF2RS2_25QKL1gsh-0HSJFIyWPeJU2U/s16000/TshirtsGif.gif"
            class="object-cover h-full w-full" alt="">
          <div
            class="absolute md:bottom-5 bottom-2 left-5 flex flex-col md:gap-2 gap-1 md:max-w-[250px] max-w-[180px] bg-graphite p-5 rounded-2xl bg-opacity-40 backdrop-blur-md">
            <h1 class="md:text-6xl text-2xl font-headings font-bold text-white">T-shirts</h1>
            <span class="text-white md:text-lg text-sm">
              Your State of Mind
            </span>
          </div>
        </div>
        <!-- <pre>{{ teesData }}</pre> -->
        <template v-if="!teesData.length">
          <div v-for="(items) in 10" :key="items"
            class="w-[120px] md:w-[140px] lg:w-[210px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
        </template>
        <template v-else>
          <ProductCard :product-data="teesData" :for-collection="true" class="" />
        </template>
      </div>
    </section>

  </div>
</template>
<script setup>
import axios from 'axios'

const teesData = ref([])

// Fetch the data and sort in descending order
axios.get('https://marjan-backend.up.railway.app/products/?category=Tshirts')
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
