<template>
  <div>
    <h1 class = "title">Creating the Meter Widget</h1>
    {{showMedicalOnly}}

    <div class="instructions">
    <p>
        The meter widget is used to measure patient wellness. The medical professional user will 
        create a meter widget to ask the user about any pain they are feeling on a given day.
    </p>   
     <p>
        After selecting a patient, locate the widget labeled <i>Meter</i> on the Patient Treatment 
        Creation page. It will be located on the left hand side of the page inside a green box.
     </p>
     <figure>
      <img :src = "widgetBox" alt = "Create Meter Widget"/>
     </figure>
     <p>
         To assign a meter widget on a specific day, drag and hold the meter widget and drop it on a 
         specific day. A popup should display with fields to input the meter widget question, scale, and
         date. If you want to close the popup, click the X in the top right corner. 
     </p>
     <figure class = "gif">
       <img :src = "dragDemo" alt = "Drag 'n Drop Meter'"/>
     </figure>
      <p>
          Next, you need to input a question and a scale. For this example, we will use <i> {{question}}</i>
          as the widget question. We will set the scale from {{scale[0]}} - {{scale[1]}}. You simply type 
          in the question and the scale. The date should be already filled in with the date that you 
          dropped the meter widget on. After the fields have been input, click <i>{{done}}</i> and that's 
          it! 
      </p>
      <figure class = "gif">
       <img :src = "createDemo" alt = "Create Meter'"/>
      </figure>
   </div>
  </div>  
</template>

<script>
import widgetBox from '../../assets/images/tutorial/widgets/widgets.png'
import dragDemo from '../../assets/images/tutorial/widgets/meter/meter-drag-demo.gif'
import createDemo from '../../assets/images/tutorial/widgets/meter/meter-input-demo.gif'
export default {
  name: 'meterWidgetCreationTutorial',
  data(){
      return {
        widgetBox: widgetBox,
        dragDemo: dragDemo,
        createDemo: createDemo,
        scale: [1 , 10],
        question: 'How much pain are you in?',
        done: 'Create Event'
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

