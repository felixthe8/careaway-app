<template>

  <div class="meter">
    <button class="meter__button green-button" draggable="true" id="meter" @drag="onDrag">Meter</button>

    <div class="meter__menu">
      <label>Question:</label>
      <input class="meter__menu--input" name="meter" type="text" id="meter-question">
      <label>Date Requested:</label>
      <input class="meter__menu--input" name="date" type="text" id="meter-date">
      <button id="meter" class="meter__menu--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>

import axios from 'axios';
import moment from 'moment';
import timeChangers from './time';

export default {
  name: 'meter',

  props: ['calendar'],

  components: { timeChangers },

  data() {
    return {
      label: "meter",
      question: "",
      scale: [1,10],
      due_date: {}
    }
  },

  methods: {
    onDrag:function(event) {
      event.dataTransfer.setData("text", event.target.id);
      event.dataTransfer.effectAllowed = 'move';
      event.dropEffect = "move";
    },
    create: function() {
      this.question = document.getElementById("meter-question").value;
      this.due_date = document.getElementById("meter-date").value;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].object === this.due_date) {
          this.calendar[i].meter = this;
          this.calendar[i].meter.created = true;
        }
      }

      document.getElementsByClassName("meter__menu")[0].classList.remove("show-menu");
      // this.saveMeter();
    },
    saveMeter: function() {
      const meter = {
        label: this.label,
        question: this.question,
        scale: this.scale,
        due_date: this.due_date,
      }

      axios.post(this.$store.getters.createMeterURL, meter).then(function(response) {
        if(response.date.success) {
          console.log("Successfully Created Meter");
        } else {
          console.log("Failed to Create Meter");
        }
      }).catch(function(err) {
        console.log(err);
      });
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

  &__button {

  }

  &__menu {
    display: none;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 0;
    background: $green-light;
    margin-left: 1rem;
    padding: 1rem;

    &--create {

    }
  }

}

.show-menu {
  display: block;
}
</style>
