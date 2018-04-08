<template>
  <div class='modal is-active'>
    <div class='modal-background'></div>
      <div class='modal-content'>
        <div id='appointment-box' class = 'box'>
          <div id='appointment-card' class = 'card'>
            <div class = 'card-content'>
              <h2 id = 'form-title'> Appointments</h2>
              Date: {{appointment.date}}<br>
              Start Time: {{getTime(appointment.startTime)}}<br>
              End Time: {{getTime(appointment.endTime)}}<br>
              Requested by: {{appointment.initiatorName}}<br>
              Scheduled with: {{appointment.appointeeName}}<br>
              <div id='appointment-status'>
                <div v-if='getStatus'>
                  Status: {{appointment.status}}<br>
                </div>
                <div v-if='!getStatus '>
                  <a id='appointment-button' class='button is-rounded' @click="sendResponse('Accepted')"> Accept </a>
                  <a id='appointment-button' class='button is-rounded' @click="sendResponse('Declined')"> Decline </a>
                </div>
                <div v-if='isInitiator && !isRejected'>
                  <a id='appointment-button' class='button is-rounded' @click="editAppointment()"> Edit </a>
                  <a id='appointment-button' class='button is-rounded' @click="deleteAppointment()"> Delete </a>
                </div>
                <div v-if='isInitiator && isRejected'>
                  <a id='appointment-button' class='button is-rounded' @click="deleteAppointment()"> Okay </a>
                </div>
                <div class = 'appointment-warning' v-show='showWarning'> {{warning}} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <button class='modal-close is-large' aria-label='close' @click='closeAppointment'></button>
  </div>
</template>

<script>
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
        axios.put(this.$store.getters.modifyAppointmentURL,{'newAppointment' : newAppointment, 'originalAppointment': this.appointment}).then(
          function(response)
          {
            // Check if the status of the response is successful
            if(response.status === 200){
              console.log("Success");
              // Edit the appointment in the array in the VueX
              self.showWarning = false;
            } else {
              // Display an error message if the connection went wrong
              console.log(response.data.response);
              self.showWarning = true;
            }
          }).catch(function(err){
            console.log("There was an error handling the request");
            self.showWarning = true;
          })
          
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
                console.log("Success");
                // Closes this vue
                self.$store.commit("alternateAppointment");
                // Deletes the appointment from the appointment array in the VueX
                self.$store.dispatch('deleteAppointment', self.appointment);
                self.showWarning = false;
              } else {
                console.log(response.data.response);
                self.showWarning = true;
              }
            }).catch(function(err){
              // Display an error message if the connection went wrong
              console.log("There was an error handling the request");
              self.showWarning = true;
            });

            console.log(this.appointment.date);
            // get element by date attribute
            for(var i=0; i < this.calendar.length; i++) {
              if(this.calendar[i].date === this.appointment.date) {
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
</script>


<style scoped lang='scss'>
@import '../../../assets/sass/settings.scss';
  #appointment
  {
    &-box
    {
      background: $blue;
      margin: auto;
      width: 75%;
    }
    &-warning{
      color: red;
    }
    &-card{
      background: $blue-light;
      color: $purple;
    }
    &-status
    {
      padding: 15px 10px 10px 10px;
    }
    &-button{
      width: 100%;
      margin: 5px 10px 0px 10px;
      background: $purple-dark;
      color: $white;
    }
    &-button:hover{
      background: $purple;
    }

  }
  .modal-content {
    overflow: hidden;
    max-height: none;
    text-align: center;
  }
  #form-title {
    font-size: 2em;
    margin-bottom: .5em;
    font-weight: bolder;
    border-style: groove;
    border-width: 5px;
    @media #{$tablet}{
      font-size: 1.5em;
    }
  }
  .input{
    margin: 5px 0px 5px 0px;
  }
  .hidden{
    display: none;
  }
</style>
