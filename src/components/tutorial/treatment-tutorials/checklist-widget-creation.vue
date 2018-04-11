<template>
  <div>
    <h1 class = "title">Creating the Meter Widget</h1>    
    <i>{{showMedicalOnly}}</i>

    <div class="instructions">
      <p>
        The checklist widget is used to assign patients' tasks. The medical professional user will 
        create a checklist widget to create actionable tasks on a given day.
      </p>
      <p>
        After selecting a patient, locate the widget labeled <i>Checklist</i> on the Patient Treatment 
        Creation page. It will be located on the left hand side of the page inside a green box.
      </p>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'meterWidgetCreationTutorial',
  computed: {
    showMedicalOnly(){
       return this.$store.getters.mpTutorialOnly
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
figure{
  width: 25%
}
.gif{
    width: 55%
}
</style>

