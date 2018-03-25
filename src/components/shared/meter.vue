<template>

  <div class="meter">
    <button class="meter__button green-button" draggable="true" id="meter" @drag="onDrag">Meter</button>

      <div class="meter__modal">
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
      </div>

  </div>

</template>

<script>

import axios from "axios";
import moment from "moment";
import timeChangers from "./time";

export default {
  name: "meter",

  props: ["calendar"],

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
      this.$store.commit("toggleMeter");
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

      document.getElementsByClassName("meter__modal")[0].classList.remove("show-modal");
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

  &__modal {
    position: absolute;
    background: rgba(0,0,0,0.8);
    display: none;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    &--form {
      background: $green-light;
      padding: 1rem;
    }
  }

}

.show-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
