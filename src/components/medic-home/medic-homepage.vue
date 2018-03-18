<template>
  <div>
    <navbar class = "nav-bar"/>
    <button class="button is-primary is-rounded" @click="toggleCreate"></button>
    <appointment-status :appointment="getAppointment()" v-if="this.$store.getters.showAppointment" ></appointment-status>
    <timeout v-if ="showWarning" @close = "showWarning = false"/>
    <p class = "subtitle" id = "code-display">CareAway Medical Code: {{medicalcode}} </p> 
    <create 
      :appointeeType="appointeeType"
      :appointee="appointee"
      :isMed="isMed"
      v-if = "showAppointmentCreation" 
      v-on:addAppointment="addAppointment"/>
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
import Chart from 'chart.js';
import axios from 'axios';
import appointmentStatus from '../shared/appointment/appointment-status';
import create from '../shared/appointment/appointment-creation';
import modify from '../shared/appointment/appointment-modification';
import debounce from 'debounce';
export default {
    name: 'medicHome',
    components: {navbar, timeout, appointmentStatus, create, modify},
    data() {
      return {
        showWarning: false,
        medicalcode: this.$store.getters.medicalCode,
        appointment: {}, // Currently stores only one appointment object, will need to change to store array
        appointeeType: "",
        appointee: [],
        isMed: true
      }
    },
    beforeCreate() {
      var self = this;
      axios.get(this.$store.getters.getAppointmentURL + this.$store.getters.authenticatedUsername).then(result => {
        var appointments = result.data.appointments;
        console.log(appointments);
        for(var i=0; i<appointments.length; i++) {
          self.$store.dispatch('addAppointment',appointments[i]);
        }
      }).catch(error => {
        console.log(error);
      });

    },
    mounted () { 
      // A 15 minute session inactivity timer will run to keep track of if the user is interacting with the page or not.
      var self = this;
      var time;
      document.onmousemove = debounce(resetTimer, 500);
      document.onkeypress = debounce(resetTimer, 500);
      document.onclick = debounce(resetTimer, 500);
      // start event timer when the user stops typing, or clicking
      // debouncing an event
          
      function resetTimer() {
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
      },
      getCode(){
       var self = this;
        // Return the medical code for the MP based on their username
        axios.get(this.$store.getters.returnCodeURL+this.$store.getters.authenticatedUsername)
          .then(function(response) {
            // Extract out medical code from the response
            self.medicalcode = response.data.medicalcode;
            self.$store.dispatch('medicalCode', self.medicalcode);
            // TODO: Add error handling here and set the names in the appointment.
            // This is a medical professional, so get their patient list.
            axios.get(self.$store.getters.getPatientInfoURL + self.$store.getters.medicalCode).then(result => {
              if(result.data.success) {
                // Get patients was successful.
                console.log("Successfully retrieved list of patients: " + result.data.patients);
                self.appointee = result.data.patients;
              } else {
                // Get patients failed.
                console.log("Error getting patients.");
              }
            });
            // Set the appointee type to patient.
            self.appointeeType = "Patient";
            self.isMed = true;
          })
          .catch(function(err) {
            console.log(err);
          })
      },
      addAppointment(appointment) {
        this.$store.dispatch("addAppointment", appointment);
        this.appointment = appointment;
        console.log(this.appointment);
      }
    },
    created() {
      this.getCode();
    },
    // beforeDestroy will run when the user leaves the component. 
    beforeDestroy() {
      document.onmousemove = null;
      document.onkeypress = null;
      document.onclick = null;
      this.$store.dispatch('deauthenticatedUsername', '');
      this.$store.dispatch('signOut', '');
      this.$router.push('/');
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

#code-display{
  margin-left: 2%;
  color: $purple;
  font-size: 1.25em;
}

</style>


  
