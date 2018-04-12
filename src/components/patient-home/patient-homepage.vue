<template>

  <div>

    <navbar class = "nav-bar"/>

    <timeout v-if ="showWarning" @close = "showWarning = false"/>

    <div class="patient-calendar" v-if="isLoaded">
      <calendar :calendar="calendar" class="column is-four-fifths"/>
      <meter-widget :widget="this.$store.getters.currentMeter" v-on:close="close" v-on:save="save" />
      <checklist-widget :widget="this.$store.getters.currentChecklist" v-on:close="close" v-on:save="save" />
    </div>

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
import calendar from '../shared/calendar';
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
        isMed: true,
        calendar: [0],
        isLoaded: true
      }
    },

    created: function() {
      this.calendar = this.$renderCalendar();

      let appointments = this.$store.getters.appointments;
      for(var i=0; i < appointments.length; i++) {
        for(var j=0; j < this.calendar.length; j++) {
          if(appointments[i].date === this.calendar[j].date) {
            this.calendar[j].appointment = appointments[i];
            appointments[i].created = true;
          }
        }
      }
    },

    beforeCreate() {
      var self = this;

      // get Appointments for VueX
      axios.get(this.$store.getters.getAppointmentURL+this.$store.getters.authenticatedUsername).then(result => {
        var appointments = result.data.appointments;
        self.isLoaded = true;
        for(var i=0; i < appointments.length; i++) {
          self.$store.dispatch('addAppointment', appointments[i]);
          self.isLoaded = true;
        }
      }).catch(error => {
        console.log(error);
      });

      // get Widgets for VueX
      axios.get(this.$store.getters.getTreatment+this.$store.getters.authenticatedUsername).then(result => {
          console.log(result.data);
        var treatments = result.data.treatments;
        for(var i=0; i < treatments.length; i++) {
          // get patient meters and add to store
          if(treatments[i].label === "meter") {
            this.$store.dispatch("addMeter", treatments[i]);
            this.isLoaded = true;
            // check and add to calendar
            for(var j=0; j < this.calendar.length; j++) {
              if(treatments[i].due_date === this.calendar[j].date) {
                this.calendar[j].meter = treatments[i];
              }
            }
          }
          // get patient checklists and add to store
          if(treatments[i].label === "checklist") {
            this.$store.dispatch("addChecklist", treatments[i]);
            this.isLoaded = true;
            // check and add to calendar
            for(var j=0; j < this.calendar.length; j++) {
              if(treatments[i].due_date === this.calendar[j].date) {
                this.calendar[j].checklist = treatments[i];
              }
            }
          }
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
        return this.$store.getters.appointments[0];
      },
      toggleCreate(){
        this.$store.dispatch("alternateAppointment");
      },
      displaySessionwarning() {
        this.showWarning = true;
      },
      close() {
        //this.active = '';
        var modals = document.getElementsByClassName("modal");
        for (var i=0;i<modals.length;i++) {
          modals[i].classList.remove("is-active");
        }
      },
      save(payload) {
        const obj = {
          treatment: payload,
          username: this.$store.getters.authenticatedUsername
        }
        axios.put(this.$store.getters.updatePatientTreatmentURL,obj)
        .then(function(response) {
          // Updated
        })
        .catch(function(err) {
          console.log(err);
        })
      },
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

  .patient-calendar {
    width: auto;
    height: 85vh;
    display: grid;
  }

</style>
