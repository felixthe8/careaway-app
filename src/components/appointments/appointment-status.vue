<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <div class = "box">
          <h2 id = "form-title"> Appointments</h2>
          Date: {{getDate}}<br>
          Time: {{getTime}}<br>
          Initiator: {{initiator}}<br>
          Appointee: {{appointee}}<br>
          <div v-if="getStatus">
            Status: {{status}}<br>
          </div>
          <div v-if="!getStatus">
            <button> Accept </button>
            <button> Decline </button>
          </div>
        </div>
      </div>
    <button class="modal-close is-large" aria-label="close" @click="closeAppointment"></button>
  </div> 
</template>


<script>
  export default {
    name: 'appointment',
    props: ['appointmentObject'],
    data() {
      return {
        date: this.appointmentObject.date,
        initiator: this.appointmentObject.initiator,
        appointee: this.appointmentObject.appointee,
        status: this.appointmentObject.status
      }
    },
    computed: {
      getStatus(){
        if(this.status==="pending")
        {
          return true;
        }
        else if(this.status =="accepting"){
          return false;
        }
      },
      getDate(){
        return `${this.date.getMonth()+1}/${this.date.getDate()}/${this.date.getFullYear()}`;
      },
      getTime()
      {
        return `${this.date.getHours() === 0 ? "1" : this.date.getHours()>12 ? this.date.getHours() - 12 : this.date.getHours()}
                :${this.date.getMinutes()<10 ? "0" + this.date.getMinutes() : this.date.getMinutes()} ${this.date.getHours()>12 ? "P.M.":"A.M."}`;
      }
    },
    methods: {
      closeAppointment() {
         this.$store.commit("alternateAppointment");
      }
    }
  }
</script>


<style lang="scss">
@import "../assets/sass/settings.scss";
  .box{
      width: 50%;
      margin: auto;
  }
  .modal-content {
    overflow: hidden;
    max-height: none;
  }
  #form-title {
      font-size: 1.5em;
      padding-bottom: 1rem;
  } 
  .input{
    margin: 5px 0px 5px 0px;
  }
</style>
