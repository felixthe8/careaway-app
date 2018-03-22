<template>
  <div class="modal" v-bind:class="{ 'is-active': computedActive == 'meter' }">
    <div class="modal-background"></div>
    <div class="modal-content box white-background">
        <!-- Any other Bulma elements you want -->
        <div class="field">
          <label class="label question-text">{{ mutatingWidget.question }}</label>
          <div class="centered" v-if="mutatingWidget.scale">On a scale of {{ mutatingWidget.scale[0] }} to {{ mutatingWidget.scale[1] }}</div>
          <div class="control">
            <input class="input" type="number" v-model="mutatingWidget.patient_input" placeholder="Enter number">
          </div>
        </div>
        <br/>
        <div class="centered">
          <a class="button is-primary" @click="save">Save</a>
        </div>
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
  methods: {
    close: function(event) {
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

.white-background {
  background-color: $white;
}

.question-text {
  text-align: center;
  font-size: 26px;
}

.centered {
  text-align: center;
}

</style>


  
