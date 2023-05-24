<template>
  <DropdownButton :formula="sign">
    <ul class="special-signs me-ul">
      <li v-for="(sing, i) in groupSigns" :key="i">
        <button class="sign-button me-button"
                @click="pasteFormula(sing)">
          <katex-element :expression="sing"/>
        </button>
      </li>
    </ul>
  </DropdownButton>
</template>

<script>
import DropdownButton from "@/components/DropdownButton.vue";
import specialSigns from "@/data/specialSigns";
import {PasteFormula} from "@/mixin/pasteFormula";

export default {
  name: "SpecialSigns",

  mixins: [PasteFormula],

  props: {
    groupSigns: Array,
    sign: String
  },

  components: {
    DropdownButton
  },

  data() {
    return {
      specialSigns,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.special-signs {
  display: flex;
  flex-wrap: wrap;
  max-width: 320px;
  max-height: 200px;
  overflow-y: auto;
  padding: $me-padding;
}

.sign-button {
  padding: $me-padding;
  min-width: 25px;
  min-height: 35px;
}

.sign-button:hover {
  box-shadow: $me-box-shadow-length-mini $me-light-hover;
  transform: scale(110%);
}
</style>