<style scoped>
.marquee {
  z-index: 1;
  animation: marqueescroll 60s linear 0s infinite alternate-reverse;
  animation-play-state: running;
  animation-direction: normal;
}

.reverse {
  z-index: 1;
  animation: marqueescrollR 60s linear 0s infinite alternate-reverse;
  animation-play-state: running;
  animation-direction: normal;
}

.wrapper:hover div {
  animation-play-state: running;
}

.wrapper:active div {
  animation-play-state: running;
}

@keyframes marqueescroll {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(-50%);
  }
}

@keyframes marqueescrollR {
  0% {
    transform: translateY(-50%);
  }

  100% {
    transform: translateY(0%);
  }
}

.wrapper::-webkit-scrollbar {
  display: none;
}
</style>
<template>
  <div
    class="marquee-box mx-auto overflow-hidden flex items-center md:items-start  flex-col md:flex-row justify-between gap-10 lg:container px-5 h-screen">

    <div class="flex flex-col gap-4 md:w-1/2 w-full pt-16">
      <h1 class="md:text-7xl text-4xl font-semibold font-handlee text-tango text-center">
        "
        <span class="text-black">
          Our Customers are saying that ...
        </span>
        "
      </h1>
    </div>

    <div class="wrapper grid grid-cols-2 w-max md:gap-5 gap-2 hover:overflow-y-scroll h-full overflow-hidden relative">

      <!-- fading divs -->
      <div class="absolute w-full h-20 -top-1 rotate-180 z-20"></div>
      <div class="marquee grid grid-cols-1 md:gap-5 gap-2">
        <span v-for="(item, index) in testimonials" :key="index" class="md:max-w-xs max-w-[170px] animate-none">
          <article class="rounded-xl bg-codGrey border md:p-3 p-2">
            <div class="flex flex-col md:gap-2 gap-1 text-ebonyClay">
              <h1 class="md:text-xl text-base font-semibold text-white">{{ item.name }}</h1>
              <span class="text-xs text-tango">{{ item.city }}</span>
              <span class="text-tango font-bold"> "
                <span class="md:text-sm text-xs text-white font-normal">
                  {{ item.comments }}
                </span>
                "
              </span>
            </div>
          </article>
        </span>
      </div>
      <div class="reverse grid grid-cols-1 md:gap-5 gap-2">
        <span v-for="(item, index) in testimonials" :key="index" class="md:max-w-xs max-w-[170px] animate-none">
          <article class="rounded-xl bg-codGrey border md:p-3 p-2">
            <div class="flex flex-col md:gap-2 gap-1 text-ebonyClay">
              <h1 class="md:text-xl text-base font-semibold text-white">{{ item.name }}</h1>
              <span class="text-xs text-tango">{{ item.city }}</span>
              <span class="text-tango font-bold"> "
                <span class="md:text-sm text-xs text-white font-normal">
                  {{ item.comments }}
                </span>
                "
              </span>
            </div>
          </article>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const testimonials = [
  {
    name: 'Yawar Ali',
    city: 'Karachi',
    comments: 'This store exceeded my expectations. The quality is truly amazing!'
  },
  {
    name: 'Uzair Alam',
    city: 'Karachi',
    comments: 'A fantastic shopping experience from start to finish!'
  },
  {
    name: 'Fiza Fatima',
    city: 'Quetta',
    comments: 'Highly recommend this store to everyone. Great products and service!'
  },
  {
    name: 'Saad Adam',
    city: 'Hyderabad Sindh',
    comments: 'The team is outstanding, and the clothing is really impressive!'
  },
  {
    name: 'Kashaf Razzaq',
    city: 'Islamabad',
    comments: 'This store is an absolute game-changer for my wardrobe!'
  },
  {
    name: 'Hassan Tariq',
    city: 'Lahore',
    comments: "Top-quality clothing at affordable prices. Can't ask for more!"
  },
  {
    name: 'Areeba Khan',
    city: 'Peshawar',
    comments: 'The premium products here are worth every penny. Highly satisfied!'
  },
  {
    name: 'Zainab Siddiqui',
    city: 'Multan',
    comments: 'Affordable and trendy outfits. Perfect for every occasion!'
  },
  {
    name: 'Farhan Sheikh',
    city: 'Rawalpindi',
    comments: "Premium quality at a price that doesn't break the bank. Love it!"
  },
  {
    name: 'Mariam Ali',
    city: 'Faisalabad',
    comments: 'Stylish designs and great service. A perfect shopping destination!'
  }
]

</script>
