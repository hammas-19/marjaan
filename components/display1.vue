<template>
    <div class="grid grid-cols-2 md:gap-5 gap-1 md:h-[calc(100vh-120px)] h-[calc(100vh-80px)]">

        <GridContainer :title="'AURA'" :slogan="'Radiate Confidence'" :has-products="hasProducts" image="/gridImages/nightangle1.png" class="h-full min-w-full row-span-2">
            <template #item1>
               <NuxtLink to="/productsTees">
                    T-Shirts
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/productsHood">
                    Hoodies
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/productsSweats">
                    SweatShirts
                </NuxtLink>
            </template>
        </GridContainer>

        <GridContainer :title="'NyctoPhille'" :slogan="'Where Darkness Inspires'" :has-products="hasProducts" :content-left="false" image="/gridImages/henna.jpg" class="min-w-full h-full">
            <template #item1>
               <NuxtLink to="/productsTees">
                    T-Shirts
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/productsHood">
                    Hoodies
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/productsSweats">
                    SweatShirts
                </NuxtLink>
            </template>
        </GridContainer>
        <GridContainer :title="'Restored'" :slogan="'Elegance, Renewed'" :has-products="hasProducts" :content-left="false" image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4zIhCWHjxYgbYydkswPFBYsjMTeAZ7T1AtJd1psL-cWbHaP3Mq_J8aW6e3KzqDz-Sx1Zp63QeqR-c1DXPw7oDn0IEINieuELN8itasMFEf2p2UPaQW70UUS_Y6sVrL6X0uS9SraKD6hISB7KVNj7elhnSVs_LnrFJb9t3ZtjdnEPnAZyW6oWXbh93yaY/s320/404.gif" class="min-w-full h-full">
            <template #item1>
               <NuxtLink to="/productsTees">
                    T-Shirts
                </NuxtLink>
            </template>
            <template #item2>
                <NuxtLink to="/productsHood">
                    Hoodies
                </NuxtLink>
            </template>
            <template #item3>
                <NuxtLink to="/productsSweats">
                    SweatShirts
                </NuxtLink>
            </template>
        </GridContainer>

    </div>
</template>
<script setup>
const hasProducts = true
</script>