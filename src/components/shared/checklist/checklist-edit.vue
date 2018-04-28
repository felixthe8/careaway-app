<template>

    <div class="modal checklist-edit-modal">

      <div class="modal-background"></div>
      <div class="modal-content checklist-edit-modal--form round-corners">
        <h1 class="checklist-edit-modal__title">Edit Checklist</h1>
        <div class="field" v-for="item in checklist.list">
          <label>Question:</label>
          <input class="input" name="checklist" type="text" id="checklist-edit-question" :value="item.question">
        </div>
        <div class="field">
          <label>Date Assigned:</label>
          <input class="input checklist-modal--input" name="date" type="text" id="checklist-date" :value="checklist.due_date" readonly>
        </div>
        <button id="checklist" class="checklist-edit-modal--create button is-fullwidth" @click="update">Update Checklist</button>
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
      edit: {
        label: "checklist",
        list: [],
        due_date: {},
      },
      user: this.$store.getters.getCurrentPatient.userName
    }
  },

  methods: {
    close: function() {
      // close checklist if exited
      document.getElementsByClassName("checklist-edit-modal")[0].classList.remove("is-active");
    },
    update: function() {
      this.edit.list = document.getElementById("checklist-edit-question").value;
      this.edit.due_date = this.checklist.due_date;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date === this.edit.due_date) {
          this.calendar[i].checklist = this.edit;
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
        list: this.edit.list,
        due_date: this.checklist.due_date,
        user: this.user
      }

      axios.put(this.$store.getters.updateTreatmentChecklistURL+user, {'treatment' : checklist, user}).then(function(response) {
        if(response.data.success) {
          alert("Checklist Edited!");
        } else {
          alert("Checklist Failed to Update")
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
    font-weight: bold;
    color: $green;
    text-align: center;
  }

  &--create {
    background: $green !important;

    &:hover {
      background: $green-dark !important;
    }
  }
}

</style>
