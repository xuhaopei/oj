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
// 拖动
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// 测试环境
import testenv from './testenv.js'

Vue.prototype.$types = types
Vue.prototype.$_env = testenv

Vue.component('vue-draggable-resizable', VueDraggableResizable)
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
