<template>
    <div class="grid grid-cols-2 md:gap-5 gap-1 md:h-[calc(100vh-120px)] h-[calc(100vh-80px)]">

        <GridContainer :title="'Error 404ss'" :slogan="'lets make it worth'" :has-products="hasProducts" image="/gridImages/collection1.webp" class="h-full min-w-full" />
        <GridContainer :title="'Error 404ss'" :slogan="'lets make it worth'" :has-products="hasProducts" image="/gridImages/collection2.webp" class="h-full min-w-full md:row-span-2" />
        <GridContainer :title="'Error 404ss'" :slogan="'lets make it worth'" :has-products="hasProducts" image="/gridImages/collection3.webp" class="h-full min-w-full" />

    </div>
</template>
<script setup>
const hasProducts = false
</script>