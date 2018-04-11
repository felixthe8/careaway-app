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
      <figure>
        <img :src = "widgetBox" alt = "Create Checklist Widget"/>
      </figure>
      <p>
        To assign a checklist widget on a specific day, drag and hold the checklist widget and drop it on
        a specific day. A popup should display with fields to input       
      </p>
    </div>
  </div>
  
</template>

<script>
import widgetBox from '../../../assets/images/tutorial/widgets/checklist/checklist-widget.png'
export default {
  name: 'meterWidgetCreationTutorial',
  data() {
    return {
      widgetBox: widgetBox
    }
  },
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

