<template>
  <div>
    <h1 class = "title"> Deleting an Appointment </h1>
    <div class = "instructions">
      <p>
        This feature allows for patients or medical professionals to delete any appointment they have made.
        <i>Note:Only the creator of the appointment can delete the appointment </i>
      </p>
      <img :src="showAppointmentCalendar"/>
      <p>
        First the User selects the appointment they want to delete from the calendar
      </p>
      <img :src="showAppointmentDeletion"/>
      <p>
        Then they press the delete button on the appointment status window that pops up and teh appointment will be deleted.
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name:"tutorial-appointment-deletion",
        computed:{
          showAppointmentCalendar() {
            return this.$store.getters.appointmentUpdateCalendarTutorial;
          },
          showAppointmentDeletion(){
            return this.$store.getters.appointmentDeletionTutorial;
          }
        }
    }
</script>
