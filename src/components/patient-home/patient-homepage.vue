<template>

  <div>

    <navbar class = "nav-bar" v-on:toggleTransfer="toggleTransfer"/>

    <div id="transfer">
      <transfer v-if="showTransfer" :currentMed="medName" v-on:close="toggleTransfer"/>
    </div>

    <div class="patient-calendar" v-if="isLoaded">
      <calendar :calendar="calendar" class="column"/>
    </div>

    <meter-widget :widget="this.$store.getters.currentMeter" v-on:close="close" v-on:save="save" />
    <checklist-widget :widget="this.$store.getters.currentChecklist" v-on:close="close" v-on:save="save" />
    <appointment :calendar="calendar" :isMed="isMed" patientview="true"/>
 
    <create
      :appointeeType="appointeeType"
      :appointee="appointee"
      :isMed="isMed"
      v-if = "showAppointmentCreation"/>
    <router-view></router-view>

    <mail/>

  </div>

</template>

<script>
import moment from 'moment';
import navbar from './app-header';
import axios from 'axios';
import appointmentStatus from '../shared/appointment/appointment-status';
import create from '../shared/appointment/appointment-creation';
import modify from '../shared/appointment/appointment-modification';
import calendar from '../shared/calendar';
import meterWidget from './meter';
import checklistWidget from './checklist';
import mail from '../shared/mail';
import debounce from 'debounce';
import appointment from '../shared/appointment.vue';
import transfer from './transfer';

export default {
    name: 'patientHome',
    components: {
      navbar,
      calendar,
      appointmentStatus,
      create,
      modify,
      meterWidget,
      checklistWidget,
      appointment,
      transfer,
      mail
    },

    data() {
      return {
        appointment: {}, // Currently stores only one appointment object, will need to change to store array
        appointeeType: "",
        appointee: [],
        medName: '',
        isMed: false,
        calendar: [0],
        isLoaded: true,
        showTransfer: false,
      }
    },

    beforeCreate() {
      var self = this;

      // get Appointments for VueX
      axios.get(this.$store.getters.getAppointmentURL + this.$store.getters.authenticatedUsername).then(result => {
        var appointments = result.data.appointments;
        if(appointments) {
          for(var i=0; i < appointments.length; i++) {
            self.$store.dispatch('addAppointment',appointments[i]);
          }
          self.showAppointments();
          self.isLoaded = true;
        } else {
          alert("No appointments.");
        }
      }).catch(error => {
        throw error;
      });

      // get Widgets for VueX
      axios.get(this.$store.getters.getTreatment+this.$store.getters.authenticatedUsername).then(result => {
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
        throw error;
      });

    },

    created: function() {
      this.calendar = this.$renderCalendar();

      // flag patient selected set to true
      this.$store.dispatch("patientSelected", true);

    },

    beforeMount(){
      // This is a patient, so get their medical professional's name, and their information.
      axios.get(this.$store.getters.getPatientApptURL + this.$store.getters.authenticatedUsername)
        .then(result => {
          this.appointee = result.data.mp;
          this.medName = this.appointee[0].firstName + " " + this.appointee[0].lastName;
        });
      // Set appointee type to medical professional.
      this.appointeeType = "Medical Professional";
      this.isMed = false;
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
      showAppointments: function() {
        let appointments = this.$store.getters.appointments;
        let patientName = this.$store.getters.authenticatedUsername;
        for(var i=0; i < appointments.length; i++) {
          for(var j=0; j < this.calendar.length; j++) {
            if(appointments[i].date === this.calendar[j].date
              && appointments[i].appointee === patientName) {
              this.calendar[j].appointment = appointments[i];
              appointments[i].created = true;
            }
          }
        }
      },
      getAppointment(){
        return this.$store.getters.appointments[0];
      },
      toggleCreate(){
        this.$store.dispatch("alternateAppointment");
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
      toggleTransfer() {
        this.showTransfer = !this.showTransfer;
      }
    },
}
</script>

<style lang="scss">

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
  padding-top: 100px;
}

#transfer {
  margin: 0 auto;
}

</style>
