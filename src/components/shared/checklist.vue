<template>

  <div class="checklist">
    <button class="checklist__button green-button"
      id="checklist"
      draggable="true"
      @mousedown="dragStart"
      @drag="onDrag">Checklist</button>

    <create :calendar="calendar"/>

    <status
      :calendar="calendar"
      :checklist="this.$store.getters.currentChecklist"/>

    <edit
      :calendar="calendar"
      :checklist="this.$store.getters.currentChecklist"/>

  </div>

</template>

<script>

import create from "./checklist/checklist-create";
import status from "./checklist/checklist-status";
import edit from "./checklist/checklist-edit";

export default {
  name: "checklist",

  props: ["calendar"],

  components: { create, status, edit },

  methods: {
    dragStart: function(event) {
      this.$store.dispatch("toggleChecklist");
    },
    onDrag: function(event) {
      event.preventDefault();
    }
  }
}
</script>

<style lang="scss">

.checklist {
  padding: 1rem;

  &__button {
    padding: 5px 20px;
    background: $white;
    color: $green-dark;
    font-weight: bold;
    cursor: move;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
    transition: all ease .5s;
    width: 80%;

    &:hover {
      background: $green !important;
      color: $white;
    }
  }

  &__label {
    margin-left: 1rem;
  }
}

</style>
