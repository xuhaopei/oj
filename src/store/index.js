import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutationsTypes'
import axios from 'axios'
// import util from '../util'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		userInfo: {
			isLogin: false,
			name: '',
			// count: 1,
		},
		n: {},
		// 错误信息
		msg: {
			type: null,
			message: null,
			title: null,
		},
		// 网络请求数据模板
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
		// 编程问题模块
		problem: {
			description: {},
			subId: '',
			testcase: [],
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
		[types.PROBLEM.SET_TEST_CASE] (state, data) {
			state.problem.testcase = data
		},
		[types.PROBLEM.CLEAR_TEST_CASE] (state) {
			state.problem.testcase = []
		},
	},
	actions: {
		// 获取用户信息
		async getUserInfo ({commit, state},) {
			if (localStorage['token'] === undefined) {
				return {
					isLogin: false,
					name: '',
				}
			}
			let _d = state.userInfo
			try {
				let u = await axios.get('/account/token', 
					{ headers: {Authorization: localStorage.token} }
				)
				_d = {...state.userInfo, ...{
					name: u.data.data.username,
					isLogin: true,
				}}
				commit(types.SET_USER_INFO, _d)
			} catch (error) {
				commit(types.SET_USER_INFO, _d)
			}
		},
		// 网络请求
		async n ({commit, state}, data) {
			let d = null
			// 辅助对象，记录请求信息
			let auxiliary = {
				data: null,
				errMsg: null,
				isProcessedCatch: false,
				// type：1请求且处理成功，2请求错误，3请求成功但处理错误
				// 4请求错误且不处理
				type: null,
			}
			try {
				switch (data.method) {
					case 'get':{
						d = await axios.get(
							data.url, 
							{ params: data.params, headers: data.headers},
						)
						break
					}
					case 'post':{
						d = await axios.post(
							data.url, 
							data.params, 
							{headers: data.headers}
						)
						break
					}
					default:
						break
				}
			} catch (error) {
				// 设置不处理错误
				auxiliary.data = error
				auxiliary.isProcessedCatch = true
				if (typeof(data.stopHandleNetErr) == 'boolean' && data.stopHandleNetErr) {
					auxiliary.type = 4
				} else {
					auxiliary.type = 2
					// setTimeout(commit(types.TOGGLE_MSG, data.flag), 2000)
				}
				if (typeof(data.recall) == 'function') {
					data.recall()
				}
			}
			if (!auxiliary.isProcessedCatch) {
				if (d.data.status === 200) {
					auxiliary.type = 1
					auxiliary.data = d.data.data
				} else {
					auxiliary.type = 3
					auxiliary.errMsg = d.data.message
				}
			}

			if (auxiliary.type == 1) {
				commit(types.SET_N_DATA, {
					res: {
						...state.nTemplate, ...{
						success: true,
						data: auxiliary.data,
					}},
					flag: data.flag
				})
			} else if (auxiliary.type == 3) {
				if (typeof(data.stopHandleNetErr) == 'boolean' && data.stopHandleNetErr) {
					commit(types.SET_N_DATA, {
						res: {
							...state.nTemplate, ...{
								success: false,
								showMsg: true,
								data: d.data,
						}},
						flag: data.flag
					})
				} else {
					commit(types.SET_N_DATA, {
						res: {
							...state.nTemplate, ...{
								success: false,
								showMsg: true,
								msg: auxiliary.errMsg,
						}},
						flag: data.flag
					})
					commit(types.SET_MSG, {...state.msg, ...{
						type: 'error',
						message: auxiliary.errMsg,
					}},)
				}
			} else if (auxiliary.type == 2 || auxiliary.type == 4) {
				commit(types.SET_N_DATA, {
					res: {
						...state.nTemplate, ...{
						success: false,
						data: auxiliary.data,
					}},
					flag: data.flag
				})
				if (auxiliary.type == 2) {
					commit(types.SET_MSG, {...state.msg, ...{
						type: 'error',
						message: auxiliary.data.response.data.message,
					}},)
				}
			}
		},
	},
	modules: {
	}
})
