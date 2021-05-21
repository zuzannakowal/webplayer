<template>
  <div>
    <img @click="click(album.id)" v-bind:src="album.img" v-bind:title="album.tytul"></img>
  </div>
</template>
<script>
  export default {
    props: ['album'],
    methods: {
      click(val){
        console.log("klik", val)
      }
    }
  }
</script>
<style scoped>
  img{
    width: 100px;
    height: 100px;
  }
</style>
