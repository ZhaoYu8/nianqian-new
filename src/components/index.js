import panel from "./panel/index";
import page from "./page/index";

const obj = {
  install: function(Vue) {
    Vue.component("panel", panel);
    Vue.component("page", page);
  }
};
export default obj;
