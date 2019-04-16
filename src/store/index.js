import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutationsTypes'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		userInfo: {
			isLogin: false,
			name: ''
		},
		n: {
			success: null,
			data: null,
			showMsg: false,
			msg: '',
			msgColor: 'error',
		},
	},
	mutations: {
		[types.SET_USER_INFO] (state, data) {
			state.userInfo = data
		},
		[types.SET_N_DATA] (state, data) {
			state.n = data
		},
		[types.TOGGLE_MSG] (state) {
			state.n.showMsg = !state.n.showMsg
		},
	},
	actions: {
		async getUserInfo ({commit, state}, data) {
			data
			const sleep = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms))
			}
			await sleep(1000)
			let _d = state.userInfo
			_d = {..._d, ...{
				name: '123'
			}}
			commit(types.SET_USER_INFO, _d)
		},
		async n ({commit, state}, data) {
			// this.$store.dispatch('n', {
			// 	method: 'get',
			// 	url: '',
			// 	params: {

			// 	}
			// })
			let d = null
			try {
				d = await axios[data.method](data.url, {
					params: data.params
				})
			} catch (error) {
				commit(types.SET_N_DATA, {
					...state.n, ...{
					success: false,
					showMsg: true,
					msg: '网络错误',
				}})
				setTimeout(commit(types.TOGGLE_MSG), 2000)
				return
			}
			if (d.data.status === 200) {
				commit(types.SET_N_DATA, {
					...state.n, ...{
					success: true,
					data: d.data.data,
				}})
			} else {
				commit(types.SET_N_DATA, {
					...state.n, ...{
					success: false,
					showMsg: true,
					msg: d.data.message,
				}})
				setTimeout(commit(types.TOGGLE_MSG), 2000)
			}
		},
	},
	modules: {
	}
})
