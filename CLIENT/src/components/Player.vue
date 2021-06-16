<template>
  <div class="player">
    <div class="song" v-if="currentSong !== null">
      {{ currentSong.tytul }} ({{ currentSong.id }})<br />{{
        Math.floor(time / 60)
          .toString()
          .padStart(2, "0")
      }}:{{
        Math.floor(time % 60)
          .toString()
          .padStart(2, "0")
      }}
      /
      {{
        Math.floor(duration / 60)
          .toString()
          .padStart(2, "0")
      }}:{{
        Math.round(duration % 60)
          .toString()
          .padStart(2, "0")
      }}
    </div>
    <div class="play">
      <div @click="previous">⏪</div>
      <div @click="playClicked">
        <div v-if="currentSong === null">⏯</div>
        <div v-if="currentSong !== null && currentSong.playing == 0">⏯</div>
        <div v-if="currentSong !== null && currentSong.playing == 1">⏯</div>
      </div>
      <div @click="next">⏩</div>
      <div>
        <input type="range" id="scroller" ref="scroll" min="0" value="0" />
      </div>
      <audio
        id="mp3player"
        controls
        ref="mp3player"
        style="visibility: hidden"
      ></audio>
    </div>
  </div>
</template>
<script>
import SongName from "./SongName.vue";
export default {
  components: { SongName },
  props: ["songs"],
  data: function () {
    return {
      currentSong: null,
      time: 0,
      duration: 0,
      scrollClicked: false,
    };
  },
  mounted() {
    console.log("player zamontowany");
    this.$nextTick(function () {
      console.log("view zrenderowany");
      this.$refs.mp3player.addEventListener(
        "ended",
        function (e) {
          console.log("utwór sie skończył");
          this.next();
        }.bind(this)
      );
      this.$refs.mp3player.addEventListener(
        "timeupdate",
        this.updateTimer.bind(this)
      );
      this.$refs.scroll.addEventListener("change", this.scrollSong.bind(this));
      this.$refs.scroll.addEventListener(
        "mousedown",
        function (e) {
          console.log("kliknieto w scrolla");
          this.scrollClicked = true;
        }.bind(this)
      );
      this.$refs.scroll.addEventListener(
        "mouseup",
        function (e) {
          console.log("puszczono scrolla");
          this.scrollClicked = false;
        }.bind(this)
      );
    });
  },
  methods: {
    previous() {
      console.log("prev");
      // jak jest wiecej niz 2 sekundy od poczatku, to wracamy na poczatek piosenki
      if (this.$refs.mp3player.currentTime > 2) {
        this.$refs.mp3player.currentTime = 0;
      } else {
        // a jak mniej niz 3 sec, to poprzednia piosenka
        this.$refs.mp3player.pause();
        this.$emit("prev");
      }
    },
    updateTimer(e) {
      this.time = e.target.currentTime;
      this.duration = this.$refs.mp3player.duration;
      if (!this.scrollClicked) {
        this.$refs.scroll.min = 0;
        this.$refs.scroll.max = this.duration;
        this.$refs.scroll.value = this.time;
      }
    },
    scrollSong(e) {
      console.log("song scrolled", e.target.value);
      this.$refs.mp3player.currentTime = e.target.value;
    },
    playClicked() {
      console.log("playClicked");
      console.log(this.currentSong);
      if (this.currentSong.playing == 1) {
        console.log("pause");
        this.currentSong.playing = 0;
        this.$refs.mp3player.pause();
      } else {
        this.currentSong.playing = 1;
        console.log("resume");
        this.$refs.mp3player.play();
      }
    },
    next() {
      console.log("next");
      this.$refs.mp3player.pause();
      this.$emit("next");
    },
    playSong(songId) {
      console.log("playing song: ", songId);
      for (let i in this.songs) {
        if (this.songs[i].id == songId) {
          console.log(this.songs[i]);
          this.currentSong = this.songs[i];
          break;
        }
      }
      this.$refs.mp3player.src = this.currentSong.uri;
      this.$refs.mp3player.load();
      this.$refs.mp3player.play();
    },
  },
};
</script>
<style scoped>
.player {
  height: 100px;
  display: flex;
  justify-content: flex-end;
}
.song {
  color: #778091;
  margin-top: 30px;
  width: 50%;
  text-align: center;
}
.play {
  margin-top: 30px;
  width: 50%;
  font-size: 25px;
  display: flex;
  justify-content: center;
}
</style>
