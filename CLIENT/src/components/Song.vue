<template>
  <div @click="click(song.num)">
    {{song.num}} {{song.playing}} {{song.tytul}} {{song.size}} ({{song.id}})
  </div>
</template>
<script>
  export default {
    props: ['song'],
    methods: {
      click(val){
        console.log("song", val)
        this.$emit("songClicked", val)
      }
    }
  }
</script>
