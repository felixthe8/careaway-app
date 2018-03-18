<template>
  <div class="registration">
    <img id="logos" src="../../assets/images/careaway-full1.png">
    <h1> Welcome to CareAway new user before you can proceed into your portal we need the following additional information</h1>
    <div class = "warning" v-show="showWarning"> {{warning}} </div>
    Are you a 
    <div class="control">
      <label class="radio">
        <input type="radio" name="answer" value=false v-model="isPatient">
        Medical Professional
      </label>
      <label class="radio">
        <input type="radio" name="answer" value=true v-model="isPatient">
        Patient
      </label>
    </div>
    <input placeholder="First Name" class="input is-small" type="text" @keyup="firstNameInput=nameValid(firstName)" v-bind:class="[firstNameInput]" v-model="firstName">
    <tooltip :requirements="nameRequirements"></tooltip>
    <input placeholder="Last Name" class="input is-small" type="text" @keyup="lastNameInput=nameValid(lastName)" v-bind:class="[lastNameInput]" v-model="lastName">
    <tooltip :requirements="nameRequirements"></tooltip>
    <security-questions :class='getValue' :questions='1'></security-questions>
    <input placeholder = 'Answer'  class='input is-small' type='text'  @keyup='answer1Input=isEmpty(securityA1)' v-bind:class='[answer1Input]' v-model='securityA1'>
    <tooltip :requirements='answerRequirements'></tooltip>
    <security-questions :class='getValue' :questions='2'></security-questions>
    <input placeholder = 'Answer'  class='input is-small' type='text'  @keyup='answer2Input=isEmpty(securityA2)' v-bind:class='[answer2Input]' v-model='securityA2'>
    <tooltip :requirements='answerRequirements'></tooltip>
    <security-questions :class='getValue' :questions='3'></security-questions>
    <input placeholder = 'Answer' class='input is-small' type='text'  @keyup='answer3Input=isEmpty(securityA3)' v-bind:class='[answer3Input]' v-model='securityA3'>
    <tooltip :requirements='answerRequirements'></tooltip>
    <div v-if="showPatientForm">
      <input placeholder="Medical Professional Code" class="input is-small" type="text"  @keyup="medicalProfessionalCodeInput=isEmpty()" v-bind:class="[medicalProfessionalCodeInput]" v-model="medicalProfessionalCode">
      <tooltip :requirements="medicalProfessionalRequirements"></tooltip>  
      <input type="checkbox" v-model="termsAgreement"><label class='verification'>{{termsAndAgreement}} <a target="_blank" href="https://www.hhs.gov/hipaa/index.html">Health Insurance Portability and Accountability Act</a></label><br>
      <input type="checkbox" v-model="above18"><label class='verification'>{{over18Message}}</label>
    </div>
    <a id = "submit-button" class="button form__button is-rounded is-fullwidth" @click="registerUser()">Submit</a>
  </div>
</template>

