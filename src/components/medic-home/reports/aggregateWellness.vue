<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Overall Patient Wellness </h1>
    <h2 class="subtitle"> {{wellnessWarning}} </h2>
    <canvas id = "aggregate-wellness" width = "450" height = "300"> </canvas>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
      return {
          wellnessWarning: ''
      }
  }
}
</script>

<style lang="scss" scoped>
  .subtitle {
      margin-left: 2%;
  }
</style>

