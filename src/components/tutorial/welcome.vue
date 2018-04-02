<template>
    <div id="welcome">
    <div class="box">
      <div class = "logo-container">
        <img class = "logo" src = '../../assets/images/careaway-full1.png'>
      </div>

      <div class = "content is-size-5">
          <p>  
            Welcome to the CareAway Treatment Planner Tutorials Page. 
          </p>
          <p>
            This page provides information about how to use the core features of the 
            CareAway application. Each feature will have a step-by-step walk through of
            how it is to be used. Registered users can reference this page if they need assistance 
            using the application.  Furthermore, certain features will have interactive components 
            that users are free to play around with, offering prospective users a glimpse into 
            the CareAway Treatment Planner. 
          </p>
      </div>
      </div>
    </div>
    
  
</template>

<script>

export default {
  name: 'welcomePage'
}
</script>

<style lang="scss" scoped>
  .logo-container {
      text-align: center;
  }
  .logo {
      width: 30%;
      min-width: 20%;
  }
  .content {
      padding: 4%;
  }

</style>
