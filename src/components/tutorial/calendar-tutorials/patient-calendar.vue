<template>
  <div>
    <h1 class="title">Patient Calendar View</h1>
    <div class = "instructions">
    <p>
      The Patient calendar can display both days of the month or the days of the weeks,
      by selecting either the <b>Month</b> tab or the <b>Week</b> tab, and the Patient
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
    </div>
    <p>
      The patient can view all their appointments and treatement plans on their calendar and scroll
      through each month for future treatment plans and up and coming appointments. 
      The patient can click on the appointments and treatment plans to interact with them on the calendar. 
      Below is an example of the patient calendar:
    </p>
    <img :src="showPatientCalendar"/>
  </div>
</template>
<script>
export default {
  name: "patient-calendar",
  computed:{
    showMonthView() {
      return this.$store.getters.calendarMonthView;
    },
    showWeekView(){
      return this.$store.getters.calendarWeekView;
    },
    showPatientCalendar(){
      return this.$store.getters.patientView;
    }
  }
}
</script>
