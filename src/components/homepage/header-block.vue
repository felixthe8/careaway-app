<template>
  <section class="full nopad">
    <div class="section">
      <img class="careaway-logo" src="../../assets/images/careaway-full1.png">
      <p class="text">{{text}}</p>
    </div>

    <img class="hill2" src="../../assets/images/hill2.png">
    <img class="hill1" src="../../assets/images/hill1.png">
    <img class="hill3" src="../../assets/images/hill3.png">
    <img class="fountain" src="../../assets/images/fountain.svg">
    <img class="tree" src="../../assets/images/tree.svg">
  </section>

</template>

<script>
  export default {
    name: 'header-block',
    data() {
      return {
        text: 'An online platform optimal communication between Medical Professionals and their clients.'
      }
    }
  }
</script>


<style lang="scss">
@import "../../assets/sass/settings.scss";

.full {
  background: $blue-light;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .section {
    .text {
      width: 40%;
    }
  }

  .careaway-logo {
    width: 300px;
  }

  .hill1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80%;
    filter: drop-shadow(-10px -25px 10px rgba(0, 0, 0, 0.2));

    @media #{$tablet}  {
      width: 60%;
    }
  }

  .hill2 {
    display: none;

    @media #{$tablet} {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

  .hill3 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 110%;
    height: 20%;
    transform: translateX(20%);
    filter: drop-shadow(-10px -15px 10px rgba(0, 0, 0, 0.2));
  }

  .tree {
    display: none;

    @media #{$tablet} {
      display: block;
      position: absolute;
      width: 600px;
      bottom: 75px;
      transform: translateX(80%);
      filter: drop-shadow(5px -1px 5px rgba(0, 0, 0, 0.2));
    }

    @media #{$desktop} {
      transform: translateX(120%);
    }
  }

  .fountain {
    position: absolute;
    width: 150px;
    bottom: 50px;
    left: 0;
    transform: translateX(-20%);
    z-index: 1;
    filter: drop-shadow(5px -8px 10px rgba(0, 0, 0, 0.2));

    @media #{$largeMobile} {
      width: 200px;
    }

    @media #{$tablet} {
      bottom: 80px;
      transform: translateX(30%);
    }
  }
}

</style>
