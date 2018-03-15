<template>
  <div>
    <button class="button is-rounded is-primary" @click="toggleCreate"><b>&#10753;</b>&nbsp; Appointment</button>
    <create 
      :requestee="requestee" 
      v-if = "showAppointmentCreation" 
      v-on:storeAppointment="storeAppointment"/>
    <modify 
      :requestee="requestee" 
      :appointment="appointment"
      v-if = "showAppointmentMod" 
      v-on:storeAppointment="storeAppointment"/>
    <calendar />
  </div>
</template>

<script>
import axios from 'axios';
import calendar from '../medic-home/calendar';
import create from './appointment-creation';
import modify from './appointment-modification';
export default {
  name: 'medicAppointment',
  components: {calendar, create, modify},
  data() {
    return {
      appointment: {},
      requestee: "Patient",
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
    axios.get('http://localhost:8080/appointments').then(result => {
      for(let i in result.data.appointments) {
        console.log(i);
      }
    }).catch(error => {
      console.log(error);
    });
  }
}
</script>
<style lang="scss">
button{
  margin: 10px 10px 10px 10px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
