<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card-content">
        <h2> Edit Appointment </h2>
        <p v-if="errors.msg" :style="{ color: 'red'}">
          {{errorMsg}}
        </p>
        <p class="form-input">
          {{ requestee }}:  
          {{ appointee }}
        </p>
        <p class="form-input">
          Date: 
          <input 
            :class="{'error': errors.date}" 
            id="date-input" 
            ref="dateInput" 
            type="date" 
            v-model="date">
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
        <a class="button is-primary is-medium is-fullwidth is-rounded" @click="cancel"> Cancel </a>
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
  components: { timeChangers }, // Pass in list of patients from global store
  props: ["requestee", "appointment"],
  data() {
    return {
      date: this.appointment.date,
      startHour: '',
      startMinute: '', 
      startPM: true,
      startTime: this.appointment.startTime,
      endHour: '',
      endMinute: '',
      endPM: true,
      endTime: this.appointment.endTime,
      appointee: this.appointment.appointee,
      button: 'Save Appointment',
      errorMsg: "",
      errors: {
        date: false,
        startTime: false,
        endTime: false,
        msg: false
      }
    }
  },
  created() {
    // Parse the time.
    this.parseTimeStart(this.appointment.startTime);
    this.parseTimeEnd(this.appointment.endTime);

    // Parses the date.
    this.date = moment(this.appointment.date);
    this.date = (this.date).format("YYYY-MM-DD");
  },
  computed: {
    
  },
  methods: {
    parseTimeStart(time) {
      time = new moment(time);
      // Time is a moment object.
      const times = (time.format("HH:mm")).split(":");
      this.startMinute = times[1];
      let hourPortion = parseInt(times[0]);
      if(hourPortion > 12) {
        hourPortion = hourPortion - 12;
        console.log(hourPortion);
        this.startPM = true;
      } else {
        this.startPM = false;
      }
      this.startHour = hourPortion;
    },
    parseTimeEnd(time) {
      time = new moment(time);
      // Time is a moment object.
      const times = (time.format("HH:mm")).split(":");
      this.endMinute = times[1];
      let hourPortion = parseInt(times[0]);
      if(hourPortion > 12) {
        hourPortion = hourPortion - 12;
        this.endPM = true;
      } else {
        this.endPM = false;
      }
      this.endHour = hourPortion;
    },
    create() {
      this.removeAllErrors();
      if(this.check()) {
        // The only fields that could change are start and end time.
        const modified_appointment = this.appointment;
        modified_appointment.startTime = this.startTime;
        modified_appointment.endTime = this.endTime;

        console.log(`original: ${this.appointment.startTime}\nnew ${modified_appointment.startTime}`);
        axios.post(this.$store.getters.modifyAppointmentURL, {originalAppointment: this.appointment, newAppointment: modified_appointment})
        .then(response => {
          if(response.data.success) {
            console.log("Modify appointment success.");

            this.$emit("storeAppointment", modified_appointment);
            this.errors.msg = false;
            this.cancel();
          } else {
            console.log("Modify appointment fail.");
            this.errorMsg = response.data.reason;
            this.errors.msg = true;
          }
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
      this.startTime = start;
      if(!start.isValid()) {
        this.errors.date = true;
        this.showErrorMessage("Error, invalid date.");
        return false;
      }

      console.log("start" + start.format());
      
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
    closeThis() {
      // Closes modify appointment.
      this.$store.dispatch("alternateAppointmentMod");
    },
    cancel() {
      // Close modify appointment.
      this.closeThis();
      // Reopens appointment-status.
      //this.$store.dispatch('authenticatedUsername', this.appointment.initiator);
      //this.$store.dispatch('authenticatedUsername', this.currentAppointmentObject.appointee);
      this.$store.commit("alternateAppointment");
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
 #time {
   @media #{$tablet} {
      display: flex;
      flex-direction: row;
   }
   margin: 3% 0;
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
</style>