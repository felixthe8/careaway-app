<template>
  <div>
     <p class = "breachWarning" v-show="showWarning">{{inputWarning}}</p>
    <header-block></header-block>
    <nav class="navbar">
      <div class="button signin" @click ="displayLogin">Sign In</div>
      <div class="button register" @click="displayRegistration">Register</div>
    </nav>
    <registration-menu v-if="showRegistration" ></registration-menu>
    <login v-if="showLogin"> </login>
    <reset-username v-if = "showReset"></reset-username>
    <reset-questions v-if = "showQuestions"></reset-questions>
    <reset-password v-if = "showPassword"></reset-password>
    <admin-homepage v-if = "showAdmin"></admin-homepage>
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

      }
    },
    created() {
      //checks for Breach
      this.checkBreach();

    },
    methods:{
      //Calls the store to display the registration
      displayRegistration(){
        this.$store.commit('alternateRegistration');
      },
      //Calls the store to display the login
      displayLogin() {
        this.$store.dispatch('alternateLogin');
      },
      //checks for a breach
      checkBreach(){
        var self = this;
        //get method to see if brach
         axios.get('http://localhost:8080/isBreached')
         .then(response => {
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
        return this.$store.state.showRegistration;
      },
      showLogin() {
        return this.$store.getters.showLogin;
      },
      showReset(){
        return this.$store.state.showReset;
      },
      showQuestions(){
        return this.$store.state.showQuestions;
      },
      showPassword(){
        return this.$store.state.showPassword;
      },
      showAdmin(){
        return this.$store.state.showAdmin;
      },
      mounted(){
        
      }
    }
  }

</script>

<style lang="scss">

  @import "../../assets/sass/settings.scss";
  .navbar {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
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

</style>

<style>
  @import "https://use.fontawesome.com/releases/v5.0.6/css/all.css"; 
</style>