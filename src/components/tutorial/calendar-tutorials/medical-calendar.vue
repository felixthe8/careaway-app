<template>
  <div>
    <h1 class = "title">Medical Calendar</h1>
    <div class = "instructions">
      <p>
        The medical professional calendar can display both days of the month or the days of the weeks,
        by selecting either the <b>Month</b> tab or the <b>Week</b> tab, and the medical professional
        can navigate through different months using the arrows next to the name of the month. Below is 
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
        For a medical professional, they have different information displayed onto the calendar depending
        on what page they are currently on. If the medical professional is on their home page on their account
        then they will see a list of all appointments of all their patients altogether on the calendar as shown 
        below:
      </p>
      <br>
      <b>Medical Professional Homepage Calendar View</b>
      <br>
      <img :src="showMedicalProfessionalView"/>
      <p>
        When the medical professional selects a patient then a new calendar will be displayed where both the 
        patient specific appointments and treatment plans will be displayed<br>
        Below is where to select a patient:
      </p>
      <img :src="showSelectPatient"/>
      <p>
        After selecting a patient, the medical professional can now view all the treatment plans and appointments with
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
