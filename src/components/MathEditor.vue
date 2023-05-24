<template>
  <div ref="mathEditor" id="mathEditor" class="math-editor">
    <div ref="head" :class="['head', {'draggable': isArticleMode}]" :style="startPosHead">
      <div ref="headDraggable" class="head-header" v-if="isArticleMode"></div>

      <div class="head-body">
        <StandardMode v-if="isMinMode"/>

        <MaxMode v-if="isMaxMode"/>

        <ArticleMode v-if="isArticleMode"/>

        <div ref="sidePanel" :class="['section-head', sidePanelClass]">
          <GroupFormulasImage image-name="card-list.svg" :group="listFormulas.label"
                              :checked="checkSection(listFormulas.label)"/>
          <AdditionFormula @add-formula="handleAddFormula"/>
        </div>
      </div>
    </div>
    <div class="body">
      <textarea ref="textarea" :class="['me-textarea', 'grow', {'textarea-article-mode': isArticleMode}]"
                v-model="textareaValue"></textarea>
      <ChoosingFormula v-if="showChoosingFormulaPanel" :is-article-mode="isArticleMode"/>
    </div>

    <div class="footer">
      <button class="me-button-img" @click="displayTextPopup()">
        <img src="../assets/img/book.svg" class="me-icon" alt="">
      </button>

      <div :class="getFooterActionsClass">
        <template v-if="isArticleMode">
          <button class="me-button-primary" @click="saveText">Сохранить</button>
        </template>

        <button class="me-button-primary" @click="processText">Подтвердить</button>
      </div>
    </div>

    <ViewingPopup/>
  </div>
</template>

<script>
import StandardMode from "@/components/StandardMode.vue";
import MaxMode from "@/components/MaxMode.vue";
import AdditionFormula from "@/components/AdditionFormula.vue";

import {bus} from "@/main";

import {mapMutations, mapState} from "vuex";
import Popup from "@/components/Popup.vue";
import MEDisplay from "@/components/MEDisplay.vue";
import ViewingPopup from "@/components/ViewingPopup.vue";
import ChoosingFormula from "@/components/ChoosingFormula.vue";
import GroupFormulasImage from "@/components/GroupFormulasImage.vue";
import {CheckSection} from "@/mixin/checkSection";
import ArticleMode from "@/components/ArticleMode.vue";

