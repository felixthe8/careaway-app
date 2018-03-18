<template>
  <div>
    <button class="button is-primary is-rounded" @click="toggleCreate">
      <b>&#10753;</b>&nbsp; Appointment
    </button>
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
  </div>
</template>

<script>
import axios from 'axios';
import create from './appointment-creation';
import modify from './appointment-modification';
export default {
  name: 'medicAppointment',
  components: {create, modify},
  data() {
    return {
      appointment: {}, // Currently stores only one appointment object, will need to change to store array
      appointeeType: "",
      appointee: [],
      isMed: true
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
  methods: {
    toggleCreate() {
      this.$store.dispatch("alternateAppointmentCreation");
    },
    storeAppointment(appointment) {
      this.$store.dispatch("storeAppointment", appointment);
      this.appointment = appointment;
      console.log(this.appointment);
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
    // Get the type of account this is.
    if(this.$store.getters.authStatus === "medical-professional") {
// TODO: Add error handling here and set the names in the appointment.
      // This is a medical professional, so get their patient list.
      axios.get(`http://localhost:8080/get-patients?code=${this.$store.getters.medicalCode}`)
        .then(result => {
          this.appointee = result.data.patients;
        });
      // Set the appointee type to patient.
      this.appointeeType = "Patient";
      this.isMed = true;
    } else {
      // This is a patient, so get their medical professional's name, and their information.
      axios.get(`http://localhost:8080/patient-appointment-info?username=${this.$store.getters.authenticatedUsername}`)
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
<style scoped lang="scss">
@import "../../../assets/sass/settings.scss";
  button {
    margin: 10px auto;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .button {
   background-color: #00d1b2;
   color: $white;
   margin: 2% 0;
  }
  .button:hover {
    background-color: #00c4a7;
    color: $white;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
