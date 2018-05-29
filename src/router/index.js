import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '@/components/Home';
import Detail from '@/components/Detail';
import Upcoming from '@/components/Upcoming';

Vue.component('upcoming', Upcoming);

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // routes
    { name: 'home', path: '/', component: Home },
    { name: 'detail', path: '/detail/:id', component:Detail}
  ],
});
