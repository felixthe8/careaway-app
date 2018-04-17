<template>
  
  <div class="column is-half is-offset-one-quarter" style="text-align:center">
    Do you have any questions, comments, or concerns? Have any <span style="font-weight:bold">cool</span> ideas to improve Careaway?
    You can write down those thoughts in the text box below, send it, and the Careaway team will take your message into consideration when making updates to Careaway.
    <br/><br/>
    <textarea v-model="feedbackText" class="textarea" placeholder="Enter text"></textarea>
    <br/>
    <a class="button is-primary" @click="sendFeedbackCall">Send</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'sendFeedback',
  data() {
    return {
      feedbackText: '',
      sendSuccessful: false,
      errorMessage: ''
    }
  },
  methods: {
    sendFeedbackCall() {
      var feedbackObj = {feedback: this.feedbackText};
      axios.post(/*this.$store.getters.something*/'placeholder', feedbackObj)
        .then(response => {
          if(response.data.success) {
            this.errorMessage = '';
            this.sendSuccessful = true;
          } else {
            this.errorMessage = response.data.error;
          }
        });
    }
  },
  created(){
      //this.$store.dispatch("singlePatientWellness",null);
      //this.$store.dispatch("singlePatientCompletion",null);
  }
}
</script>
