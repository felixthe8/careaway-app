<template>

  <div class="columns medic-calendar">
    <appointment :calendar="calendar" class="column is-one-fifth"/>
    <calendar :calendar="calendar" class="column is-four-fifths"/>
  </div>

</template>

<script>

import appointment from '../shared/appointment.vue';
import calendar from '../shared/calendar.vue';

export default {
  name: 'medic-calendar',

  components: {
    calendar,
    appointment
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
