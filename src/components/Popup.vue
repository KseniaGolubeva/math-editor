<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div data-popup-container class="modal-container">

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Popup",

  methods: {
    closePopup(e) {
      if (!e.target.closest('[data-popup-container]')) {
        this.$emit('close-popup');
      }
    }
  },

  mounted() {
    window.addEventListener('click', this.closePopup, true);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.closePopup, true);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.modal-mask {
  position: absolute;
  z-index: $me-z-index-popup;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $me-mask;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity $me-transition-duration $me-transition-function;
}

.modal-wrapper {
  width: 80%;
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
}

.modal-container {
  margin: 0 auto;
  padding: $me-padding-element;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all $me-transition-duration $me-transition-function;
}

.modal-footer {
  margin-top: $me-margin-element;
  display: flex;
  align-items: center;
  justify-content: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>