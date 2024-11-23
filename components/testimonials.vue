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
    class="marquee-box mx-auto overflow-hidden flex items-center flex-col md:flex-row justify-between gap-10 lg:container px-5 md:h-[calc(100vh-400px)] h-screen">

    <div class="flex flex-col gap-4 md:w-1/2 w-full pt-16">
      <h1 class="md:text-7xl text-4xl font-semibold font-handlee text-tango">
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
    name: "Yawar Ali",
    city: "Karachi",
    comments: "This platform exceeded my expectations. Truly amazing!"
  },
  {
    name: "Uzair Alam",
    city: "Karachi",
    comments: "A fantastic experience from start to finish!"
  },
  {
    name: "Fiza Fatima",
    city: "Quetta",
    comments: "Highly recommend this to everyone. Great service!"
  },
  {
    name: "Saad Askari",
    city: "Hyderabad Sindh",
    comments: "The team is outstanding. Really impressed!"
  },
  {
    name: "Kashaf Razzaq",
    city: "Islamabad",
    comments: "An absolute game-changer for my workflow!"
  }
];
</script>
