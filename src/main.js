import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import apiManager from '@/services/Api'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
Vue.prototype.$http = apiManager
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
