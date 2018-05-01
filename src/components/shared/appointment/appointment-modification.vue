<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card-content round-corners">
        <h2>Edit Appointment</h2>
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
        <button class="button is-primary is-medium is-fullwidth" @click="create">{{button}}</button>
        <button class="button is-primary is-medium is-fullwidth" @click="closeThis">Cancel</button>
      </div>
    </div>
    <button class='modal-close is-large' aria-label='close' @click='closeThis'></button>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import timeChangers from '../time';

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
      appointee: this.appointment.appointeeName,
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
    this.parseStart(this.appointment.startTime);
    this.parseEnd(this.appointment.endTime);

    // Parses the date.
    this.date = moment(this.appointment.date);
    this.date = (this.date).format("YYYY-MM-DD");
  },

  methods: {
    // Parses the start time for display.
    parseStart(timeStr) {
      let time = this.parseTime(timeStr);

      this.startMinute = time[1];
      let hour = parseInt(time[0]);
      this.startPM = this.parseTimeOfDay(hour);

      this.startHour = this.startPM ? (hour - 12) : hour;
    },
    // Parses the end time for display.
    parseEnd(timeStr) {
      // Create a moment time object and separates it into an array of time - hours and minutes
      let time = this.parseTime(timeStr);

      this.endMinute = time[1];
      let hour = parseInt(time[0]);
      this.endPM = this.parseTimeOfDay(hour);

      this.endHour = this.endPM ? (hour - 12) : hour;
    },
    // Creates a moment object of time.
    parseTime(time) {
      // Convert time to a moment object.
      time = new moment(time);

      // Separate the hour and minute portions.
      const timeParts = (time.format("HH:mm")).split(":");
      return timeParts;
    },
    parseTimeOfDay(hour) {
      return hour > 12;
    },
    create() {
      this.removeAllErrors();
      if(this.check()) {
        // Constructs the appointment objects.
        const appointments = this.constructAppointments();
        if(!this.$store.getters.isTutorial){
        // Put request to server
        axios.put(this.$store.getters.modifyAppointmentURL, appointments)
        .then(response => {
          // Successful appointment modification
          if(response.data.success) {
            // Stores the editted appointment in front end.
            this.$store.dispatch('editAppointment', appointments);
            this.$emit("storeAppointment", appointments.newAppointment);

            // Removes all errors.
            this.errors.msg = false;
            this.closeThis();
          } else {
            // Modified appointment fail.
            console.log("Modify appointment fail.");

            // Displays error message.
            this.errorMsg = response.data.reason;
            this.errors.msg = true;
          }
        });
        }
      } else {
        console.log("Error, invalid inputs.");
      }
    },
    check() {
      // Checks if all the fields are filled out and the times are valid.
      if(!this.appointee || !this.date || !this.startHour || !this.endHour) {
        // Sets all error message.
        this.errors.date = true;
        this.errors.startTime = true;
        this.errors.endTime = true;
        this.showErrorMessage("Error, please complete all fields.");
        return false;
      } else {
        // Checks the date for validity.
        return this.checkDate();
      }
    },
    // Checks to make sure the date is correct.
    checkDate() {
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

      let hour = this.startHour;

      // Construct the start date.
      if(this.startPM) {
        hour += 12;
      }
      // Create the time format.
      this.startTime = `${hour.toString()}:${this.startMinute}`;

      // Create the date time format.
      const startStr = `${this.date} ${this.startTime}`;

      // Create moment object from date time format.
      const start = moment(startStr, formats);

      if(!start.isValid()) {
        // If the date is an invalid format, show error messages.
        this.errors.date = true;
        this.showErrorMessage("Error, invalid date. Preferrable formats: YYYY-MM-DD or MM/DD/YYYY");
        return false;
      } else if(start.day() === 0 || start.day() === 6) {
        // The day the appointment is scheduled is a Sunday (0) or Saturday (6).
        this.errors.date = true;
        this.showErrorMessage("Error, this date is not a weekday, please choose a different date.");
        return false;
      }

      // Sets the start time to the moment date object to be used by the appointment object later.
      this.startTime = start;

      const now = moment();

      // Checks to make sure the start of the appointment is after the current date and time.
      const difference = start.diff(now);

      if(difference >= 0) {
        // Valid start date, checks the duration between the start time and end time.
        return this.checkDuration(start, formats);
      }

      // Start date was not after the current day, show error messages.
      this.errors.date = true;

      this.showErrorMessage("Error, invalid date. Please select a date in the future.");
      return false;
    },
    checkDuration(start, formats) {
      // Make sure the duration of the appointment is valid.
      let hour = this.endHour;

      if(this.endPM) { // Adjust the hour if it's pm.
        hour += 12;
      }

      this.endTime = `${hour.toString()}:${this.endMinute}`;

      // Construct the end time of the appointment.
      const endStr = `${this.date} ${this.endTime}`;
      const end = moment(endStr, formats);
      this.endTime = end;

      // Calculate the difference between the start and end time.
      const difference = end.diff(start);

      if(difference <= 0) {
        // The end time comes before the start time.
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
    changeStartHour(hour) {
      // Toggles the hour portion of the starting time.
      this.startHour = hour;
    },
    changeStartMin(min) {
      // Toggles the minute portion of the starting time.
      this.startMinute = min;
    },
    togglePMStart() {
      // Toggles if the appointment is am or pm for the start time.
      this.startPM = !this.startPM;
    },
    changeEndHour(hour) {
      // Toggles the hour portion of the end time.
      this.endHour = hour;
    },
    changeEndMin(min) {
      // Toggles the minute portion of the end time.
      this.endMinute = min;
    },
    togglePMEnd() {
      // Toggles if the end time is am or pm.
      this.endPM = !this.endPM;
    },
    removeAllErrors() {
      // Remove all errors.
      this.errors.date = false;
      this.errors.startTime = false;
      this.errors.endTime = false;
      this.errors.msg = false;
    },
    showErrorMessage(msg) {
      // Show an error message.
      this.errors.msg = true;
      this.errorMsg = msg;
    },
    constructAppointments() {
      // The original appointment.
      const originalAppointment = {
        date: this.appointment.date,
        startTime: this.appointment.startTime,
        endTime: this.appointment.endTime,
        initiator: this.appointment.initiator,
        initiatorName: this.appointment.initiatorName,
        appointee: this.appointment.appointee,
        appointeeName: this.appointment.appointeeName,
        status: this.appointment.status
      };
      // The only fields that could change are date and/or start/end time.
      const modified_appointment = {
        date: this.date,
        startTime: this.startTime.format(),
        endTime: this.endTime.format(),
        initiator: this.appointment.initiator,
        initiatorName: this.appointment.initiatorName,
        appointee: this.appointment.appointee,
        appointeeName: this.appointment.appointeeName,
        status: "Pending"
      };
      // Both appointments - original and modified.
      const appointments = {
        originalAppointment: originalAppointment,
        newAppointment: modified_appointment};

      return appointments;
    }
  }
}
</script>

<style lang="scss" scoped>


 h2 {
   font-size: 2em;
   font-weight: bold;
   color: $green;
   text-align: center;
 }

.modal-content {
    // background: $white;
}

 .card-content {
   background: $white;
   // margin: 0 auto;
 }

 #time {
   @media #{$tablet} {
      display: flex;
      flex-direction: row;
   }
   margin: 1rem 0;
 }

 .form-input {
   display: flex;
   flex-direction: column;
   @media #{$tablet} {
      display: flex;
      flex-direction: row;
   }
 }

  .timeBox {
    width: 100%;
    background: $white;
    border: 1px $purple-dark solid;
    border-radius: 8px;
    margin: 0 3%;
    display: flex;
    flex-direction: row;
    text-align: center;

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
    text-align: center;
    border: 1px $purple-dark solid;
  }

  #date-input:focus {
    outline: none;
  }

  .button {
   background-color: $green;
   color: $white;
   margin: 2% 0;

   &:hover {
     background-color: $green-dark;
   }
  }

  .error {
    border: 1px red solid;
  }

</style>