<script>
  import axios from 'axios';
  import tooltip from './tooltip.vue'
  import securityQuestions from './security-question.vue'
  export default {
    name: 'ssoRegistration',
    components: {
      "tooltip": tooltip, //This is the on hover tool tip next to input fields
      "security-questions": securityQuestions
    },
    data(){
      return{
        //user inputs
        firstName:'',
        lastName: '',
        securityA1: '',
        securityA2: '',
        securityA3: '',
        securityQ1: '',
        securityQ2:'',
        securityQ3: '',
        medicalProfessionalCode: '',
        termsAgreement: false,
        above18: false,
        //check what type of user they are
        isPatient: "false",
        //check input validation
        firstNameInput: 'is-primary',
        lastNameInput: 'is-primary',
        answer1Input: 'is-primary',
        answer2Input: 'is-primary',
        answer3Input: 'is-primary',
        medicalProfessionalCodeInput: 'is-primary',
        answerRequirements: '1 - 100 characters [A-Z or a - z and any special characters] ',
        nameRequirements:'1 - 30 characters [A-Z or a - z and any special characters] ',
        medicalProfessionalRequirements: 'This is the code you receive from your medical consultant',
        showWarning: false,
        warning: '',
        termsAndAgreement: 'I agree to allow CareAway to use and share my health information in compliance with ',
        over18Message: 'I am at least 18 years or older'
      }
    },
    computed:{
      showPatientForm(){
        if(this.isPatient=="true"){
          return true;
        } else{
          return false;
        }
      },
      // This gets the values of the security question that was stored in the vueX store
      getValue(){
        this.securityQ1= this.$store.state.questionSelected1;
        this.securityQ2= this.$store.state.questionSelected2;
        this.securityQ3= this.$store.state.questionSelected3;
      }

    },
    methods:{
      //Checks if the name inputs are valid based on requirements
      nameValid(data){
        if((data.length==0) || 
           (data.length>30) ||
           (!isNaN(data))){
          return 'is-danger';
        }
        else{
          return 'is-success';
        }
      },
      //Checks if the input field is empty
      isEmpty(data){
        if(data == ''){
          return 'is-danger'
        }
        else{
          return 'is-success'
        }
      },
      //Checks if Patient checked the terms and agreement and above 18 checkbox
      checkTermsandAgreement(){
        if(this.isPatient === "true"){
          if(this.termsAgreement && this.above18){
            return true;
          }
          else{
            return false;
          }
        }
        return true;
      },
      // Checks if all security questions were selected 
      checkSecurityQuestions(){
        if(this.securityQ1 == 0 || this.securityQ2 == 0 ||this.securityQ3 == 0){
          return false;
        } else {
          return true;
        }
      },
      routeMedicHome() {
        this.$router.push('MedicHome');
      },
      //This routes the user to the Patient Account Page after they sign in
      //as a patient
      routePatientHome() {
        this.$router.push('PatientHome');
      },
      //This calls the store to notify that the registration modal should now be closed
      closeRegistration(){
        this.$store.dispatch('alternateSSORegistration');
        this.$store.dispatch('alternateRegistration');
        this.$store.dispatch('saveUsername','');
      },
      registerUser(){
        //Checks if all input fields for a patient are valid
        if(
        this.firstNameInput== 'is-success'&&
        this.lastNameInput== 'is-success'&&
        this.medicalProfessionalCodeInput == 'is-success' &&
        this.answer1Input == 'is-success' &&
        this.answer2Input == 'is-success' &&
        this.answer3Input == 'is-success' &&
        this.checkSecurityQuestions() &&
        this.checkTermsandAgreement() &&
        this.isPatient=="true")
        {
          //clear any warnings
          this.warning = ""
          this.showWarning = false;
          //this refers to the registration vue to use the methods called in the
          //axios request
          var self = this;
          //creates a new patient object with specified inputs
          const newPatient = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.$store.state.username,
            securityQ1: this.securityQ1,
            securityQ2: this.securityQ2,
            securityQ3: this.securityQ3,
            securityA1: this.securityA1,
            securityA2: this.securityA2,
            securityA3: this.securityA3,
            medicalCode: this.medicalProfessionalCode
          }
          //Sends data to the proxy server on this route
          axios.post(this.$store.getters.ssoRegisterPatientURL, newPatient).then((
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
            //display an error message on the registration modal that an error has occurred upon sending the data
            self.warning = err;
            self.showWarning = true;
            console.log(err);
          });
        }
        //Checks if all input fields for a medicalprofessional are valid
        else if(
        this.firstNameInput== 'is-success'&&
        this.lastNameInput== 'is-success'&&
        this.answer1Input == 'is-success' &&
        this.answer2Input == 'is-success' &&
        this.answer3Input == 'is-success' &&
        this.checkSecurityQuestions() &&
        this.isPatient=="false"
        ){
          //resets the warning
          this.warning = ""
          this.showWarning = false;
          //this refers to the registration vue to use the methods called in the
          //axios request
          var self = this;
          //creates a medical professional object with specified inputs
          const newMedicalProfessional = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.$store.state.username,
            securityQ1: this.securityQ1,
            securityQ2: this.securityQ2,
            securityQ3: this.securityQ3,
            securityA1: this.securityA1,
            securityA2: this.securityA2,
            securityA3: this.securityA3
          }
          console.log(newMedicalProfessional)
          //Sends data to the proxy server on this route
          axios.post(this.$store.getters.ssoRegisterMedicalURL,newMedicalProfessional).then((
            function(response){
              //This allows the user to sign in as a medical professional
              self.$store.dispatch('authenticatedUsername', newMedicalProfessional.username);
              self.$store.dispatch('signIn', 'medical-professional');
              //This reroutes the user to the medical professional account page
              self.routeMedicHome();
              self.closeRegistration();
            }
          )).catch(function(err){
            //display an error message on the registration modal that an error has occurred upon sending the data
            self.warning = 'Your input could not be handled at this time. Try again.';
            self.showWarning = true;
            console.log(err);
          });
        }
        else{
          //display an error message on the registration modal that input fields are still incorrect
          this.warning = "One or more input fields are invalid"
          this.showWarning = true;      
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../../assets/sass/settings.scss";

  .registration{
    padding: 35px 10px 10px 10px;
  }
  .warning{
    color: red;
    font-size: 12px;
  }
  #logos{
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .input{
    margin: 5px 0px 5px 0px;
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
  .form {
    &__title {
      display: inline;
      font-size: 1.5em;
      padding-bottom: 1rem;
    }
  }

</style>
