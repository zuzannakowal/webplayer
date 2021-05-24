<template>
  <div class="scroll">
    <album
      @albumClicked="albumClicked"
      v-for="album in albums"
      v-bind:key="album.id"
      :album="album"
    ></album>
  </div>
</template>
<script>
  import Album from "./Album.vue"
  export default {
    components: {Album},
    props: ['albums'],
    methods: {
      albumClicked(val){
        console.log("album: ", val)
        this.$emit("albumSelected", val)
      }
    }
  }
</script>
<style>
  .scroll{
    height: 100%;
    overflow-y: auto;
    scroll-behavior: auto;
  }
</style>
