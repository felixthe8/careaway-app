<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <div class = "box">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <img src = "../../assets/images/careaway-full1.png">
                  <h2 class="form__title"> Forgot your Password?</h2>
                    <p class = "warning" v-show="showWarning">{{inputWarning}}</p>
                    <p class="control">
                      <input class="input" type="name" v-model="username" :class="validUsername" @keyup="validUsername = checkEmptyInput(username)" placeholder="Enter Your Username">
                    </p> <br>
                    <p class="control">
                      <button class="button is-primary is-medium is-fullwidth is-rounded" @click = "validateInputOnSubmit()">
                        Submit <i class="fas fa-long-arrow-alt-right"></i>
                      </button>
                    </p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeReset"></button>
  </div> 
</template>
<script>
import axios from 'axios'
  export default {
    name: 'resetUsername',
    data() {
      return {
        // user inputs on the resetpassword form
        username: '',
        // data values to notify the user of an invalid input
        validUsername: '',
        showWarning: false,
        inputWarning: ''
      }
    },

    methods: {
      // method to check if username and password fields are empty. 
      checkEmptyInput(data){
        if(data.length == 0 || data == '') {
          return 'is-danger'
        } 
      },
      

      // this method will run if the user clicks "Submit"
      validateInputOnSubmit() {
        this.validUsername = this.checkEmptyInput(this.username);


        // prompt the user if the username was empty
        if(this.validUsername == 'is-danger' ) {
          this.inputWarning = "You must provide a username to reset password";
          this.showWarning = true;
        } else {
            this.showWarning = false;
            this.inputWarning = '';
            const nameCheck = {
              username: this.username,
              }
          var self = this;
            //need to post username
            // Send a POST request to the following route   IMPORTANT: route must be changed before deployment
          axios.post(this.$store.getters.validateUsernameURL, nameCheck)
          // runs after the request has been answered
          .then(function(response) {
          // if the response exists, then do something.   IMPORTANT: This is just a console.log() because routes has not been defined
              if(response.data.success) {
                self.$store.dispatch('saveUsername',self.username);
                 //close this module go to questions
                self.$store.dispatch('alternateReset');
                self.$store.dispatch('alternateQuestions');
              } else {
                 // if the user name is not found, warn user.
                  self.inputWarning = 'The Username is invalid.';
                  self.showWarning = true;
                  console.log(response);
              }
            })
            .catch(function(err) {
              console.log(err);
              // prompt the user if there was an error in handling their login request 
              self.inputWarning = 'Your input could not be handled at this time. Try again.';
              self.showWarning = true;
            });
           
        }
      },
      // method that runs when the user clicks 'close'
      closeReset() {
        this.$store.dispatch('alternateReset');
      },
    
    }

  }
</script>

<style lang = "scss">
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

  .warning {
    color: #FF3860;
  }
  
</style>

