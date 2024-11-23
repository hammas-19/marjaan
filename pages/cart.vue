<template>
  <section class="bg-linen">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <header class="text-center">
          <h1 v-if="cartData.items.length" class="text-xl font-headings font-bold sm:text-3xl">
            Your Cart
          </h1>
          <h1 v-else class="text-xl font-headings font-bold sm:text-3xl">
            Your Cart is Empty..!
          </h1>
        </header>
        <ClientOnly>
          <div v-if="cartData.items.length"
            class="mt-8 border md:p-6 p-3 border-dashed border-codGrey rounded-xl bg-white">
            <ul class="space-y-4">
              <li v-for="(item, index) in cartData.items" :key="index"
                class="flex items-center gap-4 border border-codGrey border-dashed p-2 rounded-lg bg-linen">
                <img src="/Logo_Mascot_Dark.png" alt="" class="h-10 w-10 rounded object-cover">
                <div>
                  <h3 class="text-sm text-gray-900">
                    {{ item.name }}
                  </h3>

                  <dl class="mt-0.5 space-y-px text-[10px]">
                    <div>
                      <dt class="inline">
                        Size:
                      </dt>
                      <dd class="inline">
                        {{ item.size }}
                      </dd>
                    </div>

                    <div>
                      <dt class="inline">
                        Color:
                      </dt>
                      <dd class="inline">
                        {{ item.color }}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div class="flex flex-1 items-center justify-end gap-2">
                  <button class="text-gray-600 transition hover:text-[#f55a5a]">
                    <span class="sr-only">Remove item</span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
                        d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m14.874 9.4c-.177 2.654-.266 3.981-1.131 4.79s-2.195.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79l-.46-6.9m13.666 0l-.2 3M9.5 11l.5 5m4.5-5l-.5 5" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
            <div class="mt-8 flex justify-end pt-8">
              <div class="w-screen max-w-lg space-y-4">
                <dl class="space-y-0.5 text-sm border border-codGrey p-2 border-dashed rounded-md bg-linen">
                  <div class="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>PKR <strong>{{ cartData.totalPrice }}</strong></dd>
                  </div>

                  <div class="flex justify-between">
                    <dt>Quantity</dt>
                    <dd><strong>{{ cartData.totalItems }}</strong></dd>
                  </div>
                  <div class="flex justify-between">
                    <dt>Shipping Fee</dt>
                    <dd v-if="cartData.totalPrice <= 3000">
                      PKR <strong>199</strong>
                    </dd>
                    <dd v-else>
                      Free Shipping
                    </dd>
                  </div>

                  <div class="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <div v-if="cartData.totalPrice <= 3000">
                      <dd> {{ cartData.totalPrice + 199 }}</dd>
                    </div>
                    <div v-else>
                      <dd>PKR <strong>{{ cartData.totalPrice }}</strong></dd>
                    </div>
                  </div>
                </dl>

                <div class="flex justify-end">
                  <a href="#" class="block rounded bg-tango px-5 py-3 text-sm text-white transition">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useCartStore } from '@/stores/CartStore'
const cartData = useCartStore()
</script>
