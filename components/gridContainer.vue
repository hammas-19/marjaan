<template>
    <div
        class="relative bg-moss md:rounded-3xl rounded-xl border h-full overflow-hidden opacity-90 hover:opacity-100 transition-all duration-300">

        <img :src="image"
            class="object-cover h-full w-full transition-all duration-700" alt="">
        <div
            class="absolute flex flex-col md:bottom-5 bottom-2 md:hover:gap-2 gap-1 w-fit md:max-w-xs max-w-[140px] bg-graphite md:hover:p-5 md:p-3 p-2 md:rounded-2xl rounded-xl bg-opacity-40 backdrop-blur-md transition-all"
            :class="contentLeft ? 'md:left-5 left-2' : 'md:right-5 right-2 text-right items-end'">
            
            <h1 class="md:text-3xl text-sm font-headings font-bold text-white">
                {{ title }}
            </h1>
            <span class="text-white text-xs">
                {{ slogan }}
            </span>
            <div v-if="hasProducts" class="flex gap-2 flex-wrap">
            <span class="text-graphite md:py-2 py-1 md:px-4 px-2 w-fit hover:w-auto opacity-10 hover:opacity-100 transition-all text-left hover:text-center rounded-md bg-white md:text-xl text-xs font-semibold">
                <slot name="item1"></slot>
            </span>
            
            <span class="text-graphite md:py-2 py-1 md:px-4 px-2 w-fit hover:w-auto opacity-10 hover:opacity-100 transition-all text-left hover:text-center rounded-md bg-white md:text-xl text-xs font-semibold">
                <slot name="item2"></slot>
            </span>
            
            <span class="text-graphite md:py-2 py-1 md:px-4 px-2 w-fit hover:w-auto opacity-10 hover:opacity-100 transition-all text-left hover:text-center rounded-md bg-white md:text-xl text-xs font-semibold">
                <slot name="item3"></slot>
            </span>
            
            </div>
            
        </div>

    </div>
</template>
<script setup>

defineProps({
    image: {
        type: String,
        default: ""
    },
    contentLeft: {
        type: Boolean,
        default: true
    },
    hasProducts: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ''
    },
    slogan: {
        type: String,
        default: ''
    },
    refrence: {
        type: String,
        default: ""
    },
})

</script>