<template>

  <div class="checklist">
    <button class="checklist__button green-button" draggable="true" @drag="onDrag">Checklist</button>

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
    onDrag: function() {
        this.$store.commit("toggleChecklist");
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
