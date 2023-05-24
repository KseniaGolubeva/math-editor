<template>
  <div class="section">
    <KatexButton :formula="fracFormula" formula-size="me-formula-size-big"/>
    <KatexButton :formula="sqrtFormula"/>
    <KatexButton :formula="degreeFormula"/>
    <GroupFormulas :formula="signFormula" formula-size="me-formula-size-big"
                   :checked="checkSection(specialSigns.label)" :group="specialSigns.label"/>
    <GroupFormulas :formula="limFormula" formula-size="me-formula-size-small"
                   :checked="checkSection(groupsFormulas.lims.label)" :group="groupsFormulas.lims.label"/>

    <GroupFormulas :formula="integralFormula" :checked="checkSection(groupsFormulas.integrals.label)"
                   :group="groupsFormulas.integrals.label"/>

    <GroupFormulas :formula="staples" :checked="checkSection(groupsFormulas.staples.label)"
                   :group="groupsFormulas.staples.label"/>

    <GroupFormulas :formula="matrixFormula" formula-size="me-formula-size-small"
                   :checked="checkSection(groupsFormulas.matrices.label)" :group="groupsFormulas.matrices.label"/>
  </div>
</template>

<script>
import KatexButton from "@/components/KatexButton.vue";
import GroupFormulas from "@/components/GroupFormulas.vue";
import specialSigns from "@/data/specialSigns";
import groupsFormulas from "@/data/groupsFormulas";
import {CheckSection} from "@/mixin/checkSection";
import GroupFormulasImage from "@/components/GroupFormulasImage.vue";
import listFormulas from "@/components/ListFormulas.vue";

export default {
  name: "ArticleMode",

  components: {
    GroupFormulasImage,
    GroupFormulas,
    KatexButton
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
    listFormulas() {
      return listFormulas
    },
    groupsFormulas() {
      return groupsFormulas
    },

    specialSigns() {
      return specialSigns
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>