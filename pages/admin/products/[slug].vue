<template>
  <div>
    <div v-if="pending" class="text-sm text-osloGrey py-10 text-center">Loading product...</div>
    <div v-else-if="!product" class="text-sm text-red-500 py-10 text-center">Product not found.</div>
    <AdminProductForm v-else :initial="product" :is-edit="true" @saved="onSaved" />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const slug = route.params.slug

const { data: product, pending } = await useAsyncData(`admin-product-${slug}`, () =>
  $fetch(`/api/products/${slug}`)
)

const onSaved = () => {
  navigateTo('/admin/products')
}
</script>
