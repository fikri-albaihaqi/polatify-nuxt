<template>
  <section class="font-poppins">
    <section class="w-[95vw] md:w-[70vw] m-auto mt-16">
      <h2 class="text-center font-bold">Top Tracks</h2>
      <div class="grid grid-cols-3 my-2 text-sm">
        <button @click="(data.type = 'track', data.range = 'short_term')" :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          data.range === 'short_term' && data.type === 'track'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]">
          Last Month
        </button>

        <button @click="(data.type = 'track', data.range = 'medium_term')" :class="[
  'rounded-full',
  'px-2',
  'py-2',
  'font-medium',
  'hover:bg-secondary-shade',
  'mx-2',
  data.range === 'medium_term' && data.type === 'track'
    ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
    : 'bg-secondary',
]">Last 6 Months</button>

        <button @click="(data.type = 'track', data.range = 'long_term')" :class="[
  'rounded-full',
  'px-2',
  'py-2',
  'font-medium',
  'hover:bg-secondary-shade',
  'mx-2',
  data.range === 'long_term' && data.type === 'track'
    ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
    : 'bg-secondary',
]">All Time</button>
      </div>

      <h2 class="text-center mt-6 mb-2 font-bold">Top Artists</h2>
      <div class="grid grid-cols-3 text-sm mb-8">
        <button @click="(data.type = 'artist', data.range = 'short_term')" :class="[
  'rounded-full',
  'px-2',
  'py-2',
  'font-medium',
  'hover:bg-secondary-shade',
  'mx-2',
  data.range === 'short_term' && data.type === 'artist'
    ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
    : 'bg-secondary',
]">Last Month</button>

        <button @click="(data.type = 'artist', data.range = 'medium_term')" :class="[
  'rounded-full',
  'px-2',
  'py-2',
  'font-medium',
  'hover:bg-secondary-shade',
  'mx-2',
  data.range === 'medium_term' && data.type === 'artist'
    ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
    : 'bg-secondary',
]">Last 6 Months</button>

        <button @click="(data.type = 'artist', data.range = 'long_term')" :class="[
  'rounded-full',
  'px-2',
  'py-2',
  'font-medium',
  'hover:bg-secondary-shade',
  'mx-2',
  data.range === 'long_term' && data.type === 'artist'
    ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
    : 'bg-secondary',
]">All Time</button>
      </div>
    </section>

    <section class="polaroid mb-8 mt-16">
      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'short_term' && data.type === 'track'">
        Last Month Top Tracks
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'medium_term' && data.type === 'track'">
        Last 6 Month Top Tracks
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'long_term' && data.type === 'track'">
        All Time Top Tracks
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'short_term' && data.type === 'artist'">
        Last Month Top Artists
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'medium_term' && data.type === 'artist'">
        Last 6 Month Top Artists
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'long_term' && data.type === 'artist'">
        All Time Top Artists
      </h1>

      <Loader v-if="data.userTopItems?.length === 0" />

      <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
        <Polaroid v-for="item in data.userTopItems?.items" :item="item" :type="data.type" />
      </div>
    </section>

    <div class="flex justify-center">
      <button @click="downloadImage('polaroid')" :class="[
  'rounded-full',
  'bg-secondary',
  'px-8',
  'py-2',
  'font-medium',
  'hover:bg-secondary-shade',
  'text-white',
  'mt-16',
]">Download Image</button>
    </div>
  </section>
</template>

<script setup>
import html2canvas from 'html2canvas';

const data = reactive({
  userTopItems: [],
  type: 'track',
  range: 'short_term',
  trackUri: 'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=',
  artistUri: 'https://api.spotify.com/v1/me/top/artists?limit=10&time_range='
})

const downloadImage = (fileName) => {
  const offScreen = document.querySelector('.polaroid');
  const clone = hiddenClone(offScreen);
  html2canvas(clone, { scrollY: -window.scrollY, useCORS: true }).then((canvas) => {
    const dataURL = canvas.toDataURL('image/png', 1.0);
    document.body.removeChild(clone);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function hiddenClone(element) {
  const clone = element.cloneNode(true);
  const style = clone.style;
  style.display = 'flex';
  style.flexDirection = 'column';
  style.alignItems = 'center';
  style.backgroundImage = 'linear-gradient(to right top, #fffdf4, #e3f2dc, #b6e8d5, #81dde2, #5bccf6)';
  style.width = '1280px';

  document.body.appendChild(clone);
  return clone;
}

const headers = await useHeaders()

watch(
  () => [data.type, data.range],
  async ([newType, newRange]) => {
    if (newType === 'track') {
      data.userTopItems = []
      const { data: topTracks } = await useFetch(data.trackUri + newRange, { headers: headers })
      data.userTopItems = topTracks
    } else if (newType === 'artist') {
      data.userTopItems = []
      const { data: topArtists } = await useFetch(data.artistUri + newRange, { headers: headers })
      data.userTopItems = topArtists
    }
  }
)

onMounted(async () => {
  const { data: topTracks, refresh } = useFetch(data.trackUri + data.range, { headers: headers })
  data.userTopItems = topTracks
  refresh()
})
</script>