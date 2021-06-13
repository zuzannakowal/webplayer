<template>
  <div id="app">
    <div class="gora">
      <div class="albums">
        <albums
          @albumSelected="albumSelected"
          :albums="plyty"
        ></albums>
      </div>
      <div class="songs">
        <songs
          @songSelected="songSelected"
          ref="songs"
          :songs="piosenki"></songs>
      </div>
    </div>
    <div>
      <player @prev="prev" @next="next" ref="player" :songs="piosenki"></player>
    </div>
    <div>
      debug: {{currentAlbum}}
    </div>
  </div>
</template>
<script>
  import Albums from "./components/Albums.vue";
  import Songs from "./components/Songs.vue";
  import Player from "./components/Player.vue"
  export default {
    data(){
      return {
        plyty: [
          {id: 1, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 2, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 3, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 4, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 5, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 6, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 7, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 8, tytul: "delicate sound", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
          {id: 9, tytul: "the wall", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
        ],
        piosenki: [
          {id: 1, plytaId: "1", tytul:"take on me",size:"9.83", uri: "http://xn--odgosy-5db.pl/odglosy/swinia.mp3"},
          {id: 4, plytaId: "1", tytul:"another brick", size:"3.17", uri: "http://odgłosy.pl/odglosy/swierszcz.mp3"},
          {id: 7, plytaId: "1", tytul:"duck",size:"9.83", uri: "http://odgłosy.pl/odglosy/kaczki.mp3"},
          {id: 2, plytaId: "3", tytul:"just give me a reason",size:"8.32", uri: "http://odgłosy.pl/odglosy/kon01.mp3"}
        ],
        currentAlbum: null
      };
    },
    components: {Albums, Songs, Player},
    mounted(){
      console.log("inicjacja aplikacji")
      const headers = { "Content-Type": "application/json" }
   
      fetch("http://localhost:3000/albums", { method: "get", headers })
        .then(response => response.json())
        .then(data => console.log(data))
    },  
    methods: {
      albumSelected(albumId){
        console.log("album: ", albumId)
        this.currentAlbum = albumId
        this.$refs.songs.displayAlbum(albumId)
      },
      songSelected(songId){
        console.log("song selected: ", songId)
        this.$refs.player.playSong(songId)
      },
      prev(){
        console.log("app prev")
        this.$refs.songs.playPrevious()
      },
      next(){
        console.log("app next")
        this.$refs.songs.playNext()
      }
    }
  };
</script>
<style scoped>
  #app {
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    color: blue;
  }
  div{
    border: black solid 1px;
    margin: 5px;
  }
  .gora{
    height: 500px;
    display: flex;
    justify-content: flex-start;
  }
  .albums{
    width: 110px;
  }
  .songs{
    width: 100%;
  }
</style>
