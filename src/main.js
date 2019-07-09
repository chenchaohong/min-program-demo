import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import apiManager from '@/services/Api'
import Toast from '../static/vant-weapp/toast/toast'
import Dialog from '../static/vant-weapp/dialog/dialog'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
Vue.prototype.$http = apiManager
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
