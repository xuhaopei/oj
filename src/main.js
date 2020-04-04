import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// 状态管理
import types from './store/mutationsTypes'
import store from './store'
// muse ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// import 'muse-ui-loading/dist/muse-ui-loading.css'
// import Loading from 'muse-ui-loading'
import Helpers from 'muse-ui/lib/Helpers'
// 工具
import util from './util'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import axios from 'axios'
let axios_Base = axios.create({          // 设置axios的基本格式
	baseURL: 'http://47.115.54.133:8080',  // 设置请求映射 例如你发出请求的url为(/api)，那么它在页面上就会进行转换，转换成 http://47.115.54.133:8080/api。如果没有设置则会转换成http://localhost:8080/api 这是为上线服务的。
  timeout: 1000,
  responseType: 'json',
	headers: {
  }
  });
Vue.prototype.$axios = axios_Base;      // 将该对象注入Vue，全局调用。
// 测试环境
import testenv from './testenv.js'
Vue.prototype.$types = types
Vue.prototype.$_env = testenv
Vue.prototype.$util = util
Vue.use(Helpers)
Vue.use(router)
Vue.use(MuseUI)
// Vue.use(Loading)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// optionally import default styles
