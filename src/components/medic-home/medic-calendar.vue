<template>

  <div class="columns medic-calendar">
    <div class="menu column is-one-fifth">
      <appointment :calendar="calendar"/>
      <meterWidget :calendar="calendar"/>
      <checklistWidget :calendar="calendar"/>
    </div>

    <calendar :calendar="calendar" class="column is-four-fifths"/>
  </div>

</template>

<script>

import appointment from '../shared/appointment.vue';
import meterWidget from '../shared/meter.vue';
import checklistWidget from '../shared/checklist.vue';
import calendar from '../shared/calendar.vue';

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
  },

  data() {
    return {
      calendar: []
    }
  }

}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.medic-calendar {
  width: auto;
  height: 85vh;
}

</style>
