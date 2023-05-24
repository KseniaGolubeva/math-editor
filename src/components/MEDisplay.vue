<template>
  <div class="me-display">
    <template v-for="(token, i) in getTokens" >
      <span v-if="!isFormula(token)">{{ token }}</span>
      <katex-element :expression="token.slice(2, -2)" v-else />
    </template>
  </div>
</template>

<script>

export default {
  name: "MEDisplay",
  props: {
    text: {
      type: String,
      require: true
    }
  },

  computed: {
    getTokens() {
      const tokens = [];
      const step = 2;
      let token = '';

      for (let i = 0; i < this.text.length; i++) {
        if (this.text[i] === '$' && this.text[i + 1] === '$') {
          tokens.push(token);
          token = '';

          for (let j = i + step; j < this.text.length; j++) {
            if (this.text[j] === '$' && this.text[j + 1] === '$') {
              tokens.push('$$'+ token + '$$');
              token = '';
              i = j + 1;
              break;
            } else {
              token += this.text[j];
            }
          }
        } else {
          token += this.text[i];
        }
      }

      if (token.length !== 0) {
        tokens.push(token);
      }

      return tokens;
    }
  },

  methods: {
    isFormula(token) {
      return token[0] === '$' && token[1] === '$' && token[token.length-1] === '$' && token[token.length-2] === '$'
    }
  }
}
</script>

<style scoped>
  .me-display {
    text-align: left;
  }
</style>