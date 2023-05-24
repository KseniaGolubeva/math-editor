<template>
  <div ref="dropdown" data-dropdown class="dropdown-wrapper">
    <button class="dropdown-head me-item" @click="openDropdown" @keydown.esc="closeDropdown">
      <katex-element v-if="formula" :class="formulaSizeClass" :expression="formula"/>
      <img v-if="imgName" :src="require(`@/assets/img/${imgName}`)" class="me-icon" alt="">
      <span v-if="title" class="title">{{ title }}</span>
      <img :class="['me-icon-additional', 'icon-arrow', openStyleClass]" src="@/assets/img/caret-right.svg" alt="">
    </button>
    <div :class="['dropdown-body', directionClass]" :style="position">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "DropdownButton",

  props: {
    title: String,
    formula: String,
    imgName: String,
    direction: {
      type: String,
      default: 'left'
    },
    formulaSize: String
  },

  data() {
    return {
      isOpen: false,
    }
  },

  computed: {
    ...mapState(['mode', 'rightHead']),

    directionClass() {
      if (this.mode !== 'article') {
        return `direction-${this.direction}`;
      }
    },

    position() {
      if (this.mode === 'article') {
        return {
          'position': 'fixed',
          'left': (this.rightHead - 293.33) + 'px'
        }
      }
    },

    formulaSizeClass() {
      if (this.formulaSize === 'small') {
        return 'small-formula-size'
      }

      return 'standard-formula-size'
    }
  },

  methods: {
    openStyleClass() {
      return this.isOpen ? 'open' : 'close';
    },

    removeClassOpen(item) {
      item.classList.remove('open');
      item.classList.add('close');
    },

    addClassOpen(item) {
      item.classList.remove('close');
      item.classList.add('open');
    },

    openDropdown() {
      const parentNode = this.$refs.dropdown;

      if (parentNode.classList.contains('open')) {
        this.removeClassOpen(parentNode);
      } else {
        const dropdownItems = document.querySelectorAll('[data-dropdown]');

        dropdownItems.forEach(item => {
          this.removeClassOpen(item);
        });

        this.addClassOpen(parentNode);
      }
    },

    closeDropdown() {
      const parentNode = this.$refs.dropdown;
      this.removeClassOpen(parentNode);
    },

    closeDropdownByClick(e) {
      if (!e.target.closest('[data-dropdown]')) {
        const parentNode = this.$refs.dropdown;
        this.removeClassOpen(parentNode);
      }
    }
  },

  mounted() {
    window.addEventListener('click', this.closeDropdownByClick, true);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.closeDropdownByClick, true);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/templates.scss";

.dropdown-wrapper {
  position: relative;
}

.dropdown-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-body {
  position: absolute;
  width: max-content;
  background-color: $me-light;
  opacity: 0;
  visibility: hidden;
  z-index: $me-z-index-dropdown;
  border: $me-border-size solid $me-light-hover;
  @extend %transition-open;

  .dropdown-wrapper.open & {
    opacity: 1;
    visibility: visible;
  }
}

.icon-arrow {
  margin-left: $me-margin;
  @extend %transition;
}

.title {
  font-size: $me-font-size;
}

.dropdown-wrapper {
  &.open .icon-arrow {
    transform: rotate(90deg);
  }

  &.close .icon-arrow {
    transform: rotate(0);
  }
}

.direction-left {
  right: 0;
}

.direction-right {
  left: 0;
}

.direction-center {
  left: 50%;
  transform: translateX(-50%);
}
</style>
