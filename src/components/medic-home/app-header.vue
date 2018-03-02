<template>
    <nav class="nav-bar">
      <img class="nav-bar__logo" @click="goHome" src="../../assets/images/careaway-logo.png">
      <a class="nav-bar__button button is-link is-rounded" @click="logOut"> <i class="fas fa-sign-out-alt"></i> {{button}} </a>
      <a class="nav-bar__button button is-link is-rounded" @click="viewReport">  View Reports </a>
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
      },
      viewReport(){
          this.$router.push('/MedicHome/Report');
      },
      goHome(){
          this.$router.push('/MedicHome');
      }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar__logo:hover{
      cursor: pointer;
  }
</style>
