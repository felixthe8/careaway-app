<template>

  <div class="appointment">
    <span class="create__label">Appointment</span>
    <button class="create__button" @click="addAppointment">+</button>

    <div class="create__menu">
      <label>Appointment</label>
      <input class="create__menu--input" name="appointment" type="text" id="appointment">
      <button class="create__menu--create" @click="create">Create Event</button>
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
      document.getElementsByClassName("create__menu")[0].classList.add("show-menu");
    },
    create: function() {
      this.appointment = document.getElementById("appointment").value;
      document.getElementsByClassName("create__menu")[0].classList.remove("show-menu");
      this.calendar[0].event = this.appointment;
      console.log(this.calendar);
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.appointment {
  width: 25%;
  position: relative;

  .create {
    position: absolute;
    width: 100%;

    &__label {
      // margin-left: 1rem;
    }

    &__button {
      border: 2px solid $green;
      border-radius: 5px;
    }

    &__menu {
      opacity: 0;
      border: 2px solid $green;

      &--create {

      }
    }
  }

  .show-menu {
    opacity: 1;
  }
}

</style>
