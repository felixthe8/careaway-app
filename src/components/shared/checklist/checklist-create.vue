<template>

  <div class="checklist-modal">

    <div class="checklist-modal--form">
      <div class="row">
        <h1>Checklist</h1>
      </div>
      <div class="row checklist-prompt">
        <label>Checklist Prompt</label>
        <input class="checklist-modal--form--input prompt-input" name="checklist" type="text" id="checklist">
      </div>
      <button id="add-prompt" @click="addPrompt">+</button>
      <div class="row">
        <label>Date Requested:</label>
        <input class="checklist-modal--form--input" name="date" type="text" id="checklist-date">
      </div>
      <button class="checklist-modal--form--create green-button" @click="create">Create Event</button>
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
      let old = document.getElementsByClassName("checklist-prompt")[0];
      let newInput = document.createElement("input");
      newInput.className = "prompt-input";
      newInput.name ="checklist";
      newInput.type = "text";
      newInput.id="checklist";

      // limit to 5
      let limit = document.getElementsByClassName("prompt-input");
      if(limit.length < 5) {
        old.appendChild(newInput);
      } else {
        let error = document.createElement("span");
        error.innerHTML = "Maximum Prompts Reached";
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
      document.getElementsByClassName("checklist-modal")[0].classList.remove("show-modal");
      // post new meter to database
      this.saveChecklist();
      // add new checklist to vuex
      this.$store.dispatch("addChecklist", this.$data);
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
          console.log("Successfully Created Checklist");
        } else {
          console.log("Failed to Create Checklist");
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    close: function() {
      // close meter if exited
      document.getElementsByClassName("checklist-modal")[0].classList.remove("show-modal");
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
    text-align: left;
  }
}

.checklist-prompt {
  input {
    display: block;
    margin: 10px;
  }
}

.max-message {
    display: none;
    color: red;
}

.show-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
