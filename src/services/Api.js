import Config from '@/config'
import {CacheUtil} from '@/services/WxApi'
let Fly = require("flyio/dist/npm/wx")
let fly = new Fly()

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
            const token = CacheUtil.getStorage('token')
            if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                request.headers.Authorization = token
            }
            return request
        })
        fly.interceptors.response.use(res => {
            if (res.status >= 200 && res.status < 300) {
                let response = new Response(res.data)
                return response.resolve()
            }
            return Promise.reject(res)
        }, error => {
            const { response } = error
            if (!response) return Promise.reject(error)
            if (response.status === 401) {
                // 没有权限跳转到授权页面
                return Promise.reject(error)
            }
            return Promise.reject(error)
        })
    }
    post (uri, data, config) {
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
}

export function httpManager (baseURL) {
    return new ApiManager(baseURL)
}

export default httpManager()
