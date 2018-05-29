import Vue from 'vue';
import './foundation';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import VueAlert from '@vuejs-pt/vue-alert';
import Validation from './plugin/Validation.js';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Validation);
Vue.use(VueAlert);
Vue.use(VueResource);


Vue.http.interceptors.push((request, next) => {
    NProgress.start();
    next((response)=>{
        NProgress.done();
    });
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
});
