<template>
  <div>
    <navbar class = "nav-bar"/>
    <button class="button is-primary is-rounded" @click="toggleCreate"></button>
    <calendar/>
    <timeout v-if ="showWarning" @close = "showWarning = false"/>
    <appointment-status :appointment="getAppointment()" v-if="this.$store.getters.showAppointment" ></appointment-status>
    <create 
      :appointeeType="appointeeType"
      :appointee="appointee"
      :isMed="isMed"
      v-if = "showAppointmentCreation" />
    <modify 
      :requestee="appointeeType" 
      :appointment="this.$store.getters.currentAppointment"
      v-if = "showAppointmentMod" />
    <router-view></router-view>
  </div>

</template>

<script>
import navbar from './app-header';
import timeout from '../shared/timeout';
import axios from 'axios';
import appointmentStatus from '../shared/appointment/appointment-status';
import create from '../shared/appointment/appointment-creation';
import modify from '../shared/appointment/appointment-modification';
import calendar from './calendar';
import debounce from 'debounce';
export default {
    name: 'patientHome',
    components: {
      navbar, 
      calendar, 
      timeout,
      appointmentStatus,
      create,
      modify
      },
    data() {
      return {
        showWarning: false,
        appointment: {}, // Currently stores only one appointment object, will need to change to store array
        appointeeType: "",
        appointee: [],
        isMed: true
      }
    },
    beforeCreate() {
      var self = this;
      axios.get(this.$store.getters.getAppointmentURL+this.$store.getters.authenticatedUsername).then(result => {
        var appointments = result.data.appointments;
        for(var i=0; i<appointments.length; i++) {
          self.$store.dispatch('addAppointment',appointments[i]);
        }
      }).catch(error => {
        console.log(error);
      });

    },
    beforeMount(){
      // This is a patient, so get their medical professional's name, and their information.
      axios.get(this.$store.getters.getPatientApptURL + this.$store.getters.authenticatedUsername)
        .then(result => {
          this.appointee = result.data.mp;
        });
      // Set appointee type to medical professional.
      this.appointeeType = "Medical Professional";
      this.isMed = false;
    },
    mounted () { 
      // A 15 minute session inactivity timer will run to keep track of if the user is interacting with the page or not.
      var self = this;
      var time;
      document.onmousemove = debounce(resetTimer, 500);
      document.onkeypress = debounce(resetTimer, 500);
      document.onclick = debounce(resetTimer, 500);

      function resetTimer() {
        // Remove the timer ID instance created by setTimeout
       clearTimeout(time);
      // After 15 minutes of inacitivity, the session timeout warning will display
       time = setTimeout(self.displaySessionwarning, 15*60*1000);
     }
      // Call the resetTimer function to kick-start the inactivity timer. 
      resetTimer();
    },
    computed: {
      showAppointmentCreation() {
        return this.$store.getters.showAppointmentCreation;
      },
      showAppointmentMod() {
        return this.$store.getters.showAppointmentMod;
      }
    },
    methods: {
      getAppointment(){
        console.log("GETTING THE APPOINTMENT");
        console.log(this.$store.getters.appointments[0]);
        return this.$store.getters.appointments[0];
      },
      toggleCreate(){
        this.$store.dispatch("alternateAppointment");
      },
      displaySessionwarning() {
        this.showWarning = true;
      }
    },
    // beforeDestroy will run right before the user leaves the component. 
    beforeDestroy() {
      document.onmousemove = null;
      document.onkeypress = null;
      document.onclick = null;
      this.$store.dispatch('deauthenticatedUsername', '');
      this.$store.dispatch('signOut','');
      this.$router.push('/');
    }
  
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


  
