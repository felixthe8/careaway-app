<template>

  <div class="modal meter-modal">

    <div class="modal-background"></div>
    <div class="modal-content meter-modal--form">
      <h1 class="meter-modal__title">Generate Meter</h1>
      <div class="field">
        <label class="label">Question:</label>
        <input class="input" name="meter" type="text" id="meter-question" required>
      </div>
      <div class="field">
        <p>Set Scale:</p>
        <label>From:</label>
        <input type="number" min="0" max="10" required>
        <label>To:</label>
        <input type="number" min="10" max="100" required>
      </div>
      <div class="field">
        <label>Date Requested:</label>
        <input class="meter-modal--input" name="date" type="text" id="meter-date">
      </div>
      <button id="meter" class="meter-modal--create green-button" @click="create" :disabled = "isTutorial">Create Event</button>
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
      label: "meter",
      question: "",
      scale: [1,10],
      due_date: ""
    }
  },
  computed: {
    isTutorial() {
      return this.$store.getters.isTutorial;
    }
  },

  methods: {
    create: function(event) {
        // get form input for meter
        this.question = document.getElementById("meter-question").value;
        this.due_date = document.getElementById("meter-date").value;

        // get element by date attribute
        for(var i=0; i < this.calendar.length; i++) {
          if(this.calendar[i].date === this.due_date) {
            // show meter on calendar
            this.calendar[i].meter = this;
            this.calendar[i].meter.created = true;
          }
        }

        // close modal on create
        document.getElementsByClassName("meter-modal")[0].classList.remove("show-modal");
        // post new meter to database
        this.saveMeter();
        // add new meter to Vuex
        this.$store.dispatch("addMeter", this.$data);
      

      // close modal on create
      document.getElementsByClassName("meter-modal")[0].classList.remove("is-active");
      // post new meter to database
      this.saveMeter();
      // add new meter to Vuex
      this.$store.dispatch("addMeter", this.$data);
    },
    saveMeter: function() {
      // get current user
      let user = this.$store.getters.getCurrentPatient.userName;

      const meter = {
        label: this.label,
        question: this.question,
        scale: this.scale,
        due_date: this.due_date
      }

      axios.post(this.$store.getters.createMeterURL+user, {'treatment' : meter, user}).then(function(response) {
        if(response.data.success) {
          console.log("Successfully Created Meter");
        } else {
          console.log("Failed to Create Meter");
        }
      }).catch(function(err) {
        console.log(err);
      });
    },
    close: function() {
      // close meter if exited
      document.getElementsByClassName("meter-modal")[0].classList.remove("is-active");
      if(this.isTutorial) {
        this.$emit('close')
      }
    }
  }
}

</script>

<style lang="scss">
@import "../../../assets/sass/settings.scss";

.meter-modal {
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
