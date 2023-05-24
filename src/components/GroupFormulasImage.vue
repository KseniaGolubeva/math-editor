<template>
  <button :class="['me-item', 'button-img', {'open': checked}]" @click="openSection(group)">
    <img class="me-icon" :src="require('@/assets/img/' + imageName)" alt="">
  </button>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "GroupFormulasImage",
  props: {
    imageName: {
      type: String,
      require: true
    },

    checked: {
      type: Boolean,
      default: false
    },

    group: {
      type: String,
      require: true,
    }
  },

  methods: {
    ...mapActions(['openSection'])
  }
}
</script>

<style scoped>
.button-img {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>