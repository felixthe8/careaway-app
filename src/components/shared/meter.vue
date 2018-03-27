<template>

  <div class="meter">
    <button class="meter__button green-button" draggable="true" id="meter" @drag="onDrag">Meter</button>

    <create :calendar="calendar"/>

    <status :calendar="calendar"/>

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
    onDrag:function(event) {
      this.$store.commit("toggleMeter");
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
