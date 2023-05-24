import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

const minHeightTextarea = 150;

export default new Vuex.Store({
    state: {
        widthMathEditorElement: 0,
        heightTextareaElement: 0,
        selectedSection: '',
        mathEditorElement: null,
        headElement: null,
        widthHeadElement: null,
        heightHeadElement: null,
        mode: '',
        topHead: 0,
        leftHead: 0,
        rightHead: 0,
        choosingFormulaElement: null,
        listFormulas: {
          label: 'listFormulas',
          data: []
        },
        sidePanel: null,
        viewingText: '',
        showPopup: false,
    },

    mutations: {
        setWidthMathEditorElement(state, width) {
            state.widthMathEditorElement = width;
        },

        setMode(state, mode) {
          state.mode = mode;
        },

        setHeadElement(state, headElement) {
            state.headElement = headElement;
        },

        setTopHead(state, top) {
            state.headElement.style.top = top + 'px';
            state.topHead = top;
        },

        setLeftHead(state, left) {
            state.headElement.style.left = left + 'px';
            state.leftHead = left;
        },

        setRightHead(state, right) {
            state.rightHead = right;
        },

        setWidthHeadElement(state, width) {
            state.widthHeadElement = width;
        },

        setStyleWidthHeadElement(state, width) {
            state.headElement.style.width = width + 'px';
        },

        setHeightHeadElement(state, height) {
            state.heightHeadElement = height;
        },

        setHeightTextareaElement(state, height) {
            state.heightTextareaElement = height <= minHeightTextarea ? minHeightTextarea : height;
        },

        setMathEditorElement(state, mathEditorElement) {
            state.mathEditorElement = mathEditorElement;
        },

        setSidePanel(state, sidePanel) {
            state.sidePanel = sidePanel;
        },

        setShowPopup(state, isShow) {
            state.showPopup = isShow;
        },

        setViewingText(state, viewingText) {
            state.viewingText = viewingText;
        },

        setFormulaSection(state, section) {
            state.selectedSection = state.selectedSection === section ? '' : section;
        },

        setChoosingFormulaElement(state, choosingFormulaElement) {
            state.choosingFormulaElement = choosingFormulaElement;
        },

        refreshScrollChoosingFormulaElement(state) {
            if (state.choosingFormulaElement !== null) {
                state.choosingFormulaElement.scrollTop = 0;
            }
        }
    },

    actions: {
        openSection({commit}, section) {
            commit('setFormulaSection', section);
            commit('refreshScrollChoosingFormulaElement');
        }
    }
})