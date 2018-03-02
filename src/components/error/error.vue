<template>
  <div class= "error-container">
      <div id = "error-page-text">
            <img id = "logo" src = "../../assets/images/careaway-full1.png">
            <h1 id = "warning-text-display"> 
              <i class="fas fa-exclamation-triangle fa-2x"></i> 
              This is an invalid CareAway Treatment Planner Page. Click 
              <a @click = "routeHome"> HERE </a> to go to the homepage. 
            </h1>
        </div>
        <backdrop/>
  </div>
</template>


<script>
  import backdrop from './backdrop.vue'
  export default {
      name: 'error',
      components: {
          backdrop
      },
      methods: {
          routeHome(){
              this.$router.push('/');
          }
      }
  }
</script>


<style lang = "scss" scoped>
@import '../../assets/sass/settings.scss';
  #logo {
      width: 40%;
      padding-top: 4%;
      padding-left: 4%;
  }
  .fa-exclamation-triangle {
    color: red;
  }
  #warning-text-display {
      padding-left: 2%;
      font-weight: bold;
      font-size: 20px;
  }
  #error-page-text {
    position: absolute;
    z-index: 1;
  }
  a:hover {
      text-decoration: underline;
      color: blue;
  }
</style>


