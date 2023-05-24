<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/img/logo.png">
    <MathEditor mode="article"
                :list-formulas-data="listFormulas"
                @add-formula="addFormula"
                @delete-formula="deleteFormula"
                @accept="acceptText"/>
  </div>
</template>

<script>
import MathEditor from './components/MathEditor.vue'
import {mockListFormulas} from "@/mock/mock";
import MEDisplay from "@/components/MEDisplay.vue";

export default {
  name: 'App',
  components: {
    MEDisplay,
    MathEditor
  },
  data() {
    return {
      listFormulas: mockListFormulas,
      text: ''
    }
  },

  methods: {
    acceptText(text) {
      this.text = text;
    },

    addFormula(formula) {
      this.listFormulas.push({
        id: Math.max(this.listFormulas.map(f => f.id)) + 1,
        formula
      });
    },

    deleteFormula(id) {
      this.listFormulas = this.listFormulas.filter(formula => formula.id !== id);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 700px;
}
</style>
