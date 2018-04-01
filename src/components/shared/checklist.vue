<template>

  <div class="checklist">
    <button class="checklist__button green-button"
      id="checklist"
      draggable="true"
      @mousedown="dragStart"
      @drag="onDrag">Checklist</button>

    <create :calendar="calendar"/>
  </div>

</template>

<script>

import create from "./checklist/checklist-create";

export default {
  name: "checklist",

  props: ["calendar"],

  components: { create },

  methods: {
    dragStart: function(event) {
        console.log(this.$store.getters.showChecklist);
      this.$store.dispatch("toggleChecklist");
    },
    onDrag: function(event) {
      event.preventDefault();
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.checklist {
  padding: 1rem;

  &__button {
    padding: 5px 20px;
    cursor: move;
  }

  &__label {
    margin-left: 1rem;
  }

  &__button {

  }
}

</style>
