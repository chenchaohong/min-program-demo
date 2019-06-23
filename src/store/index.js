import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import jkdbb from './module/kx/jkdbb/index'

Vue.use(Vuex)

const isDebug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        jkdbb
    },
    strict: isDebug
})
