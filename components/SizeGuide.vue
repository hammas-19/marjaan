<template>
  <div class="modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">

    <div class="modal-content bg-white p-6 md:rounded-2xl rounded-lg shadow-lg text-center max-w-[620px] w-full">
      <slot name="closeModal" />
      <h2 class="text-sm font-semibold mb-4">
        Size Guide
      </h2>
      <div class="buttons flex justify-center space-x-4 mb-6">
        <button class="md:w-10 w-5 md:h-10 h-5 text-center text-xs text-white rounded-full hover:bg-tan"
          @click="setSize('S')" :class="selectedSize === 'S' ? 'bg-tango' : 'bg-mineShaft'">
          S
        </button>
        <button class="md:w-10 w-5 md:h-10 h-5 text-center text-xs text-white rounded-full hover:bg-tan"
          @click="setSize('M')" :class="selectedSize === 'M' ? 'bg-tango' : 'bg-mineShaft'">
          M
        </button>
        <button class="md:w-10 w-5 md:h-10 h-5 text-center text-xs text-white rounded-full hover:bg-tan"
          @click="setSize('L')" :class="selectedSize === 'L' ? 'bg-tango' : 'bg-mineShaft'">
          L
        </button>
        <button class="md:w-10 w-5 md:h-10 h-5 text-center text-xs text-white rounded-full hover:bg-tan"
          @click="setSize('XL')" :class="selectedSize === 'XL' ? 'bg-tango' : 'bg-mineShaft'">
          XL
        </button>
      </div>
      <div class="image-container max-h-[260px]  w-full">
        <img :src="currentImage" :alt="`Image for size ${selectedSize}`" class="w-full rounded">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define images for each size
const images = {
  S: '/sizes/small.jpg',
  M: '/sizes/medium.jpg',
  L: '/sizes/large.jpg',
  XL: '/sizes/xLarge.jpg'
}

// Reactive state for the selected size
const selectedSize = ref('S')

// Computed property for the current image
const currentImage = computed(() => images[selectedSize.value])

// Method to set the size
function setSize(size) {
  selectedSize.value = size
}
</script>

<style scoped></style>
