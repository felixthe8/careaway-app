<template>

  <div class="checklist">
    <button class="create" @click="create">checklist</button>
  </div>

</template>

<script>

export default {
  name: 'checklist',

  methods: {
    create: function() {
      console.log("checklist created");
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";



</style>
