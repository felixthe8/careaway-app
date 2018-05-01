<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content round-corners">
      <h2> Schedule An Appointment </h2>
      <p v-if="errors.msg" :style="{ color: 'red'}">
        {{errorMsg}}
      </p>

      <div class="form-input">
        <p>{{ appointeeType }}:</p>
        <select v-if="isMed" v-model="selectedAppointee" ref="appoint" class="appointee">
          <option id="appointee" v-for="patient in appointee" :value="patient.username">{{patient.firstName}} {{patient.lastName}}</option>
        </select>
        <p v-if="!isMed" class="appointee" id="appointee" :value="selectedAppointee">
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

      <button class="button schedule-appointment is-medium is-fullwidth" @click="create">{{button}}</button>
    </div>

    <button class='modal-close is-large' id="close" aria-label='close' @click='closeThis'></button>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import timeChangers from '../time';
import tooltip from '../../homepage/tooltip';
export default {
  name: 'appointmentCreation',
  components: { timeChangers, tooltip },
  props: ["appointeeType", "appointee", "isMed"],
  data() {
    return {
      created: false,
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
    const length = this.appointee.length;
    // Checks to see if there is at least one person this person can schedule an appointment with.
    if(this.appointee.length > 0) {
      this.selectedAppointee = this.appointee[0].username;
      this.medAppointee = this.appointee[0];
    }
  },
  methods: {
    create() {
      this.removeAllErrors();
      if(this.check()) {
        if(!this.$store.getters.isTutorial){
          // Getting the initator's first and last name.
          axios.get(this.$store.getters.getUserURL + this.$store.getters.authenticatedUsername)
          .then(result => {
            const name = `${result.data.user.firstName} ${result.data.user.lastName}`;
            // Construct appointment object and send to server.
            const appointment = this.constructAppointment(name);

            // Sends post request to server.
            axios.post(this.$store.getters.createAppointmentURL, appointment)
              .then(response => {
                if(response.data.success) {
                  console.log("Create appointment success.");
                  // Calls add appointment and this adds the appointment to the front-end store.
                  this.$emit('addAppointment', appointment.appointment);
                  this.errors.msg = false;
                  this.closeThis();
                } else {
                  console.log("Create appointment fail.");

                  this.errorMsg = response.data.reason;
                  this.errors.msg = true;
                }
              });
          });
        }
      } else {
        console.log("Error, invalid inputs.");
      }
    },
    check() {
      if(!this.appointee || !this.date || !this.startHour || !this.endHour) {
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
      console.log(`Start string: ${startStr}`);

      // Valid date formats.
      const formats = ["YYYY-MM-DD HH:mm",
                        "M/DD/YYYY HH:mm",
                        "M/D/YYYY HH:mm",
                        "MM/D/YYYY HH:mm",
                        "MM/DD/YYYY HH:mm",
                        "MM-DD-YYYY HH:mm",
                        "M-DD-YYYY HH:mm",
                        "M-D-YYYY HH:mm",
                        "MM-D-YYYY HH:mm"];

      const start = moment(startStr, formats);

      if(!start.isValid()) {
        this.errors.date = true;
        this.showErrorMessage("Error, invalid date. Preferrable formats: YYYY-MM-DD or MM/DD/YYYY");
        return false;
      } else if(start.day() === 0 || start.day() === 6) {
        // The day the appointment is scheduled is a Sunday (0) or Saturday (6)
        this.errors.date = true;
        this.showErrorMessage("Error, this date is not a weekday, please choose a different date.");
        return false;
      }
      this.startTime = start;

      const now = moment();

      // Checks to make sure the start of the appointment is after the current date and time.
      const difference = start.diff(now);

      if(difference >= 0) {
        // Valid start date, checks the duration.
        return this.checkDuration(start, formats);
      }

      this.errors.date = true;
      this.showErrorMessage("Error, invalid date. Please select a date in the future.");
      return false;
    },
    checkDuration(start, formats) {
      // Make sure the duration of the appointment is valid.
      let hour = this.endHour;
      if(this.endPM) {
        hour += 12;
      }
      this.endTime = `${hour.toString()}:${this.endMinute}`;
      // Convert end time.
      const endStr = `${this.date} ${this.endTime}`;
      const end = moment(endStr, formats);

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
      return {appointment: appointment};
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
  },
  computed:{
    isTutorial() {
      return this.$store.getters.isTutorial;
    }
  }
}
</script>

<style scoped lang="scss">


 h2 {
   font-size: 2em;
   font-weight: bold;
   color: $green;
   text-align: center;
   padding: 1rem;
 }

 .modal-content {
   padding: 1rem 2rem;
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
    background: $white;
    border: 1px $purple-dark solid;
    border-radius: 8px;
    margin: 0 1rem;
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
    border: 1px $purple-dark solid;
    text-align: center;
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
   background-color: $green;
   color: $white;
   margin: 2% 0;
  }

  .button:hover {
    background-color: $green-dark;
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

  #close {
    background-color: black;
  }

</style>
