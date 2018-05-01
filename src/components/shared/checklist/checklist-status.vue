<template>

  <div class="modal checklist-status-modal">

    <div class="modal-background"></div>
    <div class="modal-content checklist-status-modal--form round-corners">
      <h1 class="checklist-edit-modal__title">Current Checklist</h1>
      <p class="label" v-for="item, index in checklist.list">Task {{index+1}}: {{item.question}}</p>
      <p>Date Assigned: {{checklist.due_date}}</p>
      <button id="checklist-edit" class="checklist-status-modal--create button is-fullwidth" @click="edit">Edit checklist</button>
      <button id="checklist-delete" class="checklist-status-modal--create button is-fullwidth" @click="deleteChecklist">Delete checklist</button>
    </div>

    <button class='modal-close is-large' aria-label='close' @click='close'></button>

  </div>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {

  props: ["calendar", "checklist"],

  methods: {
    edit: function() {
      document.getElementsByClassName("checklist-status-modal")[0].classList.remove("is-active");
      document.getElementsByClassName("checklist-edit-modal")[0].classList.add("is-active");
    },
    deleteChecklist: function() {
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date === this.checklist.due_date) {
          // logical delete of checklist from calendar
          this.calendar[i].checklist = {};
        }
      }
      // close modal
      document.getElementsByClassName("checklist-status-modal")[0].classList.remove("is-active");
      // post delete to database
      this.postDelete();
    },
    postDelete: function() {
      // define this for in post request
      let self = this;

      // get current patient username for post
      let user = this.$store.getters.getCurrentPatient.userName;
      // define checklist to ensure proper format
      const checklist = {
        label: this.checklist.label,
        question: this.checklist.question,
        list: this.checklist.list,
        due_date: this.checklist.due_date,
      }

      axios.post(this.$store.getters.deleteTreatment+user, {'treatment' : checklist, user}).then(
      function(response)
      {
        if(response.status === 200){
          // remove checklist from vuex
          self.$store.dispatch("deleteChecklist", self.checklist);
        } else {
          alert("Failed to Create checklist");
        }
      }).catch(function(err){
        throw err;
      });
    },
    close: function() {
      document.getElementsByClassName("checklist-status-modal")[0].classList.remove("is-active");
    }
  }
}

</script>

<style lang="scss">

.checklist-status-modal {
  &--form {
    background: $white;
    padding: 1rem;
    text-align: left;
  }

  &--create {
    background: $green !important;
    margin: 1rem 0;

    &:hover {
      background: $green-dark !important;
    }
  }
}

</style>
