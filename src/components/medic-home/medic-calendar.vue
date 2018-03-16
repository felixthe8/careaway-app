<template>

  <div class="columns medic-calendar">
    <appointment class="item"/>
    <calendar class="item"/>
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
