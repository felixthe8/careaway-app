<template>
  <div id='securityQuestions' :class='getSelectedSet'>
    <select v-model='selectedQuestion' @keydown='getValueSelected' @blur='getValueSelected'>
      <option hidden value=''> Please select a security question</option>           
      <option v-for='question in selectedSet' v-bind:key ='question.key' v-bind:value='question.value'>
        {{question.text}}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'security-questions',
    // Get the value of which subset to display and which question variable the vue is saving to 
    props:['questions'],
    data () {
      return {
        // TODO: PUT THIS IN DATABASE
        // Holds the different questions for each value
        securityQuestionSet1: [ { text:'Who was the company you first worked for?',value:1},
                                { text:'Where did you go to highschool or college?', value:2},
                                { text:'What was the name of the teacher who gave you your first failing grade?', value:3}],
        securityQuestionSet2: [ { text:'What is your favorite song?', value:4},
                                { text:'What is your mother\'s maiden name?', value:5},
                                { text:'What is your favorite sports team?', value:6}],
        securityQuestionSet3: [ { text:'What was the name of your first crush?', value:7},
                                { text:'What is the first name of the person you first kissed?', value:8},
                                { text:'In what city or town does your nearest sibling live?', value:9}],
        selectedQuestion: '',
        selectedSet: []
      }
    },
    methods:{
      // Gets the value of the choosen question and saves it to the store
      getValueSelected(){
        // Calls the appropriate method to save the question value
        var method = ('changeQuestionValue' + this.questions);
        this.$store.commit(method,this.selectedQuestion);
      }
    },
    // Computes which question subset to use
    computed:{
        getSelectedSet: function (){
          switch(this.questions){
            case 1:
              this.selectedSet = this.securityQuestionSet1;
              break;
            case 2:
              this.selectedSet = this.securityQuestionSet2;
              break;
            case 3:
              this.selectedSet = this.securityQuestionSet3;
              break;
          }
          return this.selectedSet;
        }
    }
  }
</script>

<style lang='scss'>
  @import '../../assets/sass/settings.scss';
  select{
    width: 100%;
    padding: 5px 0 5px 0;
  }
  #securityQuestions{
    padding-bottom: 5px;
  }
</style>

