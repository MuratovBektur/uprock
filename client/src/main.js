import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";

Vue.config.productionTip = process.env.NODE_ENV === "prod";

Vue.use(VueRouter);
const app = new Vue({
  render: (h) => h(App),
  router,
  store,
});

app.$mount("#app");
