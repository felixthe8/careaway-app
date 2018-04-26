<template>
  <div>
    <div class="top-bar">
      <button class="button is-primary spacing" @click = "openModal">Open Breach Notification</button>
      <button class="button is-primary spacing" @click = "closeAdmin">Log out</button>
    </div>

    <p class="title-text">Feedback collected from Careaway's medical professionals</p>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter brighter-white">
        <div v-for="feedback in feedbackList">
          <div class="field">
            <div class="control">
              <label class="checkbox checkbox-text">
                <input type="checkbox" v-model="feedback.seen" @click="saveFeedback(feedback)">
                {{ feedback.feedback }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal" v-bind:class="{ 'is-active': modalIsOpen }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class = "box">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <img src = "../../assets/images/careaway-full1.png">
                <p class = "warning" v-show="showWarning">{{inputWarning}}</p>
                <h2 id= "systemAdmingWarning"> Breach Detected: Please Push Button</h2>
                  <p class="control">
                      <input class="input" type="password" id = "password" :class="validPassword" @keyup="validPassword = checkEmptyInput(getPassword())" placeholder="Password">
                  </p> 
                <button class="button is-primary is-medium is-fullwidth is-rounded" @click = "breachNotification()">Breach Notification</button>
              </div>
            </article>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import timeout from '../shared/timeout';
export default {
    name: 'breach',
     data() {
      return {
        //warning 
        showWarning: false,
        inputWarning: '',
        modalIsOpen: false,

        password: '',
        validPassword: '',
        validConfirmedPassword: '',
        confirmMessage: '',
        feedbackList: []
      }
    },
    beforeCreate() {
      // GET request to get all feedbacks
      axios.get(this.$store.getters.feedbackURL)
        .then(response => {
          if(response.data.result) {
            // Set feedback list to response
            this.feedbackList = response.data.result;
          }
        });
    },
    methods:{
      checkEmptyInput(data){
        if(data.length == 0 || data == '') {
          return 'is-danger';
        } 
      },
      getPassword() {
        return document.getElementById('password').value;
      },
      //closes admin page
      closeAdmin() {
        this.$store.dispatch('saveUsername', '');
        this.$router.push('/');
      },
      getUserName(){
        return this.$store.state.username;
      },
      // Methods to open and close the modal
      openModal() {
        this.modalIsOpen = true;
      },
      closeModal() {
        this.modalIsOpen = false;
      },
      // Save data for feedback
      saveFeedback(feed) {
        // Update the seen property
        feed.seen = !feed.seen;
        // PUT request to send updated feedback to backend
        axios.put(this.$store.getters.feedbackURL, feed)
          .then(function(response) {

            })
            .catch(function(err) {
              console.log(err);
            });
      },
      //shuts down and notifies user
      breachNotification(){
        axios.post(this.$store.getters.breachURL, {username: this.getUserName(), password: this.getPassword()})
          // runs after the request has been answered
          .then(function(response) {
            })
            .catch(function(err) {
              console.log(err);
              // prompt the user if there was an error in handling their login request 
              self.inputWarning = 'Breach Notification Failed';
              self.showWarning = true;
            });
      }
    },
}
</script>

<style lang="scss">
  @import "../../assets/sass/settings.scss";

  .top-bar {
    padding: 24px;
    text-align: end;
  }

  .title-text {
    text-align:center;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 36px;
  }

  .spacing {
    margin-left: 12px;
  }

  .modal-content {
    overflow: hidden;
    max-height: none;
  }

  .brighter-white {
    background-color: #eeeeee;
  }

  .form {
    &__title {
      font-size: 1.5em;
      padding-bottom: 1rem;
    }
  } 

  img {
    width: 40%;
  }
    
  button i {
    margin-left: 2%;
  }

 #reset {
    color: $purple-dark;
  }
  #systemAdmingWarning{
      color:#FF3860;
      font-size: 2.0em;
  }
  .warning {
    color: #FF3860;
    
  }
</style>