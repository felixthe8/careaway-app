<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card-content">
        <h2> Schedule An Appointment </h2>
        <p v-if="errors.msg" :style="{ color: 'red'}">
          {{errorMsg}}
        </p>
        <div class="form-input">
          <p>{{ appointeeType }}:</p>
          <select v-if="isMed" v-model="selectedAppointee" ref="appoint" class="appointee">
            <option id="appointee" v-for="patient in appointee" :value="patient.username">{{patient.firstName}} {{patient.lastName}}</option>
          </select>
          <p v-if="!isMed" class="appointee" :value="selectedAppointee">
            {{medAppointee.firstName}} {{medAppointee.lastName}}
          </p>
        </div>
        <p class="form-input">
          Date: 
          <input :class="{'error': errors.date}" id="date-input" type="date" v-model="date">
        </p>
        <div id="time" class="form-input">
          <p>From:</p>
            <timeChangers :class="{'timeBox':true, 'error':errors.startTime}" 
              v-on:changeHour="changeStartHour" 
              v-on:changeMin="changeStartMin" 
              v-on:togglePM="togglePMStart"
              :hour="startHour" 
              :minute="startMinute"
              :pm="startPM"> 
            </timeChangers>
          <p>To:</p>
            <timeChangers :class="{'timeBox':true, 'error':errors.endTime}"  
              v-on:changeHour="changeEndHour"
              v-on:changeMin="changeEndMin"
              v-on:togglePM="togglePMEnd"
              :hour="endHour" 
              :minute="endMinute"
              :pm="endPM">
            </timeChangers> 
        </div>
        <a class="button is-primary is-medium is-fullwidth is-rounded" @click="create"> {{button}} </a>
      </div>
    </div>
    <button class='modal-close is-large' aria-label='close' @click='closeThis'></button>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import timeChangers from './time';
