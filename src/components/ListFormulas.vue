<template>
  <ul class="list-formulas me-ul">
    <li v-for="formula in listFormulas.data" :key="formula.id" class="list-formulas-item">
      <KatexButton :formula="formula.formula" formula-size="me-formula-size-small" class="me-item-select-formula paste-formula"/>
      <button class="delete-formula me-button" @click="deleteFormula(formula.id)">
        <span class="delete-icon">&times;</span>
      </button>
    </li>
  </ul>
</template>

<script>
import {bus} from "@/main";
import {mapState} from "vuex";
import KatexButton from "@/components/KatexButton.vue";

export default {
  name: "ListFormulas",
  components: {KatexButton},

  computed: {
    ...mapState(['listFormulas'])
  },

  methods: {
    deleteFormula(id) {
      bus.$emit('delete-formula', id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.list-formulas {
  width: 100%;
}

.list-formulas-item {
  display: flex;
  & button {
    min-height: max-content;
  }
}

.paste-formula {
  flex-grow: 1;
}

.delete-formula {
  width: 40px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: $me-danger-hover;
    }

    &:hover .delete-icon {
      color: white;
    }
  }
}

.delete-icon {
  height: 100%;
  font-size: 20px;
}
</style>