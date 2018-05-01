<template>
  <div>
     <p class = "breachWarning" v-show="showWarning">{{inputWarning}}</p>
    <header-block></header-block>

    <nav class="navbar" :class="{'navbar__full' : scrolled}" v-on:scroll="handleScroll">
      <img class="navbar__full--logo" :class="{'show-logo' : scrolled}" src="../../assets/images/careaway-logo.png">
      <div class="navbar__buttons">
        <button class="button navbar__button" @click="displayRegistration">Register</button>
        <button class="button navbar__button" @click ="displayLogin">Sign In</button>
        <button class="button navbar__demo" @click="routeToTutorial">Demo</button>
      </div>
    </nav>

    <registration-menu v-if="showRegistration" ></registration-menu>
    <login v-if="showLogin"> </login>
    <reset-username v-if="showReset"></reset-username>
    <reset-questions v-if="showQuestions"></reset-questions>
    <reset-password v-if="showPassword"></reset-password>

    <info-block></info-block>
    <service-block></service-block>
    <device-block></device-block>
    <footer>developed by the Careaway Team at LBSU</footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import headerBlock from './header-block.vue';
  import infoBlock from './info-block.vue';
  import serviceBlock from './service-block.vue';
  import deviceBlock from './device-block.vue';
  import registrationMenu from './registration-menu.vue';
  import login from './login.vue';
  import resetUsername from './reset-username.vue'
  import resetQuestions from './reset-questions.vue';
  import resetPassword from './reset-password.vue';
  import adminHomepage from '../admin-home/admin-homepage.vue';
  export default {
    name: 'app',
    components: {
      "headerBlock" : headerBlock,
      "infoBlock" : infoBlock,
      "serviceBlock" : serviceBlock,
      "deviceBlock" : deviceBlock,
      "registrationMenu" : registrationMenu,
      "login" : login,
      "resetUsername":resetUsername,
      "resetPassword":resetPassword,
      "resetQuestions":resetQuestions,
      "adminHomepage":adminHomepage,
    },
    data () {
      return {
        msg: 'Careaway Home',
        inputWarning:'',
        showWarning: false,
        scrolled: false
      }
    },
    created() {
      //checks for Breach
      this.checkBreach();

      // scroll event listener
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
      // Changes nav bar on scroll
      handleScroll: function() {
        this.scrolled = window.scrollY > 0;
      },
      // Calls the store to display the registration
      displayRegistration(){
        this.$store.commit('alternateRegistration');
      },
      // Calls the store to display the login
      displayLogin() {
        this.$store.dispatch('alternateLogin');
      },
      routeToTutorial() {
        this.$router.push('/Tutorial');
      },
      //checks for a breach
      checkBreach(){
        var self = this;
        //get method to see if brach
         axios.get(this.$store.getters.checkBreachURL)
         .then(response => {
                axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                if(response.data.down){
                  //show breach warning
                  self.showWarning = true;
                  self.inputWarning = 'Breach Has Been Detected, Server Shutdown';
                }
           })
          .catch(function(err) {
            console.log(err);
            //catches network errors

              self.showWarning = true;
              self.inputWarning = `can't contact Breach server`;
          });
      }
    },
    computed:{
      showRegistration(){
        return this.$store.getters.showRegistration;
      },
      showLogin() {
        return this.$store.getters.showLogin;
      },
      showReset(){
        return this.$store.getters.showReset;
      },
      showQuestions(){
        return this.$store.getters.showQuestions;
      },
      showPassword(){
        return this.$store.getters.showPassword;
      }
    }

  }

</script>

<style lang="scss">

  @import "../../assets/sass/settings.scss";
  .navbar {
    position: fixed;
    top: 0;
    right: 0;
    background: none;
    width:100%;
    transition: all ease-in-out .5s;
    z-index: 10;

    &__full {
      background: #fff;
      box-shadow: 5px 5px 5px rgba(0,0,0,0.1);

      &--logo {
          width: 65px;
          position: absolute;
          left: 0;
          top: 20%;
          padding: 0 1rem;
          opacity: 0;
          transition: all ease-in-out .5s;
      }
    }

    &__buttons {
      position: absolute;
      right: 0;
    }

    &__button {
      padding: 0;
      margin: 5px .5rem;

      &:hover {
        color: $purple-light;
      }
    }

    &__demo {
      padding: 0 .75rem;
      margin: 5px .5rem;
      background-color: $purple-dark !important;
      color: $white !important;

      &:hover {
        color: $purple-light;
      }
    }
  }

  footer {
      background: $purple-dark;
      text-align: center;
      color: $white;
      padding: 2rem;
  }
  .breachWarning{
    color:#FF3860;
    font-size: 3.0em;
  }

  .show-logo {
      opacity: 1;
  }

</style>
