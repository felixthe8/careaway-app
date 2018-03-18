<template>
  <nav class="nav-bar">
    <img class="nav-bar__logo" src="../../assets/images/careaway-logo.png">
    <a class="nav-bar__button button is-link is-rounded" @click="logOut"> <i class="fas fa-sign-out-alt"></i> {{button}} </a>
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
      this.$store.dispatch('signOut', '');
      this.$router.push('/');
    },
    viewAppointments() {
      this.$store.dispatch('alternateAppointmentCreation');
    }
  }
}
</script>


<style>

</style>
