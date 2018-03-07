<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class = "modal-card-head">
        <img src = "../../assets/images/careaway-full1.png">
      </header>

      <section class = "modal-card-body">
         <p id = "warning-text"> <i class="fas fa-exclamation-triangle fa-2x"></i>
            You have been inactive for 15 minutes. Click 'Resume' below to remain logged in 
        </p>

        <br>
        <div id = "countdown-text"> 
          The session will terminate in <p id = "countdown"> {{count}} </p> unless you click 'Resume'
        </div>
      </section>

      <footer class = "modal-card-foot">
        <button class = "button is-link" @click="resumeSession"> Resume </button>
      </footer>
    </div>
  </div>
</template>


<script>
  export default {
      name: 'timeout',
      data() {
          return {
            count: '',
            // boolean flag to determine if the timeout modal is being shown
            // by default this is true
            showTimeout: true
          }
      },

      methods: {
        resumeSession(){
          this.count = '';
          // when the user clicks Resume, change the flag to false
          this.showTimeout = false;
          this.$emit('close');
        },

        // function to perform countdown.
        // takes in a number of minutes as a parameter
        Timer: function(minutes) {
          var self = this;
          var seconds = 60;
          //function to decrement the seconds on the countdown
          function tick() {
            // subtract 1 from desired time in minutes
            var current_minutes = minutes - 1;

            // subtract 1 from the seconds value
            // timer will display at 59 seconds initially
            seconds--;
            self.count = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            if(seconds > 0) {
              setTimeout(tick, 1000);
            } else {
              // if seconds is 00, then decrement the minutes value and continue the countdown
              if(minutes > 1) {
                setTimeout(function() {self.Timer(current_minutes)},1000);
              }
            }
            // if the show timeout flag is false, then clear out the timer
            if(self.showTimeout === false) {
              self.count = '';
              return;
            }
            // when the timer has run through its cycle, log the user out
            if(self.count == "0:00") {
              self.logOut();
            }
          }
            // run method to decrement countdown timer
            tick();
          },

        logOut() {
          // clear the event listeners when the user selects to logout
          document.onmousemove = null;
          document.onkeypress = null;
          document.onclick = null;
          this.$store.dispatch('deauthenticatedUsername', '');
          this.$store.dispatch('signOut', '');
          this.$router.push('/');
        }
      },

      mounted() {
        this.Timer(2);
      }
  }
</script>


<style lang= "scss">
  @import "../../assets/sass/settings.scss";
   img {
    width: 25%;
  }

  .fa-exclamation-triangle {
    color: red;
  }

  #warning-text {
    text-align: center;
  }

  .modal-card-head {
    background-color: $purple-light;
  }

  #countdown-text {
    text-align: center;
  }

  #countdown {
    font-size: large;
    font-weight: bold;
  }

  .modal-background {
    background-color: black;
  }

</style>