<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <div class = "box">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <img src = "../../assets/images/careaway-full1.png">
                  <h2 class="form__title"> Enter a New Password</h2>
                    <p class = "warning" v-show="showWarning">{{inputWarning}}</p>
                    <p class="control">
                      <input class="input" type="password" id = "password" :class="validPassword" @keyup="validPassword = checkEmptyInput(GetPassword())" placeholder="Password">
                    </p> <br>
                    <p class="control">
                      <input class="input" type="Password" id = "confirmPassword" :class="validConfirmedPassword" @keyup="validConfirmedPassword = checkEmptyInput(GetConfirmedPassword())" placeholder="Confirm Password">
                    </p> <br>
                    <p class="control">
                      <button class="button is-primary is-medium is-fullwidth is-rounded" @click = "validateInputOnSubmit()">
                        Submit <i class="fas fa-long-arrow-alt-right"></i>
                      </button>
                    </p>
                    <p>{{confirmMessage}} </p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closePassword"></button>
  </div> 
</template>
<script>
import axios from 'axios'
  export default {
    name: 'resetPassword',
    data() {
      return {
        // user inputs on the login form
        password: '',
        // data values to notify the user of an invalid input
        validPassword: '',
        validConfirmedPassword: '',
        showWarning: false,
        inputWarning: '',
        confirmMessage: ''
      }
    },

    methods: {
      // method to check if username and password fields are empty. 
      checkEmptyInput(data){
        if(data.length == 0 || data == '') {
          return 'is-danger';
        } 
      },
      //method to get password from dom
      GetPassword() {
        return document.getElementById('password').value;
      },
      //method to get confirm password from dom
      GetConfirmedPassword() {
        return document.getElementById('confirmPassword').value;
      },

      // this method will run if the user clicks "Submit"
      validateInputOnSubmit() {
        this.validPassword = this.checkEmptyInput(this.GetPassword());
        this.validConfirmedPassword = this.checkEmptyInput(this.GetConfirmedPassword());
        // prompt the user if the username and password was empty
        if(this.validPassword == 'is-danger' || this.validConfirmedPassword == 'isdanger') {
          this.inputWarning = "You must provide a valid password to reset password";
          this.showWarning = true;
        } else if (this.GetPassword()!== this.GetConfirmedPassword()){
          this.inputWarning = "Passwords must match";
          this.showWarning = true;
        } else {
          var passwordReset = 
          {
            username: this.getUserName(),
            password: this.GetPassword()
            
          }
            this.showWarning = false;
            this.inputWarning = '';
             var self = this;
            //need to post and confirm
            axios.put(this.$store.getters.resetCredURL, passwordReset)
          // runs after the request has been answered
         
          .then(function(response) {
          // if the response exists, then do something.   IMPORTANT: This is just a console.log() because routes has not been defined
              if(response.data.success) {
                //closes questions, opens password vue
                self.confirmMessage = "Password was Reset, Redirecting...";
                setTimeout(function(){
                  self.$store.dispatch('alternatePassword');
                  self.$store.dispatch('alternateLogin');
                },3000);
                 
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
              self.inputWarning = 'Your password could not be reset at this time. Try again.';
              self.showWarning = true;
            });
            //closes this reset passsword vue to go to login vue
           
        }
      },

      // method that runs when the user clicks 'close'
      closePassword() {
        this.$store.dispatch('alternatePassword');
      },
      getUserName(){
        return this.$store.state.username;
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

