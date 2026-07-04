<template>
  <!-- Sticky navbar bar -->
  <nav class="relative bg-linen">
    <div class="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">

      <!-- Logo -->
      <NuxtLink to="/" class="shrink-0">
        <img src="/Logo-Dark.png" class="h-7 w-auto" alt="Rechik Logo" />
      </NuxtLink>

      <!-- Desktop links -->
      <span class="hidden lg:flex items-center gap-1">
        <NuxtLink
          v-for="link in NavbarLink"
          :key="link.href"
          :to="link.href"
          :active-class="'text-tango'"
          class="text-sm px-4 py-5 font-medium text-codGrey hover:text-tango transition-colors border-b-2 border-transparent hover:border-tango/30"
        >
          {{ link.name }}
        </NuxtLink>
      </span>

      <!-- Right side: cart + mobile hamburger -->
      <div class="flex items-center gap-3">
        <!-- Cart -->
        <NuxtLink to="/cart" class="relative p-2 hover:bg-black/5 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-codGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span
            v-if="cartStore.items.length"
            class="absolute -top-0.5 -right-0.5 flex items-center justify-center bg-tango text-white text-[10px] font-bold w-4 h-4 rounded-full leading-none"
          >{{ cartStore.items.length }}</span>
        </NuxtLink>

        <!-- Hamburger — mobile only -->
        <button
          @click="open = !open"
          class="lg:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
          :aria-expanded="open"
          aria-label="Toggle menu"
        >
          <svg v-if="!open" class="w-5 h-5 text-codGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-5 h-5 text-codGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile drawer — slides down below the navbar -->
    <Transition name="drawer">
      <div v-if="open" class="lg:hidden bg-linen px-4 pb-6 pt-2">
        <NuxtLink
          v-for="link in NavbarLink"
          :key="link.href"
          :to="link.href"
          :active-class="'text-tango font-semibold'"
          class="flex items-center gap-3 py-3.5 text-base font-medium text-codGrey border-b border-gray-100 last:border-0 hover:text-tango transition-colors"
          @click="open = false"
        >
          {{ link.name }}
          <svg class="w-4 h-4 ml-auto text-osloGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { useCartStore } from '@/stores/CartStore'

const open = ref(false)
const cartStore = useCartStore()

const NavbarLink = [
  { name: 'Graphic Tees', href: '/productsGraphic' },
  { name: 'Drop Shoulders', href: '/productsDrop' },
  { name: 'Basics', href: '/productsBasic' },
  { name: 'Collections', href: '/collection' },
]
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active { transition: all 0.25s ease; }
.drawer-enter-from,
.drawer-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
