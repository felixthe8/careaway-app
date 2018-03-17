<template>
  <div class='modal is-active'>
    <div class='modal-background'></div>
      <div class='modal-content'>
        <div id='appointment-box' class = 'box'>
          <div id='appointment-card' class = 'card'>
            <div class = 'card-content'>
              <h2 id = 'form-title'> Appointments</h2>
              Date: {{getDate}}<br>
              Time: {{getTime}}<br>
              Requested by: {{initiator}}<br>
              Scheduled with: {{appointee}}<br>
              <div id='appointment-status'>
                <div v-if='getStatus'>
                  Status: {{status}}<br>
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
  import messageBox from './message-box.vue';

  export default {
    name: 'appointment-status',
    props: ['appointment'],
    data() {
      return {
        date: this.appointment.date,
        initiator: this.appointment.initiator,
        appointee: this.appointment.appointee,
        status: this.appointment.status,
        showWarning: false,
        warning: 'Connection error has occurred. Please try again.',
      }
    },
    computed: {
      isInitiator(){
        console.log("Here");
        if(this.initiator === this.$store.getters.authenticatedUsername){
          
          return true;
        } else {
          return false;
        }
      },
      isRejected(){
        if(this.status === "Declined" && this.isInitiator){
          return true;
        } else{
          return false;
        }
      },
      getStatus(){
        if(this.status === "Pending" && !this.isInitiator){
          return false;
        } else{
          return true;
        }
      },
      getDate(){
        return this.date;
      },
      getTime()
      {
        return this.startTime;
      }
    },
    methods: {
      closeAppointment() {
         this.$store.commit('alternateAppointment');
      }, 
      sendResponse(status){
        var self = this;
        var appointmentObject = {
          date: this.date,
          initiator: this.initiator,
          appointee: this.appointee,
          status: status
        }
        axios.post(this.$store.getters.modifyAppt,{'appointmentDate' : this.date, 'appointment': appointmentObject}).then(
          function(response)
          {
            if(response.data.response === 'success'){
              console.log("Success");
              self.status = status;
              self.showWarning = false; 
            } else {
              console.log(response.data.response);
              self.showWarning = true;     
            }
          }).catch(function(err){
            console.log("There was an error handling the request");
            self.showWarning = true;      
          })
      },
      // TODO: Crystal's task to do. Good Luck!
      editAppointment(){
        // Close this modal and open the modification appointment modal
        this.$store.dispatch("alternateAppointmentModification");
      },
      deleteAppointment(){
        var self = this;
        var appointmentObject = {
          date: this.date,
          initiator: this.initiator,
          appointee: this.appointee,
          status: this.status
        }
        axios.post(this.$store.getters.deleteAppt,{'appointment' : appointmentObject}).then(
          function(response)
          {
            // TODO: Update the global appointments so this appointment does not show on the calendar anymore
            if(response.data.response === 'success'){
              console.log("Success");
              self.$store.commit("alternateAppointment");
              self.showWarning = false; 
            } else {
              console.log(response.data.response);
              self.showWarning = true;     
            }
          }).catch(function(err){
            console.log("There was an error handling the request");
            self.showWarning = true;      
          });
      }
    }
  }
</script>


<style scoped lang='scss'>
@import '../assets/sass/settings.scss';
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
    font-family: cursive;
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
