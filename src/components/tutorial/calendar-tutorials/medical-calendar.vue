<template>
  <div>
    <h1 class = "title">Medical Calendar</h1>
    <div class = "instructions">
      <p>
        The medical professional calendar can display both days of the month and the days of the week.
        through the selection of the <b>Month</b> tab and the <b>Week</b> tab. The medical professional
        can navigate through the months/days using the arrows at the top of the calendar. Below is 
        an example of each calendar view:
      </p>
      <div class="columns">
        <div class="column is-half">
          <b>Calendar Month View</b>
          <br>
          <img :src="showMonthView"/>
        </div>
        <div class="column is-half">
          <b>Calendar Week View</b>
          <br>
          <img :src="showWeekView"/>
        </div>
      </div>
      <p>
        As medical professional, you have different information displayed on the calendar depending
        on what page you are currently on. If you are on your home page on your account
        then you will see a list of all appointments of all your patients altogether on the calendar as shown 
        below:
      </p>
      <br>
      <b>Medical Professional Homepage Calendar View</b>
      <br>
      <img :src="showMedicalProfessionalView"/>
      <p>
        When you select a patient, a new calendar will be displayed where both the 
        patient's specific appointments and treatment plans will be displayed.<br>
        Below is where to select a patient:
      </p>
      <img :src="showSelectPatient"/>
      <p>
        After selecting a patient, you can now view all the treatment plans and appointments with
        that specific patient and can click on the treatment/appointments to view them
      </p>
      <img :src="showPatientCalendar"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "medical-calendar",
  computed:{
    // These are links to Calendar Images for tutorials
    showMonthView() {
      return this.$store.getters.calendarMonthView;
    },
    showWeekView(){
      return this.$store.getters.calendarWeekView;
    },
    showMedicalProfessionalView(){
      return this.$store.getters.medicalAppointmentView;
    },
    showSelectPatient(){
      return this.$store.getters.selectPatient;
    },
    showPatientCalendar(){
      return this.$store.getters.patientView;
    }
  }
}
</script>
