<template>
  <div>
    <navbar class = "nav-bar"/>
    <timeout v-if ="showWarning" @close = "showWarning = false"/>
    <p class = "subtitle" id = "code-display">CareAway Medical Code: {{medicalcode}} </p> 
    <create 
      :appointeeType="appointeeType"
      :appointee="appointee"
      :isMed="isMed"
      v-if = "showAppointmentCreation" 
      v-on:storeAppointment="storeAppointment"/>
    <modify 
      :appointeeType="appointeeType" 
      :appointment="appointment"
      v-if = "showAppointmentMod" 
      v-on:storeAppointment="storeAppointment"/>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './app-header';
import timeout from '../shared/timeout';
import Chart from 'chart.js';
import axios from 'axios';
import create from '../shared/appointment/appointment-creation';
import modify from '../shared/appointment/appointment-modification';
import debounce from 'debounce';
export default {
    name: 'medicHome',
    components: {navbar, timeout, create, modify},
    data() {
      return {
        showWarning: false,
        medicalcode: this.$store.getters.medicalCode
      }
    },
    beforeCreate() {
      axios.get(`http://localhost:8080/getAppt?username=${this.$store.getters.authenticatedUsername}`).then(result => {
      console.log(result);
      for(let i in result.data.appointments) {
        console.log(i);
      }
      }).catch(error => {
        console.log(error);
      });
    },
    beforeMount() {
      // TODO: Add error handling here and set the names in the appointment.
      // This is a medical professional, so get their patient list.
      axios.get(`http://localhost:8080/get-patients?code=${this.$store.getters.medicalCode}`)
        .then(result => {
          this.appointee = result.data.patients;
      });
      // Set the appointee type to patient.
      this.appointeeType = "Patient";
      this.isMed = true;
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
        console.log("Reset Timer");
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
          })
          .catch(function(err) {
            console.log(err);
          })
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


  
