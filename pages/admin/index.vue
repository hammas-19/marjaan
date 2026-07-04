<template>
  <div class="flex flex-col gap-5">

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <p class="text-[11px] text-osloGrey font-medium uppercase tracking-wider">{{ stat.label }}</p>
          <span class="text-lg" v-html="stat.icon"></span>
        </div>
        <p class="text-3xl font-semibold text-codGrey font-headings">{{ stat.value }}</p>
        <p v-if="stat.sub" class="text-[11px]" :class="stat.subColor || 'text-osloGrey'">{{ stat.sub }}</p>
      </div>
    </div>

    <!-- Middle row: Category + Collection -->
    <div class="grid grid-cols-2 gap-4">

      <!-- By Category -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <h2 class="text-xs font-semibold text-codGrey uppercase tracking-wider mb-4">By Category</h2>
        <div class="flex flex-col gap-3">
          <div v-for="cat in categoryBreakdown" :key="cat.name" class="flex items-center gap-3">
            <span class="text-sm text-codGrey w-20 shrink-0">{{ cat.name }}</span>
            <div class="flex-1 bg-gray-100 rounded-full h-1.5">
              <div class="bg-purplHeart h-1.5 rounded-full" :style="{ width: `${(cat.count / totalProducts) * 100}%` }"></div>
            </div>
            <span class="text-xs text-osloGrey w-5 text-right tabular-nums">{{ cat.count }}</span>
          </div>
        </div>
      </div>

      <!-- By Collection -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <h2 class="text-xs font-semibold text-codGrey uppercase tracking-wider mb-4">By Collection</h2>
        <div class="flex flex-col gap-3">
          <div v-for="col in collectionBreakdown" :key="col.name" class="flex items-center gap-3">
            <span class="text-sm text-codGrey w-28 shrink-0">{{ col.name }}</span>
            <div class="flex-1 bg-gray-100 rounded-full h-1.5">
              <div class="bg-tango h-1.5 rounded-full" :style="{ width: `${(col.count / totalProducts) * 100}%` }"></div>
            </div>
            <span class="text-xs text-osloGrey w-5 text-right tabular-nums">{{ col.count }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom row: Recent + Out of Stock -->
    <div class="grid grid-cols-2 gap-4">

      <!-- Recently Added -->
      <div class="bg-white rounded-xl border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xs font-semibold text-codGrey uppercase tracking-wider">Recently Added</h2>
          <NuxtLink to="/admin/products" class="text-[11px] text-purplHeart hover:underline">View all</NuxtLink>
        </div>
        <div class="flex flex-col gap-2">
          <div v-for="p in recentProducts" :key="p.id" class="flex items-center gap-3">
            <img :src="p.image" :alt="p.name" class="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" @error="(e) => e.target.src = 'https://placehold.co/36x36?text=?'" />
            <div class="flex-1 min-w-0">
              <p class="text-sm text-codGrey truncate">{{ p.name }}</p>
              <p class="text-[11px] text-osloGrey">{{ p.category }} · Rs {{ p.price }}</p>
            </div>
            <NuxtLink :to="`/admin/products/${p.slug}`" class="text-[11px] text-purplHeart shrink-0 hover:underline">Edit</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Out of Stock + Creator Selectors -->
      <div class="flex flex-col gap-4">
        <div class="bg-white rounded-xl border border-gray-100 p-5 flex-1">
          <h2 class="text-xs font-semibold text-codGrey uppercase tracking-wider mb-3">Out of Stock</h2>
          <div v-if="outOfStock.length === 0" class="text-sm text-osloGrey">All products in stock ✓</div>
          <div v-else class="flex flex-col gap-2">
            <div v-for="p in outOfStock" :key="p.id" class="flex items-center justify-between">
              <div>
                <p class="text-sm text-codGrey">{{ p.name }}</p>
                <p class="text-[11px] text-osloGrey">{{ p.category }}</p>
              </div>
              <NuxtLink :to="`/admin/products/${p.slug}`" class="text-[11px] px-2 py-1 border border-red-200 text-red-400 rounded-md hover:bg-red-50">Restock</NuxtLink>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 p-5 flex-1">
          <h2 class="text-xs font-semibold text-codGrey uppercase tracking-wider mb-1">Creator Selectors</h2>
          <p class="text-3xl font-semibold text-codGrey font-headings">{{ creatorCount }}</p>
          <p class="text-[11px] text-osloGrey mt-0.5">featured in creator section</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: products } = await useAsyncData('admin-dashboard', () =>
  $fetch('/api/admin/products')
)

const totalProducts = computed(() => products.value?.length || 0)

const stats = computed(() => {
  const p = products.value || []
  const outCount = p.filter(x => x.is_out_of_stock).length
  return [
    { label: 'Total Products', value: p.length, icon: '📦' },
    { label: 'New Arrivals', value: p.filter(x => x.is_new).length, icon: '✨', sub: 'marked as new' },
    { label: 'Bestsellers', value: p.filter(x => x.is_bestseller).length, icon: '🔥', sub: 'top performers' },
    { label: 'Out of Stock', value: outCount, icon: '⚠️', sub: outCount > 0 ? 'needs attention' : 'all stocked', subColor: outCount > 0 ? 'text-red-400' : 'text-green-500' },
  ]
})

const categoryBreakdown = computed(() => {
  const p = products.value || []
  const map = {}
  p.forEach(item => { map[item.category] = (map[item.category] || 0) + 1 })
  return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
})

const collectionBreakdown = computed(() => {
  const p = products.value || []
  const map = {}
  p.forEach(item => { if (item.collection) map[item.collection] = (map[item.collection] || 0) + 1 })
  return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
})

const recentProducts = computed(() => (products.value || []).slice(0, 6))

const outOfStock = computed(() => (products.value || []).filter(x => x.is_out_of_stock).slice(0, 5))

const creatorCount = computed(() => (products.value || []).filter(x => x.is_creator_selector).length)
</script>
