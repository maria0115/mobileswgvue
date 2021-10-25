import Vue from 'vue'
import App from './App.vue'
// import { sync } from 'vuex-router-sync';
import { store } from './store/index.js';
import router from './router/index.js';
// import VueCookies from 'vue-cookies';

import jQuery from 'jquery'
global.$ = jQuery
import 'babel-polyfill';
import config from "./config/config.json";
import VDragged from 'v-dragged'
// sync(store, router, { moduleName: 'header' } )
Vue.use(VDragged) 
// Vue.use(VueCookies);
Vue.config.productionTip = false;
// import VTooltip from 'v-tooltip'
// Vue.prototype.mainmenu = config.config.main.menuportlet;
Vue.prototype.customFolder = "";
// Vue.use(VTooltip)
// import Popover from 'vue-js-popover'
// Vue.use(Popover, { tooltip: true })
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue)
// async function get(){
//   var store = await import(`./store/index.js`);
//   var router = await import(`./router/index.js`);
//   var r = await router.router();
//   var s = await store.getstore();
//   console.log(s,"store");
//   console.log(r,"router");
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


// }
// get();

// console.log(get());
