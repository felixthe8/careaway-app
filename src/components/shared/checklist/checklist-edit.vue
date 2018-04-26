<template>

    <div class="modal checklist-edit-modal">

      <div class="modal-background"></div>
      <div class="modal-content checklist-edit-modal--form">
        <h1 class="checklist-edit-modal__title">Edit Checklist</h1>
        <div class="field" v-for="item in checklist.list">
          <label>Question:</label>
          <input class="input" name="checklist" type="text" id="checklist-question" :value="item.question">
        </div>
        <div class="field">
          <label>Date Assigned:</label>
          <input class="input checklist-modal--input" name="date" type="text" id="checklist-date" :value="checklist.due_date">
        </div>
        <button id="checklist" class="checklist-edit-modal--create green-button" @click="update">Update Checklist</button>
      </div>

      <button class='modal-close is-large' aria-label='close' @click='close'></button>

    </div>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {

  props: ["calendar", "checklist"],

  data() {
    return {
      label: "checklist",
      list: [],
      due_date: {},
      user: this.$store.getters.getCurrentPatient.userName
    }
  },

  methods: {
    close: function() {
      // close checklist if exited
      document.getElementsByClassName("checklist-edit-modal")[0].classList.remove("is-active");
    },
    update: function() {
      this.question = document.getElementById("checklist-question").value;
      this.due_date = document.getElementById("checklist-date").value;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date === this.due_date) {
          this.calendar[i].checklist = this;
          this.calendar[i].checklist.created = true;
        }
      }

      document.getElementsByClassName("checklist-edit-modal")[0].classList.remove("is-active");
      this.updateChecklist();
    },
    updateChecklist: function() {
      // get current user
      let user = this.$store.getters.getCurrentPatient.userName;

      const checklist = {
        label: "checklist",
        list: [],
        due_date: {},
        user: this.$store.getters.getCurrentPatient.userName
      }

      axios.put(this.$store.getters.updateTreatmentChecklistURL+user, {'treatment' : checklist, user}).then(function(response) {
        if(response.data.success) {
          alert("Meter Edited!");
        } else {
          alert("Meter Failed to Update")
        }
      }).catch(function(err) {
          throw err;
      });
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.checklist-edit-modal {
  &--form {
    background: $white;
    padding: 2rem;
    text-align: left;
  }

  &__title {
    font-size: 2em;
  }
}

</style>
