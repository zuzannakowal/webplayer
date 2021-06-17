<template>
  <div @click="click(song.num)">
    <div v-if="song.playing" style="color: black">
      {{ song.num + 1 }} {{ song.tytul }} {{ Math.round(song.size) }} MB
    </div>
    <div v-else>
      {{ song.num + 1 }} {{ song.tytul }} {{ Math.round(song.size) }} MB
    </div>
  </div>
</template>
<script>
export default {
  props: ["song"],
  methods: {
    click(val) {
      console.log("song", val);
      this.$emit("songClicked", val);
    },
  },
};
</script>
