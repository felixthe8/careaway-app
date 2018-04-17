<template>
  <nav class="nav-bar">
    <img class="nav-bar__logo" @click="goHome" src="../../assets/images/careaway-logo.png">
    <a class="nav-bar__button button is-link is-rounded" @click="logOut"> <i class="fas fa-sign-out-alt"></i> {{button}} </a>
    <a class="nav-bar__button button is-link is-rounded" @click="viewReport"> <i class="fas fa-chart-line"></i> View Reports </a>
    
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'navbar',
  data() {
    return {
      button: 'Logout',
    }
  },
  methods: {
    logOut() {
      // Call to user plugin to logout user
      this.$logout();
      axios.get(this.$store.getters.logoutURL).then(response => {
        console.log(response);
        this.$router.push('/');
      });
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

.nav-bar {
  width: 100%;
  padding: 1rem;
  position: fixed;

  &__logo {
    width: 25px;
    height: 25px;
  }

  &__button {
    float: right;
    margin-left: 1rem;
  }

  &:hover {
    cursor: pointer;
  }
}

</style>
