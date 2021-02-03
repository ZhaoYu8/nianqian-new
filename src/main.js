import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components/index";
import http from "./api/index";
import "./assets/css/index.scss";
import global from "./assets/js/index";
import directives from "./directives";
// 全局注册指令
Vue.use(directives);

Vue.config.productionTip = false;
Vue.use(components);

Object.assign(Vue.prototype, {
  $post: http.post,
  $get: http.get,
  $global: global
});
let vm = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");

Object.assign(Vue.prototype, {
  $bus: vm
});
