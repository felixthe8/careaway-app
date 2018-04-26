<template>
  
  <div class="column is-half is-offset-one-quarter centered">
    <div v-if="sendSuccessful" class="success-text">
      Thanks for sending your feedback to the Careaway team!
    </div>
    Do you have any questions, comments, or concerns? Have any <span class="bolded">cool</span> ideas to improve Careaway?
    You can write down those thoughts in the text box below, send it, and the Careaway team will take your message into consideration when making updates to Careaway.
    <br/><br/>
    <textarea v-model="feedbackText" class="textarea" placeholder="Enter text"></textarea>
    <div class="error-text">{{errorMessage}}</div>
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
    // When the "Send" button is pressed, make an API call to send the message to the backend
    sendFeedbackCall() {
      if (this.feedbackText.length === 0) {
        this.errorMessage = 'Please enter some text in the textbox before sending.';
        return;
      }
      // Create json object to send back
      var feedbackObj = {feedbackMessage: this.feedbackText};
      // POST call
      axios.post(this.$store.getters.feedbackURL, feedbackObj)
        .then(response => {
          if(response.data.success) {
            // Clear error message and feedback text in textbox
            this.errorMessage = '';
            this.sendSuccessful = true;
            this.feedbackText = '';
          } else {
            // Set error message to what the response was
            this.errorMessage = response.data.error;
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>

.centered {
  text-align:center;
}

.bolded {
  font-weight:bold;
}

.success-text {
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 24px;
}

.error-text {
  color: #f00;
}

</style>
