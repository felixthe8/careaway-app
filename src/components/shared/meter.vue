<template>

  <div class="meter">
    <button class="meter__button green-button"
      id="meter"
      draggable="true"
      @mousedown="dragStart"
      @drag="onDrag">Meter</button>

    <create :calendar="calendar"/>

    <status :calendar="calendar" :meter="getMeter()"/>

  </div>

</template>

<script>
import create from "./meter/meter-create";
import status from "./meter/meter-status";

export default {
  name: "meter",

  props: ["calendar"],

  components: { create, status },

  methods: {
    dragStart: function(event) {
      this.$store.commit("toggleMeter");
    },
    onDrag: function(event) {
      event.preventDefault();
    },
    getMeter() {
      // get meter from store
      // let date = this.$store.getters.getEditableAppointment;
      // let appointments = this.$store.getters.appointments;
      // let current = {};
      // for(var i=0; i < appointments.length; i++) {
      //   if(appointments[i].date === date) {
      //       current = appointments[i];
      //   }
      // }
      // return current;
    }
  }

}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.meter {
  padding: 1rem;

  &__button {
    padding: 5px 20px;
    cursor: move;
  }

  &__label {
    margin-left: 1rem;
  }
}

</style>
