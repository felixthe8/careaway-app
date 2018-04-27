<template>
  <div id="sheet" class="modal is-active">
    <div id="sheet-background" class="modal-background"></div>
      <article class="card round-corners menu-wrapper">

        <div class="card-content menu"  v-if="this.$store.state.ssoRegistration">
          <sso-registration></sso-registration>
        </div>

        <div class="card-content menu" v-if="!this.$store.state.ssoRegistration">
          <ul id="sheet-switcher" class="form-switcher">
            <li @click="switchToPatientForm" class="menu__switcher">
              <div class="menu__switcher--button patient" :class="patientForm">Patient</div>
            </li>
            <li @click="switchToMedicalForm" class="menu__switcher">
              <div class="menu__switcher--button" :class="medicalProfessionalForm">Medical Professional</div>
            </li>
          </ul>
          <registration  :patient-form="showPatientForm"></registration>
        </div>

      </article>

    <button class="modal-close" @click="closeRegistration"></button>
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

  .menu-wrapper {
    max-width: 90%;
  }

  .menu {
    padding: .5rem 1rem;

    @media #{$tablet} {
      padding: 0rem 1rem;
    }

    &__switcher {
      list-style: none;
      display: inline-block;
      width: 50%;
      float: left;

      @media #{$tablet} {
        margin: 1rem 0;
      }

      &--button {
        width: 100%;
        display: block;
        color: $purple-dark;
        background-color: $green-light;
        text-align: center;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        padding: 10px;
        cursor: pointer;

        &.active {
          color: $purple-dark;
          background-color: #fff;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
      }
    }
  }

  .round-corners {
    border-radius: 10px;
  }

</style>
