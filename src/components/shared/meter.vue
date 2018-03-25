<template>

  <div class="meter">
    <button class="meter__button green-button" draggable="true" id="meter" @drag="onDrag">Meter</button>

      <!-- <div class="meter__modal">
        <div class="meter__modal--form">
          <h1>Generate Meter</h1>
          <label>Question:</label>
          <input class="meter__modal--input" name="meter" type="text" id="meter-question">
          <p>Set Scale:</p>
          <label>From:</label><input type="number"><label>To:</label><input type="number">
          <label>Date Requested:</label>
          <input class="meter__modal--input" name="date" type="text" id="meter-date">
          <button id="meter" class="meter__modal--create green-button" @click="create">Create Event</button>
        </div>
      </div> -->
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
