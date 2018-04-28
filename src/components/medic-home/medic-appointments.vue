<template>

  <div class="columns medic-calendar">
    <div class="column is-one-fifth">

      <div class="menu">
        <appointment :calendar="calendar" :isMed="isMed" />

        <div id="patientLabel">
          <patientSelector @selected="routeIndividualTreatment"/>
        </div>
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

export default {
  name: 'medic-calendar',

  components: {
    appointment,
    meterWidget,
    checklistWidget,
    calendar,
    diagnosis,
    patientSelector
  },

  methods: {
    routeIndividualTreatment() {
      this.$router.push("/patient-treatment");
    }
  },

  created: function() {
    this.calendar = this.$renderCalendar();

    let appointments = this.$store.getters.appointments;
    for(var i=0; i < appointments.length; i++) {
      for(var j=0; j < this.calendar.length; j++) {
        if(appointments[i].date === this.calendar[j].date) {
          this.calendar[j].appointment = appointments[i];
          appointments[i].created = true;
        }
      }
    }
  },

  data() {
    return {
      calendar: [],
      isMed: true,
      meter: false,
      checklist: false
    }
  }

}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.medic-calendar {
  width: auto;
  height: 85vh;

  .menu {
    padding-left: 1rem;

    &__widgets {
      background: $green-light;
      margin: 10px;
      border-radius: 10px;
      text-align: center;
    }
  }

  #patientLabel{
    float: left;
    margin-left: 1rem;
  }
}

</style>
