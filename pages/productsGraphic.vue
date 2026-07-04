<template>
  <div class="bg-linen">
    <!-- <pre>
    {{ teesData }}
</pre> -->
    <!-- Gallery -->
    <section class="mx-auto px-2 md:px-5 py-10">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-3 md:gap-5 justify-items-center">
        <!-- The poster -->
        <div
          class="relative bg-moss rounded-3xl w-full max-w-3xl overflow-hidden opacity-90 hover:opacity-100 transition-all duration-300 col-span-2 md:h-[385px]">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgI0mcNqamAvThopFCHglVSVRBdOOwizeEbxqg4uImPdruIwkWwGVodzvDXAZbxx8yJxky04_LOjqSlZOn7lvJqiHe_ACnrstnLew9AusJghsGPtLObQrvyeyXHrcdFEU7vXPEQNk62mgIvyvIWXTRVBaXKOAaKTIF2RS2_25QKL1gsh-0HSJFIyWPeJU2U/s16000/TshirtsGif.gif"
            class="object-cover h-full w-full" alt="Rechik Graphic T-shirts">
          <div
            class="absolute md:bottom-5 bottom-2 left-5 flex flex-col md:gap-2 gap-1 md:max-w-[250px] max-w-[180px] bg-graphite p-5 rounded-2xl bg-opacity-40 backdrop-blur-md">
            <h1 class="md:text-6xl text-2xl font-headings font-bold text-white">Graphic Tees</h1>
            <span class="text-white md:text-lg text-sm">
              That Speak
            </span>
          </div>
        </div>
        <!-- <pre>{{ teesData }}</pre> -->
        <template v-if="!teesData.length">
          <div v-for="(items) in 6" :key="items"
            class="md:w-[320px] w-[170px] h-[385px] md:rounded-2xl rounded-lg bg-bisonHide animate-pulse" />
        </template>
        <template v-else>
          <ProductCard :product-data="teesData" />
        </template>
      </div>
    </section>

  </div>
</template>
<script setup>
const teesData = ref([])

onMounted(async () => {
  try {
    teesData.value = await useProductsByCategory('Graphic')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
