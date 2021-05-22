<template>
  <div id="app">
    <div class="gora">
      <div class="albums">
        <albums :albums="plyty"></albums>
      </div>
      <div class="songs">
        <songs :songs="piosenki"></songs>
      </div>
    </div>
    <div>
      <player :songs="piosenki"></player>
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
          {id: 1, plytaId: "1", tytul:"take on me",size:"9.83"},
          {id: 4, plytaId: "1", tytul:"another brick", size:"3.17"},
          {id: 2, plytaId: "3", tytul:"take on me",size:"8.32"}
        ]
      };
    },
    components: {Albums, Songs, Player},
    methods: {
      zmianaSelektora: function(val){
        console.log('parent called')
        this.selector = val
        console.log(val)
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
