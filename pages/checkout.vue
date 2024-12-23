<template>
  <section class="bg-linen py-8 md:py-16">
    <form action="#" class="mx-auto max-w-screen-xl px-4 2xl:px-0" @submit.prevent="sendOrderData">
      <ol
        class="items-center flex w-full max-w-2xl text-center text-sm font-medium sm:text-base mx-auto md:pb-20 pb-10">
        <li
          class="hidden md:flex text-xs md:text-sm after:border-1 items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-tango dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span class="flex items-center after:mx-2 after:content-['/'] sm:after:hidden">
            <svg class="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Cart
          </span>
        </li>

        <li
          class="text-xs md:text-sm after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-tango dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span
            class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after: sm:after:hidden">
            <svg class="me-2 h-4 w-4 sm:h-5 sm:w-5" :class="!isFormSUbmitted ? 'text-tango' : ''" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Checkout
          </span>
        </li>

        <li class=" text-xs md:text-sm flex shrink-0 items-center">
          <svg class="me-2 h-4 w-4 sm:h-5 sm:w-5" :class="isFormSUbmitted ? 'text-tango' : ''" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Order summary
        </li>
      </ol>
      <template v-if="isFormSUbmitted">
        <div class="py-10 md:py-20 text-center flex flex-col gap-5">
          <h1 class="md:text-4xl text-xl font-titles">
            Thank You!
          </h1>
          <h3 class="text-2xl font-medium font-jost text-ebonyClay">Your Order Has been placed</h3>
          <div
            class="border border-dashed border-tango rounded-xl max-w-[530px] mx-auto w-full p-2 grid grid-cols-3 text-start text-xs gap-y-2">
            <p>Order-Id</p>
            <p class="col-span-2 font-medium text-start">{{ orderId }}</p>
            <p>Name</p>
            <p class="col-span-2 font-medium text-start">{{fullName}}</p>
            <p>Email</p>
            <p class="col-span-2 font-medium text-startwr">{{ email }}</p>
            <p>Phone</p>
            <p class="col-span-2 font-medium text-start">{{ phoneNumber }}</p>
            <p>City</p>
            <p class="col-span-2 font-medium text-start">{{ city }}</p>
            <p>Paid through</p>
            <p class="col-span-2 font-medium text-start">{{ selectedPayment }}</p>
            <p>Address</p>
            <p class="col-span-2 font-medium text-start">{{ address }}</p>
          </div>
        </div>
        <CartLoader />
      </template>
      <div v-else class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
        <div class="min-w-0 flex-1 space-y-8 ">
          <div class="space-y-4">
            <h2 class="text-xl font-semibold dark:text-white">Delivery Details</h2>

            <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label for="your_name" class="mb-2 block text-sm font-medium dark:text-white"> Your name*
                </label>
                <input v-model="fullName" type="text" id="your_name"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Huzaifa" required />
              </div>
              <div>
                <label for="your_email" class="mb-2 block text-sm font-medium dark:text-white">Your email*</label>
                <input type="email" id="your_email" v-model="email" @input="validateEmail"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="name@flowbite.com" required />
                <!-- Show error message if email is invalid -->
                <p v-if="isInvalidEmail" class="text-red-500 text-sm mt-2">Please enter a valid email address.</p>
              </div>
              <div>
                <label for="city" class="mb-2 block text-sm font-medium dark:text-white"> City*
                </label>
                <input v-model="city" type="text" id="city"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Karachi" required />
              </div>

              <div>
                <label for="phone-input-3" class="mb-2 block text-sm font-medium dark:text-white"> Phone
                  Number* </label>
                <div class="flex items-center">
                  <div class="relative w-full">
                    <input type="text" id="phone-input" v-model="phoneNumber" @input="validatePhoneNumber"
                      class="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                      placeholder="03213211321" required />
                    <p v-if="isInvalidPhoneNumber" class="text-red-500 text-sm mt-2">Please enter a valid phone number
                      (e.g., 03213211321).</p>
                  </div>

                </div>
              </div>
              <div class="md:col-span-2">
                <label for="address" class="mb-2 block text-sm font-medium dark:text-white"> complete address*
                </label>
                <input v-model="address" type="text" id="address"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="A-180, block 8, Karachi ..." required />
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold dark:text-white">Payment</h3>
            <p class="text-xs">
              selected: <strong class="text-tango">{{ selectedPayment }}</strong>
            </p>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div class="rounded-lg border border-tango border-dashed p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-start gap-3">
                  <div class="flex h-5 items-center">
                    <input v-model="selectedPayment" id="credit-card" aria-describedby="credit-card-text" type="radio"
                      name="payment-method" value="COD"
                      class="h-4 w-4 border-gray-300 bg-white text-primary-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      checked />
                  </div>

                  <div class="ms-4 text-sm">
                    <label for="credit-card" class="font-medium leading-none"> Cash On Delivery
                    </label>
                    <p id="credit-card-text" class="mt-1 text-xs font-normal">Pay when deleivered</p>
                  </div>
                </div>

              </div>
              <div class="rounded-lg border border-tango border-dashed p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-start gap-3">
                  <div class="flex h-5 items-center">
                    <input v-model="selectedPayment" id="credit-card" aria-describedby="credit-card-text" type="radio"
                      name="payment-method" value="E-Wallet"
                      class="h-4 w-4 border-gray-300 bg-white text-primary-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      checked />
                  </div>

                  <div class="ms-4 text-sm">
                    <label for="credit-card" class="font-medium leading-none"> E-Transaction
                    </label>
                    <p id="credit-card-text" class="mt-1 text-xs font-normal">Pay through Mobile Banking</p>
                  </div>
                </div>

              </div>
              <div
                class="rounded-lg border border-tango border-dashed p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 hover:opacity-40 cursor-not-allowed transition-all">
                <div class="flex items-start gap-3">
                  <div class="flex h-5 items-center">
                    <input id="credit-card" aria-describedby="credit-card-text" disabled type="radio"
                      name="payment-method" value=""
                      class="h-4 w-4 border-gray-300 bg-white text-primary-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                  </div>

                  <div class="ms-4 text-sm">
                    <label for="credit-card" class="font-medium leading-none"> Direct Payment
                    </label>
                    <p id="credit-card-text" class="mt-1 text-xs font-normal">Coming Soon</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div v-if="selectedPayment === 'E-Wallet'" class="space-y-4">
            <h3 class="text-xl font-semibold dark:text-white">E-Transaction</h3>

            <div class="">
              <p class="w-full">
                Title: Hammas Masood <br>
                Bank: UBL <br>
                Acc no: 1176293450339 <br>
                IBAN: PK48UNIL0109000293450339 <br>
                Branch: PTV center Karachi
              </p>
              <p class="bg-tango p-3 text-white text-sm rounded-lg w-fit my-5">
                <strong>Note:</strong> Please forward your paid receipt at following whatsApp number
              </p>
              <a href="https://wa.me/923272558948" target="_blank" class="text-tango flex items-center gap-2">
                <span class="sr-only">WhatApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
                </svg>
                <span class="text-ebonyClay font-semibold">
                  +92 327 2558948
                </span>
              </a>
            </div>
          </div>

        </div>
        <!-- <pre>
          {{ cartData }}
        </pre> -->
        <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
          <div class="flow-root">
            <div v-if="cartData" class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
              <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal  dark:text-gray-400">Subtotal</dt>
                <dd class="text-base font-medium dark:text-white">PKR {{ cartData.totalPrice }}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal  dark:text-gray-400">Quantity</dt>
                <dd class="text-base font-medium text-tango">{{ cartData.totalItems }}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal  dark:text-gray-400">Shipping Fee</dt>
                <dd v-if="cartData.totalPrice <= 3000">
                  PKR <strong>199</strong>
                </dd>
                <dd v-else>
                  PKR <strong>0</strong>
                </dd>
              </dl>


              <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-bold dark:text-white">Total</dt>
                <div v-if="cartData.totalPrice <= 3000">
                  <dd>PKR <strong>{{ cartData.totalPrice + 199 }}</strong></dd>
                </div>
                <div v-else>
                  <dd>PKR <strong>{{ cartData.totalPrice }}</strong></dd>
                </div>
              </dl>
            </div>
          </div>
          <button type="submit" :disabled="isSubmitDisabled"
            class="disabled:cursor-not-allowed disabled:opacity-75 w-full py-3 px-2 text-white bg-tango rounded-lg">
            Place Order
          </button>
        </div>

      </div>
    </form>
  </section>
