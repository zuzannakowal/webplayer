<template>
  <div class="scroll">
    lista piosenek: {{currentAlbumId}}, {{currentPlaylist}}, {{currentSongId}}
    <div v-if="currentPlaylist.length">
      <song
        v-for="song in currentPlaylist"
        v-bind:key="song.id"
        :song="song"
      ></song>
    </div>
    <div v-else>
      no songs
    </div>
  </div>
</template>
<script>
  import Song from "./Song.vue"
  export default {
    components: {Song},
    props: ['songs'],
    data() {
      return {
        currentAlbumId: null,
        currentSongId: null,
        currentPlaylist: []
      }
    },
    methods: {
      displayAlbum(albumId){
        console.log("wyswietlam album: ", albumId)
        this.currentAlbumId = albumId
        this.currentPlaylist.splice(0)
        for (let i in this.songs){
          console.log(this.songs[i], i)
          if (this.songs[i].plytaId == albumId){
            this.currentPlaylist.push(this.songs[i])
          }
        }
        console.log(this.currentPlaylist)
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
