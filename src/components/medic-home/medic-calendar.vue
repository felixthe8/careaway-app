<template>

  <div class="columns medic-calendar">
    <div class="menu column is-one-fifth">
      <appointment :calendar="calendar" :isMed="isMed" />

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
import moment from 'moment';

export default {
  name: 'medic-calendar',

  components: {
    appointment,
    meterWidget,
    checklistWidget,
    calendar
  },

  created: function() {
    this.calendar = this.$renderCalendar(0);

    let appointments = this.$store.getters.appointments;
    for(var i=0; i < appointments.length; i++) {
      for(var j=0; j < this.calendar.length; j++) {
        if(appointments[i].date === moment(this.calendar[j].object).format("YYYY-MM-DD")) {
          this.calendar[j].appointment = appointments[i];
          appointments[i].created = true;
        }
      }
    }
    console.log(this.calendar);
  },

  data() {
    return {
      calendar: [],
      isMed: true
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
}

</style>
