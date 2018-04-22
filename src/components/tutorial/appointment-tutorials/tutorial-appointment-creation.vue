<template>
  <div>
    <h1 class = "title"> Creating a New Appointment </h1>
    <div class = "instructions">
      <p>
        This feature allows for patients to request an in person appointment with their medical professional, 
        and vice versa. 
      </p>

      <p>
        This feature is avaiable upon logging into the user's account, and is located differently for patients and medical professionals.
        Locations for appointment creation is shown below:
      </p>
      <br>
      <div class="columns">
        <div class="column is-half">
          <b>Medical Professional Appointment Creation</b>
          <br>
          <img :src="showMPAppointmentImg" alt="Medical Professional Appointment Creation"/>
        </div>
        <div class="column is-half">
          <b>Patient Appointment Creation</b>
          <br>
          <img :src="showPatientAppointmentImg" alt="Patient Appointment Creation"/>
        </div>
      </div>
      <p>
        After clicking on the corresponding button to create a button, a window will appear to create a new appointment (as shown below).<br>
        <i>*For Medical Professionals they will need to choose a patient they wish to schudule an appointment with</i><br>
        <i>*For Patients they are already assigned their medical professional as their appointee</i><br>
      </p>
      <br>
      <div class="columns">
        <div class="column is-half">
          <b>Medical Professional Patient Selection View</b>
          <br>
          <img :src="showMPPatientSelection" alt="Medical Professional Patient Selection"/>
        </div>
        <div class="column is-half">
          <b>Patient Appointment View</b>
          <br>
          <img :src="showPatientMPSelection" alt="Patient Appointment"/>
        </div>
      </div>
      <br>
      <p>
        Proceeding into the appointment creation, the user will then select a date that is either the current date or any date beyond the current date.
        If the user selects a date that is before the current date, they will receive a error and will be prompted to select another date.
        After selecting a date the user will select a time for the appointment (which are pre-set to 30 minute intervals).<br>
        <i>*Note: If selecting a time interval on the current date, it must be after the current time selected or else you will be prompted with an error.</i>
      </p>
      <div class="columns">
        <div class="column is-half">
          <b>Medical Professional Appointment View</b>
          <br>
          <img :src="showMPAppointmentGif" alt="Medical Professional Patient Selection"/>
        </div>
        <div class="column is-half">
          <b>Patient Appointment View</b>
          <br>
          <img :src="showPatientAppointmentGif" alt="Patient Appointment"/>
        </div>
      </div>
    </div>
  <br>
   Click the button below to try out the Appointment Creation.
  <br>
  <a class="button is-link is-rounded try" @click ="displayAppointmentCreation">{{tryButton}}</a>
  <appointmentCreation
    :appointeeType="appointeeType"
    :appointee="appointee"
    :isMed="isMed"
    v-if = "showAppointmentCreation" />
  </div>
</template>

<script>
  import appointmentCreation from '../../shared/appointment/appointment-creation.vue';
  export default {
    name:"tutorial-appointment-creation",
    components:{
        appointmentCreation
    },
    data(){
        return{
            tryButton:"Try Appointment Creation",
            appointeeType: "Medical Professional",
            appointee:[{firstName: "John", lastName: "Doe"}],
            isMed: true
        }
    },
    computed:{
      showAppointmentCreation() {
        return this.$store.getters.showAppointmentCreation;
      },
      showMPAppointmentImg(){
        return this.$store.getters.mpAppointmentCreation;
      },
      showPatientAppointmentImg(){
        return this.$store.getters.patientAppointmentCreation;
      },
      showMPPatientSelection(){
        return this.$store.getters.mpAppointmentChoosePatient;
      },
      showPatientMPSelection(){
        return this.$store.getters.patientChooseMP;
      },
      showMPAppointmentGif(){
        return this.$store.getters.mpAppointmentGif;
      },
      showPatientAppointmentGif(){
        return this.$store.getters.patientAppointmentGif;
      }
    },
    methods:{
      displayAppointmentCreation() {
        this.$store.dispatch('alternateAppointmentCreation');
      },
    }
  }
</script>
