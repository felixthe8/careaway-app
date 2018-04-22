<template>
  <div>
    Uh oh spaghettiooooooo
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
    <button class="button is-primary" @click = "openModal">Open Breach Notification</button>
    <button class="button is-primary" @click = "closeAdmin">Log out</button>
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
      <timeout v-if ="showTime" @close = "showTime = false"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import timeout from '../shared/timeout';
import debounce from 'debounce';
export default {
    name: 'breach',
    components: {timeout},
     data() {
      return {
        //warning 
        showWarning: false,
        inputWarning: '',
        showTime: false,
        modalIsOpen: false,

        password: '',
        validPassword: '',
        validConfirmedPassword: '',
        confirmMessage: '',
        feedbackList: []
      }
    },
    beforeCreate() {
      axios.get(this.$store.getters.feedbackURL)
        .then(response => {

          if(response.data.result) {
            this.feedbackList = response.data.result;
          }
        });
    },
    mounted () { 
      // A 15 minute session inactivity timer will run to keep track of if the user is interacting with the page or not.
      var self = this;
      var time;
      document.onmousemove = debounce(resetTimer, 500);
      document.onkeypress = debounce(resetTimer, 500);
      document.onclick = debounce(resetTimer, 500);
        
      function resetTimer() {
       clearTimeout(time);
       // After 15 minutes of inacitivity, the session timeout warning will display
       time = setTimeout(self.displaySessionwarning, 15*60*1000);
     }
    // Call the resetTimer function to kick-start the inactivity timer. 
    resetTimer();
    },
    methods:{
      displaySessionwarning() {
        this.showTime = true;
      },
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
        document.onmousemove = null;
        document.onkeypress = null;
        document.onclick = null;
        this.$store.dispatch('saveUsername', '');
        // Call to user plugin to logout user
        this.$logout();
        this.$router.push('/');
      },
      getUserName(){
        return this.$store.state.username;
      },
      openModal() {
        this.modalIsOpen = true;
      },
      closeModal() {
        this.modalIsOpen = false;
      },
      saveFeedback(feed) {
        feed.seen = !feed.seen;
        axios.put(this.$store.getters.feedbackURL, feed)
          // runs after the request has been answered
          .then(function(response) {
            console.log('success');
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

  .modal-content {
    overflow: hidden;
    max-height: none;
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