<template>

  <div class="appointment">
    <label class="appointment__label">Appointment</label>
    <button class="appointment__button green-button" @click="openCreateAppointment">+</button>

    <create
      :appointeeType="appointeeType"
      :appointee="appointee"
      :isMed="isMed"
      v-if = "showAppointmentCreation"
      v-on:addAppointment="addAppointment" />

    <modify
      :requestee="appointeeType"
      :appointment="this.$store.getters.currentAppointment"
      v-if = "showAppointmentMod" />

    <edit :appointment="getAppointment()" v-if="showAppointment"></edit>

  </div>

</template>

<script>

import axios from 'axios';
import create from './appointment/appointment-creation';
import modify from './appointment/appointment-modification';
import edit from '../shared/appointment/appointment-status';
import moment from 'moment';

export default {
  name: 'appointment',
  components: {create, modify, edit},
  props: ['calendar', 'isMed'],

  data() {
    return {
      // Data needed for appointment creation/modification
      appointment: {}, // Currently stores only one appointment object, will need to change to store array
      appointeeType: "",
      appointee: []
    }
  },

  methods: {
    addAppointment(appointment) {
      this.$store.dispatch("addAppointment", appointment);
      this.appointment = appointment;
      this.appointment.created = true;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(moment(this.calendar[i].object).format("YYYY-MM-DD") == this.appointment.date) {
          this.calendar[i].appointment = this.appointment;
        }
      }
    },
    getAppointment(){
      return this.$store.getters.appointments[0];
    },
    openCreateAppointment() {
      this.$store.dispatch('alternateAppointmentCreation');
    }
  },
  computed: {
    showAppointmentCreation() {
      return this.$store.getters.showAppointmentCreation;
    },
    showAppointment: function() {
     return this.$store.getters.showAppointment;
    },
    showAppointmentMod() {
      return this.$store.getters.showAppointmentMod;
    }
  },

  mounted() {
    if(this.isMed) {
      axios.get(this.$store.getters.getPatientInfoURL + this.$store.getters.medicalCode)
        .then(result => {
          if(result.data.success) {
            // Get patients was successful.
            this.appointee = result.data.patients;
          } else {
            // Get patients failed.
            console.log("Error getting patients.");
          }
        });
      // Set the appointee type to patient.
      this.appointeeType = "Patient";
      this.isMed = true;
    } else {
      // This is a patient, so get their medical professional's name, and their information.
      axios.get(this.$store.getters.getPatientApptURL + this.$store.getters.authenticatedUsername)
        .then(result => {
          this.appointee = result.data.mp;
        });
      // Set appointee type to medical professional.
      this.appointeeType = "Medical Professional";
      this.isMed = false;
    }
  }

}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.appointment {

  &__button {
    margin: 10px;
  }

  &__label {
    margin-left: 1rem;
  }


  &__menu {
    opacity: 0;
    background: $green-light;
    margin-left: 1rem;
    padding: 1rem;


  }

}

.show-menu {
  opacity: 1;
}
</style>
