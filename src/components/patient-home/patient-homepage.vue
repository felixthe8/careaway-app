<template>
  <div>
    <navbar class = "nav-bar"/>
    <calendar/>
    <timeout v-if ="showWarning" @close = "showWarning = false"/>
  </div>

</template>

<script>
import navbar from './app-header';
import timeout from '../shared/timeout';
import calendar from './calendar';
export default {
    name: 'patientHome',
    components: {
      navbar, 
      calendar, 
      timeout
      },
    data() {
      return {
        showWarning: false
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
        // Remove the timer ID instance created by setTimeout
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
      }
    },
    // beforeDestroy will run right before the user leaves the component. 
    beforeDestroy() {
      document.onmousemove = null;
      document.onkeypress = null;
      document.onclick = null;
      this.$store.dispatch('deauthenticatedUsername', '');
      this.$store.dispatch('signOut','');
      this.$router.push('/');
    }
  
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

</style>


  
