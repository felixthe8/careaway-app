<template>
  <div>
    <h1 class="title">Patient Calendar View</h1>
    <div class = "instructions">
    <p>
      The patient calendar can display both days of the month and the days of the week.
      through the selection of the <b>Month</b> tab and the <b>Week</b> tab. The patient
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
    </div>
    <p>
      As a patient, you can view all your appointments and treatement plans on your calendar and scroll
      through each month for future treatment plans and up and coming appointments. 
      You can click on the appointments and treatment plans to interact with them on the calendar. 
      Below is an example of the patient calendar:
    </p>
    <img :src="showPatientCalendar"/>
  </div>
</template>
<script>
export default {
  name: "patient-calendar",
  computed:{
    // These are links to Calendar Images for tutorials
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
