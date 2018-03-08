<template>
  <div class='registration' :class='detectNewForm'>
      <img id='logos' src='../../assets/images/careaway-full1.png'>
        <div class = 'warning' v-show='showWarning'> {{warning}} </div>
        <input placeholder = 'Username' class='input is-small' type='text'  @keyup='usernameInput=usernameValid(username)' v-bind:class='[usernameInput]' v-model='username'>
        <tooltip :requirements='usernameRequirements'></tooltip>
        <input placeholder='Password' class='input is-small' type='password'  @keyup='passwordInput=passwordValid(getPassword())' v-bind:class='[passwordInput]' id='password'>
        <tooltip :requirements='passwordRequirements'></tooltip>
        <input placeholder='First Name' class='input is-small' type='text' @keyup='firstNameInput=nameValid(firstName)' v-bind:class='[firstNameInput]' v-model='firstName'>
        <tooltip :requirements='nameRequirements'></tooltip>
        <input placeholder='Last Name' class='input is-small' type='text' @keyup='lastNameInput=nameValid(lastName)' v-bind:class='[lastNameInput]' v-model='lastName'>
        <tooltip :requirements='nameRequirements'></tooltip>
        <security-questions :class='getValue' :questions='1'></security-questions>
        <input placeholder = 'Answer'  class='input is-small' type='text'  @keyup='answer1Input=isEmpty(securityA1)' v-bind:class='[answer1Input]' v-model='securityA1'>
        <tooltip :requirements='answerRequirements'></tooltip>
        <security-questions :class='getValue' :questions='2'></security-questions>
        <input placeholder = 'Answer'  class='input is-small' type='text'  @keyup='answer2Input=isEmpty(securityA2)' v-bind:class='[answer2Input]' v-model='securityA2'>
        <tooltip :requirements='answerRequirements'></tooltip>
        <security-questions :class='getValue' :questions='3'></security-questions>
        <input placeholder = 'Answer' class='input is-small' type='text'  @keyup='answer3Input=isEmpty(securityA3)' v-bind:class='[answer3Input]' v-model='securityA3'>
        <tooltip :requirements='answerRequirements'></tooltip>
        <div v-if='patientForm'>
          <input placeholder='Medical Professional Code' class='input is-small' type='text'  @keyup='medicalProfessionalCodeInput=isEmpty()' v-bind:class='[medicalProfessionalCodeInput]' v-model='medicalProfessionalCode'>
          <tooltip :requirements='medicalProfessionalRequirements'></tooltip>  
          <input type='checkbox' v-model='termsAgreement'><label class='verification'>{{termsAndAgreement}} <a target='_blank' href='https://www.hhs.gov/hipaa/index.html'>Health Insurance Portability and Accountability Act</a></label><br>
          <input type='checkbox' v-model='above18'><label class='verification'>{{over18Message}}</label>
        </div>
        <a id = 'submit-button' class='button form__button is-rounded is-fullwidth' @click='registerUser()'>Submit</a>
  </div>
</template>

