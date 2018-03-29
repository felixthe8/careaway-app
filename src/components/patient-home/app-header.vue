<template>
  <nav class="nav-bar">
    <img class="nav-bar__logo" @click = "goHome" src="../../assets/images/careaway-logo.png">
    <a class="nav-bar__button button is-link is-rounded" @click="logOut"> <i class="fas fa-sign-out-alt"></i> {{button}} </a>
    <a class="nav-bar__button button is-link is-rounded" @click="toggleCreate"> <i class="fas fa-sign-out-alt"></i> Create Appointment </a>
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
      // Call to user plugin to logout user
      this.$logout();
      this.$router.push('/');
    },
    viewAppointments() {
      this.$store.dispatch('alternateAppointmentCreation');
    },
    goHome() {
      this.$router.push('/PatientHome');
    },
    toggleCreate() {
      this.$store.dispatch('alternateAppointmentCreation')
    }
  }
}
</script>


<style lang= "scss" scoped>
  .nav-bar__logo:hover{
    cursor: pointer;
  }

</style>
