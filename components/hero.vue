<template>
    <div
        class="relative bg-moss rounded-3xl h-[calc(100vh-200px)] border w-full overflow-hidden opacity-90 hover:opacity-100 transition-all duration-300">

        <img src="https://cdn.shopify.com/s/files/1/1752/8007/collections/m_elements.jpg?v=1676716697&width=1500"
            class="object-cover h-full w-full" alt="">
        <div
            class="absolute bottom-5 left-5 flex flex-col gap-2 max-w-[250px] md:max-w-[400px] bg-graphite p-5 rounded-2xl bg-opacity-40 backdrop-blur-md">

            <h1 class="md:text-6xl text-3xl font-headings font-bold text-white">Get, Set, Stereotype</h1>
            <span class="text-white md:text-xl text-base">
                Shop
            </span>
            <div class="flex flex-wrap gap-2">
                <NuxtLink to="/productsTees"
                    class="text-graphite md:py-2 py-1 md:px-4 px-2 w-fit hover:w-auto opacity-10 hover:opacity-100 transition-all text-left hover:text-center rounded-md bg-white md:text-xl text-base font-semibold">
                    T-Shirts
                </NuxtLink>
                <NuxtLink to="/productsHood"
                    class="text-graphite md:py-2 py-1 md:px-4 px-2 w-fit hover:w-auto opacity-10 hover:opacity-100 transition-all text-left hover:text-center rounded-md bg-white md:text-xl text-base font-semibold">
                    Hoodies
                </NuxtLink>
                <NuxtLink to="productsSweats"
                    class="text-graphite md:py-2 py-1 md:px-4 px-2 w-fit hover:w-auto opacity-10 hover:opacity-100 transition-all text-left hover:text-center rounded-md bg-white md:text-xl text-base font-semibold">
                    SweatShirts
                </NuxtLink>
            </div>
        </div>

    </div>
</template>