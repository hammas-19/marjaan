<template>
    <div class="grid grid-cols-2 md:gap-5 gap-1 md:h-[calc(100vh-120px)] h-[calc(100vh-80px)]">

        <GridContainer :title="'Core'" :slogan="'lets make it worth'" :has-products="hasProducts" image="/gridImages/core.png" class="h-full min-w-full" />
        <GridContainer :title="'AURA'" :slogan="'lets make it worth'" :has-products="hasProducts" image="/gridImages/tokyo.jpg" class="h-full min-w-full md:row-span-2" />
        <GridContainer :title="'NyctoPhille'" :slogan="'lets make it worth'" :has-products="hasProducts" image="/gridImages/flora.png" class="h-full min-w-full col-span-2 md:col-span-1" />

    </div>
</template>
<script setup>
const hasProducts = false
</script>