export default {
  name: 'MathEditor',

  props: {
    listFormulasData: {
      type: Array,
      require: true
    },

    mode: {
      type: String,
      default: 'max'
    }
  },

  mixins: [CheckSection],

  components: {
    ArticleMode,
    GroupFormulasImage,
    ChoosingFormula,
    ViewingPopup,
    MEDisplay,
    Popup,
    MaxMode,
    StandardMode,
    AdditionFormula
  },

  data() {
    return {
      integralFormula: '\\int_a^b f(x)dx',
      sumFormula: '\\sum\\limits_{i=1}^n a_i',
      widthHeadObserver: null,
      mathEditorResizeObserver: null,
      heightTextareaObserver: null,
      textareaValue: '',
      showModal: true,

      startPosHead: {},

      posStartX: 0,
      posStartY: 0,
      posLastX: 0,
      posLastY: 0,
    }
  },

  computed: {
    ...mapState(['selectedSection', 'listFormulas', 'headElement']),

    isArticleMode(state) {
      return state.mode === 'article';
    },

    showChoosingFormulaPanel() {
      return this.selectedSection !== ''
    },

    sidePanelClass() {
      if (this.mode === 'max') {
        return 'section-max-mode'
      }

      if (this.mode === 'min') {
        return 'section-min-mode'
      }
    },

    isMinMode() {
      return this.mode === 'min';
    },

    isMaxMode() {
      return this.mode === 'max';
    },

    getFooterActionsClass() {
      return this.isArticleMode ? 'footer-main-actions-more' : 'footer-main-actions';
    }
  },

  watch: {
    listFormulasData() {
      this.listFormulas.data = this.listFormulasData;
    }
  },

  methods: {
    ...mapMutations([
      'setHeightTextareaElement',
      'setMathEditorElement',
      'setWidthMathEditorElement',
      'setSidePanel',
      'setShowPopup',
      'setViewingText',
      'setTopHead',
      'setLeftHead',
      'setHeadElement',
      'setMode',
      'setWidthHeadElement',
      'setRightHead',
      'setHeightHeadElement',
      'setStyleWidthHeadElement'
    ]),

    displayTextPopup() {
      this.setViewingText(this.textareaValue.trim());
      this.setShowPopup(true);
    },

    processText() {
      this.$emit('accept', this.textareaValue.trim());
    },

    saveText() {
      this.$emit('save-text', this.textareaValue.trim());
    },

    handleAddFormula() {
      bus.$on('add-formula', formula => {
        this.$emit('add-formula', formula);
      });
    },

    handleDeleteFormula() {
      bus.$on('delete-formula', id => {
        this.$emit('delete-formula', id)
      });
    },

    handlePastFormula() {
      bus.$on('paste-formula', formula => {
        this.textareaValue += ` ${formula}`;
      });
    },

    createHeadResizeObserver() {
      const head = this.$refs.head;

      const observer = new ResizeObserver(entries => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          entries.forEach(entry => {
            if (entry.target) {
              const width = entry.target.getBoundingClientRect().width;
              const height = entry.target.getBoundingClientRect().height;
              const right = entry.target.getBoundingClientRect().right;
              this.setWidthHeadElement(width);
              this.setHeightHeadElement(height);
              this.setRightHead(right);
            }
          });
        });
      });
      observer.observe(head);

      this.widthHeadObserver = observer;
    },

    createResizeObserver() {
      const mathEditor = this.$refs.mathEditor;

      const observer = new ResizeObserver(entries => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          entries.forEach(entry => {
            if (entry.target) {
              const width = entry.target.getBoundingClientRect().width;
              this.setWidthMathEditorElement(width);
            }
          });
        });
      });
      observer.observe(mathEditor);

      this.mathEditorResizeObserver = observer;
    },

    createHeightTextareaResizeObserver() {
      const textarea = this.$refs.textarea;

      const observer = new ResizeObserver(entries => {
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          entries.forEach(entry => {
            if (entry.target) {
              const height = entry.target.getBoundingClientRect().height;
              this.setHeightTextareaElement(height);
            }
          });
        });
      });
      observer.observe(textarea);

      this.heightTextareaObserver = observer;
    },

    closeDragElement() {
      document.removeEventListener('mouseup', this.closeDragElement);
      document.removeEventListener('mousemove', this.elementDrag);
    },

    elementDrag(e) {
      e.preventDefault();

      this.posLastX = this.posStartX - e.clientX;
      this.posLastY = this.posStartY - e.clientY;
      this.posStartX = e.clientX;
      this.posStartY = e.clientY;

      this.setRightHead(this.$refs.head.getBoundingClientRect().right);

      this.setTopHead(this.$refs.head.offsetTop - this.posLastY);
      this.setLeftHead(this.$refs.head.offsetLeft - this.posLastX);
    },

    dragMouseDown(e) {
      e.preventDefault();

      this.posStartX = e.clientX;
      this.posStartY = e.clientY;

      document.addEventListener('mouseup', this.closeDragElement);
      document.addEventListener('mousemove', this.elementDrag);
    }
  },

  mounted() {
    this.handleAddFormula();
    this.handleDeleteFormula();
    this.handlePastFormula();

    this.listFormulas.data = this.listFormulasData;

    this.createHeadResizeObserver();
    this.createResizeObserver();
    this.createHeightTextareaResizeObserver();

    this.setMathEditorElement(this.$refs.mathEditor);
    this.setSidePanel(this.$refs.sidePanel);
    this.setMode(this.mode);

    if (this.isArticleMode) {
      this.setHeadElement(this.$refs.head);
      this.setStyleWidthHeadElement(this.$refs.textarea.getBoundingClientRect().width);
      this.setTopHead(this.$refs.textarea.getBoundingClientRect().top - this.$refs.head.clientHeight);
      this.setLeftHead(this.$refs.head.getBoundingClientRect().left);
      this.$refs.headDraggable.addEventListener('mousedown', this.dragMouseDown);
    }
  },

  beforeDestroy() {
    this.widthHeadObserver.disconnect();
    this.mathEditorResizeObserver.disconnect();
    this.heightTextareaObserver.disconnect();
    this.$refs.headDraggable.removeEventListener('mousedown', this.dragMouseDown);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.math-editor {
  width: 100%;
  position: relative;
}

.head {
  background-color: $me-light;

  &-header {
    height: 15px;
    cursor: move;
  }

  &-body {
    display: flex;
    justify-content: space-between;
  }
}

.draggable {
  position: fixed;
  width: 400px;
  min-width: 320px;
  max-width: 1000px;
  z-index: $me-z-index-dropdown;
  overflow: hidden;
  resize: horizontal;

  &-body {
    display: block;
    height: 10px;
  }
}

.textarea-article-mode {
  height: 100vh;
}

.body {
  display: flex;
}

.grow {
  flex-grow: 1;
}

.footer {
  margin: $me-margin-item 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-main-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  &-main-actions-more {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: $me-margin;
  }
}

.section-min-mode {
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
}
</style>
