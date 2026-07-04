export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()

  if (to.path === '/admin/login') return

  if (!user.value) {
    return navigateTo('/admin/login')
  }
})
