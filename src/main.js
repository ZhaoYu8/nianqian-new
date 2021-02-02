import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components/index";
import http from "./api/index";
import "./assets/css/index.scss";

Vue.config.productionTip = false;
Vue.use(components);
Object.assign(Vue.prototype, {
  $post: http.post,
  $get: http.get
});
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
