<template>

  <div class="columns medic-calendar">
    <div class="menu column is-one-fifth">

      <appointment :calendar="calendar" :isMed="isMed" />

      <h1>{{patient}}</h1>
      <h1>{{diagnosis}}</h1>

      <diagnosis/>

      <div class="menu__widgets">
        <meterWidget :calendar="calendar"/>
        <checklistWidget :calendar="calendar"/>
      </div>

    </div>

    <calendar :calendar="calendar" class="column is-four-fifths"/>
  </div>

</template>

<script>

import appointment from '../shared/appointment.vue';
import meterWidget from '../shared/meter.vue';
import checklistWidget from '../shared/checklist.vue';
import calendar from '../shared/calendar.vue';
import diagnosis from './set-diagnosis.vue';
import patientSelector from './patient-selector.vue';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'medic-calendar',

  components: {
    appointment,
    meterWidget,
    checklistWidget,
    calendar,
    diagnosis,
  },

  data() {
    return {
      calendar: [],
      isMed: true,
      meter: false,
      checklist: false,
      patient: "",
      diagnosis: "",
      user: ""
    }
  },

  created: function() {
    let appointments = this.$store.getters.appointments;
    let patientName = this.$store.getters.getCurrentPatient.userName;

    // set meter
    this.calendar = this.$renderCalendar(0);
    this.patient = this.$store.getters.getCurrentPatient.fullName;
    this.diagnosis = this.$store.getters.getCurrentPatient.diagnosis;
    this.user = patientName;

    // update calendar
    for(var i=0; i < appointments.length; i++) {
      for(var j=0; j < this.calendar.length; j++) {
        if(appointments[i].date === this.calendar[j].object
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
            if(treatments[i].due_date === this.calendar[j].object) {
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
            if(treatments[i].due_date === this.calendar[j].object) {
              this.calendar[j].checklist = treatments[i];
            }
          }
        }
      }
    }).catch(error => {
      console.log(error);
    });

  }

}
</script>

<style lang="scss">
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

  #patientLabel{
    float: right;
  }
}

</style>
