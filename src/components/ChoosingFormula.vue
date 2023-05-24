<template>
  <div ref="choosingFormula" :class="['choosing-formula', {'fixed': isArticleMode}]"
       :style="{...getWidth, ...getPosition, ...getHeight}">

    <template v-if="selectedSection === listFormulas.label">
      <ListFormulas/>
    </template>
    <template v-else>
      <div class="body">
        <KatexButton class="formula"
                     v-for="(formula, i) in getFormulas" :key="i"
                     :formula="formula" formula-size="me-formula-size-small"
                     type-item="sign"/>
      </div>
    </template>

  </div>
</template>

<script>

import {mapMutations, mapState} from "vuex";
import groupsFormulas from "@/data/groupsFormulas";
import KatexButton from "@/components/KatexButton.vue";
import specialSigns from "@/data/specialSigns";
import ListFormulas from "@/components/ListFormulas.vue";

const breakpointSmall = 425;
const breakpointStandard = 550;

const minHeight = 150;

export default {
  name: "ChoosingFormula",

  components: {ListFormulas, KatexButton},

  props: {
    isArticleMode: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    ...mapMutations(['setChoosingFormulaElement']),
  },

  computed: {
    ...mapState([
      'widthMathEditorElement',
      'widthHeadElement',
      'heightHeadElement',
      'heightTextareaElement',
      'selectedSection',
      'listFormulas',
      'headElement',
      'topHead',
      'leftHead',
      'mode'
    ]),

    getWidth() {
      if (this.isArticleMode) {
        return {
          'width': this.widthHeadElement + 'px'
        }
      } else {
        switch (true) {
          case this.widthMathEditorElement <= breakpointSmall:
            return {
              'width': '100%',
              'position': 'absolute'
            }
          case this.widthMathEditorElement <= breakpointStandard:
            return {
              'width': '200px'
            }
          default:
            return {
              'width': '250px'
            }
        }
      }
    },

    getHeight() {
      if (this.widthMathEditorElement > breakpointSmall && !this.isArticleMode) {
        return {
          'max-height': this.heightTextareaElement + 'px',
        }
      }
    },

    getPosition() {
      if (this.isArticleMode) {
        return {
          'top': (this.topHead + this.heightHeadElement) + 'px',
          'left': this.leftHead + 'px'
        }
      }
    },

    getFormulas() {
      switch (this.selectedSection) {
        case groupsFormulas.integrals.label:
          return groupsFormulas.integrals.data;
        case groupsFormulas.sums.label:
          return groupsFormulas.sums.data;
        case groupsFormulas.matrices.label:
          return groupsFormulas.matrices.data;
        case groupsFormulas.staples.label:
          return groupsFormulas.staples.data;
        case groupsFormulas.lims.label:
          return groupsFormulas.lims.data;
        case specialSigns.label:
          return Object.values(specialSigns.data).reduce((arr, e) => arr.concat(e));
        case this.listFormulas.label:
          return this.listFormulas.data;
      }
    }
  },

  mounted() {
    this.setChoosingFormulaElement(this.$refs.choosingFormula);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.choosing-formula {
  box-sizing: border-box;
  background-color: $me-light;
  overflow-y: auto;
  overflow-x: hidden;
  padding: $me-padding-item;

  border-bottom: $me-border-size solid $me-border-color;
  border-right: $me-border-size solid $me-border-color;
  border-top: $me-border-size solid $me-border-color;
}

.body {
  display: flex;
  flex-wrap: wrap;
}

.fixed {
  position: fixed;
}

.formula {
  flex-grow: 1;
}
</style>