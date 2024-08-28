<template>
  <div v-for="(data, index) in props.productData" :key="index" class="border-2 bg-[url('')] w-[120px] lg:w-[140px] h-fit rounded-2xl overflow-hidden">
    <img :src="data.image" alt="">
    <span class="text-xs">
      {{ data.name }}
    </span>
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