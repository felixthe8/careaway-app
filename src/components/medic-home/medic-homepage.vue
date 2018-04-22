<template>

  <div>

    <navbar class = "nav-bar"/>

    <p class = "subtitle" id = "code-display">CareAway Medical Code: {{medicalcode}} </p>
    <div v-if="isLoaded">
      <router-view class="wrapper"></router-view>
    </div>

  </div>

</template>

<script>

import navbar from './app-header';
import axios from 'axios';
import debounce from 'debounce';
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
export default {
    name: 'medicHome',
    components: {navbar},
    data() {
      return {
        medicalcode: this.$store.getters.medicalCode,
        appointment: {}, // Currently stores only one appointment object, will need to change to store array
        appointeeType: "",
        appointee: [],
        isMed: true,
        isLoaded: false
      }
    },
    beforeCreate() {
      var self = this;

      // get Appointments for VueX
      axios.get(this.$store.getters.getAppointmentURL + this.$store.getters.authenticatedUsername).then(result => {
        var appointments = result.data.appointments;
        if(appointments) {
          for(var i=0; i<appointments.length; i++) {
          self.$store.dispatch('addAppointment',appointments[i]);
          }
          self.isLoaded = true;
        } else {
          console.log("No appointments.");
        }
      }).catch(error => {
        console.log(error);
      });

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
      getCode(){
       var self = this;
        // Return the medical code for the MP based on their username
            // TODO: Add error handling here and set the names in the appointment.
            // This is a medical professional, so get their patient list.
            axios.get(self.$store.getters.getPatientInfoURL + self.$store.getters.medicalCode).then(result => {
              if(result.data.success) {
                // Get patients was successful.
                self.appointee = result.data.patients;
              } else {
                // Get patients failed.
                console.log("Error getting patients.");
              }
            });
            // Set the appointee type to patient.
            this.appointeeType = "Patient";
            this.isMed = true;
            this.medicalcode = this.$store.getters.medicalCode;
      },
      addAppointment(appointment) {
        this.$store.dispatch("addAppointment", appointment);
        this.appointment = appointment;
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
    }
}

</script>

<style lang="scss">

@import '../../assets/sass/settings.scss';

.wrapper {
  margin-top: 75px;
}

#code-display {
  margin-left: 15%;
  padding-top: 1rem;
  color: $purple;
  font-size: 1.25em;
}
#diagnosis-container{
  margin-left: 25%;
}

</style>