export default {
  name: 'appointmentCreation',
  components: { timeChangers }, 
  props: ["appointeeType", "appointee", "isMed"],
  data() {
    return {
      date: '',
      startHour: 8,
      startMinute: '00', 
      startPM: false,
      startTime: '',
      endHour: 8,
      endMinute: '00',
      endPM: true,
      endTime: '',
      selectedAppointee: '',
      medAppointee: '',
      button: 'Schedule Appointment',
      errorMsg: "",
      errors: {
        date: false,
        startTime: false,
        endTime: false,
        msg: false
      }
    }
  },
  beforeMount() {
    this.selectedAppointee = this.appointee[0].username;
    this.medAppointee = this.appointee[0];
  },
  methods: {
    create() {
      this.removeAllErrors();
      if(this.check()) { 
        // Getting the initator's first and last name.
        axios.get(this.$store.getters.getUserURL + this.$store.getters.authenticatedUsername)
          .then(result => {
            const name = `${result.data.user.firstName} ${result.data.user.lastName}`;

            // Construct appointment object and send to server.
            const appointment = this.constructAppointment(name);
            axios.post(this.$store.getters.createAppointmentURL, {appointment: appointment})
              .then(response => {
                if(response.data.success) {
                  console.log("Create appointment success.");

                  this.$emit('addAppointment', appointment);
                  this.errors.msg = false;
                  this.closeThis();
                } else {
                  console.log("Create appointment fail.");

                  this.errorMsg = response.data.reason;
                  this.errors.msg = true;
                }
              });
          });
      } else {
        console.log("Error, invalid inputs.");
      }
    },
    check() {
      if(!this.appointee | !this.date | !this.startHour | !this.endHour) {
        console.log("Incomplete");
        this.errors.date = true;
        this.errors.startTime = true;
        this.errors.endTime = true;
        this.showErrorMessage("Error, please complete all fields.");
        return false;
      } else {
        return this.checkDate();
      }
    },
    checkDate() {
      let hour = this.startHour;
      // Construct the start date.
      if(this.startPM) {
        hour += 12;
      }
      this.startTime = `${hour.toString()}:${this.startMinute}`;
      const startStr = `${this.date} ${this.startTime}`;
      const start = moment(startStr);

      if(!start.isValid()) {
        this.errors.date = true;
        this.showErrorMessage("Error, invalid date.");
        return false;
      }
      this.startTime = start;
      
      const now = moment();

      // Checks to make sure the start of the appointment is after the current date and time.
      const difference = start.diff(now);

      if(difference >= 0) {
        // Valid start date, checks the duration.
        return this.checkDuration(start);
      }
      this.errors.date = true;
      this.showErrorMessage("Error, invalid date. Please select a date in the future.");
      console.log(this.errors.date);
      return false;
    },
    checkDuration(start) {
      // Make sure the duration of the appointment is valid.
      let hour = this.endHour;
      if(this.endPM) {
        hour += 12;
      }
      this.endTime = `${hour.toString()}:${this.endMinute}`;
      // Convert end time.
      const endStr = `${this.date} ${this.endTime}`;
      const end = moment(endStr);

      this.endTime = end;
      console.log(this.endTime);
      // Calculate the difference between the start and end time.
      const difference = end.diff(start);
      if(difference <= 0) {
        this.errors.startTime = true;
        this.errors.endTime = true;
        this.showErrorMessage("Error, invalid times.");
        return false;
      }

      // Valid appointment duration.
      this.removeAllErrors();
      return true;
    },
    constructAppointment(initiatorName) {
      // Construct Appointment object.
      const appointment = {
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime,
        initiator: this.$store.getters.authenticatedUsername,
        initiatorName: initiatorName,
        appointee: this.selectedAppointee,
        appointeeName: document.getElementById("appointee").innerHTML,
        status: "Pending"
      };
      return appointment;
    },
    closeThis() {
      // Closes create appointment 
      this.$store.dispatch("alternateAppointmentCreation");
    },
    changeStartHour(hour) {
      this.startHour = hour;
    },
    changeStartMin(min) {
      this.startMinute = min;
    },
    togglePMStart() {
      this.startPM = !this.startPM;
    },
    changeEndHour(hour) {
      this.endHour = hour;
    },
    changeEndMin(min) {
      this.endMinute = min;
    },
    togglePMEnd() {
      this.endPM = !this.endPM;
    },
    removeAllErrors() {
      this.errors.date = false;
      this.errors.startTime = false;
      this.errors.endTime = false;
      this.errors.msg = false;
    },
    showErrorMessage(msg) {
      this.errors.msg = true;
      this.errorMsg = msg;
    }
  }
}
</script>

<style scoped lang="scss">
 @import "../../../assets/sass/settings.scss";
 h2 {
  font-size: 2em;
  font-weight: bolder;
  border-style: groove;
  border-width: 5px;
  text-align: center;
  @media #{$tablet}{
    font-size: 1.5em;
  }
 }
 .modal-content {
  border: 1px black solid;
  padding: 2%;
  width: 60%;
  margin: 0 auto;
  background-color: $white;
 }
 .form-input{
   @media #{$tablet} {
      display: flex;
      flex-direction: row;
   }
   margin: 1% 0;
 }
 .form-input {
   display: flex;
   flex-direction: column;
   @media #{$tablet} {
      display: flex;
      flex-direction: row;
   }
 }
  ul {
    margin-bottom: 0;
  }
  .timeBox {
    width: 100%;
    background: white;
    border: 1px grey solid;
    border-radius: 8px;
    margin: 0 3%;
    display: flex;
    flex-direction: row;
    @media#{$tablet} {
      width: 20%
    }
  }
  #date-input {
    margin: 0 3%;
    padding: 0.2%;
    font-size: 15px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  p {
    font-size: 15px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  input {
    border-radius: 8px;
    border: 1px grey solid;
  }
  #date-input:focus {
    outline: none;
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
  .error {
    border: 1px red solid;
  }
  .appointee {
    margin: 0 2%;
  }
  .appointee:focus {
    outline: none;
  }
</style>