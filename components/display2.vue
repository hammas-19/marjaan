<template>
    <div class="grid grid-cols-2 md:gap-5 gap-1 md:h-[calc(100vh-120px)] h-[calc(100vh-80px)]">

        <GridContainer :title="'Hoodies'" :slogan="'lets make it worth'" :has-products="hasProducts"
            image="/gridImages/core.png" class="h-full min-w-full" />
        <GridContainer :title="'T-Shirts'" :slogan="'lets make it worth'" :has-products="hasProducts"
            image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgI0mcNqamAvThopFCHglVSVRBdOOwizeEbxqg4uImPdruIwkWwGVodzvDXAZbxx8yJxky04_LOjqSlZOn7lvJqiHe_ACnrstnLew9AusJghsGPtLObQrvyeyXHrcdFEU7vXPEQNk62mgIvyvIWXTRVBaXKOAaKTIF2RS2_25QKL1gsh-0HSJFIyWPeJU2U/s16000/TshirtsGif.gif"
            class="h-full min-w-full md:row-span-2" />
        <GridContainer :title="'Sweatshirts'" :slogan="'lets make it worth'" :has-products="hasProducts"
            image="/gridImages/flora.png" class="h-full min-w-full col-span-2 md:col-span-1" />

    </div>
</template>
<script setup>
const hasProducts = false
</script>