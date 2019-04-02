import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index.vue'
import test from '../components/test.vue'

Vue.use(Router);

const defalutRouter = [
  {
    path: '/',
    name: 'index',
    component: index,
    // children: [
    //   { path: '5', component: h2 },
    // ]
  },
  {
    path: '/test',
    name: 'test',
    component: test,
  },
];

export default new Router({
  routes: defalutRouter,
  mode: 'history',
})
