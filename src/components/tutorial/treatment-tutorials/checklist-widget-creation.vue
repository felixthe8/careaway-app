<template>
  <div>
    <h1 class = "title">Creating the Checklist Widget</h1>    
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
        To assign a checklist widget, drag and hold the checklist widget and drop it on
        a specific day. A popup should display with fields to input the checklist tasks and the date.  
        If you want to close the popup, click the <i>X</i> in the top right corner.      
      </p>
      <figure class = "gif">
        <img :src = "dragDemo" alt = "Drag 'n Drop Checklist'"/>
      </figure>
      <p>
        Next we need to input task(s) for the widget. For this example, here are the tasks that 
        we will be adding: 
        <ul id = "taskList">
          <li v-for= "task in taskList">
            <i>{{task}}</i>
          </li>
        </ul>
        Type the first task in the list into the input box. When you are done with that, add the 
        second task by clicking the <i> + </i>. Add the third task the same way. After typing out 
        all 3 tasks, click <i>{{done}}</i> and that's it !
      </p>
      <figure class = "gif">
        <img :src = "createDemo" alt = "Create the Checklist"/>
      </figure>
      <p>
        Click the button below to try out the Checklist Widget.
        <br>
        <a class="button is-link is-rounded try" @click ="displayWidget">{{tryButton}}</a>
      </p>

    </div>
    <checklistWidget :class="{ 'is-active': showDemo }" @close = "displayWidget"/>
  </div>
  
</template>

<script>
import checklistWidget from '../../shared/checklist/checklist-create.vue';

export default {
  name: 'meterWidgetCreationTutorial',
  components: {checklistWidget},
  data() {
    return {
      taskList: ['Take calcium pills', 'Exercise for 15 minutes', 'Measure blood pressure'],
      done: 'Create Event',
      tryButton: 'Try Widget',
      showDemo: false
    }
  },
  methods: {
    displayWidget() {
      this.showDemo = this.$toggleTutorialWidget(this.showDemo)
    }
  },
  computed: {
    showMedicalOnly(){
       return this.$store.getters.mpTutorialOnly
    },
    widgetBox() {
      return this.$store.getters.checklistCreationTutorialWidget
    },
    dragDemo() {
      return this.$store.getters.checklistCreationTutorialDragDemo
    },
    createDemo() {
      return this.$store.getters.checklistCreationTutorialCreateDemo
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
#taskList {
  list-style-type: square;
  margin-left: 2%;
}
</style>

