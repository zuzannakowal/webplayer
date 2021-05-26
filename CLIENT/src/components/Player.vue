<template>
  <div class="player">
    <div class="song" v-if="currentSong !== null">
      {{currentSong.tytul}} ({{currentSong.id}})
    </div>
    <div class="play">
      <div @click="previous">
        &#8884;
      </div>
      <div @click="playClicked">
        <div v-if="currentSong === null">&#8883;</div>
        <div v-if="currentSong !== null && currentSong.playing == 0">&#8883;</div>
        <div v-if="currentSong !== null && currentSong.playing == 1">II</div>
      </div>
      <div @click="next">
        &#8885;
      </div>
      <audio id="mp3player" controls ref="mp3player" style="visibility:hidden;"></audio>
    </div>
    <clock></clock>

  </div>
</template>
<script>
  import SongName from "./SongName.vue";
  import Clock from "./Time.vue";
  export default {
    components: {SongName, Clock},
    props: ['songs'],
    data: function(){
      return {
        currentSong: null
      }
    },
    mounted(){
      console.log("player zamontowany")
      this.$nextTick(function(){
        console.log("view zrenderowany")
        this.$refs.mp3player.addEventListener("ended", function(e){
          console.log("utwór sie skończył")
          this.next()
        }.bind(this)
        )
      })
    },
    methods: {
      previous(){
        console.log("prev")
        this.$refs.mp3player.pause()
        this.$emit("prev")
      },
      playClicked(){
        console.log("playClicked")
        console.log(this.currentSong)
        if (this.currentSong.playing == 1){
          console.log("pause")
          this.currentSong.playing = 0
          this.$refs.mp3player.pause()
        } else {
          this.currentSong.playing = 1
          console.log("resume")
          this.$refs.mp3player.play()
        }
      },
      next(){
        console.log("next")
        this.$refs.mp3player.pause()
        this.$emit("next")
      },
      playSong(songId){
        console.log("playing song: ", songId)
        for (let i in this.songs){
          if (this.songs[i].id == songId){
            console.log(this.songs[i])
            this.currentSong = this.songs[i]
            break;
          }
        }
        this.$refs.mp3player.src = this.currentSong.uri
        this.$refs.mp3player.load()
        this.$refs.mp3player.play()
      }
    }
  };
</script>
<style scoped>
  .player{
    height: 100px;
    display: flex;
    justify-content: center;

  }
  .song{
    width: 33%;
  }
  .play{
    width: 33%;
    font-size: 25px;
    border: solid black 1px;
    display: flex;
    justify-content: flex-start;
  }
</style>
