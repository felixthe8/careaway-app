<template>
  <nav class="nav-bar">
    <img class="nav-bar__logo" @click="goHome" src="../../assets/images/careaway-logo.png">

    <div class="nav-bar__right">
      <p class="nav-bar__right--medical-code">MC:&nbsp;{{medicalcode}} </p>
      <button class="nav-bar__right--button button is-link" @click="logOut">
        {{button}}<i class="fas fa-sign-out-alt"></i>
      </button>
      <button class="nav-bar__right--button button is-link" @click="viewReport">
        View Reports<i class="fas fa-chart-line"></i>
      </button>
      <button class="nav-bar__right--button button is-link" @click="viewSendFeedback">
        {{sendFeedbackText}}<i class="fas fa-comment"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'navbar',
  data() {
    return {
      button: 'Logout',
      sendFeedbackText: 'Send feedback',
      medicalcode: this.$store.getters.medicalCode
    }
  },
  methods: {
    logOut() {
      // Call to user plugin to logout user
      this.$logout();
      axios.get(this.$store.getters.logoutURL).then(response => {
        this.$router.push('/');
      });
    },
    viewReport(){
      this.$router.push('/MedicHome/Report');
    },
    viewSendFeedback(){
      this.$router.push('/MedicHome/Feedback');
    },
    goHome(){
      this.$router.push('/MedicHome');
    }
  }
}
</script>

<style lang="scss" scoped>

.nav-bar {
  width: 100%;
  padding: 1rem;
  position: fixed;
  display: flex;
  background: #fff;
  z-index: 10;
  top: 0;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.1);

  &__right {
    display: flex;
    position: absolute;
    width: 55%;
    height: 100%;
    top: 0;
    align-items: center;
    right: 0;

    &--medical-code {
      padding: 0 .5rem;
      color: #2A243A;
    }

    &--button {
      margin-left: .5rem;
      background-color: #92CC92;
      border-radius: 10px;

      i {
        padding-left: 5px;
      }

      &:hover {
        background-color: #568956;
      }
    }
  }

  &__logo {
    width: 25px;
    height: 25px;
  }

  &:hover {
    cursor: pointer;
  }
}

</style>
