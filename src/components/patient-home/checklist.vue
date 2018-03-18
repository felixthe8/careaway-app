<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <!-- Any other Bulma elements you want -->
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>

export default {
    name: 'checklistWidget',
    data() {
      return {
        showWarning: false
      }
    },
}
</script>


<style lang="scss">
@import '../../assets/sass/settings.scss';

#app {
    width: 100vw;
    height: 100vh;
  }

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

</style>


  
