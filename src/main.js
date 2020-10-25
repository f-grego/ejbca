import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "vue-material/dist/vue-material.min.css"
import "vue-material/dist/theme/default.css"
import VueMaterial from "vue-material"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Dialog from 'bootstrap-vue-dialog'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false;

Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(Dialog)

new Vue({
  router,
  render: h => h(App),
  data: () => ({
    newCertificates: []
  })
}).$mount("#app");
