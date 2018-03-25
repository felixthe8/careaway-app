<template>
  <div class="checklist-modal">
    <div class="checklist-modal--form">
      <label>Reason for checklist:</label>
      <input class="checklist-modal--form--input" name="checklist" type="text" id="checklist">
      <label>Date Requested:</label>
      <input class="checklist-modal--form--input" name="date" type="text" id="checklist-date">
      <button class="checklist-modal--form--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {

  props: ["calendar"],

  data() {
    return {
      label: "checklist",
      list: [],
      due_date: {}
    }
  },

  methods: {
    create: function() {
      this.list = [];
      this.due_date = document.getElementById("checklist-date").value;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].object == this.due_date) {
          this.calendar[i].checklist = this;
          this.calendar[i].checklist.created = true;
        }
      }

      document.getElementsByClassName("checklist-modal")[0].classList.remove("show-modal");
      // this.saveChecklist();
    },
    saveChecklist: function() {
      const checklist = {
        label: this.label,
        list: this.list,
        due_date: this.due_date,
      }

      axios.post(this.$store.getters.createChecklistURL, checklist).then(function(response) {
        if(response.date.success) {
          console.log("Successfully Created Checklist");
        } else {
          console.log("Failed to Create Checklist");
        }
      }).catch(function(err) {
        console.log(err);
      });
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.checklist-modal {
  position: absolute;
  background: rgba(0,0,0,0.8);
  display: none;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &--form {
    background: $green-light;
    padding: 1rem;
  }
}

.show-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
