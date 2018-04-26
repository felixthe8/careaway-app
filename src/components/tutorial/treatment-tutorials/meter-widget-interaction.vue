<template>
  <div>
    <h1 class="title">Interacting with the Meter Widget</h1>
    <i>{{showPatientOnly}}</i>

    <div class="instructions">
      <p>
        On the patient account, the meter widget can be identified by the fields labeled meter on
        the treatment calendar. 
      </p>
      <figure>
        <img :src = "meterWidget" alt = "Meter Widget Patient View"/>
      </figure>
      <p>
        To interact with the meter widget, simply click on the meter widget for the current day on
        the treatment calendar. Then, enter a value into the input field that is within the 
        appropriate range. And with that, you're done! 
      </p>
      <p>
        For this example, the valid range of input is from <i>{{widget.scale[0]}}</i> - 
        <i>{{widget.scale[1]}}</i>. We input <i>{{widget.patient_input}}</i> by typing into the input box
        and afterwards, clicking <i>{{done}}</i>.
      </p>
      <figure class = "gif">
        <img :src = "meterWidgetInput" alt = "Meter Widget Patient View"/>
      </figure>

      <p>
        Click the button below to try out the Meter Widget.
        <br>
         <a class="button is-link is-rounded try" @click = "displayWidget">{{tryButton}}</a>
      </p>

    </div>
    <meterDemo :class="{ 'is-active': showDemo }" :widget ="this.$store.getters.currentMeter" @close = "displayWidget"/>
  </div>
  
</template>

<script>
import meterDemo from '../../patient-home/meter.vue';
export default {
  name: 'meterWidgetInteractionTutorial',
  components: {meterDemo},
  data() {
    return {
      widget:{ 
       label: "meter",
       question: "How much pain are you in?",
       patient_input: '3',
       scale: ['1', '10'],
      },
      done: 'Save',
      tryButton: 'Try Widget',
      showDemo: false
    }
  },
  methods: {
    displayWidget() {
       // Toggle between True or False
      this.showDemo = this.$toggleTutorialWidget(this.showDemo)
      // If the widget is too be displayed, store the widget information
      if(this.showDemo) {
        this.$store.dispatch("currentMeter", this.widget);
      }
    },
  },
  computed: {
    // Return a statement showing that the feature is only available to patients.
    showPatientOnly() {
      return this.$store.getters.patientTutorialOnly
    },

    // Return the image files associated with the meter widget interaction
    meterWidget() {
      return this.$store.getters.meterInteractionTutorialWidget
    },
    meterWidgetInput() {
      return this.$store.getters.meterInteractionTutorialInteract
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
