<template>
  <nav class="nav-bar">
    <img class="nav-bar__logo" @click = "goHome" src="../../assets/images/careaway-logo.png">

    <div class="nav-bar__right">
      <button class="button nav-bar__right--button is-link" @click="toggleCreate"> <i class="fas fa-sign-out-alt"></i>Create Appointment</button>

      <div class="nav-bar__right--show-menu" @click="toggleMenu"><i class="fas fa-bars"></i>
        <ul class="nav-bar__right__submenu" :class="{'show-sub' : toggle}">
          <li>
            <button class="button nav-bar__right__submenu--button is-link" @click="toggleTransfer">View Transfer</button>
          </li>
          <li>
            <button class="nav-bar__right__submenu--button button is-link" @click="logOut">{{button}}<i class="fas fa-sign-out-alt"></i></button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import axios from 'axios';
export default {
  name: 'navbar',
  data() {
    return {
      button: 'Logout',
      toggle: false
    }
  },
  methods: {
    logOut() {
      // Call to user plugin to logout user
      this.$logout();
      axios.get(this.$store.getters.logoutURL).then(response => {
        console.log(response);
        this.$router.push('/');
      });
    },
    viewAppointments() {
      this.$store.dispatch('alternateAppointmentCreation');
    },
    goHome() {
      this.$router.push('/PatientHome');
    },
    toggleCreate() {
      this.$store.dispatch('alternateAppointmentCreation')
    },
    toggleTransfer() {
      this.$emit('toggleTransfer');
    },
    toggleMenu() {
      this.toggle = !this.toggle;
    }
  }
}
</script>


<style lang= "scss" scoped>

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
    height: 100%;
    top: 0;
    align-items: center;
    right: 0;

    &--button {
      margin-left: .5rem;
      background-color: $green;
      border-radius: 10px;

      i {
        padding-left: 5px;
      }

      &:hover {
        background-color: #568956;
      }
    }

    &--show-menu {
      font-size: 1.5em;
      color: $purple-dark;
      padding: 0 1rem;
      transition: all ease .5s;

      &:hover {
        color: $green;
      }
    }

    &__submenu {
      background: $purple-dark;
      text-align: center;
      transform: translateY(100%) translateX(105%);
      transition: all ease 1s;
      position: absolute;
      border-bottom-left-radius: 10px;
      display: block;
      padding: 0 1rem;
      bottom: 0;
      right: 0;

      &--button {
        color: #fff;

        &:hover {
          color: $purple-light;
          background: none;
        }

        i {
          padding: 0 5px;
        }
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

.show-sub {
  transform: translateY(100%) translateX(0);
}
</style>
