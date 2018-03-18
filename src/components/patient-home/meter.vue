<template>
  <div class="modal" v-bind:class="{ 'is-active': computedActive == 'meter' }">
    <div class="modal-background"></div>
    <div class="modal-content" style="background-color:#69f;">
        <!-- Any other Bulma elements you want -->
        Zoop
        Baaaaaa
        {{ mutatingWidget.label || 'None' }}
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox">
              Zoop
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox">
              Laa de dah
            </label>
          </div>
        </div>

        <button class="button" @click="save">Save</button>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<script>
export default {
  name: 'meterWidget',
  data() {
    return {
      showWarning: false,
      mutatingWidget: {}
    }
  },
  props: ['widget','active'],
  watch: {
    widget: function(newVal, oldVal) {
      this.mutatingWidget = newVal;
    }
  },
  computed: {
    computedActive: function() {
      if (this.active != null) {
        return this.active;
      }

      return '';
    }
  },
  mounted() {
    //console.log("blah");
    //console.log(this.computedWidget.label);
    //console.log(this.computedActive);
  },
  methods: {
    close: function(event) {
      console.log('clo');
      this.$emit('close');
    },
    save: function(event) {
      this.$emit('save', this.mutatingWidget);
      this.close();
    }
  }
}
</script>


<style lang="scss">
@import '../../assets/sass/settings.scss';

#app {
    width: 100vw;
    height: 100vh;
  }

.nav-bar {
  width: 100%;
  padding: 1rem;

    &__logo {
      width: 25px;
      height: 25px;
    }

    &__button {
      float: right;
    }
  }

</style>


  
