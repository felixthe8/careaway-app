<template>

  <div class="meter">
    <button class="meter__button green-button"
      id="meter"
      draggable="true"
      @mousedown="dragStart"
      @drag="onDrag">Meter</button>

    <create :calendar="calendar"/>

    <status
      :calendar="calendar"
      :meter="this.$store.getters.currentMeter"/>

    <edit
      :calendar="calendar"
      :meter="this.$store.getters.currentMeter"/>

  </div>

</template>

<script>
import create from "./meter/meter-create";
import status from "./meter/meter-status";
import edit from "./meter/meter-edit";

export default {
  name: "meter",

  props: ["calendar"],

  components: { create, status, edit },

  methods: {
    dragStart: function(event) {
      this.$store.dispatch("toggleMeter");
    },
    onDrag: function(event) {
      event.preventDefault();
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
