import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import axios from '@/services/axios'
// import { toast } from '@/components/toast'
// import dialog from '@/components/dialog'
// import { numberFixed } from '@/utils/index'

Vue.use(MpvueRouterPatch)
Vue.prototype.$http = axios
// Vue.config.productionTip = false
// Vue.prototype.$imgHost = process.env.imgHost
// Vue.prototype.$toast = toast
// Vue.prototype.$showLoading = dialog.showLoading
// Vue.prototype.$hideLoading = dialog.hideLoading
// Vue.prototype.$numberFixed = numberFixed

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
