<template>
  <div class="scroll">
    <album
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
  }
</script>
<style>
  .scroll{
    height: 100%;
    overflow-y: auto;
    scroll-behavior: auto;
  }
</style>