</template>
<script setup>
import axios from 'axios'
import { useCartStore } from '@/stores/CartStore'
const cartData = useCartStore()
const selectedPayment = ref('E-Wallet')
const fullName = ref('')
const phoneNumber = ref('')
const email = ref('')
const city = ref('')
const address = ref('')
const orderId = ref('')
const isInvalidPhoneNumber = ref(false)
const isInvalidEmail = ref(false)
const isFormSUbmitted = ref(false)
const validatePhoneNumber = () => {
  const phonePattern = /^[0-9]{4}[0-9]{7}$/
  isInvalidPhoneNumber.value = !phonePattern.test(phoneNumber.value)
}
console.log(cartData.totalPrice, `cartData.totalPrice.value`);
console.log(useCartStore().items, `cartData.items`);

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  isInvalidEmail.value = !emailPattern.test(email.value)
}
const isSubmitDisabled = computed(() => {
  return fullName.value === '' || !isInvalidEmail || !isInvalidPhoneNumber || city.value === '' || address.value === ''
})
const sendOrderData = async () => {
  const url = 'https://marjan-backend.up.railway.app/order/';

  // Dummy values if fields are empty
  const orderData = {
    name: fullName.value,
    email: email.value,
    phone: phoneNumber.value,
    address: address.value,
    city: city.value,
    payment_method: selectedPayment.value,
    order_items: cartData.items, 
    product_amount: cartData.totalPrice,
    shipping_amount: cartData.totalPrice >= 3000 ? '0': '199',
    coupon_code: 'NOCOUPON',
  };

  try {
    const response = await axios.post(url, orderData);
    if (response.data.success) {
      orderId.value = response.data.order_id
      isFormSUbmitted.value = true
      cartData.clearCart()
     }
    console.log('Order placed successfully:', response.data);
  } catch (error) {
    console.error('Error placing order:', error);
  }
};
</script>