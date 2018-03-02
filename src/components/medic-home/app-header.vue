<template>
    <nav class="nav-bar">
      <img class="nav-bar__logo" src="../../assets/images/careaway-logo.png">
      <a class="nav-bar__button button is-link is-rounded" @click="logOut"> <i class="fas fa-sign-out-alt"></i> {{button}} </a>
    </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
      return {
          button: 'Logout',
      }
  },
  methods: {
      logOut() {
          document.onmousemove = null;
          document.onkeypress = null;
          document.onclick = null;
          this.$store.dispatch('signOutMP');
          this.$router.push('/');
      }
  }
}
</script>