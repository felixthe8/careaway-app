<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class = "modal-card-head">
        <img src="../../assets/images/careaway-full1.png">
      </header>
      <section class="modal-card-body">
         <p id = "warning-text"> <i class="fas fa-exclamation-triangle fa-2x"></i>
            You have been inactive for 15 minutes. Click 'Resume' below to remain logged in
        </p>

        <br>
        <div id = "countdown-text">
          The session will terminate in <p id="countdown">{{count}}</p>unless you click 'Resume'
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-link" @click="resumeSession">Resume</button>
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
            // Flag to determine if the timeout modal is being shown. Value is true by default
            showTimeout: true
          }
      },

      methods: {
        resumeSession(){
          this.count = '';
          // When the user clicks Resume, change the flag to false
          this.showTimeout = false;
          this.$emit('close');
        },
        // Function to perform countdown. Takes in a number of minutes (integer) as a parameter
        Timer: function(minutes) {
          var self = this;
          var seconds = 60;
          // Function to decrement the seconds on the countdown
          function tick() {
            // Subtract 1 from desired time in minutes
            var current_minutes = minutes - 1;
            // Subtract 1 from the seconds value
            seconds--;
            self.count = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds.toString();
            if(seconds > 0) {
              setTimeout(tick, 1000);
            } else {
              // If seconds is 00, then decrement the minutes value and continue the countdown
              if(minutes > 1) {
                setTimeout(function() {self.Timer(current_minutes)},1000);
              }
            }
            // If the show timeout flag is false, then clear out the timer
            if(self.showTimeout === false) {
              self.count = '';
              return;
            }
            // When the timer has run through its cycle, log the user out
            if(self.count == "0:00") {
              self.logOut();
            }
          }
            // Call to decrement countdown timer
            tick();
          },

        logOut() {
          // Clear the event listeners when the user timer ends
          document.onmousemove = null;
          document.onkeypress = null;
          document.onclick = null;
          // Call to user plugin to logout user
          this.$logout();
          this.$router.push('/');
        }
      },
      mounted() {
        this.Timer(2);
      }
  }
</script>

<style lang= "scss" scoped>

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
    background-color:#BAA8EA;
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
