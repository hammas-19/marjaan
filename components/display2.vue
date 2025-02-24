<template>
  <div class="grid grid-cols-2 md:gap-5 gap-1">

    <NuxtLink to="/productsDrop">
      <GridContainer :title="'Drop Shoulders'" :slogan="'Baggy vibes'" :has-products="hasProducts"
        image="/gridImages/dropCover.png" class="h-full min-w-full" />
    </NuxtLink>
    <NuxtLink to="/productsBasic" class="md:row-span-2">
      <GridContainer :title="'Basics'" :slogan="'Basics Done Right'" :has-products="hasProducts"
        image="/gridImages/basicPoster.png" class="h-full min-w-full md:row-span-2" />
    </NuxtLink>
    <NuxtLink to="/productsGraphic" class="col-span-2 md:col-span-1">
      <GridContainer :title="'Graphic Tees'" :slogan="'That Speak'" :has-products="hasProducts"
        image="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgI0mcNqamAvThopFCHglVSVRBdOOwizeEbxqg4uImPdruIwkWwGVodzvDXAZbxx8yJxky04_LOjqSlZOn7lvJqiHe_ACnrstnLew9AusJghsGPtLObQrvyeyXHrcdFEU7vXPEQNk62mgIvyvIWXTRVBaXKOAaKTIF2RS2_25QKL1gsh-0HSJFIyWPeJU2U/s16000/TshirtsGif.gif"
        class="h-full min-w-full col-span-2 md:col-span-1" />
    </NuxtLink>

  </div>
</template>
<script setup>
const hasProducts = false
</script>
