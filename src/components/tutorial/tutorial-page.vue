<template>
  <div class = "tutorial-container">
    <navbar/>  
    <div class = "columns">
      <div class = "column is-one-quarter left-side">  
        <tutorialMenu />  
      </div>
    </div>
  </div>
   
</template>

<script>
import navbar from './app-header';
import tutorialMenu from './tutorial-menu';
export default {
  name: 'tutorial',
  components: {navbar, tutorialMenu}
}
</script>

<style lang="scss" scoped>
  .left-side{
    margin-top: 2%;
   margin-left: 1%;
}
</style>


