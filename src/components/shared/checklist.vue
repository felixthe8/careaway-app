<template>

  <div class="checklist">
    <button class="checklist__button green-button" @click="addChecklist">Checklist</button>

    <div class="checklist__menu">
      <label>Reason for checklist:</label>
      <input class="checklist__menu--input" name="checklist" type="text" id="checklist">
      <label>Date Requested</label>
      <input class="checklist__menu--input" name="date" type="text" id="checklist-date">
      <button class="checklist__menu--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'checklist',

  props: ['calendar'],

  data() {
    return {
      checklist: {}
    }
  },

  methods: {
    addChecklist: function() {
      document.getElementsByClassName("checklist__menu")[0].classList.add("show-menu");
    },
    create: function() {
      this.checklist = {
        text: document.getElementById("checklist").value,
        date: document.getElementById("checklist-date").value
      }
      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date == this.checklist.date) {
          this.calendar[i].checklist = this.checklist;
        }
      }
      document.getElementsByClassName("checklist__menu")[0].classList.remove("show-menu");
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.checklist {
  padding: 1rem;

  &__button {
    padding: 5px 20px;
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
