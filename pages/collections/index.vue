<template>
  <div class="bg-linen">
    <div class="max-w-7xl mx-auto md:px-6 px-3 md:py-5 py-2 ">
      <!-- Collections grid -->
      <div class="grid grid-cols-3 md:gap-3 gap-1 pb-5">

        <div v-for="(collection, cindex) in collections" :key="cindex">
          <h2 class="text-center pb-2 font-heading text-xs block md:hidden font-semibold text-mineShaft">
            {{ collection.title }}
          </h2>
          <div
            class="relative bg-moss md:rounded-3xl h-[110px] rounded-md md:h-[280px] w-full overflow-hidden opacity-90 hover:opacity-100 transition-all">
            <img :src="collection.image" class="object-cover h-full w-full" alt="">
            <div class="md:block hidden">
              <div
                class="absolute bottom-5 left-5 flex flex-col gap-2 md:max-w-[250px] max-w-[80px] bg-graphite md:p-5 p-2 md:rounded-2xl rounded-md backdrop-blur-md">
                <h1 class="md:text-3xl text-xl font-headings md:font-bold font-medium text-white">{{ collection.title }}
                </h1>
                <span class="text-white md:text-lg text-base">
                  {{ collection.slogan }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <section>
        <div class="md:py-6 py-2">
          <CollectionTabs>
            <template #cat1>
              T-Shirts
            </template>
            <template #cat2>
              Hoodies
            </template>
            <template #cat3>
              SweatShirts
            </template>
            <template #category1>
              T-shirt
              <ProductCard :product-data="productData" :for-collection="true" class="" />
            </template>
            <template #category2>
              Hoodies
              <ProductCard :product-data="productData" :for-collection="true" class="" />
            </template>
            <template #category3>
                SweatShirts
              <ProductCard :product-data="productData" :for-collection="true" class="" />
            </template>
          </CollectionTabs>
        </div>
      </section>

      <!-- Gallery -->


    </div>
  </div>
</template>
<script setup>
const products = [
  'https://cdn.shopify.com/s/files/1/1752/8007/collections/Last_Chance_Banner_Mens.jpg?v=1679154073&width=1500',
  'https://cdn.shopify.com/s/files/1/1752/8007/products/InfinityExplorerJacket_Men_25_d0425757-d350-441d-8c96-8980e186fd86_400x.jpg?v=1676669937',
  'https://cdn.shopify.com/s/files/1/1752/8007/products/IdentityProHoodieSeaShell2_400x.jpg?v=1678822010',
  'https://cdn.shopify.com/s/files/1/1752/8007/collections/m_tops_956f7439-b4c4-4d9b-821d-f275fd667f44.jpg?v=1679098760&width=1500',
  'https://cdn.shopify.com/s/files/1/1752/8007/products/AthleticJacketOysterGrey1_400x.jpg?v=1669670288',
  'https://cdn.shopify.com/s/files/1/1752/8007/collections/m_elements.jpg?v=1676716697&width=1500',
  'https://cdn.shopify.com/s/files/1/1752/8007/products/4U8A5112_49828896-2909-439f-bdf5-67c42b966a31_400x.jpg?v=1676669775',
  'https://cdn.shopify.com/s/files/1/1752/8007/collections/m_long_sleeve_9d95e316-70e5-4363-bbec-51c275537fb4.jpg?v=1679154071&width=1500',
  'https://cdn.shopify.com/s/files/1/1752/8007/products/OzoneMen_sTops5_400x.jpg?v=1657358904',
  'https://cdn.shopify.com/s/files/1/1752/8007/collections/BlendMensTanks_1400x600_55a8cdb1-d55f-4298-96bb-1bc0a83f93fa.jpg?v=1679154073&width=1500',
  'https://cdn.shopify.com/s/files/1/1752/8007/products/MoandIlon25_1_400x.jpg?v=1657358591',
  'https://cdn.shopify.com/s/files/1/1752/8007/products/MNSVelocitySleeveless_16_400x.jpg?v=1676670273',

]
const collections = [
  {
    title: 'NyctoPhylia',
    slogan: 'Dark Rumours',
    image: 'https://alphaleteathletics.com/cdn/shop/collections/m_better_in_black_2500x1050_crop_center.jpg?v=1725726009'
  },
  {
    title: 'Aura',
    slogan: 'Energy In MOtion',
    image: 'https://alphaleteathletics.com/cdn/shop/collections/lifestyle_2500x1050_crop_center.jpg?v=1725725985'
  },
  {
    title: 'Amlify',
    slogan: 'Never Duplicated',
    image: 'https://alphaleteathletics.com/cdn/shop/files/Hero_Image-2.jpg?v=1725654353&width=2000'
  }
]
const productData = [
  {
    image: '/gridImages/collection4.webp',
    name: 'Hammas'
  },
  {
    image: '/gridImages/collection3.webp',
    name: 'Masood'
  },
  {
    image: '/gridImages/collection2.webp',
    name: 'hamoodi'
  },
  {
    image: '/gridImages/collection4.webp',
    name: 'Hammas'
  },
  {
    image: '/gridImages/collection3.webp',
    name: 'Masood'
  },
  {
    image: '/gridImages/collection2.webp',
    name: 'hamoodi'
  },
  {
    image: '/gridImages/collection4.webp',
    name: 'Hammas'
  },
  {
    image: '/gridImages/collection3.webp',
    name: 'Masood'
  },
  {
    image: '/gridImages/collection2.webp',
    name: 'hamoodi'
  },
  {
    image: '/gridImages/collection4.webp',
    name: 'Hammas'
  },
  {
    image: '/gridImages/collection3.webp',
    name: 'Masood'
  },
  {
    image: '/gridImages/collection2.webp',
    name: 'hamoodi'
  },
  {
    image: '/gridImages/collection4.webp',
    name: 'Hammas'
  },
  {
    image: '/gridImages/collection3.webp',
    name: 'Masood'
  },
  {
    image: '/gridImages/collection2.webp',
    name: 'hamoodi'
  }
]
</script>
