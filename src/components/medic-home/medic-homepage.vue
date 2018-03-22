<template>

  <div>

    <navbar class = "nav-bar"/>

    <timeout v-if ="showWarning" @close = "showWarning = false"/>
    <p class = "subtitle" id = "code-display">CareAway Medical Code: {{medicalcode}} </p>

    <div v-if="isLoaded">
    <router-view class="wrapper"></router-view>
</div>

  </div>

</template>

<script>

import navbar from './app-header';
import timeout from '../shared/timeout';
import Chart from 'chart.js';
import axios from 'axios';
import debounce from 'debounce';
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
export default {
    name: 'medicHome',
    components: {navbar, timeout},
    data() {
      return {
        showWarning: false,
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
      displaySessionwarning() {
        this.showWarning = true;
      },
      getCode() {
        this.medicalcode = this.$store.getters.medicalCode;
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

</style>
