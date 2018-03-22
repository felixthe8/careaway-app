<template>
  
  <div class = "aggregate-graphs">
    <div id = "patientLabel">
    <p class ="subtitle" id = "patientText">Select Patient </p>
    <select class = "selectPatient" v-model="selected" v-on:change="choosePatient" name="Patients"> 
        <option value ="0" selected disabled >Choose Patient</option>
        <option  v-for="patient in patientList" v-bind:value="patient.UserName">
        First Name:{{ patient.FirstName }} , UserName:{{patient.UserName}}
        </option>
    </select>
    </div>
    <breakdownGraph/>
    <br>
    <aggregateWellness/>
    <br>
    <aggregateComplete/>
  </div>
</template>

<script>
import axios from 'axios';
import breakdownGraph from './reports/breakdown-graph';
import aggregateWellness from './reports/aggregate-wellness';
import aggregateComplete from './reports/aggregate-completion';
export default {
  name: 'dataAnalysis',
  name: 'aggregateReport',
  data() {
      return {
        patientList: [],
        // Create an array to store the 5 dates made from moment.js
        selected: 'Patients',

      }
  },
  methods:{

    getPatientNames(){
      var self = this;
      axios.get(this.$store.getters.getPatientUserNamesURL, {
      params: {
        medicalcode:this.$store.getters.medicalCode,
        // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
        }
      })
          // runs after the request has been answered
      .then(function(response) {

            self.patientList = response.data;
      })
      .catch(function(err) {
        console.log(err);
        // prompt the user if there was an error in handling their login request 
        self.inputWarning = 'Breach Notification Failed';
        self.showWarning = true;
      });
      },
      choosePatient(){
        this.$store.dispatch('saveUsername',this.selected);
        this.$router.push('/MedicHome/IndividualReport');


      },
  },
  
  mounted(){
    this.getPatientNames()
  },
  created(){
      this.$store.dispatch("singlePatientWellness",null);
      this.$store.dispatch("singlePatientCompletion",null);
      
    
  },
  
  components: {breakdownGraph, aggregateWellness, aggregateComplete},
}

</script>

<style lang="scss" scoped>
  .aggregate-graphs {
      padding: 2% 3% 2% 3%;
  }
  #patientLabel{
    
    float: right;
  }
  #patientText{
    text-align: center;
  }
  .selectPatient{
    width: 150px;
    padding: 5px 5px 5px 5px;
    font-size: 16px;
    height: 34px;
    float: right;
  }
</style>
