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
		},
		problem: {
			description: {},
			subId: '',
		},
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
		[types.PROBLEM.SET_DESCRIPTION] (state, data) {
			state.problem.description = {...state.problem.description, ...data}
		},
		[types.PROBLEM.SET_CURRENT_SUBMISSION_RES_ID] (state, data) {
			state.problem.subId = data
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
				switch (data.method) {
					case 'get':{
						d = await axios.get(data.url, {
							params: data.params,
						}, {headers: data.headers})
						break
					}
					case 'post':{
						d = await axios.post(data.url, data.params, 
							{headers: data.headers})
						break
					}
				
					default:
						break
				}


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
