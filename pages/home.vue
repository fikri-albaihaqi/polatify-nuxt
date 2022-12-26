<template>
  <div v-if="user">
    <header class="flex flex-col items-center mt-4">
      <img class="w-[50%] md:w-[35%] lg:w-[20%]" src="/logo.svg" alt="" />
    </header>
    <div class="container flex flex-col items-center py-16 m-auto">
      <Profile />

      <TopItems />

      <button @click="signout" class="
        rounded-full
        bg-primary
        px-8
        py-2
        font-medium
        hover:bg-secondary-shade
        text-white
        mt-16
      ">
        Logout
      </button>
    </div>
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
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/')
    }
  })
})
</script>