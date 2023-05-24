import Vue from 'vue';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';
import './assets/scss/styles.scss';
import App from './App.vue';
import store from "@/store";

Vue.config.productionTip = false

Vue.use(VueKatex, {
  globalOptions: {}
});

export const bus = new Vue();

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
