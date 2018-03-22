<template>

  <div class="meter">
    <button class="meter__button green-button" draggable="true" @drag="onDrag">meter</button>

    <div class="meter__menu">
      <label>Reason for meter:</label>
      <input class="meter__menu--input" name="meter" type="text" id="meter">
      <label>Date Requested:</label>
      <input class="meter__menu--input" name="date" type="text" id="meter-date">
      <button id="meter" class="meter__menu--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'meter',

  props: ['calendar'],

  data() {
    return {
      meter: { "type": "meter" }
    }
  },

  methods: {
    onDrag:function(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
      event.dropEffect = "move";
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
  padding: 1rem;

  &__button {
    padding: 5px 20px;
    cursor: move;
  }

  &__label {
    margin-left: 1rem;
  }

  &__button {

  }

  &__menu {
    display: none;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 0;
    background: $green-light;
    margin-left: 1rem;
    padding: 1rem;

    &--create {

    }
  }

}

.show-menu {
  display: block;
}
</style>
