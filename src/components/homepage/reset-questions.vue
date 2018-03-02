<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="modal-content">
        <div class = "box">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <img src = "../../assets/images/careaway-full1.png">
                  <h2 class="form__title"> Recall Security Questions?</h2>
                    <p class = "warning" v-show="showWarning">{{inputWarning}}</p>
                    <p class="control">
                          <p>{{question1}}<p>
                          Answer: <input class="input" type="text"  @keyup="validAnswer1 = checkEmptyInput(answer1)" v-model="answer1"><br>
                          <p>{{question2}}<p>
                          Answer: <input class="input" type="text"  @keyup="validAnswer2 = checkEmptyInput(answer2)" v-model="answer2"><br>
                          <p>{{question3}}<p>
                          Answer: <input class="input" type="text"  @keyup="validAnswer3 = checkEmptyInput(answer3)" v-model="answer3"><br>
                    </p> <br>
                    <p class="control">
                      <button class="button is-primary is-medium is-fullwidth is-rounded" @click = "validateInputOnSubmit()">
                        Submit <i class="fas fa-long-arrow-alt-right"></i>
                      </button>
                    </p>
              </div>
            </article>
          </div>
        </div>
      </div>

      <button class="modal-close is-large" aria-label="close" @click="closeQuestionsss"></button>
  </div> 
</template>
<script>
 import axios from 'axios'
  export default {
    name: 'resetQuestion',
    data() {
      return { 
        // user inputs on the login form
        answer1: '',
        answer2: '',
        answer3: '',
        // data values to notify the user of an invalid input
        question1: '',
        question2: '',
        question3: '',
        validAnswer1: '',
        validAnswer2: '',
        validAnswer3: '',
        showWarning: false,
        inputWarning: '',
        Questions : new Map(),
      
      }
    },
    created() {
      //initates maps for questions
      this.intiateQuestions();
      //fetches data for Questions for username
      this.fetchData();
    },
    methods: {
      intiateQuestions(){
          this.Questions.set(1, "Who was the company you first worked for?");
          this.Questions.set(2, "Where did you go to highschool or college?");
          this.Questions.set(3, "What was the name of the teacher who gave you your first failing grade?");
          this.Questions.set(4, "What is your favorite song?");
          this.Questions.set(5, "What is your mother's maiden name?");
          this.Questions.set(6, "What is your favorite sports team?");
          this.Questions.set(7, "What was the name of your first crush?");
          this.Questions.set(8, "What is the first name of the person you first kissed?");
          this.Questions.set(9, "In what city or town does your nearest sibling live?")
      },
      // method to check if answers aren't empty
      checkEmptyInput(data){
        if(data.length == 0 || data == '') {
          return 'is-danger'
        } 
      },

      // this method will run if the user clicks "Submit"
      validateInputOnSubmit() {
        //check each answer if it is valid
        this.validAnswer1 = this.checkEmptyInput(this.answer1);
        this.validAnswer2 = this.checkEmptyInput(this.answer2);
        this.validAnswer3 = this.checkEmptyInput(this.answer3);


        // prompt the user if the answers are empty
        if(this.validAnswer1 == 'is-danger' || this.validAnswer2 == 'is-danger' || this.validAnswer3 == 'is-danger') {
          this.inputWarning = "You must provide valid answer(s) to reset password";
          this.showWarning = true;
        } else {
          this.showWarning = false;
          this.inputWarning = '';
          var questionCheck = 
          {
            username: this.getUserName(),
            securityA1: this.answer1,
            securityA2: this.answer2,
            securityA3: this.answer3
          }
          var self = this;
            //needs to post questions to validate
          axios.post('http://localhost:4100/account/api/validate-answers', questionCheck)
          // runs after the request has been answered
          .then(function(response) {
          // if the response exists, then do something.   IMPORTANT: This is just a console.log() because routes has not been defined
              if(response.data.success) {
                //closes questions, opens password vue
                self.$store.dispatch('alternatePassword');
                self.$store.dispatch('alternateQuestions');
              } else {
                 // if the user name is not found, warn user.
                  self.inputWarning = 'The Answers are invalid.';
                  self.showWarning = true;
              }
            })
            .catch(function(err) {
              console.log(err);
              // prompt the user if there was an error in handling their login request 
              self.inputWarning = 'Your input could not be handled at this time. Try again.';
              self.showWarning = true;
            });
            
        }
      },

      // method that runs when the user clicks 'close'
      closeQuestionsss() {
        this.$store.dispatch('alternateQuestions');
      },
      getUserName(){
        return this.$store.state.username;
      },
      // method that gets questions from server
      fetchData() {
        
        var self = this;
        
          //need to change url ot valid server url
           axios.get('http://localhost:4100/account/api/security-questions?username='+this.getUserName()).then(response => {
                this.question1 = this.Questions.get(parseInt(response.data.result[0]));
                this.question2 = this.Questions.get(parseInt(response.data.result[1]));
                this.question3 = this.Questions.get(parseInt(response.data.result[2]));
           })
          .catch(function(err) {
            console.log(err);
            //catches network errors
              // prompt the user if there was an error in handling their login request 
            self.inputWarning = 'Your input could not be handled at this time. Try again.';
            self.showWarning = true;
          });
       }
    }

  }
</script>

<style lang = "scss">
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

  .warning {
    color: #FF3860;
  }
  
</style>

