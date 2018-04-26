<template>

  <div class="mail">
      <button class="mail__button" @click="toggleMail">
          <div class="mail__button--counter" v-if="count> 0">{{count}}</div>
          <i class="fas fa-envelope"></i>
      </button>

      <div class="mail__menu" :class="{ 'show-mail': open }">
        <div class="mail__menu--current-message" v-for="message in mail">{{message.message}}</div>
        <hr class="line">
        <input class="input" name="message" type="text" id="message">
        <button id="meter" class="mail__menu--create green-button" @click="create">Send</button>
      </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "mail",

  data() {
    return {
      user: this.$store.getters.authenticatedUsername,
      status: this.$store.getters.authStatus,
      patient: this.$store.getters.getCurrentPatient.userName,
      sender: this.$store.getters.authenticatedUsername,
      count: 0,
      mail: "no new messages",
      message: null,
      open: false,
    }
  },

  created: function() {
    let self = this;
    // get current messages
    axios.get(this.$store.getters.getMailURL+this.user).then(result => {
      let mail = result.data.mail;
      let patientMail = [];
      if(this.status === "medical-professional") {
        // get patient specific mail
        Array.from(mail).forEach((message, index)=> {
          if(message.sender === this.patient) {
            patientMail.push(message);
          }
        });
        mail = patientMail;
      }
      self.mail = mail;
      // show message count
      if(self.mail != "no new messages" && self.mail.length > 0) {
        self.count = self.mail.length;
      }
    }).catch(error => {
      throw error;
    });
  },

  methods: {
    toggleMail: function() {
      this.open = !this.open;
    },
    create: function(event) {
      // get form input for meter
      this.message = document.getElementById("message").value;
      // close modal on create
      this.toggleMail();

      if(this.status === "medical-professional") {
        // receiver is the medical professional's patient
        let receiver = this.patient;
        console.log(receiver);
        // post new message to database
        this.saveMail(this.sender, receiver);
      } else {
        self = this;
        // get medical professional's username based on current patient
        axios.get(this.$store.getters.getMedicalProfessional+this.sender).then(result => {
          // receiver is the medical professional ~ result.data
          self.saveMail(this.sender, result.data);
        }).catch(error => {
          throw error;
        });
      }
    },
    saveMail(sender, receiver) {
      axios.post(this.$store.getters.createMailURL+receiver, {
        'sender' : this.sender,
        'receiver' : receiver,
        'message' : this.message
      }).then(function(response) {
        if(response.data.success) {
          // success
        } else {
          alert("Failed to Send Message");
        }
      }).catch(function(err) {
          throw err;
      });
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.mail {
  &__button {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 8px 8px;
    margin: 1rem;
    font-size: 1em;
    color: $green;
    border: 1px solid $green;
    border-radius: 20px;

    &--counter {
      position: absolute;
      font-size: .75em;
      top: -10px;
      right: 0;
      padding: 2px 6px;
      border-radius: 20px;
      color: $white;
      background: $green;
    }
  }

  &__menu {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 3rem;
      padding: 1rem;
      border: 2px solid $green;
      border-radius: 10px;
      background: $white;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
      transform: scale(0) translateY(500px);
      opacity: 0;
      transition: all ease 1s;

      &--current-message {
        text-align: center;
        color: gray;
      }
  }
}

.line {
  margin: 1rem;
}

.show-mail {
  transform: scale(1) translateY(0);
  opacity: 1;
}

</style>
