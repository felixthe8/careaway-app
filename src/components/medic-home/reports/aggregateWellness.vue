<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Overall Patient Wellness </h1>
    <h2 class="subtitle"> {{wellnessWarning}} </h2>
    <canvas id = "aggregate-wellness" width = "450" height = "300"> </canvas>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
      return {
          wellnessWarning: ''
      }
  },
  methods: {
    /* 
    This section is solely for planning on the 'aggregate patient wellness graph'. 

    Write query to return solely the meter widget data of patients under a 
    specific medical professional. 
    Ex. axios.get(localhost:8080/wellness?medicalcode=currentMedicalcode)

    Need to determine the averages of patient wellness on specific days/weeks?
     I feel like days makes more sense. [ Ask fearless leader for guidance on this. ]

     So instead query for last 5 days of meter widget data then, so there's not a bunch of extra 
     data in response. 
    Loop through each day and determine average wellness for that day. 
    var conditionWellness: {}
    for(int i = day1 ; i < day5; i++)
    {
      for(int j = 0 ; j < response.treatment.data.size; j++ 
      {
        var dayWellnesstotal = +=response.treatment.data[j]
      }

      conditionWellness[day] = dayWellnesstotal / response.treatment.data.size
    }

    O(n^2) is very inefficient. Is there a better way?
    */ 


  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
  .subtitle {
      margin-left: 2%;
  }
</style>

