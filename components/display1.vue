<template>
    <div class="grid grid-cols-2 md:gap-5 gap-1 md:h-[calc(100vh-120px)] h-[calc(100vh-180px)]">

        <GridContainer :title="'AURA'" :slogan="'Radiate Confidence'" :has-products="hasProducts"
            image="/gridImages/AurasPoster.jpg" class="h-full min-w-full row-span-2">
            <template #item1>
                <NuxtLink to="/collection?collection=aura&category=graphic">
                    Graphic
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/collection?collection=aura&category=drop">
                    Drops
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/collection?collection=aura&category=basic">
                    Basics
                </NuxtLink>
            </template>
        </GridContainer>

        <GridContainer :title="'NyctoPhille'" :slogan="'Where Darkness Inspires'" :has-products="hasProducts"
            :content-left="false" image="/gridImages/NyctospPoster.jpg" class="min-w-full h-full">
            <template #item1>
                <NuxtLink to="/collection?collection=nyctophile&category=graphic">
                    Graphic
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/collection?collection=nyctophile&category=drop">
                    Drops
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/collection?collection=nyctophile&category=basic">
                    Basics
                </NuxtLink>
            </template>
        </GridContainer>
        <GridContainer :title="'Restored'" :slogan="'Elegance, Renewed'" :has-products="hasProducts"
            :content-left="false" image="/gridImages/RestsPoster.jpg" class="min-w-full h-full">
            <template #item1>
                <NuxtLink to="/collection?collection=restored&category=graphic">
                    Graphic
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/collection?collection=restored&category=drop">
                    Drops
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/collection?collection=restored&category=basic">
                    Basics
                </NuxtLink>
            </template>
        </GridContainer>

    </div>
</template>
<script setup>
const hasProducts = true
</script>