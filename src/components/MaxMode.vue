<template>
  <div class="max-mode">
    <div class="section">
      <KatexButton :formula="fracFormula" formula-size="me-formula-size-big"/>
      <KatexButton :formula="sqrtFormula"/>
      <KatexButton :formula="degreeFormula"/>
      <GroupFormulas :formula="signFormula" formula-size="me-formula-size-big"
                     :checked="checkSection(specialSigns.label)" :group="specialSigns.label"/>
    </div>

    <div class="section">
      <GroupFormulas :formula="limFormula" formula-size="me-formula-size-small"
                     :checked="checkSection(groupsFormulas.lims.label)" :group="groupsFormulas.lims.label"/>

      <GroupFormulas :formula="integralFormula" :checked="checkSection(groupsFormulas.integrals.label)"
                     :group="groupsFormulas.integrals.label"/>

      <GroupFormulas :formula="staples" :checked="checkSection(groupsFormulas.staples.label)"
                     :group="groupsFormulas.staples.label"/>

      <GroupFormulas :formula="matrixFormula" formula-size="me-formula-size-small"
                     :checked="checkSection(groupsFormulas.matrices.label)" :group="groupsFormulas.matrices.label"/>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

import groupsFormulas from "@/data/groupsFormulas";
import specialSigns from "@/data/specialSigns";

import GroupFormulas from "@/components/GroupFormulas.vue";
import {CheckSection} from "@/mixin/checkSection";
import KatexButton from "@/components/KatexButton.vue";

export default {
  name: "MaxMode",

  components: {
    KatexButton,
    GroupFormulas
  },

  mixins: [CheckSection],

  data() {
    return {
      fracFormula: '\\frac{x}{y}',
      sqrtFormula: '\\sqrt x',
      degreeFormula: 'x^\\alpha',
      signFormula: '\\alpha',

      limFormula: '\\lim\\limits_{x \\to \\infty }f(x)',
      integralFormula: '\\int f(x)dx',
      staples: '\\left\\{\\left(\\right)\\right\\}',
      matrixFormula: '\\begin{pmatrix} \n' +
          '1 & 2\\\\ \n' +
          'a & b \n' +
          '\\end{pmatrix}'
    }
  },

  computed: {
    ...mapState(['mathEditorElement', 'widthMathEditorElement', 'sidePanel']),

    specialSigns() {
      return specialSigns
    },

    groupsFormulas() {
      return groupsFormulas
    }
  },
}
</script>

<style scoped>
.max-mode {
  display: grid;
}

.section {
  display: flex;
  flex-wrap: wrap;
}
</style>