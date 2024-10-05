<template>
  <div v-for="(data, index) in props.productData" :key="index"
    class="group hover:border-mineShaft border border-linen bg-[url('')] w-[120px] lg:w-[140px] h-[200px] rounded-2xl overflow-hidden">
    <NuxtLink to="/productDetail">

      <div class="relative">
        <img :src="data.image"
        class="object-cover w-[120px] lg:w-[140px] h-[200px] group-hover:opacity-50 transition-all" alt="">
        <span
        class="text-xs opacity-0 group-hover:opacity-100 absolute inset-x-0 flex items-center flex-col gap-1 bottom-0 bg-linen py-2 transition-all duration-300">
        {{ data.name }}
        <svg class="h-5 w-fit" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor"
          d="M11 9V6H8V4h3V1h2v3h3v2h-3v3zM7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4z" />
        </svg>
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
    }
})
</script>