<template>

  <div class="checklist">
    <button class="checklist__button green-button" draggable="true" @drag="onDrag">Checklist</button>

    <div class="checklist__menu">
      <label>Reason for checklist:</label>
      <input class="checklist__menu--input" name="checklist" type="text" id="checklist">
      <label>Date Requested:</label>
      <input class="checklist__menu--input" name="date" type="text" id="checklist-date">
      <button class="checklist__menu--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>

import axios from 'axios';
import moment from 'moment';
import timeChangers from './time';

export default {
  name: 'checklist',

  props: ['calendar'],

  components: { timeChangers },

  data() {
    return {
      created: false,
      label: "checklist",
      list: [],
      due_date: {}
    }
  },

  methods: {
    onDrag: function() {
      event.dataTransfer.setData("text/plain", event.target);
      // event.dropEffect = "move";
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
          this.calendar[i].checklist.created = true;
        }
      }

      this.saveChecklist();
      document.getElementsByClassName("checklist__menu")[0].classList.remove("show-menu");
    },
    saveChecklist: function() {
      const checklist = {
        label: this.label,
        list: this.list,
        due_date: this.due_date,
      }

      axios.post(this.$store.getters.createMeterURL, checklist).then(function(response) {
        if(response.date.success) {
          console.log("Successfully Created Meter");
        } else {
          console.log("Failed to Create Meter");
        }
      }).catch(function(err) {
        console.log(err);
      });
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
