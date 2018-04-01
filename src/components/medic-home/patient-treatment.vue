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
      diagnosis: ""
    }
  },

  created: function() {
    this.calendar = this.$renderCalendar(0);
    this.patient = this.$store.getters.getCurrentPatient.fullName;
    this.diagnosis = this.$store.getters.getCurrentPatient.diagnosis;

    let appointments = this.$store.getters.appointments;
    let patientName = this.$store.getters.getCurrentPatient.userName;

    for(var i=0; i < appointments.length; i++) {
      for(var j=0; j < this.calendar.length; j++) {
        if(appointments[i].date === this.calendar[j].object
          && appointments[i].appointee === patientName) {
          this.calendar[j].appointment = appointments[i];
          appointments[i].created = true;
        }
      }
    }

    // filter function for meters (fix for appointments)
    // let test = this.patientList.filter(patient => patient.userName === this.selected);

    // get Widgets for VueX
    axios.get(this.$store.getters.getTreatment+patientName).then(result => {
      var meters = result.data.treatments;
      for(var i=0; i < meters.length; i++) {
        // get patient meters and add to store
        if(meters[i].label === "meter") {
          this.$store.dispatch('addMeter', meters[i]);
          this.isLoaded = true;
        }

        // check and add to calendar
        for(var j=0; j < this.calendar.length; j++) {
          if(meters[i].due_date === this.calendar[j].object) {
            this.calendar[j].meter = meters[i];
          }
        }
      }
    }).catch(error => {
      console.log(error);
    });

  },

  methods: {

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
