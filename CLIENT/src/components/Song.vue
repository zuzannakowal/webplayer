<template>
  <div>
    {{song.id}} {{song.tytul}} {{song.size}}
  </div>
</template>
<script>
  export default {
    props: ['song'],
  }
</script>
