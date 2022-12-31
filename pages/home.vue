<template>
  <div v-if="user">
    <header class="flex flex-col items-center mt-4">
      <img class="w-[50%] md:w-[35%] lg:w-[20%]" src="/logo.svg" alt="" />
    </header>
    <section class="container flex flex-col items-center py-16 m-auto">
      <Profile />

      <TopItems />

      <NuxtLink to="/" @click="signout" class="
        rounded-full
        bg-primary
        px-8
        py-2
        font-medium
        hover:bg-secondary-shade
        text-white
        mt-16
        cursor-pointer
      ">
        Logout
    </NuxtLink>
  </section>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const supabase = useSupabaseAuthClient()


async function signout() {
  const { error } = await supabase.auth.signOut()
}

const user = useSupabaseUser()
const { data: { session }, } = await supabase.auth.getSession()

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/')
    }
  })
})

if (!session?.provider_token) {
  signout()
}
</script>