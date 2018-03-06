<template>
  <div>
    <navbar class = "nav-bar"/>
    <timeout v-if ="showWarning" @close = "showWarning = false"/>
    <router-view></router-view>
  </div>


</template>


<script>
import navbar from './app-header';
import timeout from './timeout';
import Chart from 'chart.js';
export default {
    name: 'medicHome',
    components: {navbar, timeout},
    data() {
      return {
        showWarning: false
      }
    },
    // a 15 minute session inactivity timer will run to keep track of
    // if the user is interacting with the page or not. Timer will
    // begin after the DOM elements are created
    mounted () { 
    var self = this;
    var time;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onclick = resetTimer;
        
    function resetTimer() {
       clearTimeout(time);
       // after 15 minutes of inacitivity, showWarning will be set to true
       // and the warning will display
       time = setTimeout(self.DisplaySessionWarning, 15*60*1000);
     }

    // call the resetTimer function to kick-start the event timer. 
    resetTimer();
  
    },

    methods: {
      DisplaySessionWarning() {
        this.showWarning = true;
      }
    },
    // beforeDestroy will run when the user leaves the component. 
    // (ie. when they logout, when they leave the view without logging out)
    beforeDestroy() {
      this.$store.dispatch('deauthenticatedUsername', '');
      this.$store.dispatch('signOutMP');
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

</style>


  
