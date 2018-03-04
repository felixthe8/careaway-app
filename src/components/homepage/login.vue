<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <div class = "box">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <img id = "header-image" src = "../../assets/images/careaway-full1.png"><br>
                  <h2 id = "form-title"> Please Sign In to Continue</h2>

                    <p id = "warning" v-show="showWarning">{{inputWarning}}</p>

                    <p class="control">
                      <input class="input" type="name" v-model="username" :class="validUsername" @keyup="validUsername = checkEmpty(username)" placeholder="Username">
                    </p> 


                    <p class="control">
                      <input class="input" type="password" id = "password" :class="validPassword" @keyup="validPassword = checkEmpty(getPassword())" placeholder="Password">
                    </p> 

                    <p class="control">
                      <button class="button is-primary is-medium is-fullwidth is-rounded" @click = "userSignIn()">
                        Sign In <i class="fas fa-sign-in-alt" id = "sign-in-icon"></i>
                      </button>
                    </p>
                   <div id = "reset" class="button signin" @click = "displayReset">Forgot your Password?</div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeLogin"></button>
  </div> 
</template>

<script>
import axios from 'axios'
import resetPassword from './reset-password.vue';
  export default {
    name: 'login',
    components: {
      resetPassword,
    },
    data() {
      return {
        // user inputs on the login form
        username: '',
        // data values to notify the user of an invalid input on login 
        validUsername: '',
        validPassword: '',
        showWarning: false,
        inputWarning: ''
      }
    },
    methods: {
      // redirect to MP home page
      routeMedicHome() {
        this.$router.push('MedicHome');
      },
      // redirect to patient home page
      routePatientHome() {
        this.$router.push('PatientHome');
      },
      // method to check if username and password fields are empty. 
      checkEmpty(data){
        if(data.length == 0 || data == '') {
          return 'is-danger'
        } 
      },
      // method to return the value that the user provided for the password
      getPassword() {
        return document.getElementById('password').value;
      },
      // this method will run if the user clicks "Submit"
      userSignIn() {
        this.validUsername = this.checkEmpty(this.username);
        this.validPassword = this.checkEmpty(this.getPassword());
        // prompt the user if the username and password was empty
        if(this.validUsername == 'is-danger' || this.validPassword == 'is-danger') {
          this.inputWarning = "You must provide a username and password to sign in";
          this.showWarning = true;
        } else {
            this.showWarning = false;
            this.inputWarning = '';
            // variable to represent the 'this' of the outside function scope
            var self = this;
            // create an object to hold the data that we want to send for the 
            // request to verify user. 
            const newContact = {
              username: this.username,
              password: this.getPassword()
            }
            // Send a POST request to the following route   
            axios.post('http://localhost:8080/login', newContact)
            // runs after the request has been answered
            .then(function(response) {
              // if the is successful, that means an account exists.   
              if(response.data.success) {
                // if the login credential is a patient, take this route
                if(response.data.accountType == 'patient') {
                  self.$store.dispatch('signInPatient');
                  self.$store.dispatch('authenticatedUsername', self.username);
                  self.routePatientHome();
                  self.closeLogin();
                } //  if the user is a medical professional, take this route
                else if (response.data.accountType == 'medical-professional') {
                  self.$store.dispatch('signInMP');
                  self.$store.dispatch('authenticatedUsername', self.username);
                  self.routeMedicHome();
                  self.closeLogin();
                } //if the user is a system admin, take this route
                else if (response.data.accountType == 'system-admin') {
                  self.$store.dispatch('signInAdmin');
                  self.displayAdmin();
                 // TODO : Need to add route for patient after Vue is created. 
                  self.closeLogin();
                }
                else if(response.data.accountType =='SSO'){
                  self.closeLogin();
                  self.$store.dispatch('saveUsername',self.username);
                  self.$store.dispatch('alternateSSORegistration');
                  self.$store.dispatch('alternateRegistration');
                }
              } else {
                 // if the credentials are bad, update the login vue and prompt the user of their error
                  self.inputWarning = 'The username and password you have provided are invalid.';
                  self.showWarning = true;
              }
            })
            .catch(function(err) {
              // prompt the user if there was an error in handling their login request 
              self.inputWarning = 'Your input could not be handled at this time. Try again.';
              self.showWarning = true;
            });
        }
      },
      // method that runs when the user clicks 'close' on the login modal
      closeLogin() {
        this.$store.dispatch('alternateLogin');
      },
      displayReset () {
        this.$store.dispatch('alternateLogin');
        this.$store.dispatch('alternateReset');
      },
      displayAdmin(){
        this.$store.dispatch('alternateAdmin');
      },
    },
    computed: {
      showLogin() {
        return this.$store.getters.showLogin;
      },
      showReset(){
        return this.$store.state.showReset;
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
  #form-title {
      font-size: 1.5em;
      padding-bottom: 1rem;
  } 
  .input{
    margin: 5px 0px 5px 0px;
  }
  #header-image {
    width: 40%;
  }
  #sign-in-icon {
    margin-left: 2%;
  }
 #reset {
    color: $purple;
  }
  #reset:hover {
    color: $purple-light;
  }
  #warning {
    color: #FF3860;
  }
</style>




