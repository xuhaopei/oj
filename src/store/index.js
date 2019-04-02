import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutationsTypes'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		userInfo: {
			isLogin: false,
			name: ''
		},
	},
	mutations: {
		[types.SET_USER_INFO] (state, data) {
			this.state.userInfo = data
		},
	},
	actions: {
		async getUserInfo ({commit, state}, data) {
			data
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
			}
			await sleep(2000)
			let _d = state.userInfo
			_d = {..._d, ...{
				name: '123'
			}}
			commit(types.SET_USER_INFO, _d)
		},
	},
	modules: {
	}
})
