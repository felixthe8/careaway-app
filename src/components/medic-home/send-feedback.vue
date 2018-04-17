<template>
  
  <div class="column is-half is-offset-one-quarter" style="text-align:center">
    Do you have any questions, comments, or concerns? Have any <span style="font-weight:bold">cool</span> ideas to improve Careaway?
    You can write down those thoughts in the text box below, send it, and the Careaway team will take your message into consideration when making updates to Careaway.
    <br/><br/>
    <textarea class="textarea" placeholder="Enter text"></textarea>
    <br/>
    <a class="button is-primary">Send</a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'sendFeedback',
  methods: {
    
  },
  created(){
      //this.$store.dispatch("singlePatientWellness",null);
      //this.$store.dispatch("singlePatientCompletion",null);
  }
}
</script>
