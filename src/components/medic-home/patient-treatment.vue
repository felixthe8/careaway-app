<template>

  <div class="columns medic-calendar">
    <div class="menu column is-one-fifth">
      <div class = "patient-info">
        <h1>{{this.$store.getters.getCurrentPatient.fullName}}</h1>
        <h1>{{this.$store.getters.getCurrentPatient.diagnosis}}</h1>
      </div>
      <appointment :calendar="calendar" :isMed="isMed" />

      <div class="menu__widgets">
        <meterWidget :calendar="calendar"/>
        <checklistWidget :calendar="calendar"/>
      </div>

      <diagnosis/>

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
import moment from 'moment';

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
    }
  },

  methods: {

  },

  created: function() {
    this.calendar = this.$renderCalendar(0);

    let appointments = this.$store.getters.appointments;
    for(var i=0; i < appointments.length; i++) {
      for(var j=0; j < this.calendar.length; j++) {
        if(appointments[i].date === this.calendar[j].object) {
          this.calendar[j].appointment = appointments[i];
          appointments[i].created = true;
        }
      }
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
    &__widgets {
      background: $green-light;
      margin: 10px;
      border-radius: 10px;
      text-align: center;
    }
  }
  .patient-info{
    margin: 0% 1% 0% 3%;
  }
}

</style>
