<template>
  <div v-for="(data, index) in props.productData" :key="index"
    class="group hover:border-mineShaft border border-linen w-[120px] sm:w-[120px] xl:w-[140px] lg:w-[140px] md:w-[140px] md:h-[200px] h-[200px] rounded-2xl overflow-hidden"
    :class="{ 'w-[100px] sm:w-[145px] md:w-[180px] xl:w-[260px] lg:w-[210px] md:h-[320px] h-[165px]': props.forCollection === true }">
    <NuxtLink :to="'/productDetails/' + data.slug">

      <div class="relative">
        <img :src="data.image"
          class="object-cover w-[120px] sm:w-[120px] xl:w-[140px] lg:w-[140px] md:w-[140px] md:h-[200px] h-[200px] group-hover:opacity-50 transition-all" alt=""
          :class="{ 'w-[100px] sm:w-[145px] md:w-[180px] xl:w-[260px] lg:w-[210px] md:h-[320px] h-[165px]': props.forCollection === true}">
        <span
          class="text-xs md:text-lg font-medium opacity-0 group-hover:opacity-100 absolute inset-x-0 flex items-center flex-col gap-1 bottom-0 bg-linen py-2 transition-all duration-300">
          {{ data.name }}
          <div class="flex flex-wrap justify-center gap-3">
            <span v-for="(sizes, sIndex) in data.available_size" :="sIndex" class="md:text-base text-xs px-2 rounded-md bg-bisonHide">
                {{ sizes }}
            </span>
          </div>
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
const props = defineProps({
  productData: {
    type: Array,
    default: []
    },
  forCollection: {
    type: Boolean,
    default: false
    }
})
</script>