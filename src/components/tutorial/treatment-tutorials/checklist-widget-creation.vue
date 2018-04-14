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
        Click the button below to try out the Meter Widget.
        <br>
        <a class="button is-link is-rounded try">{{tryButton}}</a>
      </p>

    </div>
  </div>
  
</template>

<script>
import widgetBox from '../../../assets/images/tutorial/widgets/checklist/checklist-widget.png'
import dragDemo from '../../../assets/images/tutorial/widgets/checklist/checklist-drag-demo.gif'
import createDemo from '../../../assets/images/tutorial/widgets/checklist/checklist-input-demo.gif'
export default {
  name: 'meterWidgetCreationTutorial',
  data() {
    return {
      widgetBox: widgetBox,
      dragDemo: dragDemo,
      createDemo: createDemo,
      taskList: ['Take calcium pills', 'Measure blood pressure', 'Exercise for 15 minutes'],
      done: 'Create Event',
      tryButton: 'Try Widget',
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
#taskList {
  list-style-type: square;
  margin-left: 2%;
}
</style>

