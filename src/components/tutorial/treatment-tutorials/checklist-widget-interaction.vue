<template>
  <div>
    <h1 class="title">Interacting with the Checklist Widget</h1>
    <i>{{showPatientOnly}}</i>

    <div class="instructions">
      <p>
        On the patient account, the meter widget can be identified by the fields labeled meter on
        the treatment calendar. 
      </p>
      <figure>
        <img :src = "checklistWidget" alt = "Checklist Widget Patient View"/>
      </figure>
      <p>
        To interact with the checklist widget, simply click on the checklist widget for the current
        day on the treatment calendar. Then, click on the checkbox for the tasks that have been 
        completed. And with that you're done !  
      </p>
      <p>
        Click the button below to try out the Checklist Widget.
        <br>
         <a class="button is-link is-rounded try" @click = "displayWidget">{{tryButton}}</a>
      </p>
    </div>
    <checklistDemo :class="{ 'is-active': showDemo }" :widget ="this.$store.getters.currentChecklist" @close = "displayWidget"/>

  </div>
  
</template>

<script>
import checklistDemo from '../../patient-home/checklist.vue';
import checklistWidget from '../../../assets/images/tutorial/widgets/checklist/checklist-widget-patient.png'
export default {
  name: 'checklistWidgetInteraction',
  components: {checklistDemo},
  data() {
    return {
      tryButton: 'Try Widget',
      showDemo: false,
      widget: {
        label: 'checklist',
        list: [
          {
            question: 'Cardio exercises for 20 minutes',
            check: false
          },
          {
            question: 'Rehydrate with fluids',
            check: false
          }
        ]
      },
      checklistWidget: checklistWidget
    }
  },
  methods: {
    displayWidget() {
      // Toggle between True or False
      this.showDemo = this.$toggleTutorialWidget(this.showDemo)
      // If the widget is too be displayed, store the widget information
      if(this.showDemo) {
        this.$store.dispatch("currentChecklist", this.widget);
      }
    },
  },
  computed: {
    showPatientOnly() {
      return this.$store.getters.patientTutorialOnly
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

