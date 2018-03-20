<template>

  <div class="columns medic-calendar">
    <div class="menu column is-one-fifth">
      <appointment :calendar="calendar"/>

      <div class="menu__widgets">
        <scale :calendar="calendar"/>
        <checklist :calendar="calendar"/>
      </div>
    </div>

    <calendar :calendar="calendar" class="column is-four-fifths"/>
  </div>

</template>

<script>

import appointment from '../shared/appointment.vue';
import scale from '../shared/scale.vue';
import checklist from '../shared/checklist.vue';
import calendar from '../shared/calendar.vue';

export default {
  name: 'medic-calendar',

  components: {
    appointment,
    scale,
    checklist,
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
