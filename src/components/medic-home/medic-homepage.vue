<template>
  <div>
    <navbar class = "nav-bar"/>
    <timeout v-if ="showWarning" @close = "showWarning = false"/>
    <p class = "subtitle" id = "code-display">CareAway Medical Code: {{medicalcode}} </p>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './app-header';
import timeout from '../shared/timeout';
import Chart from 'chart.js';
import axios from 'axios';
export default {
    name: 'medicHome',
    components: {navbar, timeout},
    data() {
      return {
        showWarning: false,
        medicalcode: this.$store.getters.medicalCode
      }
    },
    mounted () { 
      // A 15 minute session inactivity timer will run to keep track of if the user is interacting with the page or not.
      var self = this;
      var time;
      document.onmousemove = resetTimer;
      document.onkeypress = resetTimer;
      document.onclick = resetTimer;
          
      function resetTimer() {
        clearTimeout(time);
       // After 15 minutes of inacitivity, the session timeout warning will display
        time = setTimeout(self.displaySessionwarning, 15*60*1000);
      }
      // Call the resetTimer function to kick-start the inactivity timer. 
      resetTimer();
    },
    methods: {
      displaySessionwarning() {
        this.showWarning = true;
      },
      getCode(){
       var self = this;
        // Return the medical code for the MP based on their username
        axios.get('http://localhost:8080/returnCode?username='+this.$store.getters.authenticatedUsername)
          .then(function(response) {
            // Extract out medical code from the response
            self.medicalcode = response.data.medicalcode;
            self.$store.dispatch('medicalCode', self.medicalcode);
          })
          .catch(function(err) {
            console.log(err);
          })
        }

    },
    created() {
      this.getCode();
    },
    // beforeDestroy will run when the user leaves the component. 
    beforeDestroy() {
      document.onmousemove = null;
      document.onkeypress = null;
      document.onclick = null;
      this.$store.dispatch('deauthenticatedUsername', '');
      this.$store.dispatch('signOut', '');
      this.$router.push('/');
    },

  
}
</script>


<style lang="scss">
@import '../../assets/sass/settings.scss';

#app {
    width: 100vw;
    height: 100vh;
  }

.nav-bar {
  width: 100%;
  padding: 1rem;

    &__logo {
      width: 25px;
      height: 25px;
    }

    &__button {
      float: right;
    }
  }

#code-display{
  margin-left: 2%;
  color: $purple;
  font-size: 1.25em;
}

</style>


  
