<template>
  <div class = "tutorial-container">
    <navbar/>  
    <div class = "columns">
      <div class = "column is-one-fifth left-side">  
        <tutorialMenu />  
      </div>

      <div class = "column">
        <div class="box">
          <div class = "logo-container">
            <img class = "logo" src = '../../assets/images/careaway-full1.png'>
          </div>
          <router-view></router-view>
        </div>
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
.logo-container {
      text-align: center;
  }
.logo {
      width: 30%;
      min-width: 20%;
}
.box {
  margin-right: 2%;
}
</style>


