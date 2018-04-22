<template>
  <div>
   <timeout v-if = "showWarning" @close = "showWarning = false" />
   <router-view></router-view>

  </div>
  
</template>


<script>
import debounce from 'debounce';
import timeout from './timeout';
export default {
  name: 'profile',
  components: {timeout},
  data() {
      return {
        showWarning: false
      }
  },
  methods: {
    displaySessionWarning() {
        this.showWarning = true;
    }
  },
  mounted() {
    // 15 minute session timer to determine if the user is active
    var self = this;
    var time;

    document.onmousemove = debounce (resetTimer, 250);
    document.onkeypress = debounce (resetTimer, 250);
    document.onclick = debounce (resetTimer, 250);
    
    function resetTimer() {
      clearTimeout(time);
      // After 15 minutes of inactivity, the session timeout warning will display
      time = setTimeout(self.displaySessionWarning, 15 * 60 * 1000);
    }
    // Call function to kick-start the inactivity timer
    resetTimer();
  },
  beforeDestroy() {
    // Functions to run when the user leaves the component (ie. logs out, navigates away from application)
    document.onmousemove = null;
    document.onkeypress = null;
    document.onclick = null;
    this.$logout();
    // Route back to homepage
    this.$router.push('/');
  }
  
}
</script>

