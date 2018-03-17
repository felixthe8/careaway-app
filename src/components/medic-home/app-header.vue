<template>
  <nav class="nav-bar">
    <img class="nav-bar__logo" @click="goHome" src="../../assets/images/careaway-logo.png">
    <a class="nav-bar__button button is-link is-rounded" @click="logOut"> <i class="fas fa-sign-out-alt"></i> {{button}} </a>
    <a class="nav-bar__button button is-link is-rounded" @click="viewReport"> <i class="fas fa-chart-line"></i> View Reports </a>
    <a class="nav-bar__button button is-link is-rounded" @click="viewAppointments"><i class="fas fa-calendar-alt"></i> &nbsp; Appointments</a>
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
      this.$store.dispatch('deauthenticatedUsername', '');
      this.$store.dispatch('medicalCode', '');
      this.$store.dispatch('signOut', '');
      this.$router.push('/');
    },
    viewReport(){
      this.$router.push('/MedicHome/Report');
    },
    goHome(){
      this.$router.push('/MedicHome');
    },
    viewAppointments() {
      this.$store.dispatch('alternateAppointmentCreation');
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar__logo:hover{
    cursor: pointer;
  }
  .nav-bar a{
    margin: 0 5px 0 3px;
  }
</style>
