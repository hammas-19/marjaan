<template>
    <div class="grid grid-cols-2 md:gap-5 gap-1 md:h-[calc(100vh-120px)] h-[calc(100vh-180px)]">

        <GridContainer :title="'AURA'" :slogan="'Radiate Confidence'" :has-products="hasProducts"
            image="/gridImages/RRR.jpg" class="h-full min-w-full row-span-2">
            <template #item1>
                <NuxtLink to="/collection?collection=aura&category=tshirts">
                    T-Shirts
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/collection?collection=aura&category=hoodies">
                    Hoodies
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/collection?collection=aura&category=sweatshirts">
                    SweatShirts
                </NuxtLink>
            </template>
        </GridContainer>

        <GridContainer :title="'NyctoPhille'" :slogan="'Where Darkness Inspires'" :has-products="hasProducts"
            :content-left="false" image="/gridImages/GenNeon1.0.jpg" class="min-w-full h-full">
            <template #item1>
                <NuxtLink to="/collection?collection=nyctophile&category=tshirts">
                    T-Shirts
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/collection?collection=nyctophile&category=hoodies">
                    Hoodies
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/collection?collection=nyctophile&category=sweatshirts">
                    SweatShirts
                </NuxtLink>
            </template>
        </GridContainer>
        <GridContainer :title="'Restored'" :slogan="'Elegance, Renewed'" :has-products="hasProducts"
            :content-left="false" image="/gridImages/FreedomXNB.jpg" class="min-w-full h-full">
            <template #item1>
                <NuxtLink to="/collection?collection=restored&category=tshirts">
                    T-Shirts
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/collection?collection=restored&category=hoodies">
                    Hoodies
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/collection?collection=restored&category=sweatshirts">
                    SweatShirts
                </NuxtLink>
            </template>
        </GridContainer>

    </div>
</template>
<script setup>
const hasProducts = true
</script>