<template>

  <div class="meter">
    <button class="meter__button green-button" @click="addmeter">Meter</button>

    <div class="meter__menu">
      <label>Reason for meter:</label>
      <input class="meter__menu--input" name="meter" type="text" id="meter">
      <label>Date Requested</label>
      <input class="meter__menu--input" name="date" type="text" id="meter-date">
      <button class="meter__menu--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'meter',

  props: ['calendar'],

  data() {
    return {
      meter: {}
    }
  },

  methods: {
    addmeter: function() {
      document.getElementsByClassName("meter__menu")[0].classList.add("show-menu");
    },
    create: function() {
      this.meter = {
        text: document.getElementById("meter").value,
        date: document.getElementById("meter-date").value
      }
      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date == this.meter.date) {
          this.calendar[i].meter = this.meter;
        }
      }
      document.getElementsByClassName("meter__menu")[0].classList.remove("show-menu");
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.meter {

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
