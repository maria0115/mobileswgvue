import Vue from 'vue'
import App from './App.vue'
// import { sync } from 'vuex-router-sync';
import { store } from './store/index.js';
import router from './router/index.js';
// import VueCookies from 'vue-cookies';

import jQuery from 'jquery'
global.$ = jQuery
// jQuery.mobile.loader.prototype.options.disabled = true;
import 'babel-polyfill';
import config from "./config/config.json";
import VDragged from 'v-dragged'
import pullto from "./mobile/js/pullto.js";
global.PullToRefresh = pullto;
// sync(store, router, { moduleName: 'header' } )
Vue.use(VDragged) 

// import VueHead from 'vue-head';

// Vue.use(VueHead)

import Meta from 'vue-meta'
import common from "@/mixin/common.js";
Vue.use(Meta);

// Vue.use(VueCookies);
Vue.config.productionTip = false;
// import VTooltip from 'v-tooltip'
// Vue.prototype.mainmenu = config.config.main.menuportlet;
Vue.prototype.customFolder = "";
Vue.mixin(common)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


// }
// get();

// console.log(get());
