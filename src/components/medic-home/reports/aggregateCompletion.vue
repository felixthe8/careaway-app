<template>
  <div class = "a-completion">
    <h1 class = "title is-3 is-spaced"> Overall Patient Task Completion </h1>
    <h2 class="subtitle"> {{completionWarning}} </h2>
    <canvas id = "aggregate-complete" width = "450" height = "300"> </canvas>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
      return {
          completionWarning: ''
      }
  }
}
</script>

<style lang="scss" scoped>
  .subtitle {
      margin-left: 2%;
  }
</style>

