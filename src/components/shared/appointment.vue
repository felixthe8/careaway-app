<template>

  <div class="appointment">
    <label class="appointment__label">Appointment</label>
    <button class="appointment__button green-button" @click="addAppointment">+</button>

    <div class="appointment__menu">
      <label>Reason for Appointment:</label>
      <input class="appointment__menu--input" name="appointment" type="text" id="appointment">
      <label>Date Requested</label>
      <input class="appointment__menu--input" name="date" type="text" id="appointment-date">
      <button class="appointment__menu--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'appointment',

  props: ['calendar'],

  data() {
    return {
      appointment: {}
    }
  },

  methods: {
    addAppointment: function() {
      document.getElementsByClassName("appointment__menu")[0].classList.add("show-menu");
    },
    create: function() {
      this.appointment = {
        text: document.getElementById("appointment").value,
        date: document.getElementById("appointment-date").value
      }
      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date == this.appointment.date) {
          this.calendar[i].appointment = this.appointment;
        }
      }
      document.getElementsByClassName("appointment__menu")[0].classList.remove("show-menu");
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.appointment {

  &__button {
    margin: 10px;
  }

  &__label {
    margin-left: 1rem;
  }

  &__button {

  }

  &__menu {
    opacity: 0;
    background: $green-light;
    margin-left: 1rem;
    padding: 1rem;

    &--create {

    }
  }

}

.show-menu {
  opacity: 1;
}
</style>
