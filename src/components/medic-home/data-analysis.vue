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
import breakdownGraph from './reports/breakdown-graph';
import aggregateWellness from './reports/aggregate-wellness';
import aggregateComplete from './reports/aggregate-completion';
export default {
  name: 'aggregateReport',
  components: {breakdownGraph, aggregateWellness, aggregateComplete},
}

</script>

<style lang="scss" scoped>
  .aggregate-graphs {
      padding: 2% 3% 2% 3%;
  }
</style>
