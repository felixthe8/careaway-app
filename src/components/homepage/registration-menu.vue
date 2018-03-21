<template>
  <div id='sheet' class='modal is-active'>
    <div id='sheet-background' class='modal-background'></div>
      <div id='sheet-content' class='modal-content'>
        <div id='sheet-box' class='box'>
          <div class='columns is-centered'>
          <article class='card is-rounded'>
              <div class='card-content'  v-if='this.$store.state.ssoRegistration'>
                <sso-registration></sso-registration>
              </div>
              <div class='card-content' v-if='!this.$store.state.ssoRegistration'>
                <ul id='sheet-switcher' class='form-switcher'>  
                  <li @click='switchToPatientForm'><div class = 'patient' :class='patientForm'>Register as a Patient</div></li>
                  <li @click='switchToMedicalForm'><div :class = 'medicalProfessionalForm'>Register as a Medical Professional</div></li>
                </ul> 
                <registration  :patient-form='showPatientForm' ></registration>        
              </div>
            </article>
            </div>
        </div>
      </div>
      <button class='modal-close' @click='closeRegistration'></button>
  </div>
</template>


<script>
  import registration from './registration.vue';
  import ssoRegistration from './sso_registration.vue';
  export default {
    name: 'registration-menu',
    components: {
      'registration' : registration,
      'ssoRegistration' : ssoRegistration
    },
    data(){
        return{
          // Holds the bulma class to show if medical professional form is active
          medicalProfessionalForm: '',
          // Holds the bulma class to show if patient form is active
          patientForm: 'active',
          // Value to send into registration
          // True to denote patient form
          // False to denote medical professional form
          showPatientForm: true,
        }
    },
    methods: {
      switchToPatientForm(){
        // Tells the registration form it's a patient form
        this.showPatientForm = true; 
        // Set patient form to active
        this.medicalProfessionalForm= '';
        this.patientForm= 'active';
        // A message to the registration form to clear all inputs
        this.$store.commit('resetRegForm');
      },
      switchToMedicalForm(){
        // Tells the registration form it's a medical form
        this.showPatientForm = false;
        this.medicalProfessionalForm= 'active';
        this.patientForm= '';
        // A message to the registration form to clear all inputs
        this.$store.commit('resetRegForm');
      },
      closeRegistration(){
        if(this.$store.state.ssoRegistration){
          this.$store.dispatch('alternateSSORegistration');
        }
        // Calls the store to close the registration
        this.$store.commit('alternateRegistration');
      }
    }
  }
</script>


<style lang='scss'>
  @import '../../assets/sass/settings.scss';
  
  .patient{
    padding-bottom: 30px;
    @media #{$smallTablet} {
      padding-bottom: 0px;
    }
  }
  ul.form-switcher {
    margin: 0;
    padding: 0;
  }
  ul.form-switcher li {
    list-style: none;
    display: inline-block;
    width: 50%;
    float: left;
    margin: 0;
  }
  ul.form-switcher li div {
    width: 100%;
    display: block;
    line-height: 30px;
    color: #666666;
    background-color: #dddddd;
    text-align: center;
    
  }
  ul.form-switcher li div.active {
    color: #000000;
    background-color: #f6f6f6;
  }
  #sheet{
    &-content{
      overflow: auto;
      max-height: 500px;
      border-radius: 10px;

      @media #{$smallTablet} {
        overflow: hidden;
        max-height: none;  
      }
    }
    &-box{
      padding: 0%;
    }
  }
</style>
