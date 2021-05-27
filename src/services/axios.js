import axios from 'axios'

axios.defaults.baseURL = process.env.BASEURL

// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    config.headers = {
    }
    // mpvue.showLoading()
    return config
}, error => {
    mpvue.showToast({ icon: 'none', title: '网络繁忙' })
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    mpvue.hideLoading()
    return response.data
}, error => {
    mpvue.showToast({ icon: 'none', title: '网络繁忙,请稍后重试' })
    return Promise.reject(error)
})

// axios自定义请求
axios.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
        mpvue.request({
            url: axios.defaults.baseURL + config.url,
            data: config.method === 'get' ? config.params : config.data,
            method: config.method,
            success: (res) => {
                return resolve(res)
            },
            fail: (res) => {
                return reject(res)
            }
        })
    })
}

// 重新封装
axios.get = (url, data) => {
    return new Promise(function (resolve, reject) {
        if (process.env.MOCKFLAG) {
            // 开启模拟数据
            console.log(`${url} : ${data && JSON.stringify(data)}`)
            let result = require(`./mock/api${url}`)
            setTimeout(() => {
                resolve(result)
            }, 1000)
        } else {
            axios({
                method: 'get',
                url: url,
                params: data
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}
axios.post = (url, data) => {
    return new Promise(function (resolve, reject) {
        if (process.env.MOCKFLAG) {
            // 开启模拟数据
            console.log(`${url} : ${data && JSON.stringify(data)}`)
            let result = require(`./mock/api${url}`)
            setTimeout(() => {
                resolve(result)
            }, 1000)
        } else {
            axios({
                method: 'post',
                url: url,
                data: data
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}

// 分页
axios.page = function (url, params) {
    params.pageSize = params.pageSize || 10
    return new Promise(function (resolve, reject) {
        axios({
            method: 'get',
            url: url,
            params: params
        }).then(res => {
            let page = {
                pageNo: Number(params.pageNo), // 当前页数/下一页页数
                pageSize: Number(res.pageSize || 10), // 每页显示页数
                totalCount: Number(res.total || 0)
            }
            let response = {
                retCode: res.retCode,
                retMsg: res.retMsg,
                data: res.data || [],
                page: page
            }
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}

export default axios
