<template>
  <div id="app">
    <div class="gora">
      <div class="albums">
        <albums @albumSelected="albumSelected" :albums="plyty"></albums>
      </div>
      <div class="songs">
        <songs @songSelected="songSelected" ref="songs"></songs>
      </div>
    </div>
    <div class="dol">
      <player @prev="prev" @next="next" ref="player" :songs="piosenki"></player>
    </div>
  </div>
</template>
<script>
import Albums from "./components/Albums.vue";
import Songs from "./components/Songs.vue";
import Player from "./components/Player.vue";
export default {
  data() {
    return {
      plyty: [],
      piosenki: [],
      currentAlbum: null,
    };
  },
  components: { Albums, Songs, Player },
  mounted() {
    console.log("inicjacja aplikacji");
    const headers = { "Content-Type": "application/json" };

    fetch("http://localhost:3000/albums", { method: "get", headers })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.plyty = data;
      });
    this.albumSelected(0);
  },
  methods: {
    albumSelected(albumId) {
      console.log("album: ", albumId);

      const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:3000/songs?albumId=" + albumId, {
        method: "get",
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("otrzymalem takie piosenki: ", data);
          this.piosenki = data;
          this.currentAlbum = albumId;
          console.log("aktualna lista piosenek: ", this.piosenki);
          this.$refs.songs.displayAlbum(albumId, this.piosenki);
        });
    },
    songSelected(songId) {
      console.log("song selected: ", songId);
      this.$refs.player.playSong(songId);
    },
    prev() {
      console.log("app prev");
      this.$refs.songs.playPrevious();
    },
    next() {
      console.log("app next");
      this.$refs.songs.playNext();
    },
  },
};
</script>
<style scoped>
#app {
  font-size: 15px;
  font-family: "Courier New", monospace;
  color: #c4523f;
  background-color: #778091;
  padding-top: 1px;
  padding-bottom: 1px;
}
div {
  margin: 5px;
}
.gora {
  height: 400px;
  display: flex;
  justify-content: flex-start;
  background-color: #b3cbf9;
}
.albums {
  width: 110px;
  padding-bottom: 10px;
  background-color: cornflowerblue;
}
.songs {
  width: 100%;
}
.dol {
  background-color: #f8bea6;
}
</style>
