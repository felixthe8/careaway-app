<template>

  <div class="appointment">
    <button class="create" @click="create">appointment</button>
  </div>

</template>

<script>

export default {
  name: 'appointment',

  data() {
    return {
        
    }
  },

  methods: {
    create: function() {
      console.log("appointment created");
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";



</style>
