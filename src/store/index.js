import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutationsTypes'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
	},
	mutations: {
		[types.CHANGE_BLOCK_SIZE] (state, size) {
			this.state.size = size
		},
	},
	actions: {
	},
	modules: {
	}
})
