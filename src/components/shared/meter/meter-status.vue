<template>

  <div class="meter-status-modal">

    <div class="meter-status-modal--form">
      <div class="row">
        <h1>{{meter.label}}</h1>
      </div>
      <p>Question: {{meter.question}}</p>
      <p>Scale: {{meter.scale[0]}} - {{meter.scale[1]}}</p>
      <p>Date Assigned: {{meter.due_date}}</p>
      <button id="meter-edit" class="meter-modal--create green-button" @click="edit">Edit Meter</button>
      <button id="meter-delete" class="meter-modal--create green-button" @click="deleteMeter">Delete Meter</button>
    </div>

    <button class='modal-close is-large' aria-label='close' @click='close'></button>

  </div>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {

  props: ["calendar", "meter"],

  methods: {
    edit: function() {

    },
    deleteMeter: function() {
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].object === meter.due_date) {
          this.calendar[i].meter = {};
        }
      }
      this.$store.dispatch("deleteMeter", meter);
      document.getElementsByClassName("meter-status-modal")[0].classList.remove("show-modal");
      this.postDelete();
    },
    postDelete: function() {
      let patientName = this.$store.getters.getCurrentPatient.userName;
      console.log(patientName);
      axios.post(this.$store.getters.deleteTreatment+patientName, {'meter' : meter}).then(
      function(response)
      {
        // Check if the status of the response is successful
        if(response.status === 200){
          console.log("Success");
          // Closes this vue
          self.$store.commit("alternateAppointment");
          // Deletes the appointment from the appointment array in the VueX
          self.$store.dispatch('deleteMeter', self.appointment);
        } else {
          console.log(response.data.response);
        }
      }).catch(function(err){
        // Display an error message if the connection went wrong
        console.log("There was an error handling the request");
        self.showWarning = true;
      });
    },
    close: function() {
      document.getElementsByClassName("meter-status-modal")[0].classList.remove("show-modal");
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.meter-status-modal {
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
