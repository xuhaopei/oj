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
		n: {},
		msg: {
			type: null,
			message: null,
			title: null,
		},
		nTemplate: {
			success: null,
			data: null,
			showMsg: false,
			msg: '',
			msgColor: 'error',
		},
		submission: {
			params: {
				subUserId: null,
				pid: null,
				subId: null,
				sourceCode: null,
			}
		}
	},
	mutations: {
		[types.SET_USER_INFO] (state, data) {
			state.userInfo = data
		},
		[types.SET_N_DATA] (state, data) {
			state.n[data.flag] = data.res
		},
		[types.TOGGLE_MSG] (state, flag) {
			state.n[flag].showMsg = !state.n.showMsg
		},
		[types.SET_MSG] (state, data) {
			state.msg = data
		},
		[types.SUBMISSION.SET_SUBMISSION_DETAIL_QUERY_PARAM] (state, data) {
			state.submission.params = {...state.submission.params, ...data}
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
			let d = null
			try {
				
				d = await axios[data.method](data.url, {
					params: data.params
				})
				
				
			} catch (error) {
				commit(types.SET_N_DATA, {
					res: {
						...state.nTemplate, ...{
							success: false,
							showMsg: true,
							msg: '',
					}},
					flag: data.flag
				})
				commit(types.SET_MSG, {...state.msg, ...{
					type: 'error',
					message: '网络错误',
				}},)
				// setTimeout(commit(types.TOGGLE_MSG, data.flag), 2000)
				return
			}
			if (d.data.status === 200) {
				commit(types.SET_N_DATA, {
					res: {
						...state.nTemplate, ...{
						success: true,
						data: d.data.data,
					}},
					flag: data.flag
				})
			} else {
				commit(types.SET_N_DATA, {
					res: {
						...state.nTemplate, ...{
							success: false,
							showMsg: true,
							msg: d.data.message,
					}},
					flag: data.flag
				})
				commit(types.SET_MSG, {...state.msg, ...{
					type: 'error',
					message: d.data.msg,
				}},)
				// setTimeout(commit(types.TOGGLE_MSG, data.flag), 2000)
			}
		},
	},
	modules: {
	}
})
