import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css';

Vue.use(VueMaterial)
Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App),
});
