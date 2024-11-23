<template>
    <div class="grid grid-cols-2 md:gap-5 gap-1 md:h-[calc(100vh-120px)] h-[calc(100vh-80px)]">

        <NuxtLink to="/productsHood">

            <GridContainer :title="'Hoodies'" :slogan="'Bold Hoodie Vibes'" :has-products="hasProducts"
                image="/gridImages/hoodieLevis.jpg" class="h-full min-w-full" />
        </NuxtLink>
        <NuxtLink to="/productsTees" class="md:row-span-2">

            <GridContainer :title="'T-Shirts'" :slogan="'Tees That Speak'" :has-products="hasProducts"
                image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgI0mcNqamAvThopFCHglVSVRBdOOwizeEbxqg4uImPdruIwkWwGVodzvDXAZbxx8yJxky04_LOjqSlZOn7lvJqiHe_ACnrstnLew9AusJghsGPtLObQrvyeyXHrcdFEU7vXPEQNk62mgIvyvIWXTRVBaXKOAaKTIF2RS2_25QKL1gsh-0HSJFIyWPeJU2U/s16000/TshirtsGif.gif"
                class="h-full min-w-full md:row-span-2" />
        </NuxtLink>
        <NuxtLink to="/productsSweats" class="col-span-2 md:col-span-1">

            <GridContainer :title="'Sweatshirts'" :slogan="'Sweatshirts Done Right'" :has-products="hasProducts"
                image="/gridImages/sweatFloral.jpg" class="h-full min-w-full col-span-2 md:col-span-1" />
        </NuxtLink>

    </div>
</template>
<script setup>
const hasProducts = false
</script>