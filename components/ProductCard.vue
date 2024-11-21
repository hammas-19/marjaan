<template>
  <div v-for="(data, index) in props.productData" :key="index"
    class="group hover:border-mineShaft md:w-[320px] w-[170px] md:h-[385px] h-[320px]  md:rounded-2xl rounded-lg overflow-hidden">
    <NuxtLink :to="'/productDetails/' + data.slug">
      <div class="relative">
        <img :src="data.image"
          class="object-cover md:w-[320px] w-[170px] md:h-[385px] h-[260px] group-hover:opacity-90 transition-all md:rounded-2xl rounded-lg"
          alt="">
        <div
          class="hidden opacity-0 group-hover:opacity-100 absolute inset-x-0 md:grid grid-cols-3 gap-7 bottom-0 bg-linen transition-all duration-300 px-2 py-3">
          <p class="font-headings text-xs md:text-2xl font-medium grid w-full col-span-2">
            {{ data.name }}
          </p>
          <p class="text-xs justify-self-end col-span-1">
            Rs: <strong class="text-sm md:text-lg">{{ data.price }}</strong>
          </p>
          <div class="col-span-2 flex flex-col gap-2">
            <div class="flex gap-1">
              <template v-for="(color, cIndex) in data.available_colours" :key="cIndex">
                <NuxtLink :to="'/productDetails/' + color.slug" class="text-xs p-2 rounded-md border border-codGrey"
                  :style="{ backgroundColor: color.color }">
                </NuxtLink>
              </template>
            </div>
            <div class="grid grid-cols-4 gap-1 w-fit">
              <span v-for="(sizes, sIndex) in data.available_size" :key="sIndex"
                class="text-xs px-2 rounded-md bg-bisonHide w-fit">
                {{ sizes }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
    <div
      class="md:hidden grid grid-cols-3 gap-1 bg-linen transition-all duration-300 md:p-1 py-1 md:py-0  h-full max-h-[90px] justify-between rounded-md p-1 mt-[2px]">
      <p class="font-headings text-xs md:text-2xl font-medium grid w-full col-span-2">
        {{ data.name }}
      </p>
      <p class="text-[8px] justify-self-end col-span-1 text-right">
        Rs: <span class="text-sm md:text-lg md:font-bold font-semibold ">{{ data.price }}</span>
      </p>
      <!-- <div class="col-span-3 flex flex-col gap-2">
        <div class="flex gap-1">
          <span v-for="(color, cIndex) in data.available_colours" :key="cIndex"
            class="text-xs md:p-2 p-1 rounded-md" :style="{ backgroundColor: color }"></span>
        </div>
        <div class="grid grid-cols-4 gap-1 w-fit">
          <span v-for="(sizes, sIndex) in data.available_size" :key="sIndex"
            class="text-xs md:px-2 px-1 rounded-md bg-bisonHide w-fit">
            {{ sizes }}
          </span>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  productData: {
    type: Array,
    default: []
    }
})
</script>