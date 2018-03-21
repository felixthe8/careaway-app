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

    <div class="appointment__menu">
      <label>Reason for Appointment:</label>
      <input class="appointment__menu--input" name="appointment" type="text" id="appointment">
      <label>Date Requested</label>
      <input class="appointment__menu--input" name="date" type="text" id="appointment-date">
      <button class="appointment__menu--create green-button" @click="create">Create Event</button>
    </div>

  </div>

</template>

<script>
import axios from 'axios';
import create from './appointment/appointment-creation';
import modify from './appointment/appointment-modification';
export default {
  name: 'appointment',
  components: {create, modify},
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
    addAppointment: function() {
      document.getElementsByClassName("appointment__menu")[0].classList.add("show-menu");
    },
    addAppointment(appointment) {
      this.$store.dispatch("addAppointment", appointment);
      this.appointment = appointment;
      console.log(this.appointment);
    },
    create: function() {
      this.appointment = {
        text: document.getElementById("appointment").value,
        date: document.getElementById("appointment-date").value
      }
      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date == this.appointment.date) {
          this.calendar[i].appointment = this.appointment;
        }
      }
      document.getElementsByClassName("appointment__menu")[0].classList.remove("show-menu");
    },
    getAppointment(){
      return this.$store.getters.appointments[0];
    },
    toggleCreate(){
      this.$store.dispatch("alternateAppointment");
    },
    openCreateAppointment() {
      this.$store.dispatch('alternateAppointmentCreation');
    }
  },
  computed: {
    showAppointmentCreation() {
      return this.$store.getters.showAppointmentCreation;
    },
    showAppointmentMod() {
      return this.$store.getters.showAppointmentMod;
    }
  },
  mounted() {
    if(this.isMed) {
      //TODO: Medical code not available yet...
      axios.get(this.$store.getters.getPatientInfoURL + this.$store.getters.medicalCode)
        .then(result => {
          if(result.data.success) {
            // Get patients was successful.
            console.log("Successfully retrieved list of patients: " + result.data.patients);
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

  &__button {

  }

  &__menu {
    opacity: 0;
    background: $green-light;
    margin-left: 1rem;
    padding: 1rem;

    &--create {

    }
  }

}

.show-menu {
  opacity: 1;
}
</style>
