<template>
  <AdminProductForm @saved="onSaved" />
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const onSaved = (slug) => {
  navigateTo('/admin/products')
}
</script>
