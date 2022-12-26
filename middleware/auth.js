export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && to.path === '/home') {
    return navigateTo('/')
  } else if (user.value && to.path === '/') {
    return navigateTo('home')
  }
})