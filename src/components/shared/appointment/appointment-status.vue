<template>
  <div class='modal is-active'>
    <div class='modal-background'></div>
      <div class='modal-content'>
        <div class='card-content round-corners'>
          <h2 id='form-title'>Current Appointment</h2>
          <p class="card-content__label">Date: {{appointment.date}}</p>
          <p class="card-content__label">Start Time: {{getTime(appointment.startTime)}}</p>
          <p class="card-content__label">End Time: {{getTime(appointment.endTime)}}</p>
          <p class="card-content__label">Requested by: {{appointment.initiatorName}}</p>
          <p class="card-content__label">Scheduled with: {{appointment.appointeeName}}</p>
          <p class="card-content__label" v-if='getStatus'>Status: {{appointment.status}}</p>

          <div id='appointment-status'>
            <div v-if='!getStatus '>
              <button id='appointment-button' class='button is-fullwidth' @click="sendResponse('Accepted')">Accept</button>
              <button id='appointment-button' class='button is-fullwidth' @click="sendResponse('Declined')">Decline</button>
            </div>
            <div v-if='isInitiator && !isRejected'>
              <button id='appointment-button' class='button is-fullwidth' @click="editAppointment()">Edit</button>
              <button id='appointment-button' class='button is-fullwidth' :disabled="isTutorial" @click="deleteAppointment()">Delete</button>
            </div>
            <div v-if='isInitiator && isRejected'>
              <button id='appointment-button' class='button' @click="deleteAppointment()">Okay</button>
            </div>
            <div class='appointment-warning' v-show='showWarning'>{{warning}}</div>
          </div>
        </div>
      </div>
    <button class='modal-close is-large' aria-label='close' @click='closeAppointment'></button>
  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';
  export default {
    name: 'appointment-status',
    props: ['appointment', 'calendar'],
    data() {
      return {
        // Warning Notification to tell the user if there was a connection issue
        showWarning: false,
        warning: 'Connection error has occurred. Please try again.',
      }
    },
    computed: {
      // Check if the initiator is looking at the appointment they created
      isInitiator(){
        // Checks the initiator on the appointment to the current logged in user
        if(this.appointment.initiator === this.$store.getters.authenticatedUsername){
          return true;
        } else {
          return false;
        }
      },
      // Checks if the appointment was declined and  if it is the initator viewing it
      // Used to notify the user the user that a appointment has been rejected before deleting the appointment
      isRejected(){
        if(this.appointment.status === "Declined" && this.isInitiator){
          return true;
        } else{
          return false;
        }
      },
      // Checks if the appointment is still pending and if the apointee is viewing the appointment
      getStatus(){
        if(this.appointment.status === "Pending" && !this.isInitiator){
          return false;
        } else{
          return true;
        }
      },
      //Checks if the modal is part of tutorials
      isTutorial(){
        return this.$store.getters.isTutorial;
      }
    },
    methods: {
      // This transform the date format to a human readable state
      getTime(time){
        time = new Date(time);
        return `${time.getHours() === 0 ? '1' : time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
                }:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
                }${time.getHours() > 12 ? 'P.M.':'A.M.'}`;
      },
      // This hides the appointment-status component
      closeAppointment() {
         this.$store.commit('alternateAppointment');
      },
      // This method sends the new status changes to save to the server
      // Status is either Accepted or Declined that the appointee has chosen
      sendResponse(status){
        var self = this;
        // Make a copy of the appointment
        const newAppointment = this.appointment;
        // Set the new status of the appointment
        newAppointment.status=  status;
        // Send the request to the backend
        if(!this.$store.getters.isTutorial){
          axios.put(this.$store.getters.modifyAppointmentURL,{'newAppointment' : newAppointment, 'originalAppointment': this.appointment}).then(
            function(response)
            {
              // Check if the status of the response is successful
              if(response.status === 200){
                // Edit the appointment in the array in the VueX
                self.showWarning = false;
              } else {
                // Display an error message if the connection went wrong
                self.showWarning = true;
              }
            }).catch(function(err){
              console.log("There was an error handling the request");
              self.showWarning = true;
            });
        }
      },
      // Opens the appointment-modification vue
      editAppointment(){
        // Close this modal and open the modification appointment modal
        this.$store.dispatch("storeAppointment", this.appointment);
        this.$store.dispatch("alternateAppointmentModification");
      },
      // This deletes the appointment vue from both appointee and initiator appointment list
      deleteAppointment(){
        var today = new Date(Date.now());
        var appointmentDate = new Date(this.appointment.date)
        if(today.getDate() !== appointmentDate.getDate()+1){
          var self = this;
          axios.post(this.$store.getters.deleteAppt,{'appointment' : this.appointment}).then(
            function(response)
            {
              // Check if the status of the response is successful
              if(response.status === 200){
                // Edit the appointment in the array in the VueX
                self.showWarning = false;
              } else {
                // Display an error message if the connection went wrong
                self.showWarning = true;
              }
            }).catch(function(err){
              console.log("There was an error handling the request");
              self.showWarning = true;
            })
        }
      },
      // Opens the appointment-modification vue
      editAppointment(){
        // Close this modal and open the modification appointment modal
        this.$store.dispatch("storeAppointment", this.appointment);
        this.$store.dispatch("alternateAppointmentModification");
      },
      // This deletes the appointment vue from both appointee and initiator appointment list
      deleteAppointment(){
        if(!this.$store.getters.isTutorial){
          var today = new Date(Date.now());
          var appointmentDate = new Date(this.appointment.date)
          if(today.getDate() !== appointmentDate.getDate()+1){
            var self = this;
            axios.post(this.$store.getters.deleteAppt,{'appointment' : this.appointment}).then(
              function(response)
              {
                // Check if the status of the response is successful
                if(response.status === 200){
                  // Closes this vue
                  self.$store.commit("alternateAppointment");
                  // Deletes the appointment from the appointment array in the VueX
                  self.$store.dispatch('deleteAppointment', self.appointment);
                  self.showWarning = false;
                } else {
                  self.showWarning = true;
                }
              }).catch(function(err){
                // Display an error message if the connection went wrong
                console.log("There was an error handling the request");
                self.showWarning = true;
              });

            // get element by date attribute
            for(var i=0; i < this.calendar.length; i++) {
              if(moment(this.calendar[i].date).isSame(moment(this.appointment.date))) {
                this.calendar[i].appointment = {};
              }
          }
        } else {
            console.log("You can't cancel right now");
            this.showWarning = true;
            this.warning = "You can't cancel right now";
          }
        }
      }
    }
  }
</script>


<style scoped lang='scss'>

#appointment {
  &-warning {
    color: red;
  }

  &-card {
    background: $white;
    color: $purple-dark;
    text-align: left;
    margin-left: 2rem;
  }

  &-status {
    padding: 15px 10px 10px 10px;
  }

  &-button {
    margin: 1rem 0;
    background: $green;
    color: $white;
  }

  &-button:hover{
    background: $green-dark;
  }

}

.card-content {
  background: $white;

  &__label {
    margin-left: 1rem;
  }
}

#form-title {
  font-size: 2em;
  font-weight: bold;
}

.hidden{
  display: none;
}

</style>
