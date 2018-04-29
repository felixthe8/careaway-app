<template>

  <div class="mail">
      <button class="mail__button" @click="toggleMail">
          <div class="mail__button--counter" v-if="count> 0">{{count}}</div>
          <i class="fas fa-envelope"></i>
      </button>

      <div class="mail__menu" :class="{ 'show-mail': open }">
        <div class="mail__menu--current-message" v-for="message in mail">
            <div class="mail__menu--current-message--date">{{date.toString()}}</div>
            {{message.message}}<button class="message-delete" @click="remove(message.message)"><i class="fas fa-times"></i></button>
        </div>
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
      sender: this.$store.getters.authenticatedUsername,
      status: this.$store.getters.authStatus,
      patient: "",
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
    axios.get(this.$store.getters.getMailURL+this.sender).then(result => {
      let mail = result.data.mail;
      let patientMail = [];

      if(self.status === "medical-professional") {
        // set receiver to patient
        self.receiver = this.$store.getters.getCurrentPatient.userName;
        // get patient specific mail
        Array.from(mail).forEach((message, index)=> {
          if(message.sender === self.receiver) {
            patientMail.push(message);
          }
        });
        mail = patientMail;
      } else {
        // get medical professional's username based on current patient
        axios.get(this.$store.getters.getMedicalProfessional+self.sender).then(result => {
        // receiver is the medical professional ~ result.data
        self.receiver = result.data;
        }).catch(error => {
          throw error;
        });
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
        // post new message to database
        this.saveMail(this.sender, this.receiver);
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
        'sender' : sender,
        'receiver' : receiver,
        'message' : this.message
      }).then(function(response) {
        if(response.data.success) {
          alert("Message sent!")
        } else {
          alert("Failed to Send Message");
        }
      }).catch(function(err) {
          throw err;
      });
    },
    remove: function(message) {
      // initialize message to delete
      let mail_to_delete = message;
      // find message to delete
      Array.from(this.mail).forEach((mail, index)=> {
        if(mail.message === message) {
          mail_to_delete = mail;
        }
      });
      this.postDelete(this.sender, this.receiver, mail_to_delete);
    },
    postDelete(sender, receiver, message) {
      // define this for in post request
      let self = this;
      axios.post(this.$store.getters.deleteMailURL+receiver, {
          'sender' : sender,
          'receiver': receiver,
          'message': message
      }).then(
      function(response)
      {
        if(response.status === 200){
          alert("Message Deleted");
        } else {
          alert("Failed to Delete");
        }
      }).catch(function(err){
        throw err;
      });
    },
  },

  computed: {
    date: function() {
      return new Date();
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
    max-height: 400px;
    overflow: scroll;

    &--current-message {
      text-align: left;
      color: gray;

      &:hover {
        .message-delete {
          opacity: 1;
        }
      }

      .message-delete {
        opacity: 0;
      }

      &--date {
        color: $green;
        font-size: 11px;
      }
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
