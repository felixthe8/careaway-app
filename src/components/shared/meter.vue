<template>

  <div class="meter">
    <button class="create" @click="create">meter</button>
  </div>

</template>

<script>

export default {
  name: 'meter',

  methods: {
    create: function() {
      console.log("meter created");
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";



</style>
