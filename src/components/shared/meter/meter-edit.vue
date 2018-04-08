<template>

  <div class="meter-modal">
    <div class="meter-modal--form">
      <div class="row">
        <h1>Edit Meter</h1>
      </div>
      <div class="row">
        <label>Question:</label>
        <input class="meter-modal--input" name="meter" type="text" id="meter-question">
      </div>
      <div class="row">
        <p>Set Scale:</p>
        <label>From:</label>
        <input type="number">
        <label>To:</label>
        <input type="number">
      </div>
      <div class="row">
        <label>Date Requested:</label>
        <input class="meter-modal--input" name="date" type="text" id="meter-date">
      </div>
      <button id="meter" class="meter-modal--create green-button" @click="update">Update Meter</button>
    </div>
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
      due_date: {}
    }
  },

  methods: {
    update: function() {
      this.question = document.getElementById("meter-question").value;
      this.due_date = document.getElementById("meter-date").value;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date === this.due_date) {
          this.calendar[i].meter = this;
          this.calendar[i].meter.created = true;
        }
      }

      document.getElementsByClassName("meter-modal")[0].classList.remove("show-modal");
      this.updateMeter();
    },
    updateMeter: function() {
      axios.put(this.$store.getters.modifyAppointmentURL, appointments)
        .then(response => {
          if(response.data.success) {
            console.log("Modify appointment success.");
            this.$store.dispatch('editAppointment', appointments);
            this.$emit("storeAppointment", appointments.newAppointment);
            this.errors.msg = false;
            this.cancel();
          } else {
            console.log("Modify appointment fail.");
            this.errorMsg = response.data.reason;
            this.errors.msg = true;
          }
        });
      } else {
        console.log("Error, invalid inputs.");
      }
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
