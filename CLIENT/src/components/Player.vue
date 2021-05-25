<template>
  <div class="player">
    <div v-if="currentSong !== null">
      {{currentSong.tytul}} ({{currentSong.id}})
    </div>
    <div class="play">
      <div @click="previous">
        &#8884;
      </div>
      <div @click="playClicked">
        &#8883;
      </div>
      <div @click="next">
        &#8885;
      </div>
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
    methods: {
      previous(){
        console.log("prev")
        this.$emit("prev")
      },
      playClicked(){
        console.log("playClicked")
      },
      next(){
        console.log("next")
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
      }
    }
  };
</script>
<style scoped>
  .player{
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .play{
    font-size: 25px;
    border: solid black 1px;
    display: flex;
    justify-content: flex-start;
  }
</style>
