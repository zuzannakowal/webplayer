<template>
  <div class="scroll">
    albumId: {{ currentAlbumId }}, piosenek: {{ currentPlaylist.length }},
    pozycja: {{ currentSongNum }}, aktualna piosenka: {{ playingSongId }}
    <div v-if="currentPlaylist.length">
      <song
        @songClicked="songClicked"
        v-for="song in currentPlaylist"
        v-bind:key="song.num"
        :song="song"
      ></song>
    </div>
    <div v-else>no songs</div>
  </div>
</template>
<script>
import Song from "./Song.vue";
export default {
  components: { Song },
  data() {
    return {
      currentAlbumId: null,
      currentSongNum: null,
      currentPlaylist: [],
      playingAlbumId: null,
      playingSongId: null,
    };
  },
  methods: {
    displayAlbum(albumId, allSongs) {
      // to do: reload grającego albumu
      console.log("wyswietlam album: ", albumId, "piosenki:", allSongs);
      this.currentAlbumId = albumId;
      this.currentSongNum = null;
      this.currentPlaylist.splice(0); //reset playlist
      let j = 0;
      for (let i in allSongs) {
        if (allSongs[i].plytaId == albumId) {
          let tmpSong = allSongs[i];
          let idx = this.currentPlaylist.push(tmpSong);
          this.$set(this.currentPlaylist[idx - 1], "playing", 0);
          // sprawdzmy, czy to nie jest plyta, ktora wlasnie gra
          if (this.currentAlbumId == this.playingAlbumId) {
            //console.log("ciekawe... chyba teraz gramy ten album?");
            if (this.playingSongId == tmpSong.id) {
              console.log("oooo... gramy teraz te piosenke!", tmpSong.id);
              this.currentPlaylist[idx - 1].playing = 1;
              this.currentSongNum = idx - 1;
            }
          }
          this.$set(this.currentPlaylist[idx - 1], "num", j);
          j++;
        }
      }
      console.log("playlista: ", this.currentPlaylist);
    },
    songClicked(val) {
      console.log(
        "(songs) songSelected: ",
        val,
        this.currentPlaylist[val],
        this.currentSongNum
      );
      // cancel playing icon for the song that was playing previously
      if (this.currentSongNum !== null) {
        this.currentPlaylist[this.currentSongNum].playing = 0;
      }
      // dane nowej piosenki
      this.currentSongNum = val;
      // zachowajmy albumid/songid na boku, jakbysmy wrocili do tej plyty
      this.playingSongId = this.currentPlaylist[val].id;
      this.playingAlbumId = this.currentAlbumId;

      //zaznaczmy, ze piosenka gra
      this.currentPlaylist[val].playing = 1;
      console.log("songs: ", this.currentPlaylist);
      // wymusmy zagranie piosenki na parencie
      this.$emit("songSelected", this.currentPlaylist[val].id);
    },
    playPrevious() {
      if (this.currentSongNum === null) {
        console.log("nic nie gra");
        return;
      }
      if (this.currentSongNum == 0) {
        console.log("początek listy");
        this.songClicked(0);
        return;
      }
      this.songClicked(this.currentSongNum - 1);
    },
    playNext() {
      if (this.currentSongNum === null) {
        console.log("nic nie gra");
        return;
      }
      if (this.currentSongNum + 1 == this.currentPlaylist.length) {
        this.currentPlaylist[this.currentSongNum].playing = 0;
        this.currentSongNum = null;
        console.log("koniec listy");
        return;
      }
      this.songClicked(this.currentSongNum + 1);
    },
  },
};
</script>
<style scoped>
.scroll {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scroll-behavior: auto;
}
</style>
