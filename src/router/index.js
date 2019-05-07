import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index.vue'
import problems from '../components/problem/problems.vue'
import objectivetProblem from '../components/problem/objectivetProblem.vue'
import history from '../components/problem/history.vue'
import allProblems from '../components/problem/allProblems.vue'
import test from '../components/test.vue'

Vue.use(Router);

const defalutRouter = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/allProblems',
    name: 'allProblems',
    component: allProblems,
  },
  {
    path: '/problems/:id',
    name: 'problems',
    component: problems,
    props: true,
    children: [
      { path: 'history', component: history },
    ]
  },
  {
    path: '/objectivetProblem/:id',
    name: 'objectivetProblem',
    component: objectivetProblem,
    props: true,
    // children: [
    //   { path: 'history', component: history },
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
  linkActiveClass: '',
})
