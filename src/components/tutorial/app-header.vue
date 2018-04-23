<template>
  <nav class="nav-bar">
    <img class="nav-bar__logo" @click = "goHome" src="../../assets/images/careaway-logo.png">
  </nav>
</template>


<script>
export default {
  name: 'navbar',
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>


<style lang= "scss" scoped>
  .nav-bar {
  width: 100%;
  padding: 1rem;

    &__logo {
      width: 25px;
      height: 25px;
    }

    &__button {
      float: right;
    }
  }

  .nav-bar__logo:hover{
    cursor: pointer;
  }

</style>
