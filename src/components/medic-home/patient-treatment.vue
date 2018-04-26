<template>
  <div class="columns medic-calendar">
    <div class="menu column is-one-fifth">
      <div id = "currentPatient">
        <h1>{{patient}}</h1>
        <h1>{{currentDiagnosis}}</h1>
      </div>
      <appointment :calendar="calendar" :isMed="isMed" />

      <diagnosis/>

      <div class="menu__widgets">
        <meterWidget :calendar="calendar"/>
        <checklistWidget :calendar="calendar"/>
      </div>
      <div class="menu">
        
        <transfer v-if="showTransferInput" :patient="patient" :username="patientUsername" v-on:close="toggleTransferInput"></transfer>
        <div v-if="showTransferButtons">
          <p v-if="transferInProgress">Awaiting patient acceptance on transfer to {{newMP}}</p>
          <a class="button is-primary is-rounded" v-if="!transferInProgress" @click="createTransfer">Transfer Patient</a>
          <a class="button is-primary is-rounded" v-if="transferInProgress" @click="updateTransfer">Change Medical Professional</a>
          <a class="button is-primary is-rounded" v-if="transferInProgress" @click="cancelTransfer">Cancel Transfer</a>
        </div>
        
      </div>

    </div>

    <calendar :calendar="calendar" class="column is-four-fifths"/>

    <mail/>

  </div>

</template>

<script>
import appointment from '../shared/appointment.vue';
import meterWidget from '../shared/meter.vue';
import checklistWidget from '../shared/checklist.vue';
import calendar from '../shared/calendar.vue';
import diagnosis from './set-diagnosis.vue';
import patientSelector from './patient-selector.vue';
import mail from '../shared/mail';
import moment from 'moment';
import axios from 'axios';
import transfer from './transfer';
export default {
  name: 'medic-calendar',
  components: {
    appointment,
    meterWidget,
    checklistWidget,
    calendar,
    diagnosis,
    transfer,
    mail
  },

  computed: {
    currentDiagnosis() {
      return this.$store.getters.getCurrentPatient.diagnosis
    }
  },

  data() {
    return {
      calendar: [],
      isMed: true,
      meter: false,
      checklist: false,
      patient: "",
      patientUsername: "",
      diagnosis: "",
      user: "",
      // Used to transfer patients
      showTransferInput: false,
      transferInProgress: true,
      newMP: "MedPro Name",
      showTransferButtons: true
    }
  },

  created: function() {
    let appointments = this.$store.getters.appointments;
    let patientName = this.$store.getters.getCurrentPatient.userName;
    this.patientUsername = this.$store.getters.getCurrentPatient.userName;
    // set meter
    this.calendar = this.$renderCalendar();
    this.patient = this.$store.getters.getCurrentPatient.fullName;
    this.user = patientName;
    
    let transferInfo = this.$store.getters.getCurrentPatient.transfer;
    // Set transfer info
    this.transferInProgress = transferInfo.inProgress;
    this.newMP = transferInfo.newMp;
    // update calendar
    for(var i=0; i < appointments.length; i++) {
      for(var j=0; j < this.calendar.length; j++) {
        if(appointments[i].date === this.calendar[j].date
          && appointments[i].appointee === patientName) {
          this.calendar[j].appointment = appointments[i];
          appointments[i].created = true;
        }
      }
    }

    // get Widgets for VueX
    axios.get(this.$store.getters.getTreatment+patientName).then(result => {
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
  methods: {
    createTransfer() {
      // pull up text box to add mpcode
      this.showTransferInput = true;
      // Hide the buttons
      this.showTransferButtons = false;
    },
    updateTransfer() {
      // pull up text box to change mpcode
      this.showTransferInput = true;
      // Hide the buttons
      this.showTransferButtons = false;
      // check to make sure mp code is different from this mp
      // Create axios request to backend to update transfer
    },
    cancelTransfer() {
      // Request to backend to remove transfer request.
      axios.post(this.$store.getters.removeTransferURL, {patient: this.patientUsername}).then(result => {
        if(result.data.success) {
          // If delete successful
          this.$store.dispatch('updatePatientTransfer', result.data.transfer);
          this.transferInProgress = this.$store.getters.getCurrentPatient.transfer.inProgress;
          console.log(this.transferInProgress);
        } else {
          // TODO: Handle error here.
          console.log("Error" );
        }
        console.log(result);
      });
    },
    toggleTransferInput() {
      this.showTransferInput = !this.showTransferInput;
      this.showTransferButtons = !this.showTransferButtons;
      let transferInfo = this.$store.getters.getCurrentPatient.transfer;
      this.transferInProgress = transferInfo.inProgress;
      this.newMP = transferInfo.newMp;
    }
  }

}
</script>

<style scoped lang="scss">
@import "../../assets/sass/settings.scss";

.medic-calendar {
  width: auto;
  height: 85vh;

  .menu {
    &__widgets {
      background: $green-light;
      margin: 10px;
      border-radius: 10px;
      text-align: center;
    }
  }

  #currentPatient{
    float: left;
    margin-left: 1rem;
  }
}
.button {
  margin: 1%;
  color: black;
  background-color: $green;
}

</style>
