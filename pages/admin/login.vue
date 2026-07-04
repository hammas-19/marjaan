<template>
  <div class="min-h-screen bg-linen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <img src="/Logo-Dark.png" class="max-w-[120px] mx-auto mb-4" alt="Rechik">
        <h1 class="text-2xl font-semibold text-codGrey font-headings">Admin Login</h1>
        <p class="text-sm text-osloGrey mt-1">Sign in to manage your store</p>
      </div>

      <form @submit.prevent="login" class="bg-white rounded-2xl shadow-sm border border-bisonHide/30 p-8 flex flex-col gap-5">
        <div>
          <label class="block text-sm font-medium text-codGrey mb-1.5">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="admin@example.com"
            class="w-full px-4 py-2.5 rounded-lg border border-bisonHide/50 text-sm text-codGrey focus:outline-none focus:border-purplHeart transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-codGrey mb-1.5">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-2.5 rounded-lg border border-bisonHide/50 text-sm text-codGrey focus:outline-none focus:border-purplHeart transition-colors"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 bg-purplHeart text-white rounded-lg text-sm font-medium hover:bg-purplHeart/90 transition-all disabled:opacity-60"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

if (user.value) {
  await navigateTo('/admin')
}

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (authError) {
    error.value = authError.message
  } else {
    await navigateTo('/admin')
  }
  loading.value = false
}
</script>
