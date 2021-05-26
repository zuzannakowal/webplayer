<template>
  <div class="scroll">
    albumId: {{currentAlbumId}}, piosenek: {{currentPlaylist.length}}, pozycja: {{currentSongNum}}
    <div v-if="currentPlaylist.length">
      <song @songClicked="songClicked"
        v-for="song in currentPlaylist"
        v-bind:key="song.num"
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
        currentSongNum: null,
        currentPlaylist: []
      }
    },
    methods: {
      displayAlbum(albumId){
        // to do: reload grającego albumu
        console.log("wyswietlam album: ", albumId)
        this.currentAlbumId = albumId
        this.currentSongNum = null
        this.currentPlaylist.splice(0)
        let j = 0
        for (let i in this.songs){
          if (this.songs[i].plytaId == albumId){
            let tmpSong = this.songs[i]
            let idx = this.currentPlaylist.push(tmpSong)
            this.$set(this.currentPlaylist[idx-1],'playing', 0);
            this.$set(this.currentPlaylist[idx-1],'num', j);
            j++
          }
        }
        console.log(this.currentPlaylist)
      },
      songClicked(val){
        console.log("(songs) songSelected: ", val, this.currentPlaylist[val], this.currentSongNum)
        if (this.currentSongNum !== null){
          this.currentPlaylist[this.currentSongNum].playing = 0
        }
        this.currentSongNum = val
        this.currentPlaylist[val].playing = 1
        console.log("songs: ", this.currentPlaylist)
        //this.$forceUpdate();
        this.$emit("songSelected", this.currentPlaylist[val].id)
      },
      playPrevious(){
        if (this.currentSongNum === null){
          console.log("nic nie gra")
          return
        }
        if (this.currentSongNum == 0){
          console.log("początek listy")
          this.songClicked(0)
          return
        }
        this.songClicked(this.currentSongNum-1)
      },
      playNext(){
        if (this.currentSongNum === null){
          console.log("nic nie gra")
          return
        }
        if (this.currentSongNum + 1 == this.currentPlaylist.length){
          this.currentPlaylist[this.currentSongNum].playing = 0
          this.currentSongNum = null
          console.log("koniec listy")
          return
        }
        this.songClicked(this.currentSongNum+1)
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
