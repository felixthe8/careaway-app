<template>
  <div>
    <p class ="subtitle is-5" id = "patientText">Select a Patient </p>
    <select class = "selectPatient" v-model="selected" @change="choosePatient" name="Patients">
      <option value ="0" selected disabled >Choose Patient</option>
      <option  v-for="patient in patientList" :value="patient.userName">
        Name - {{ patient.fullName }}   ({{patient.diagnosis}})
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'patient-selector',
    data() {
      return {
        // Create an array to store the list of available patients for the medical professional
        patientList: [],
        // Create a variable to store the username of the selected patient
        selected: '',
        index: 0
      }
    },
    methods: {
      getPatientNames() {
        var self = this;
        // Call to return the patient data corresponding to that medical professional
        axios.get(this.$store.getters.getPatientUserNamesURL, {
          params: {
            medicalcode:this.$store.getters.medicalCode,
          }
        })
        // Runs after the request has been answered
        .then(function(response) {
          self.patientList = response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      },
      choosePatient() {
        // After the MP selects a patient, save their username
        this.$store.dispatch('saveUsername',this.selected);

        // find current patient
        let patient = this.patientList.filter(patient => patient.userName === this.selected);
        this.$store.dispatch("setCurrentPatient", patient[0]);

        // Emit a signal. This signal will be handled on receipt by the parent component
        this.$emit('selected');
      }
    },
    mounted() {
      this.getPatientNames();
    }
}
</script>

<style lang="scss" scoped>
  #patientText{
    text-align: right;
  }
  .selectPatient{
    width: 150px;
    padding: 5px 5px 5px 5px;
    font-size: 16px;
    height: 34px;
    float: right;
  }

</style>
