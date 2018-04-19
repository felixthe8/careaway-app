<template>
  <div>
      <h1 class = "title">Setting Patient Diagnosis</h1>
      <i>{{showMedicalOnly}}</i>

      <div class="instructions">
        <p>
          After selecting a patient, locate the following widget on the Patient Treatment Creation page.
          It will be located on the left hand side of the page.
        </p>
        <figure>
          <img :src = "modal" alt = "Set Diagnosis Widget"/>
        </figure>
        <p>
          This is the widget that will be used to set each individual patient diagnosis. 
          The following example will guide you through how to set the diagnosis for a patient
          with <i>{{sampleDiagnosis}}</i>.
        </p>

        <br>
        
        <p>
          Begin by typing the letters of the word <i>{{sampleDiagnosis}}</i>. As you begin typing you will see an 
          autocomplete dropdown list with results filtered based on user input.
        </p>
        <figure>
          <img :src = "modalAutocomplete" alt = "Set Diagnosis Widget Autocomplete Dropdown"/>
        </figure>
        <p>
          At this point, you can simply select <i>{{sampleDiagnosis}}</i> from the autocomplete dropdown
          list, by clicking on it. After clicking, <i>{{sampleDiagnosis}}</i> will display in the 
          input box.
        </p>
        <figure>
          <img :src = "autocompleteDemo" alt = "Set Diagnosis Widget Selection" />
        </figure>
        <p>
          Save the patient diagnosis by clicking the green arrow. If the diagnosis submitted is valid,
          the input box will briefly glow green, and the input will be cleared. This means that the 
          diagnosis was saved successfully.
        </p>
        <figure>
          <img :src = "success" alt = "Set Diagnosis Success" />
        </figure>
        <p>
          Otherwise, if the input box glows red, then that means that the diagnosis submitted was 
          invalid. In this example below, we want to submit <i>{{sampleDiagnosis}}</i>, but it is 
          spelled incorrectly, so the box will glow red.
        </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'setDiagnosisTutorial',
  data() {
      return {
        sampleDiagnosis: 'Asthma',
      }
  },
  computed: {
    showMedicalOnly(){
      return this.$store.getters.mpTutorialOnly
    },
    modal() {
      return this.$store.getters.setDiagnosisTutorialModal
    },
    modalAutocomplete() {
      return this.$store.getters.setDiagnosisTutorialAutocomplete
    },
    autocompleteDemo() {
      return this.$store.getters.setDiagnosisTutorialAutocompleteDemo
    },
    success() {
      return this.$store.getters.setDiagnosisTutorialSuccess
    }
  }
}
</script>

<style lang="scss" scoped>
.instructions{
    margin-top: 2%;
}
.instructions p{
    margin-top: 2%;
    margin-bottom: 2%;
}
figure {
    width: 25%
}
</style>

