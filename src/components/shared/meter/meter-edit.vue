<template>

    <div class="modal meter-edit-modal">

      <div class="modal-background"></div>
      <div class="modal-content meter-modal--form">
        <h1 class="meter-edit-modal__title">Edit Meter</h1>
        <div class="field">
          <label>Question: {{meter.question}}</label>
          <input class="input" name="meter" type="text" id="meter-question" required>
        </div>
        <div class="field">
          <p>Set Scale:</p>
          <label>From:</label>
          <input type="number" min="0" max="10" required>
          <label>To:</label>
          <input type="number" min="10" max="100" required>
        </div>
        <div class="field">
          <label>Date Assigned: {{meter.due_date}}</label>
          <input class="input meter-modal--input" name="date" type="text" id="meter-date">
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

      document.getElementsByClassName("meter-modal")[0].classList.remove("show-modal");
      this.updateMeter();
    },
    updateMeter: function() {
      // get current user
      let user = this.$store.getters.getCurrentPatient.userName;

      const meter = {
        label: this.label,
        question: this.question,
        scale: this.scale,
        due_date: this.due_date
      }

      axios.put(this.$store.getters.updateMeterURL+user, {'treatment' : meter, user}).then(function(response) {
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
