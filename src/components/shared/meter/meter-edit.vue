<template>

    <div class="modal meter-edit-modal">

      <div class="modal-background"></div>
      <div class="modal-content meter-modal--form">
        <h1 class="meter-edit-modal__title">Edit Meter</h1>
        <div class="field">
          <label>Question:</label>
          <input class="input" name="meter" type="text" id="meter-edit-question" :value="meter.question">
        </div>
        <div class="field">
          <p>Set Scale:</p>
          <label>From:</label>
          <input type="number" min="0" max="10" :value="meter.scale[0]">
          <label>To:</label>
          <input type="number" min="10" max="100" :value="meter.scale[1]">
        </div>
        <div class="field">
          <label>Date Assigned:</label>
          <input class="input meter-modal--input" name="date" type="text" id="meter-date" :value="meter.due_date" readonly>
        </div>
        <button id="meter" class="meter-modal--create green-button" @click="update">Update Meter</button>
      </div>

      <button class='modal-close is-large' aria-label='close' @click='close'></button>

    </div>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {

  props: ["calendar", "meter"],

  data() {
    return {
      label: "meter",
      question: "",
      scale: [1,10],
      due_date: {}
    }
  },

  methods: {
    close: function() {
      // close meter if exited
      document.getElementsByClassName("meter-edit-modal")[0].classList.remove("is-active");
    },
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

      document.getElementsByClassName("meter-edit-modal")[0].classList.remove("is-active");
      this.updateMeter();
    },
    updateMeter: function() {
      // define this for in post request
      let self = this;
      this.question = document.getElementById("meter-edit-question").value;
      // get current user
      let user = this.$store.getters.getCurrentPatient.userName;
      console.log(this.question);
      const meter = {
        label: this.label,
        question: this.question,
        scale: this.scale,
        due_date: this.due_date
      }

      axios.put(this.$store.getters.updateTreatmentMeterURL+user, {'treatment' : meter, user}).then(function(response) {
        if(response.data.success) {
          alert("Meter Edited!");
        } else {
          alert("Meter Failed to Update")
        }
      }).catch(function(err) {
          throw err;
      });
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.meter-edit-modal {
  &--form {
    background: $white;
    padding: 2rem;
    text-align: left;
  }

  &__title {
    font-size: 2em;
  }
}

</style>
