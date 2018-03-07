<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <div class = "box">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <img src = "../../assets/images/careaway-full1.png">
                 <p class = "warning" v-show="showWarning">{{inputWarning}}</p>
                 <h2 id= "systemAdmingWarning"> Breach Detected: Please Push Button</h2>
                 <button class="button is-primary is-medium is-fullwidth is-rounded" @click = "breachNotification()">Breach Notification</button>
              </div>
            </article>
          </div>
        </div>
      </div>
       <button class="modal-close is-large" aria-label="close" @click="closeAdmin"></button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'breach',
     data() {
      return {
        //warning 
        showWarning: false,
        inputWarning: '',

      }
    },
    
    methods:{
        //closes admin page
    closeAdmin() {
        this.$store.dispatch('signOut', '');
        this.$store.dispatch('alternateAdmin');
      },
      //shuts down and notifies user
    breachNotification(){
        axios.post('http://localhost:8080/breach', {breach:'breach'})
          // runs after the request has been answered
          .then(function(response) {
            })
            .catch(function(err) {
              console.log(err);
              // prompt the user if there was an error in handling their login request 
              self.inputWarning = 'Breach Notification Failed';
              self.showWarning = true;
            });
    }
    }
  
}
</script>

<style lang="scss">
  @import "../../assets/sass/settings.scss";

  .modal-content {
    overflow: hidden;
    max-height: none;
  }

  .form {
    &__title {
      font-size: 1.5em;
      padding-bottom: 1rem;
    }
  } 

  img {
    width: 40%;
  }
    
  button i {
    margin-left: 2%;
  }

 #reset {
    color: $purple-dark;
  }
  #systemAdmingWarning{
      color:#FF3860;
      font-size: 2.0em;
  }
  .warning {
    color: #FF3860;
    
  }
</style>
