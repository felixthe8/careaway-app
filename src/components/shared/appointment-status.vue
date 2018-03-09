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
                <div v-if='!getStatus'>
                  <a id='appointment-button' class='button is-rounded' @click="sendResponse('accepting')"> Accept </a>
                  <a id='appointment-button' class='button is-rounded' @click="sendResponse('declined')"> Decline </a>
                </div>
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
    // TODO: Remove testBool
    props: ['appointment','testBool'],
    data() {
      return {
        date: this.appointment.date,
        initiator: this.appointment.initiator,
        appointee: this.appointment.appointee,
        status: this.appointment.status,
      }
    },
    computed: {
      getStatus(){
        if(this.status === 'pending')
        {
          return true;
        }
        else if(this.status =='accepting'){
          return false;
        }
      },
      getDate(){
        return `${this.date.getMonth()+1}/${this.date.getDate()}/${this.date.getFullYear()}`;
      },
      getTime()
      {
        return `${this.date.getHours() === 0 ? 
                '1' : this.date.getHours()>12 ? 
                this.date.getHours() - 12 : this.date.getHours()
                }:${this.date.getMinutes()<10 ? '0' + this.date.getMinutes() : 
                this.date.getMinutes()} 
                ${this.date.getHours()>12 ? 'P.M.':'A.M.'}`;
      }
    },
    methods: {
      closeAppointment() {
         this.$store.commit('alternateAppointment');
      }, 
      sendResponse(status){
        this.appointment.status = status;
        //TODO:: PUT THIS ROUTE INTO THE VUEX
        axios.post(this.$store.getters.updateApptURL,{"appointment" : this.appointment}).then(
          function(response)
          {
            console.log(response.data.tyler);
          }).catch(function(err){

          })
        // TODO: Remove this test variable
        this.testBool.received = false;
      }
    }
  }
</script>


<style lang='scss'>
@import '../assets/sass/settings.scss';
  #appointment
  {
    &-box
    {
      background: $blue;
      margin: auto;
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
    font-size: 5em;
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
</style>
