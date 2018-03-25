<template>

  <div class="meter">
    <button class="meter__button green-button" draggable="true" id="meter" @drag="onDrag">Meter</button>

    <create :calendar="calendar"/>
  </div>

</template>

<script>
import create from "./meter/meter-create";

export default {
  name: "meter",

  props: ["calendar"],

  components: { create },

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
