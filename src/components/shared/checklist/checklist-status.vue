<template>

  <div class="checklist-status-modal">

    <div class="checklist-status-modal--form">
      <div class="row">
        <h1>{{checklist.label}}</h1>
      </div>
      <p>Question: {{checklist.list}}</p>
      <p>Date Assigned: {{checklist.due_date}}</p>
      <button id="checklist-edit" class="checklist-modal--create green-button" @click="edit">Edit checklist</button>
      <button id="checklist-delete" class="checklist-modal--create green-button" @click="deleteChecklist">Delete checklist</button>
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

    },
    deleteChecklist: function() {
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].object === this.checklist.due_date) {
          // logical delete of checklist from calendar
          this.calendar[i].checklist = {};
        }
      }
      // close modal
      document.getElementsByClassName("checklist-status-modal")[0].classList.remove("show-modal");
      // post delete to database
      this.postDelete();
      // remove checklist from vuex
      this.$store.dispatch("deleteChecklist", this.checklist);
    },
    postDelete: function() {
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
          console.log("Successfully deleted checklist");
        } else {
            console.log("Failed to Create checklist");
        }
      }).catch(function(err){
        console.log(err);
      });
    },
    close: function() {
      document.getElementsByClassName("checklist-status-modal")[0].classList.remove("show-modal");
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.checklist-status-modal {
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
    text-align: left;
  }
}

.show-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
