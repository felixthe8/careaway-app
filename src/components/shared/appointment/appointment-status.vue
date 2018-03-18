<template>
  <div class='modal is-active'>
    <div class='modal-background'></div>
      <div class='modal-content'>
        <div id='appointment-box' class = 'box'>
          <div id='appointment-card' class = 'card'>
            <div class = 'card-content'>
              <h2 id = 'form-title'> Appointments</h2>
              Date: {{date}}<br>
              Start Time: {{getTime(startTime)}}<br>
              End Time: {{getTime(endTime)}}<br>
              Requested by: {{initiatorName}}<br>
              Scheduled with: {{appointeeName}}<br>
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
  export default {
    name: 'appointment-status',
    props: ['appointment'],
    data() {
      return {
        oldAppointment: {
          date: this.appointment.date,
          startTime: this.appointment.startTime,
          endTime: this.appointment.endTime,
          initiator: this.appointment.initiator,
          appointee: this.appointment.appointee,
          // appointeeName: this.appointment.appointeeName,
          // initiatorName: this.appointment.initiatorName,
          status: this.appointment.status
        },
        date: this.appointment.date,
        startTime: this.appointment.startTime,
        endTime: this.appointment.endTime,
        initiator: this.appointment.initiator,
        appointee: this.appointment.appointee,
        initiatorName: this.appointment.initiatorName,
        appointeeName: this.appointment.appointeeName,
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
    },
    methods: {
      getTime(time){
        time = new Date(time);
        return `${time.getHours() === 0 ?  
                '1' : time.getHours()>12 ?  
                time.getHours() - 12 : time.getHours() 
                }:${time.getMinutes()<10 ? '0' + time.getMinutes() :  
                time.getMinutes()}  
                ${time.getHours()>12 ? 'P.M.':'A.M.'}`; 
      },
      closeAppointment() {
         this.$store.commit('alternateAppointment');
      }, 
      sendResponse(status){
        var self = this;
        const newAppointment = {
          date: this.date,
          startTime: this.startTime,
          endTime: this.endTime,
          initiator: this.initiator,
          appointee: this.appointee,
          appointeeName: this.appointeeName,
          initiatorName: this.initiatorName,
          status: status
        };
        axios.post(this.$store.getters.modifyAppt,{'newAppointment' : newAppointment, 'originalAppointment': this.oldAppointment}).then(
          function(response)
          {
            if(response.status === 200){
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
      editAppointment(){
        // Close this modal and open the modification appointment modal
        this.$store.dispatch("storeAppointment", this.oldAppointment);
        this.$store.dispatch("alternateAppointmentModification");
      },
      deleteAppointment(){
        var self = this;
        axios.post(this.$store.getters.deleteAppt,{'appointment' : this.oldAppointment}).then(
          function(response)
          {
            // TODO: Update the global appointments so this appointment does not show on the calendar anymore
            if(response.data.response === 'success'){
              console.log("Success");
              self.$store.commit("alternateAppointment");
              self.$store.dispatch('deleteAppointment', self.oldAppointment);
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
