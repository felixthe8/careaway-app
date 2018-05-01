<template>
  <div class='tooltip'>
    <i class="fas fa-question-circle tooltip-question"></i>
    <span class='tooltip-text'> {{requirements}} </span>
  </div>
</template>


<script>
  export default {
    // This is the requirement message for the tool tip message
    props:['requirements'],
    name: 'tooltip'
  }
</script>


<style lang='scss'>
  
  .tooltip {
    display: none;

    @media #{$tablet} {
      display: inline;

      &-question {
        padding: 10px 0;
        width: 4%;
        color: $purple-dark;
      }

      &-text{
        float: right;
        visibility: hidden;
        margin-left: 55%;
        width: 225px;
        background-color: black;
        color: #fff;
        position: absolute;
        text-align: center;
        border-radius: 6px;
        padding: 5px 5px 5px 5px;
        z-index: 1;
      }
      &:hover .tooltip-text{
        visibility: visible;
      }
    }
  }
</style>
