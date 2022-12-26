<template>
  <div class="flex flex-col items-center justify-center font-poppins h-screen">
    <img class="w-3/4 lg:w-1/3" src="/logo.svg" alt="" />
    <h1 class="mb-4 text-center md:text-xl">Top track & artist generator in polaroid photo style</h1>
    <button @click="signInWithSpotify" class="
      rounded-full
      py-2
      px-8
      mt-4
      bg-secondary
      font-semibold
      hover:bg-secondary-shade
      text-dark
    ">
      Log In To Spotify
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const supabase = useSupabaseAuthClient()

async function signInWithSpotify() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      scopes: 'user-read-email user-top-read user-follow-read playlist-read-private playlist-read-collaborative'
    }
  })
}

const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo('/home')
    }
  })
})
</script>