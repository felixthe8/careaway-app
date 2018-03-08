<template>
  <div class = "aggregate-graphs">
    
    <breakdownGraph/>
    <br>
    <aggregateWellness/>
    <br>
    <aggregateComplete/>
  </div>
</template>

<script>
import axios from 'axios';
import pieceLabel from 'chart.piecelabel.js';
import breakdownGraph from './reports/breakdownGraph';
import aggregateWellness from './reports/aggregateWellness';
import aggregateComplete from './reports/aggregateCompletion';
export default {
  name: 'aggregateReport',
  components: {breakdownGraph, aggregateWellness, aggregateComplete},
}

</script>

<style lang="scss" scoped>
  .aggregate-graphs {
      padding-top: 2%;
      padding-left: 3%;
  }
</style>
