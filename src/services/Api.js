import Config from '@/config'
// import {CacheUtil} from '@/services/WxApi'
import { getPage } from '@/utils/index'
let Fly = require("flyio/dist/npm/wx")
let fly = new Fly()
let isReqLogin = false // 控制多个接口同时超时只调用一次登录

class Response {
    constructor (res) {
        this.rawData = res
        this.code = res.code
        this.messages = res.messages
        this.data = res.data
        this.wwRequestEntity = res.wwRequestEntity
    }

    resolve () {
        if (this.isSuccess()) {
            return Promise.resolve(this.rawData)
        }
        if (this.isError()) {
            let message = Config.defErrorMessage
            console.log(message)
        }
        return Promise.reject(this.messages)
    }

    isSuccess () {
        return this.code === 1
    }

    isError () {
        return this.code === 0
    }
}
class ApiManager {
    constructor (apiPrefix) {
        fly.config.baseURL = apiPrefix || Config.apiPrefix
        fly.config.timeout = 120000
        fly.interceptors.request.use(request => {
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.userInfo']) { // 未授权，跳到授权页面
                        let url = getPage().route // 当前页面 用于授权后跳转
                        wx.showLoading({
                            title: ''
                        })
                        wx.redirectTo({
                            url: '/pages/auth/main?backPage=' + url // 授权页面
                        })
                    }
                }
            })
            const auths = mpvue.getStorageSync('auths') || null
            if (auths) {
                request.headers.accessToken = auths.accessToken
                request.headers.userId = auths.userId
                request.headers.openId = auths.openId
            }
            return request
        })
        fly.interceptors.response.use(res => {
            let response = new Response(res.data)
            if (res.data.code == '0000') {
                return Promise.resolve(response)
            } else if (res.data.code == '608') {
                // 没有权限跳转到授权页面
                wx.showLoading()
                this.wxLogin()
            }
            return Promise.reject(res)
        }, error => {
            const { response } = error
            if (!response) return Promise.reject(error)
            return Promise.reject(error)
        })
    }

    post (uri, data, config) {
        return fly.post(uri, data, config)
        if (process.env.NODE_ENV === 'production') {
            return fly.post(uri, data, config)
        } else {
            console.log(`url: ${uri}`)
            console.log(`param: ${data && JSON.stringify(data)}`)
            let result = require(`./mock${uri}`)
            return Promise.resolve(result)
        }
    }

    get (uri, data) {
        return fly.get(uri, data)
    }

    put (uri, data) {
        return fly.put(uri, data)
    }
    // 获取微信code
    wxLogin () {
        if (!isReqLogin) {
            isReqLogin = true
            wx.login({
                success: (res) => {
                    this.post('/user/accessToken', {
                        authorizationCode: res.code
                    }).then(data => {
                        isReqLogin = false
                        mpvue.setStorageSync('auths', data.data)
                        wx.hideLoading()
                        // 刷新当前页面
                        getPage().onReady()
                    }).catch(err => {
                        isReqLogin = false
                        wx.showToast({
                            title: err.message || '获取会话异常',
                            icon: 'none'
                        })
                        wx.hideLoading()
                    })
                },
                fail: (res) => {
                    wx.showToast({
                        title: '微信登陆失败',
                        icon: 'none'
                    })
                    console.log(res)
                }
            })
        }
    }
}

export function httpManager (baseURL) {
    return new ApiManager(baseURL)
}

export default httpManager()
