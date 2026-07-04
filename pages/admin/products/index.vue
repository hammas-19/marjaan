<template>
  <div class="flex flex-col gap-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purplHeart w-64"
        />
        <select v-model="filterCategory" class="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purplHeart">
          <option value="">All Categories</option>
          <option value="Graphic">Graphic</option>
          <option value="Drop">Drop</option>
          <option value="Basic">Basic</option>
        </select>
      </div>
      <NuxtLink
        to="/admin/products/new"
        class="flex items-center gap-2 px-4 py-2 bg-purplHeart text-white rounded-lg text-sm font-medium hover:bg-purplHeart/90 transition-all"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Add Product
      </NuxtLink>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="overflow-y-auto max-h-[calc(100vh-220px)]">
      <table class="w-full text-sm">
        <thead class="sticky top-0 z-10">
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="text-left px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">Product</th>
            <th class="text-left px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">Category</th>
            <th class="text-left px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">Collection</th>
            <th class="text-left px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">Price</th>
            <th class="text-center px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">New</th>
            <th class="text-center px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">Best</th>
            <th class="text-center px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">Stock</th>
            <th class="text-right px-4 py-3 text-xs font-semibold text-osloGrey uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in filtered"
            :key="product.id"
            class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                  @error="(e) => e.target.src = 'https://placehold.co/40x40?text=?'"
                />
                <div>
                  <p class="font-medium text-codGrey">{{ product.name }}</p>
                  <p class="text-xs text-osloGrey">{{ product.slug }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-codGrey">{{ product.category }}</td>
            <td class="px-4 py-3 text-codGrey">{{ product.collection }}</td>
            <td class="px-4 py-3 text-codGrey font-medium">Rs {{ product.price }}</td>
            <td class="px-4 py-3 text-center">
              <button @click="toggle(product, 'is_new')" :class="product.is_new ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-osloGrey'" class="px-2 py-0.5 rounded-full text-xs font-medium transition-colors">
                {{ product.is_new ? 'Yes' : 'No' }}
              </button>
            </td>
            <td class="px-4 py-3 text-center">
              <button @click="toggle(product, 'is_bestseller')" :class="product.is_bestseller ? 'bg-tango/10 text-tango' : 'bg-gray-100 text-osloGrey'" class="px-2 py-0.5 rounded-full text-xs font-medium transition-colors">
                {{ product.is_bestseller ? 'Yes' : 'No' }}
              </button>
            </td>
            <td class="px-4 py-3 text-center">
              <button @click="toggle(product, 'is_out_of_stock')" :class="product.is_out_of_stock ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'" class="px-2 py-0.5 rounded-full text-xs font-medium transition-colors">
                {{ product.is_out_of_stock ? 'Out' : 'In Stock' }}
              </button>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/admin/products/${product.slug}`"
                  class="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-codGrey hover:border-purplHeart hover:text-purplHeart transition-all"
                >
                  Edit
                </NuxtLink>
                <button
                  @click="confirmDelete(product)"
                  class="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-codGrey hover:border-red-400 hover:text-red-500 transition-all"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="8" class="px-4 py-10 text-center text-osloGrey text-sm">No products found</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    <p class="text-xs text-osloGrey">{{ filtered.length }} of {{ products.length }} products</p>

    <!-- Delete confirmation modal -->
    <div v-if="deleteTarget" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 class="text-base font-semibold text-codGrey">Delete "{{ deleteTarget.name }}"?</h3>
        <p class="text-sm text-osloGrey mt-1">This action cannot be undone.</p>
        <div class="flex gap-3 mt-5">
          <button @click="deleteTarget = null" class="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-codGrey hover:bg-gray-50">Cancel</button>
          <button @click="deleteProduct" :disabled="deleting" class="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-60">
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const search = ref('')
const filterCategory = ref('')
const deleteTarget = ref(null)
const deleting = ref(false)

const { data: productsData, refresh } = await useAsyncData('admin-products', () =>
  $fetch('/api/admin/products')
)

const products = computed(() => productsData.value || [])

const filtered = computed(() => {
  let list = products.value
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q))
  }
  if (filterCategory.value) {
    list = list.filter(p => p.category === filterCategory.value)
  }
  return list
})

const toggle = async (product, field) => {
  product[field] = !product[field]
  try {
    await $fetch(`/api/products/${product.slug}`, {
      method: 'PUT',
      body: { ...product }
    })
  } catch {
    product[field] = !product[field]
  }
}

const confirmDelete = (product) => {
  deleteTarget.value = product
}

const deleteProduct = async () => {
  if (!deleteTarget.value) return
  deleting.value = true
  const slug = deleteTarget.value.slug
  try {
    await $fetch(`/api/products/${slug}`, { method: 'DELETE' })
    productsData.value = productsData.value.filter(p => p.slug !== slug)
  } catch (err) {
    alert(err?.data?.statusMessage || 'Delete failed')
  } finally {
    deleteTarget.value = null
    deleting.value = false
  }
}
</script>
