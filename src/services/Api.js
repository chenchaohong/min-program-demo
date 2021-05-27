/* eslint-disable */ 
import Config from '@/config'
import { getPage } from '@/utils/index'
let Fly = require("flyio/dist/npm/wx")
let fly = new Fly()
let isReqLogin = false // 控制多个接口同时超时只调用一次登录

class Response {
    constructor (res) {
        this.rawData = res
        this.retCode = res.retCode
        this.messages = res.retMsg
        this.data = res.data
        this.wwRequestEntity = res.wwRequestEntity
    }

    resolve () {
        if (this.isSuccess()) {
            return Promise.resolve(this.rawData)
        }
        if (this.isError()) {
            let message = Config.defErrorMessage
        }
        return Promise.reject(this.messages)
    }

    isSuccess () {
        return this.retCode === 1
    }

    isError () {
        return this.retCode === 0
    }
}
class ApiManager {
    constructor (apiPrefix) {
        fly.config.baseURL = apiPrefix
        fly.config.timeout = 120000
        fly.interceptors.request.use(request => {
            isReqLogin = false
            const auths = mpvue.getStorageSync('auths') || null
            if (auths) {
                request.headers.accessToken = auths.accessToken
                // request.headers.userId = auths.userId
                request.headers.openId = auths.openId
            }
            return request
        })
        fly.interceptors.response.use(res => {
            // let response = new Response(res.data)
            if (res.data.retCode == '0000') {
                return Promise.resolve(res.data)
            } else if (res.data.retCode == '608') {
                // 没有权限跳转到授权页面
                setTimeout(() => {
                    this.wxLogin()
                }, 300)
            } else if (res.data.retCode == '666') {
                // 非认证用户
                wx.showToast({
                    title: res.data.retMsg,
                    icon: 'none'
                })
            }
            return Promise.reject(res.data)
        }, error => {
            const { response } = error
            if (!response) return Promise.reject(error)
            return Promise.reject(error)
        })
    }

    post (url, data, config) {
        if (process.env.mockFlag) {
            // 开启模拟数据
            console.log(`${url} : ${data && JSON.stringify(data)}`)
            let result = require(`./mock/api${url}`)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(result)
                }, 1000)
            })
        } else {
            return fly.post(url, data, config)
        }
    }

    get (url, data, config) {
        if (process.env.mockFlag) {
            // 开启模拟数据
            console.log(`${url} : ${data && JSON.stringify(data)}`)
            let result = require(`./mock/api${url}`)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(result)
                }, 1000)
            })
        } else {
            return fly.get(url, data, config)
        }
    }

    put (url, data) {
        return fly.put(url, data)
    }
    // 获取微信code
    wxLogin () {
        if (!isReqLogin) {
            isReqLogin = true
            mpvue.removeStorageSync('auths')
            wx.navigateTo({
                url: '/pages/other/auth/main' // 授权页面
            })
        }
    }
}

export function httpManager (baseURL) {
    return new ApiManager(process.env.apiPrefix)
}

export default httpManager()
