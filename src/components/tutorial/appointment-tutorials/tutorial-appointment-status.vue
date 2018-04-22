<template>
  <div>
    <h1 class=title> Checking the Status of an Appointment</h1>
    <div class = "instructions">
      <p>
        This feature has two parts which depends on wether the user viewing the appointment status is the 
        requestor (the one who made the appointment) or the responder (the one receiving the appointment).
        In addition, both parties are able to see a more detailed description about the appointment such as
        the date, the start time of the appointment, the end time of the appointment, the name of the person
        who has requested the appointment, and the name of the user who is being requested the appointment
      </p>
      <h2> Requestor </h2>
      <p>
        The one who initated the appointment will have the option to either edit or delete the appointment they
        have just made. <br>
        To learn more about the option to edit an appointment click here: 
        <a @click="routeAppointmentUpdateTutorial">Appointment Update</a><br>
        To learn more about the option to delete an appointment click here: 
        <a @click="routeAppointmentDeletionTutorial">Appointment Deletion</a><br>
        They will see the following information below:
      </p>
      <img :src="showRequestor"/>
      <h2> Responder </h2>
      <p>
        The one who is on the receiving end of the appointment will have two different options.
        The options are to either <b>accept</b> or <b>decline</b> the appointment.
        The user can click one of these options to either accept or decline the appointment where the requestor 
        will be notified of the change.
      </p>
      <img :src="showRequestee"/>
    </div>
    Click the button below to try out the appointment status.
    <br>
    <a class="button is-link is-rounded try" @click ="displayAppointment">{{tryButton}}</a>
    <appointmentStatus :appointment="appointment" :appointee="appointee" v-if="showAppointment"/>
  </div>
</template>

<script>
  import appointmentStatus from '../../shared/appointment/appointment-status.vue';
  export default {
    name:"tutorial-appointment-status",
    components:{
      appointmentStatus
    },
    data(){
      return{
        tryButton: "Try Appointment Status",
        appointment: {
          date:'12/25/2018',
          startTime:'1995-12-17T03:24:00',
          endTime: '1995-12-17T03:24:00',
          initiatorName: "John Doe",
          appointeeName: "Other Doe",
          status: "Pending"
        },
        appointee: "Jane Joe",
      }
    },
    methods:{
      displayAppointment(){
        this.$store.dispatch("alternateAppointment");
      },
      routeAppointmentUpdateTutorial() {
        this.$router.push('/Tutorial/AppointmentUpdate');
      },
      routeAppointmentDeletionTutorial() {
        this.$router.push('/Tutorial/AppointmentDeletion');
      }
    },
    computed:{
      showAppointment(){
        return this.$store.getters.showAppointment;
      },
      showRequestor(){
        return this.$store.getters.appointmentStatusRequestor;
      },
      showRequestee(){
        return this.$store.getters.appointmentStatusRequestee;
      }
    }

  }
</script>
