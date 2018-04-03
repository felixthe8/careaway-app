<template>

  <div class="meter-modal">

    <div class="meter-modal--form">
      <div class="row">
        <h1>Generate Meter</h1>
      </div>
      <div class="row">
        <label>Question:</label>
        <input class="meter-modal--input" name="meter" type="text" id="meter-question" required>
      </div>
      <div class="row">
        <p>Set Scale:</p>
        <label>From:</label>
        <input type="number" min="0" max="10" required>
        <label>To:</label>
        <input type="number" min="10" max="100" required>
      </div>
      <div class="row">
        <label>Date Requested:</label>
        <input class="meter-modal--input" name="date" type="text" id="meter-date">
      </div>
      <button id="meter" class="meter-modal--create green-button" @click="create">Create Event</button>
    </div>


    <button class='modal-close is-large' aria-label='close' @click='close'></button>

  </div>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {

  props: ["calendar"],

  data() {
    return {
      label: "meter",
      question: "",
      scale: [1,10],
      due_date: ""
    }
  },

  methods: {
    create: function(event) {
      // get form input for meter
      this.question = document.getElementById("meter-question").value;
      this.due_date = document.getElementById("meter-date").value;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].object === this.due_date) {
          // show meter on calendar
          this.calendar[i].meter = this;
          this.calendar[i].meter.created = true;
        }
      }

      // close modal on create
      document.getElementsByClassName("meter-modal")[0].classList.remove("show-modal");
      // post new meter to database
      this.saveMeter();
      // add new meter to Vuex
      this.$store.dispatch("addMeter", this.$data);
    },
    saveMeter: function() {
      // get current user
      let user = this.$store.getters.getCurrentPatient.userName;

      const meter = {
        label: this.label,
        question: this.question,
        scale: this.scale,
        due_date: this.due_date
      }

      axios.post(this.$store.getters.createMeterURL+user, {'treatment' : meter, user}).then(function(response) {
        if(response.data.success) {
          console.log("Successfully Created Meter");
        } else {
          console.log("Failed to Create Meter");
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    close: function() {
      // close meter if exited
      document.getElementsByClassName("meter-modal")[0].classList.remove("show-modal");
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.meter-modal {
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
    text-align: left;
  }
}

.show-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
