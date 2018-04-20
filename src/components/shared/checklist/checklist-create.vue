<template>

  <div class="modal checklist-modal">

    <div class="modal-background"></div>
    <div class="modal-content checklist-modal--form">
      <h1 class="checklist-modal__title">Create Checklist</h1>
      <div class="field" id="prompt-wrapper">
        <label class="label">Checklist Prompt</label>
        <input class="input prompt-input" name="checklist" type="text" id="prompt-input">
      </div>
      <button id="add-prompt" @click="addPrompt">+</button>
      <div class="field">
        <label class="label">Date Requested:</label>
        <input class="input checklist-modal--form--input" name="date" type="text" id="checklist-date">
      </div>
      <button class="label checklist-modal--form--create green-button" @click="create">Create Event</button>
    </div>

    <button class='modal-close is-large' aria-label='close' @click='close'></button>

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
      due_date: {},
      user: this.$store.getters.getCurrentPatient.userName
    }
  },

  methods: {
    addPrompt: function() {
      // create new input prompt
      let old = document.getElementById("prompt-wrapper") ;
      let newInput = document.createElement("input");
      newInput.className = "input prompt-input";
      newInput.name ="checklist";
      newInput.type = "text";
      newInput.id="checklist";

      // limit to 5
      let limit = document.getElementsByClassName("prompt-input");
      if(limit.length < 5) {
        old.appendChild(newInput);
      } else {
        let error = document.createElement("span");
        error.id = "max-message";
        error.innerHTML = "Maximum Prompts Reached";
        console.log(old);
        // show error message
        old.appendChild(error);
        // disable button
        document.getElementById("add-prompt").disabled = true;
      }
    },
    create: function() {
      // get form input for checklist
      let list = document.getElementsByClassName("prompt-input");
      for(var i=0; i < list.length; i++) {
        this.list[i] = {
          "question" : list[i].value,
          "check" : false
        };
      }
      this.due_date = document.getElementById("checklist-date").value;

      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date == this.due_date) {
          // show checklist on calendar
          this.calendar[i].checklist = this.list;
          this.calendar[i].checklist.created = true;
        }
      }

      // close modal on create
      document.getElementsByClassName("checklist-modal")[0].classList.remove("is-active");
      // post new meter to database
      this.saveChecklist();
    },
    saveChecklist: function() {
      // get current user
      let user = this.$store.getters.getCurrentPatient.userName;

      const checklist = {
        label: this.label,
        list: this.list,
        due_date: this.due_date
      }

      axios.post(this.$store.getters.createChecklistURL+user, {'treatment' : checklist, user}).then(function(response) {
        if(response.data.success) {
          // add new checklist to vuex
          this.$store.dispatch("addChecklist", this.$data);
        } else {
          alert("Failed to Create Checklist");
        }
      }).catch(function(err) {
        throw err;
      });
    },
    close: function() {
      // close meter if exited
      document.getElementsByClassName("checklist-modal")[0].classList.remove("is-active");
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.checklist-modal {
  text-align: left;

  &__title {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
  }

  &--form {
    background: $white;
    padding: 2rem;
  }
}

#max-message {
  color: red;
}
</style>
