<template>
  <div>
    <h1 class = "title"> Updating an Appointment </h1>
    <div class = "instructions">
      <p>
        This feature allows for both patients and medical professional to edit any existing appointment on their calendar.<br>
        <i>*Note: Only the Appointment Creator is allowed to Edit the appointment they have created</i>
      </p>

      <p>
        First select the appointment that you wish to edit from the calendar.
      </p>
      
      <img :src="showAppointmentCalendar"/>
      
      <p>
        Next the Appointment Status window will show up (more information can be viewed in the 
        <a @click="routeAppointmentStatusTutorial">Appointment Status Tab </a>)<br>
        Click on the Edit Button in order to modify the existing appointment.<br>
        <i>Remember this only shows up if you are the one who has created the appointment </i>
      </p>
      <img :src="showAppointmentEditStatus"/>
      <p>
        Lastly the edit window will pop up, and you can select a new date that is either the current date or any date beyond the current date.
        If the user selects a new date that is before the current date, they will receive a error and will be prompted to select another date.
        After selecting a date (or keeping the date the same) the user will select a new time for the appointment (which are pre-set to 30 minute intervals).<br>
        <i>*Note: If selecting a time interval on the current date, it must be after the current time selected or else you will be prompted with an error.</i><br>
        <i>*Note: To successfully edit a appointment youmust change one of the critera: the date or the time</i>
      </p>
      <img :src="showAppointmentUpdate"/>
    </div>
    <br>
    Click the button below to try out the appointment modification.
    <br>
    <a class="button is-link is-rounded try" @click ="displayAppointment">{{tryButton}}</a>
    <appointmentStatus :appointment="appointment" v-if="showAppointment"/>
    <appointmentUpdate :appointment="appointment" :requestee="appointee" :isMed="isMed" v-if="showAppointmentMod"/>
  </div>
</template>
<script>
  import appointmentStatus from '../../shared/appointment/appointment-status.vue';
  import appointmentUpdate from '../../shared/appointment/appointment-modification.vue'
  export default {
    name:"tutorial-appointment-update",
    components:{
      appointmentStatus, appointmentUpdate
    },
    created(){
      this.$store.dispatch('authenticatedUsername','John Doe');
    },
    data(){
      return{
        tryButton: "Try Appointment Editing",
        appointment: {
          date:'12/25/2018',
          startTime:'1995-12-17T03:24:00',
          endTime: '1995-12-17T03:24:00',
          initiator:"John Doe",
          appointee:"Other Doe",
          initiatorName: "John Doe",
          appointeeName: "Other Doe",
          status: "Pending"
        },
        appointee: "Jane Joe",
        isMed:true
      }
    },
    methods:{
      displayAppointment(){
        this.$store.dispatch("alternateAppointment");
      },
      displayAppointmentMod(){
        this.$store.dispatch("alternateAppointmentModification");
      },
      routeAppointmentStatusTutorial() {
        this.$router.push('/Tutorial/AppointmentStatus');
      }
    },
    computed:{
      showAppointment(){
        return this.$store.getters.showAppointment;
      },
      showAppointmentMod(){
        return this.$store.getters.showAppointmentMod;
      },
      showAppointmentEditStatus(){
        return this.$store.getters.appointmentEditStatusTutorial;
      },
      showAppointmentCalendar() {
        return this.$store.getters.appointmentUpdateCalendarTutorial;
      },
      showAppointmentUpdate() {
        return this.$store.getters.appointmentUpdateTutorial;
      }
    },
    beforeDestroy(){
      this.$store.dispatch('authenticatedUsername','');
    }
  }
</script>
