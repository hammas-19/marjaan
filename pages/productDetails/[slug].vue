<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hiddenScroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hiddenScroll {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
<template>
  <div class="bg-linen">

    <section v-if="apiData" class="max-w-7xl mx-auto md:px-6 px-2 md:py-5 py-2">

      <div class="relative mx-auto py-8">

        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-3">

          <!-- description -->
          <div class="sticky flex flex-col justify-center h-full px-4 ">
            <span></span>
            <div class=" mt-8 flex justify-between">
              <div class="max-w-[35ch] space-y-2">
                <h1 class="text-xl font-bold sm:text-2xl">
                  {{ apiData.name }}
                </h1>

                <!-- <p class="text-sm">Highest Rated Product</p> -->

              </div>

              <p class="text-lg font-bold">Rs {{ apiData.price }}</p>
            </div>

            <div class="mt-4">
              <div class="prose max-w-none">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  veniam dicta beatae eos ex error culpa delectus rem tenetur,
                  architecto quam nesciunt, dolor veritatis nisi minus inventore,
                  rerum at recusandae?
                </p>
              </div>

              <button class="mt-2 text-sm font-medium underline">Read More</button>
            </div>

          </div>

          <!-- Images -->
          <div
            class="hiddenScroll relative flex md:flex-col flex-row gap-4 max-h-screen md:overflow-y-scroll overflow-x-scroll">

            <!-- Swiper -->
            <span class="flex justify-center items-center w-full md:sticky absolute top-1">
              <strong class="rounded-full bg-gray-100 w-fit px-3 py-0.5 text-xs font-medium tracking-wide text-tango">
                <span class="hidden md:block">Swipe Down</span>
                <span class="block md:hidden">Swipe left</span>
              </strong>
            </span>

            <img v-for=" items in 7" alt="Les Paul" :src="apiData.image"
              class="aspect-square w-full rounded-lg object-cover" />
          </div>

          <!-- Add to Cart -->
          <div class="sticky flex flex-col justify-center h-full px-4">
            <span></span>

            <form class="mt-8">
              <fieldset>
                <legend class="mb-1 text-sm font-medium">Color</legend>

                <div class="flex flex-wrap gap-1">
                  <label v-for="(colors) in apiData.available_colours" :key="colors" class="cursor-pointer">
                    <input type="radio" name="color" id="color_tt" class="peer sr-only" />

                    <span
                      class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white hover:text-white hover:bg-[#BF5700] transition-all">
                      {{ colors }}
                    </span>
                  </label>

                  <!-- <label for="color_fr" class="cursor-pointer">
                    <input type="radio" name="color" id="color_fr" class="peer sr-only" />

                    <span
                      class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white hover:text-white hover:bg-red-500 transition-all">
                      Fiesta Red
                    </span>
                  </label>

                  <label for="color_cb" class="cursor-pointer">
                    <input type="radio" name="color" id="color_cb" class="peer sr-only" />

                    <span
                      class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white hover:text-white hover:bg-[#223053] transition-all">
                      Cobalt Blue
                    </span>
                  </label> -->
                </div>
              </fieldset>

              <fieldset class="mt-4">
                <legend class="mb-1 text-sm font-medium">Size</legend>

                <div class="flex flex-wrap gap-1">
                  <label v-for="(sizes) in apiData.available_size" :key="sizes" class="cursor-pointer">
                    <input type="radio" name="size" id="size_xs" class="peer sr-only" />

                    <span
                      class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                      {{ sizes }}
                    </span>
                  </label>

                  <!-- <label for="size_s" class="cursor-pointer">
                    <input type="radio" name="size" id="size_s" class="peer sr-only" />

                    <span
                      class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                      S
                    </span>
                  </label>

                  <label for="size_m" class="cursor-pointer">
                    <input type="radio" name="size" id="size_m" class="peer sr-only" />

                    <span
                      class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                      M
                    </span>
                  </label>

                  <label for="size_l" class="cursor-pointer">
                    <input type="radio" name="size" id="size_l" class="peer sr-only" />

                    <span
                      class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                      L
                    </span>
                  </label>

                  <label for="size_xl" class="cursor-pointer">
                    <input type="radio" name="size" id="size_xl" class="peer sr-only" />

                    <span
                      class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                      XL
                    </span>
                  </label> -->
                </div>
              </fieldset>

              <div class="mt-8 flex gap-4">
                <div>
                  <label for="quantity" class="sr-only">Qty</label>

                  <input type="number" id="quantity" min="1" value="1"
                    class="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" />
                </div>

                <button type="submit"
                  class="block rounded bg-tango px-5 py-3 text-xs font-medium text-white hover:bg-bisonHide transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- <pre>{{ apiData }}</pre> -->

    <!-- Recomendation -->
    <section class="w-full mx-auto md:py-10 py-5 px-2">
      <div>

        <div class="max-w-7xl mx-auto  px-3 flex justify-between items-end border-b md:pb-5 pb-3">

          <div class="flex flex-col text-black">
            <span class="md:text-xl text-sm font-headings">Men's</span>
            <h1 class="md:text-2xl text-xl font-headings">You May aslo Like</h1>
          </div>
          <NuxtLink to="/ProductsTees" class="md:text-xl text-sm">
            View All
          </NuxtLink>

        </div>
        <RelatedProducts class="py-5" />

      </div>
    </section>

  </div>
</template>
<script setup>
import axios from 'axios';

// const route = useRoute()
// const apiData = ref()

// // Construct the URL without encoding
// const url = `https://marjan-backend.up.railway.app/products?filters[slug][$eq]=${route.params.slug}`

// axios.get(url)
//   .then((response) => {
//     apiData.value = response.data.data
//   })
//   .catch((err) => {
//     console.error('Error fetching data:', err)
//   })

const route = useRoute()
const apiData = ref()

// Construct the URL without encoding
const url = `https://marjan-backend.up.railway.app/products?filters[slug][$eq]=${route.params.slug}`

axios.get(url)
  .then((response) => {
    // Filter the data based on the matching slug
    const reponseData = response.data.data.filter(item => item.slug === route.params.slug)
    apiData.value = reponseData[0]
  })
  .catch((err) => {
    console.error('Error fetching data:', err)
  })
</script>