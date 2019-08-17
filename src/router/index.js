import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const defalutRouter = [
  {
    path: '/',
    name: 'index',
    component: r => require(['../components/index/index.vue'], r),
  },
  {
    path: '/allProblems',
    name: 'allProblems',
    component: r => require(['../components/problem/allProblems.vue'], r),
  },
  {
    path: '/quizList',
    name: 'quizList',
    component: r => require(['../components/quiz/quizList.vue'], r),
  },
  {
    path: '/quiz/:id',
    name: 'quiz',
    component: r => require(['../components/quiz/quiz.vue'], r),
    props: true,
  },
  {
    path: '/completionProblem/:id',
    name: 'completionProblem',
    component: r => require(['../components/problem/completionProblem.vue'], r),
  },
  {
    path: '/problems/:id',
    name: 'problems',
    component: r => require(['../components/problem/problems.vue'], r),
    props: true,
    children: [
      { path: 'history', component: r => require(['../components/problem/history.vue'], r) },
      { path: 'testcase',component: r => require(['../components/problem/testcase.vue'], r) },
      { path: 'submissions', component: r => require(['../components/problem/problemSubmissions.vue'], r) },
    ]
  },
  {
    path: '/objectivetProblem/:id',
    name: 'objectivetProblem',
    component: r => require(['../components/problem/objectivetProblem.vue'], r),
    props: true,
    // children: [
    //   { path: 'history', component: r => require(['../components/problem/history.vue'], r) },
    // ]
  },
  {
    path: '/submissions/detail/:id',
    name: 'submissionsDetail',
    component: r => require(['../components/problem/submissionsDetail.vue'], r),
    props: true,
  },
  {
    path: '/test',
    name: 'test',
    component: r => require(['../components/test.vue'], r),
  },
];

export default new Router({
  routes: defalutRouter,
  mode: 'history',
  linkActiveClass: '',
})
