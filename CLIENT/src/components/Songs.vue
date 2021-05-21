<template>
  <div class="scroll">
    lista piosenek:
    <song
      v-for="song in songs"
      v-bind:key="song.id"
      :song="song"
    ></song>
  </div>
</template>
<script>
  import Song from "./Song.vue"
  export default {
    components: {Song},
    props: ['songs'],
  }
</script>
<style scoped>
  .scroll{
    height: 100%;
    width: 100%;
    overflow-y: auto;
    scroll-behavior: auto;
  }
</style>
