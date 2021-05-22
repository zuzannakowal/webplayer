<template>
  <div class="player">
    <song-name
      v-for="song in songs"
      v-bind:key="song.id"
      :song="song"
    ></song-name>
    <play></play>
    <time></time>

  </div>
</template>
<script>
  import SongName from "./SongName.vue";
  import Play from "./Play.vue";
  import Time from "./Time.vue"
  export default {
    components: {SongName, Play, Time},
    props: ['songs'],
  }
</script>
<style scoped>
  .player{
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;

  }
</style>
