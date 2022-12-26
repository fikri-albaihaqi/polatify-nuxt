<template>
  <div class="container flex flex-col items-center py-16 m-auto">
    <img v-if="!profile?.images" class="rounded-full w-36" src="/avatar.svg" alt="" />
    <img v-else class="rounded-full w-36" :src="profile?.images[0].url" alt="" />
    <h1 class="text-3xl font-bold font-poppins mt-8">
      {{ profile?.display_name }}
    </h1>
    <div class="flex justify-center lg:w-1/3 font-poppins text-center">
      <div class="flex flex-col items-center w-1/3 m-4">
        <h2>Playlist</h2>
        <h2 class="font-bold text-primary">{{ playlist?.total }}</h2>
      </div>
      <div class="flex flex-col items-center w-1/3 m-4">
        <h2>Followers</h2>
        <h2 class="font-bold text-primary">
          {{ profile?.followers.total }}
        </h2>
      </div>
      <div class="flex flex-col items-center w-1/3 m-4">
        <h2>Followed Artists</h2>
        <h2 class="font-bold text-primary">
          {{ followed?.artists.total }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
const profileUri = `https://api.spotify.com/v1/me`
const playlistUri = `https://api.spotify.com/v1/users/user_id/playlists`
const followedUri = `https://api.spotify.com/v1/me/following?type=artist`
const headers = await useHeaders()

const { data: profile, refresh: refreshProfile } = await useFetch(profileUri, { headers: headers })
const { data: playlist, refresh: refreshPlaylist } = await useFetch(playlistUri, { headers: headers })
const { data: followed, refresh: refreshFollowed } = await useFetch(followedUri, { headers: headers })
refreshProfile()
refreshPlaylist()
refreshFollowed()

if (!profile) {
  throw createError({ statusCode: 404, statusMessage: 'Profile not found', fatal: true })
}
</script>

<style scoped>

</style>