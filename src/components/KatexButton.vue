<template>
  <button :class="[getItemClass, hover]" @click="pasteFormula(formula)">
    <katex-element :expression="formula" :class="formulaSize"/>
  </button>
</template>

<script>
import {PasteFormula} from "@/mixin/pasteFormula";

export default {
  name: "KatexButton",

  mixins: [PasteFormula],

  props: {
    formula: {
      type: String,
      require: true,
    },

    hover: {
      type: String,
      default: 'background'
    },

    formulaSize: {
      type: String,
      default: 'me-formula-size-standard'
    },

    typeItem: {
      type: String,
      default: 'element'
    }
  },

  computed: {
    getItemClass() {
      return this.typeItem === 'element' ? 'me-item' : 'me-item-select-formula';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.background {
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: $me-light-hover;
    }
  }
}

.scale {
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: $me-box-shadow-length-mini $me-light-hover;
      transform: scale(110%);
    }
  }
}
</style>