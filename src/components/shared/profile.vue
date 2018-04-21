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

    document.onmousemove = debounce (resetTimer, 500);
    document.onkeypress = debounce (resetTimer, 500);
    document.onclick = debounce (resetTimer, 500);
    
    function resetTimer() {
      clearTimeout(time);
      // After 15 minutes of inactivity, the session timeout warning will display
      time = setTimeout(self.displaySessionWarning, 15 * 60 * 1000);
    }
    // Call function to kick-start the inactivity timer
    resetTimer();
  }
  
}
</script>

