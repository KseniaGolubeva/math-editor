<template>
  <DropdownButton :imgName="imgName">
    <div class="addition-formula-body">
      <textarea v-model="formula" class="me-textarea-additional"></textarea>
      <div class="buttons-wrapper">
        <button class="me-button-secondary" @click="close">
          Отменить
        </button>
        <button class="me-button-img" @click="displayFormula">
          <img src="../assets/img/book.svg" alt="">
        </button>
        <button class="me-button-success" @click="onAddFormula">Добавить</button>
      </div>
    </div>
  </DropdownButton>
</template>

<script>
import DropdownButton from "@/components/DropdownButton.vue";
import {bus} from "@/main";
import {mapMutations} from "vuex";

export default {
  name: "AddFormulaButton",
  components: {DropdownButton},
  data() {
    return {
      imgName: "bookmark-plus.svg",
      formula: ''
    }
  },
  methods: {
    ...mapMutations(['setShowPopup', 'setViewingText']),

    displayFormula() {
      this.setViewingText('$$' + this.formula.trim() + '$$');
      this.setShowPopup(true);
    },

    toggleClass() {
      const additionFormulaBody = document.querySelector('.dropdown-wrapper.open');
      additionFormulaBody.classList.remove('open');
      additionFormulaBody.classList.add('close');
    },

    close() {
      this.formula = '';
      this.toggleClass();
    },

    onAddFormula() {
      bus.$emit('add-formula', this.formula);
      this.formula = '';
    }
  }
}
</script>

<style scoped>
.addition-formula-body {
  display: flex;
  flex-direction: column;
}

.buttons-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>