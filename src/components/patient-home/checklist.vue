<template>
  <div class="modal checklist-status-modal">
    <div class="modal-background"></div>
    <div class="modal-content box white-background">
        <!-- Any other Bulma elements you want -->
        <div class="question-text">Checklist</div>
        <br/>
        <div v-for="question in (mutatingWidget.list || [])">
          <div class="field">
            <div class="control">
              <label class="checkbox checkbox-text">
                <input type="checkbox" v-model="question.check">
                {{ question.check ? question.question+" yes" : question.question }}
              </label>
            </div>
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
  name: 'checklistWidget',
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

.centered {
  text-align: center;
}

.question-text {
  text-align: center;
  font-size: 26px;
}

.checkbox-text {
  font-size: 20px;
}

</style>
