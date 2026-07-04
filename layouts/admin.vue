<template>
  <div class="flex h-screen overflow-hidden bg-[#f5f0eb]">

    <!-- Sidebar -->
    <aside class="w-60 bg-codGrey flex flex-col shrink-0 h-screen overflow-y-auto">
      <div class="px-5 pt-6 pb-5">
        <NuxtLink to="/" target="_blank" class="block">
          <img src="/Logo-Dark.png" class="max-w-[88px] invert opacity-90" alt="Rechik" />
        </NuxtLink>
        <span class="mt-2 inline-block text-[10px] font-medium tracking-widest uppercase text-bisonHide/60 border border-bisonHide/20 rounded px-1.5 py-0.5">
          Admin
        </span>
      </div>

      <nav class="flex-1 px-3 py-2 flex flex-col gap-0.5">
        <p class="text-[10px] uppercase tracking-widest text-osloGrey/50 font-medium px-3 py-2 mt-1">Menu</p>
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-bisonHide/70 hover:bg-white/5 hover:text-white transition-all"
          active-class="!bg-purplHeart/90 !text-white shadow-sm"
        >
          <span class="w-4 h-4 shrink-0" v-html="link.icon"></span>
          <span>{{ link.name }}</span>
        </NuxtLink>
      </nav>

      <div class="px-3 py-4 border-t border-white/5">
        <div class="flex items-center gap-2 px-3 py-2 mb-1">
          <div class="w-7 h-7 rounded-full bg-purplHeart/20 flex items-center justify-center text-xs text-purplHeart font-semibold uppercase">
            {{ initial }}
          </div>
          <span class="text-xs text-osloGrey truncate max-w-[120px]">{{ userEmail }}</span>
        </div>
        <button
          @click="logout"
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-bisonHide/60 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Content area -->
    <div class="flex-1 flex flex-col overflow-hidden">

      <!-- Top bar -->
      <header class="h-14 bg-white border-b border-gray-200/80 px-6 flex items-center justify-between shrink-0">
        <h1 class="text-sm font-semibold text-codGrey tracking-tight">{{ pageTitle }}</h1>
        <div class="flex items-center gap-3">
          <div v-if="flushMsg" class="text-[11px]" :class="flushMsg === 'Done!' ? 'text-green-500' : 'text-red-400'">{{ flushMsg }}</div>
          <button
            @click="flushCache"
            :disabled="flushing"
            class="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-md border border-gray-200 text-osloGrey hover:border-purplHeart hover:text-purplHeart transition-all disabled:opacity-40 font-medium"
          >
            <svg class="w-3 h-3" :class="flushing ? 'animate-spin' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            {{ flushing ? 'Flushing…' : 'Flush Cache' }}
          </button>
          <NuxtLink
            to="/admin/products/new"
            class="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-md bg-purplHeart text-white hover:bg-purplHeart/90 transition-all font-medium"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            New Product
          </NuxtLink>
        </div>
      </header>

      <!-- Page slot -->
      <main class="flex-1 overflow-y-auto px-6 py-6">
        <slot />
      </main>

    </div>
  </div>

  <!-- Flush Cache Confirmation Modal -->
  <Teleport to="body">
    <div v-if="showFlushModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showFlushModal = false"></div>
      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">

        <!-- Header -->
        <div class="px-6 pt-6 pb-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-codGrey">Flush Redis Cache?</h3>
              <p class="text-xs text-osloGrey mt-0.5">Only flush when truly necessary</p>
            </div>
          </div>
        </div>

        <!-- Guidance -->
        <div class="px-6 py-4 flex flex-col gap-2">
          <div v-for="item in flushGuide" :key="item.q" class="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div class="flex-1">
              <p class="text-xs text-codGrey font-medium">{{ item.q }}</p>
            </div>
            <span class="text-xs font-semibold shrink-0 px-2 py-0.5 rounded-full" :class="item.flush ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'">
              {{ item.action }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 pb-6 flex gap-3">
          <button
            @click="showFlushModal = false"
            class="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-codGrey hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            @click="confirmFlush"
            :disabled="flushing"
            class="flex-1 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <svg class="w-3.5 h-3.5" :class="flushing ? 'animate-spin' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            {{ flushing ? 'Flushing…' : 'Yes, Flush Cache' }}
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const flushing = ref(false)
const flushMsg = ref('')
const showFlushModal = ref(false)

const flushGuide = [
  { q: 'Used the Admin panel to edit/delete/create?', action: 'Never flush', flush: false },
  { q: 'Edited Supabase directly (SQL or dashboard)?', action: 'Flush needed', flush: true },
  { q: 'Ran npm run import:strapi (CSV import)?', action: 'Flush needed', flush: true },
  { q: 'Stale data stuck and TTL hasn\'t expired yet?', action: 'Flush needed', flush: true },
  { q: 'Normal day-to-day store operation?', action: 'Never flush', flush: false },
]

const userEmail = computed(() => user.value?.email || '')
const initial = computed(() => userEmail.value?.[0]?.toUpperCase() || 'A')

const pageTitle = computed(() => {
  if (route.path === '/admin') return 'Dashboard'
  if (route.path === '/admin/products') return 'Products'
  if (route.path === '/admin/products/new') return 'New Product'
  if (route.path.startsWith('/admin/products/')) return 'Edit Product'
  return 'Admin'
})

const navLinks = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`
  },
]

const flushCache = () => {
  showFlushModal.value = true
}

const confirmFlush = async () => {
  flushing.value = true
  flushMsg.value = ''
  try {
    await $fetch('/api/admin/cache/clear', { method: 'POST' })
    flushMsg.value = 'Done!'
    showFlushModal.value = false
    setTimeout(() => { flushMsg.value = '' }, 3000)
  } catch {
    flushMsg.value = 'Failed'
  } finally {
    flushing.value = false
  }
}

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/admin/login')
}
</script>
