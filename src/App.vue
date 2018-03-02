<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Careaway Home'
      }
    },
  }
</script>

<style>
  @import "https://use.fontawesome.com/releases/v5.0.6/css/all.css"; 
</style>