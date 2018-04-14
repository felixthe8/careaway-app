<template>
  <div>
    <h1 class="title">Interacting with the Meter Widget</h1>
    <i>{{showPatientOnly}}</i>

    <div class="instructions">
      <p>
        On the patient account, the meter widget can be identified by the fields labeled meter on
        their treatment calendar. 
      </p>
      <figure>
        <img :src = "meterWidget" alt = "Meter Widget Patient View"/>
      </figure>
      <p>
        To interact with the meter widget, simply click on the meter widget for the current day on
        the treatment calendar. Then, enter a value value into the input field that is within the 
        appropriate range. And with that, you're done! 
      </p>
      <p>
        For this example, the valid range of input is from <i>{{inputRange[0]}}</i> - 
        <i>{{inputRange[1]}}</i>. We input <i>{{inputValue}}</i> by typing into the input box
        and clicking <i>{{done}}</i>.
      </p>
      <figure class = "gif">
        <img :src = "meterWidgetInput" alt = "Meter Widget Patient View"/>
      </figure>
    </div>
    
  </div>
  
</template>

<script>
import meterWidget from '../../../assets/images/tutorial/widgets/meter/meter-widget-patient.png';
import meterWidgetInput from '../../../assets/images/tutorial/widgets/meter/meter-widget-interact.gif'
export default {
  name: 'meterWidgetInteractionTutorial',
  data() {
    return {
      meterWidget: meterWidget,
      meterWidgetInput: meterWidgetInput,
      inputRange : [1, 100],
      inputValue: 20,
      done: 'Save'
    }
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
