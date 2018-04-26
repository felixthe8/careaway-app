<template>
  <div>
    <h1 class = "title">Creating the Meter Widget</h1>
    <i>{{showMedicalOnly}}</i>

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
        date. If you want to close the popup, click the <i>X</i> in the top right corner. 
      </p>
      <figure class = "gif">
        <img :src = "dragDemo" alt = "Drag 'n Drop Meter'"/>
      </figure>
      <p>
        Next, you need to input a question and a scale. For this example, we will use <i> {{question}}</i>
        as the widget question. We will set the scale from <i>{{scale[0]}} - {{scale[1]}} </i>. You simply type 
        in the question and the scale. The date should be already filled in with the date that you 
        dropped the meter widget on. After the fields have been input, click <i>{{done}}</i> and that's 
        it! 
      </p>
      <figure class = "gif">
       <img :src = "createDemo" alt = "Create Meter'"/>
      </figure>
      <p>
        Click the button below to try out the Meter Widget.
        <br>
        <a class="button is-link is-rounded try" @click ="displayWidget">{{tryButton}}</a>
      </p>
    </div>
    <meterWidget :class="{ 'is-active': showDemo }" @close = "displayWidget"/>
  </div>  
</template>

<script>
import meterWidget from '../../shared/meter/meter-create.vue'
export default {
  name: 'meterWidgetCreationTutorial',
  components: {meterWidget},
  data(){
      return {
        scale: [1 , 10],
        tryButton: 'Try Widget',
        question: 'How much pain are you in?',
        done: 'Create Event',
        showDemo: false,
      }
  },
  methods: {
    displayWidget() {
       // Toggle between showing and hiding the widget
      this.showDemo = this.$toggleTutorialWidget(this.showDemo)
    }
  },
  computed: {
    // Return a statement showing that the feature is only available to patients.
    showMedicalOnly(){
      return this.$store.getters.mpTutorialOnly
    },

    // Returns the image files for meter widget creation
    widgetBox() {
      return this.$store.getters.meterCreationTutorialWidget
    },
    dragDemo() {
      return this.$store.getters.meterCreationTutorialDragDemo
    },
    createDemo() {
      return this.$store.getters.meterCreationTutorialCreateDemo
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

