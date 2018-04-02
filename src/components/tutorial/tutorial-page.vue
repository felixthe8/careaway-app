<template>
  <div class = "tutorial-container">
    <div class = "columns">
      <div class = "column is-one-quarter left-side">  
        <tutorialMenu />  
      </div>
    </div>
  </div>
   
</template>

<script>
import tutorialMenu from './tutorial-menu';
export default {
  name: 'tutorial',
  components: {tutorialMenu}
}
</script>

<style lang="scss" scoped>
  .left-side{
    margin-top: 2%;
   margin-left: 1%;
}
</style>


