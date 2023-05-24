<template>
  <button :class="['wrapper', 'me-item', {'open': checked}]" @click="openSection(group)">
    <katex-element :expression="formula" :class="formulaSize"/>
    <div class="open-icon"></div>
  </button>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "GroupFormulas",
  props: {
    formula: {
      type: String,
      require: true
    },

    formulaSize: {
      type: String,
      default: 'me-formula-size-standard'
    },

    checked: {
      type: Boolean,
      default: false
    },

    group: {
      type: String,
      require: true,
    }
  },

  methods: {
    ...mapActions(['openSection'])
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/templates.scss";

.wrapper {
  display: flex;
  align-items: center;
}

.open-icon {
  width: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 2px;
    background-color: gray;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: gray;
    transform: rotate(90deg);
    @extend %transition;
  }

  .open &::after {
    transform: rotate(180deg);
  }
}
</style>