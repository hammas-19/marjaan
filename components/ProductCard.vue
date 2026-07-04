<template>
  <div
    v-for="(data, index) in props.productData"
    :key="index"
    class="group md:w-[320px] w-[170px] shrink-0 flex flex-col"
  >
    <NuxtLink :to="'/productDetails/' + data.slug" class="block">
      <!-- Image wrapper -->
      <div class="relative md:rounded-2xl rounded-xl overflow-hidden md:h-[385px] h-[220px]">
        <img
          :src="data.image"
          :alt="data.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          :class="data.is_out_of_stock ? 'grayscale-[40%]' : ''"
        />

        <!-- Badges top-left -->
        <div class="absolute top-2 left-2 flex flex-col gap-1">
          <span
            v-if="data.is_new"
            class="text-[10px] md:text-xs text-white bg-tango px-2.5 py-0.5 rounded-full font-semibold w-fit"
          >New</span>
          <span
            v-if="data.is_out_of_stock"
            class="text-[10px] md:text-xs text-white bg-osloGrey px-2.5 py-0.5 rounded-full font-semibold w-fit"
          >Out of Stock</span>
        </div>

        <!-- Hover overlay — desktop only -->
        <div
          class="hidden md:flex absolute inset-x-0 bottom-0 flex-col gap-2 px-3 py-3 bg-linen/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
        >
          <div class="flex items-start justify-between gap-2">
            <p class="font-headings text-base font-semibold text-codGrey leading-tight line-clamp-2">{{ data.name }}</p>
            <p class="text-xs text-codGrey shrink-0 mt-0.5">Rs <strong class="text-base">{{ data.price }}</strong></p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex gap-1.5 flex-wrap">
              <NuxtLink
                v-for="(color, cIndex) in data.available_colours"
                :key="cIndex"
                :to="'/productDetails/' + color.slug"
                class="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-codGrey/20 hover:ring-tango transition-all"
                :style="{ backgroundColor: color.color }"
                :title="color.slug"
              />
            </div>
            <div class="flex gap-1 flex-wrap justify-end">
              <span
                v-for="(size, sIndex) in data.available_size"
                :key="sIndex"
                class="text-[10px] px-1.5 py-0.5 rounded bg-bisonHide text-codGrey font-medium"
              >{{ size }}</span>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- Mobile info panel -->
    <div class="md:hidden flex justify-between items-start gap-1 mt-1.5 px-0.5">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-semibold text-codGrey leading-tight line-clamp-2 font-headings">{{ data.name }}</p>
        <div class="flex gap-1 mt-1 flex-wrap">
          <span
            v-for="(color, cIndex) in data.available_colours"
            :key="cIndex"
            class="w-3 h-3 rounded-full border border-white shadow-sm ring-1 ring-codGrey/20"
            :style="{ backgroundColor: color.color }"
          />
        </div>
      </div>
      <p class="text-[10px] text-codGrey shrink-0 text-right leading-tight">
        Rs<br><strong class="text-sm font-bold">{{ data.price }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  productData: {
    type: Array,
    default: () => []
  }
})
</script>