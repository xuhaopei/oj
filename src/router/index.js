import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index.vue'
import problems from '../components/problem/problems.vue'
import objectivetProblem from '../components/problem/objectivetProblem.vue'
import history from '../components/problem/history.vue'
import problemSubmissions from '../components/problem/problemSubmissions.vue'
import allProblems from '../components/problem/allProblems.vue'
import test from '../components/test.vue'
import submissionsDetail from '../components/problem/submissionsDetail.vue'
import quizList from '../components/quiz/quizList.vue'
import quiz from '../components/quiz/quiz.vue'

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
    path: '/quizList',
    name: 'quizList',
    component: quizList,
  },
  {
    path: '/quiz/:id',
    name: 'quiz',
    component: quiz,
    props: true,
  },
  {
    path: '/problems/:id',
    name: 'problems',
    component: problems,
    props: true,
    children: [
      { path: 'history', component: history },
      { path: 'submissions', component: problemSubmissions },
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
    path: '/submissions/detail/:id',
    name: 'submissionsDetail',
    component: submissionsDetail,
    props: true,
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
