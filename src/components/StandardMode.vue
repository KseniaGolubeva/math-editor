<template>
  <div class="section">
    <KatexButton :formula="fracFormula" formula-size="me-formula-size-big"/>

    <KatexButton :formula="sqrtFormula"/>

    <KatexButton :formula="degreeFormula"/>

    <GroupFormulas :formula="signFormula" formula-size="me-formula-size-big"
                   :checked="checkSection(specialSigns.label)" :group="specialSigns.label"/>

    <KatexButton :formula="limFormula" formula-size="me-formula-size-small"/>

    <GroupFormulas :formula="integralFormula" :checked="checkSection(groupsFormulas.integrals.label)"
                   :group="groupsFormulas.integrals.label"/>
  </div>
</template>

<script>
import SpecialSigns from "@/components/SpecialSigns.vue";

import groupsFormulas from "@/data/groupsFormulas";

import {mapMutations, mapState} from "vuex";
import specialSigns from "@/data/specialSigns";
import KatexButton from "@/components/KatexButton.vue";
import GroupFormulas from "@/components/GroupFormulas.vue";
import {CheckSection} from "@/mixin/checkSection";

const maxWidth = 600;

export default {
  name: "StandardMode",

  mixins: [CheckSection],

  components: {
    GroupFormulas,
    KatexButton,
    SpecialSigns
  },

  data() {
    return {
      fracFormula: '\\frac{x}{y}',
      sqrtFormula: '\\sqrt x',
      degreeFormula: 'x^\\alpha',
      signFormula: '\\alpha',
      limFormula: '\\lim\\limits_{x \\to \\infty }f(x)',
      integralFormula: '\\int f(x)dx'
    }
  },

  methods: {
    ...mapMutations(['setFormulaSection'])
  },

  computed: {
    ...mapState(['widthMathEditorElement', 'selectedSection']),

    groupsFormulas() {
      return groupsFormulas
    },

    specialSigns() {
      return specialSigns
    },

    compressedMode() {
      return this.widthMathEditorElement <= maxWidth;
    }
  },
}
</script>

<style scoped>
.section {
  display: flex;
  flex-wrap: wrap;
}
</style>