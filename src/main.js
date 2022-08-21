import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/elementUI' 

import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor)
// 引入并使用vue-quill-editor 富文本编辑器

import "@/assets/global.less";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
