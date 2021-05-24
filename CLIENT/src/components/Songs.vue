<template>
  <div class="scroll">
    lista piosenek: {{currentAlbumId}}
    <song
      v-for="song in songs"
      v-if="song.plytaId == currentAlbumId"
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
    data() {
      return {
        currentAlbumId: null
      }
    },
    methods: {
      displayAlbum(albumId){
        console.log("wyswietlam album: ", albumId)
        this.currentAlbumId = albumId
      }
    }
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