<script>
  import axios from 'axios';
  import tooltip from './tooltip.vue'
  import securityQuestions from './security-question.vue';
  export default {
    name: 'registration',
    // The patientForm holds a true or false value 
    // This determines to display the patient form or the medical professional form
    props: ['patientForm'],
    components: {
      'tooltip': tooltip, // This is the on hover tool tip next to input fields
      'securityQuestions': securityQuestions // These are the security question inputs
    },
    data () {
      return {
        // The user inputs
        firstName:'',
        lastName: '',
        username: '',
        securityA1: '',
        securityA2: '',
        securityA3: '',
        securityQ1: '',
        securityQ2:'',
        securityQ3: '',
        // Patient Specific inputs
        medicalProfessionalCode: '',
        termsAgreement: false,
        above18: false,
        // Values to notify the user of invalid input using bulma classes
        firstNameInput: 'is-primary',
        lastNameInput: 'is-primary',
        usernameInput: 'is-primary',
        passwordInput: 'is-primary',
        answer1Input: 'is-primary',
        answer2Input: 'is-primary',
        answer3Input: 'is-primary',
        medicalProfessionalCodeInput: 'is-primary',
        // The warning message upon displaying if something went wrong with input fields or submitting the data
        showWarning: false,
        warning: '',
        // These are the input requirements as specified for our business rules to display for the tool tips
        nameRequirements:'1 - 30 characters [A-Z or a - z and any special characters] ',
        usernameRequirements:`Has to be 8 - 120 characters [A - Z or a - z and any special characters] and No spaces`,
        passwordRequirements:`Has to be 8 - 120 characters [A - Z or a - z and any special characters] and No spaces`,
        medicalProfessionalRequirements: 'This is the code you receive from your medical consultant',
        answerRequirements: '1 - 100 characters [A-Z or a - z and any special characters] ',
        termsAndAgreement: 'I agree to allow CareAway to use and share my health information in compliance with ',
        over18Message: 'I am at least 18 years or older'
      }
    },
    computed:{
      // This gets the values of the security question that was stored in the vueX store
      getValue(){
        this.securityQ1= this.$store.state.questionSelected1;
        this.securityQ2= this.$store.state.questionSelected2;
        this.securityQ3= this.$store.state.questionSelected3;
      },
      // This resets the registration form upon an event that wants to reset the form
      detectNewForm(){
        if(this.$store.state.resetRegistrationForm){
          // The user inputs
          this.firstName='';
          this.lastName= '';
          this.username= '';
          this.securityA1= '';
          this.securityA2= '';
          this.securityA3= '';
          this.medicalProfessionalCode= '';
          document.getElementById('password').value='';
          this.termsAgreement= false;
          this.above18= false;
          // Values to notify the user of invalid input
          this.firstNameInput= 'is-primary';
          this.lastNameInput= 'is-primary';
          this.usernameInput= 'is-primary';
          this.passwordInput= 'is-primary';
          this.answer1Input= 'is-primary';
          this.answer2Input= 'is-primary';
          this.answer3Input= 'is-primary';
          this.medicalProfessionalCodeInput= 'is-primary';
          // Notifies the store that the registration form has been reset
          this.$store.commit('resetRegForm');
          // The warning message upon displaying if something went wrong with input fields or submitting the data
          this.warning='';
          this.showWarning=false;
        }
      }
    },
    methods: {
      // Checks if the name inputs are valid based on requirements
      nameValid(data){
        if((data.length == 0) || 
           (data.length > 30) ||
           (!isNaN(data))){
          return 'is-danger'
        } else {
          return 'is-success';
        }
      },
      // Checks if the username inputs are valid based on requirements
      usernameValid(data){
        if((data.length < 8) || 
           (data.length > 120) || 
           (data.includes(' '))){
          return 'is-danger';
        }
        else{
          return 'is-success';
        }
      },
      // Checks if the password inputs are valid based on requirements
      passwordValid(data){
        if((data.length < 8) || 
           (data.length > 120) || 
           (data.includes(' '))){
          return 'is-danger';
        } else {
          return 'is-success';
        }
      },
      // Get the input value from the password input (used instead of saving the password into a variable)
      getPassword() {
        return document.getElementById('password').value;
      },
      // Checks if the input field is empty
      isEmpty(data){
        if(data == ''){
          return 'is-danger'
        }
        else{
          return 'is-success'
        }
      },
      // Checks if all security questions were selected 
      checkSecurityQuestions(){
        if(this.securityQ1 == 0 || this.securityQ2 == 0 ||this.securityQ3 == 0){
          return false;
        } else {
          return true;
        }
      },
      // Checks if Patient checked the terms and agreement and above 18 checkbox
      checkTermsandAgreement(){
        if(this.patientForm){
          if(this.termsAgreement && this.above18){
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      // This routes the user to the Medical Account Page after they sign in as a medical professional
      routeMedicHome() {
        this.$router.push('MedicHome');
      },
      // This routes the user to the Patient Account Page after they sign in as a patient
      routePatientHome() {
        this.$router.push('PatientHome');
      },
      // This calls the store to notify that the registration modal should now be closed
      closeRegistration(){
        this.$store.dispatch('alternateRegistration');
      },
      // The method to check if all inputs are all valid before user can submit registration info
      registerUser(){
        // Checks if all input fields for a patient are valid
        if(this.firstNameInput == 'is-success' &&
          this.lastNameInput == 'is-success' &&
          this.usernameInput == 'is-success' &&
          this.passwordInput == 'is-success' &&
          this.answer1Input == 'is-success' &&
          this.answer2Input == 'is-success' &&
          this.answer3Input == 'is-success' &&
          this.medicalProfessionalCodeInput == 'is-success' &&
          this.checkSecurityQuestions() &&
          this.checkTermsandAgreement() &&
          this.patientForm)
        {
          // Clear any warnings
          this.warning = '' 
          this.showWarning = false;
          // This refers to the registration vue to use the methods called in the axios request
          var self = this;
          // Creates a new patient object with specified inputs
          const newPatient = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            password: this.getPassword(),
            medicalCode: this.medicalProfessionalCode,
            securityQ1: this.securityQ1,
            securityQ2: this.securityQ2,
            securityQ3: this.securityQ3,
            securityA1: this.securityA1,
            securityA2: this.securityA2,
            securityA3: this.securityA3
          }
          // Sends data to the proxy server on this route
          axios.post('http://localhost:8080/registerPatient', newPatient).then((
            function(response){
              if(response.data.success){
                self.$store.dispatch('authenticatedUsername', newPatient.username);
                //This allows the user to be signed in as a patient
                self.$store.dispatch('signIn', 'patient');
                //This navigates the user to the patient account page
                self.routePatientHome();
                self.closeRegistration();
              }
              else{
                self.warning = response.data.error;
                self.showWarning = true;
              }
            }
          )).catch(function(err){
            // Display an error message on the registration modal that an error has occurred upon sending the data
            self.warning = 'Your input could not be handled at this time. Try again.';
            self.showWarning = true;
            console.log(err);
          });
        }
        // Checks if all input fields for a medicalprofessional are valid
        else if(this.firstNameInput == 'is-success' &&
          this.lastNameInput == 'is-success' &&
          this.usernameInput == 'is-success' &&
          this.passwordInput == 'is-success' &&
          this.answer1Input == 'is-success' &&
          this.answer2Input == 'is-success' &&
          this.answer3Input == 'is-success' &&
          this.checkSecurityQuestions() &&
          this.patientForm == false
        ){
          // Resets the warning
          this.warning = ''
          this.showWarning = false;
          // This refers to the registration vue to use the methods called in the
          // axios request
          var self = this;
          // creates a medical professional object with specified inputs
          const newMedicalProfessional = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            password: this.getPassword(),
            securityQ1: this.securityQ1,
            securityQ2: this.securityQ2,
            securityQ3: this.securityQ3,
            securityA1: this.securityA1,
            securityA2: this.securityA2,
            securityA3: this.securityA3
          }
          // Sends data to the proxy server on this route
          axios.post('http://localhost:8080/registerMed',newMedicalProfessional).then((
            function(response){
              if(response.data.success){
                //This allows the user to sign in as a medical professional
                self.$store.dispatch('authenticatedUsername', newMedicalProfessional.username);
                self.$store.dispatch('signIn', 'medical-professional');
                //This reroutes the user to the medical professional account page
                self.routeMedicHome();
                self.closeRegistration();
              } else {
                self.warning = response.data.error;
                self.showWarning = true;
              }
            }
          )).catch(function(err){
            // Display an error message on the registration modal that an error has occurred upon sending the data
            self.warning = 'Your input could not be handled at this time. Try again.';
            self.showWarning = true;
            console.log(err);
          });
        } else {
          // Display an error message on the registration modal that input fields are still incorrect
          this.warning = 'One or more input fields are invalid'
          this.showWarning = true;      
        }
      }
    }
  }
</script>


<style lang='scss' scoped>
  @import '../../assets/sass/settings.scss';

  .registration{
    padding: 35px 10px 10px 10px;
  }
  .warning{
    color: red;
    font-size: 12px;
  }
  #logos{
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .input{
    margin: 2px 0px 2px 0px;
    @media #{$tablet} {
      display:inline-block;
      width: 95%;
    }
  }
  #submit-button{
    background-color: #00C4A7;
    color: white;
    font-family: sans-serif;
  }
  .verification{
    padding: 5px;
    font-size: 9px;
  }
  .form {
    &__title {
      display: inline;
      font-size: 1.5em;
      padding-bottom: 1rem;
    }
  }

</style>
