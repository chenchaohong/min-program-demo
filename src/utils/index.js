/* eslint-disable */
function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}
export const dateFormat = (date, fmt = 'yyyy-MM-dd') => {
    if (String(date) && String(date).indexOf('.') > -1) {
        date = date.split('.')[0]
    }
    // 处理苹果兼容性
    if (date) date = (date instanceof Date) ? date : new Date((typeof date == 'number') ? date : date.replace(/-/g, '/'))
    else return ''
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
        }
    })
    return fmt
}
// 计算两个时间相差时间数
export function getMathTime (d1, d2) {
    let d = new Date(d2).getTime() - new Date(d1).getTime()
    // 相差总分钟数
    let totalMinutes = Math.floor(d / (60 * 1000))
    // 计算出相差天数
    let days = Math.floor(d / (24 * 3600 * 1000))
    // 计算出小时数
    let leave1 = d % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))
    // 计算相差分钟数
    let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))
    // 计算相差秒数
    let leave3 = leave2 % (60 * 1000) // 计算小时数后剩余的毫秒数
    let seconds = Math.floor(leave3 / (60 * 1000))
    let date = {
        totalMinutes: totalMinutes,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
    return date
}
/**
 * 获取时间是 XXX/天/分钟/秒 之前
 * time: 传入日期
 * mathTime: 几天前的转为日期 不传默认 7
 * isMinute: 是否显示分钟 不传默认 false
 */
export function timeAgo (time, mathTime = 7, isMinute = false) {
    let timestamp = new Date(time.replace(/-/g, '/')).getTime()
    var mistiming = Math.round((Date.now() - timestamp) / 1000)
    // var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    // var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
    var arrr = ['天', '小时', '分钟', '秒']
    var arrn = [86400, 3600, 60, 1]
    for (var i = 0; i < arrn.length; i++) {
        var inm = Math.floor(mistiming / arrn[i])
        if (inm != 0) {
            if (i == 0 && inm > 364) { // 当 i = 0 时 替换为判断几天前 i非0时则依次为 小时/分钟/秒
                return dateFormat(time, !isMinute ? 'yyyy年MM月dd' : 'yyyy年MM月dd hh:mm')
            } else if (i == 0 && inm > Number(mathTime) && inm < 365) { // 当 i = 0 时 替换为判断几天前 i非0时则依次为 小时/分钟/秒
                return dateFormat(time, !isMinute ? 'MM月dd' : 'MM月dd hh:mm')
            } else {
                if (inm < 0) {
                    return '刚刚'
                } else {
                    return inm + arrr[i] + '前'
                }
            }
        }
    }
}
export function getPage () {
    let pages = getCurrentPages() // 微信自带方法 获取当前页面
    let currentPage = pages[pages.length - 1]
    return currentPage
}
export function getAuth () {
    if (mpvue.getStorageSync('auths')) {
        return true
    } else {
        wx.navigateTo({
            url: '/pages/other/auth/main' // 授权页面
        })
    }
}
/**
 * @description 金额数字格式化 numberFormat(str, fixed)
 */
export const numberFormat = (str, fixed) => {
    if (!str && str !== 0) return ''
    if (typeof str === 'string') str = str.replace(/,/g, '')
    let _thousandsRE = /\d{1,3}(?=(\d{3})+$)/g
    let _pointRe = /^(\d+)((\.\d+)?)$/
    let _replaceStr = '$&,'
    let _numberVal = str * 1
    let _string = _numberVal >= 0 ? String(str) : String(str).slice(1)
    let _fixed = fixed
    if (_fixed === undefined) fixed = 2
    _string = Number(_string).toFixed(fixed)
    let value = _string.replace(_pointRe, (str, s1, s2) => {
        return s1.replace(_thousandsRE, _replaceStr) + s2
    })
    return _numberVal >= 0 ? value : '-' + value
}
/**
 * @description 金额数字格式化 保留小数点位数
 */
export const numberFixed = (str, fixed) => {
    if (!str && str !== 0) return ''
    let _fixed = fixed
    if (_fixed === undefined) _fixed = 2
    return Number(str).toFixed(_fixed);
}
/**
 * @description 获取经纬度
 */
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                let localMarker = {longitude: res.longitude, latitude: res.latitude}
                mpvue.setStorageSync('localMarker', localMarker)
                resolve(localMarker)
            },
            fail: (res) => {
                console.log(res)
                if (res.errMsg == 'getLocation:fail authorize no response') {
                    wx.showModal({
                        content: '订单下单需要获取您的位置，请开启定位功能',
                        showCancel: true,
                        success: (res) => {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: (res) => {
                                        if (res.authSetting['scope.userLocation']) {
                                            getLocation()
                                        }
                                    },
                                    fail: (res) => {
                                        console.log(res)
                                    }
                                })
                            }
                        }
                    })
                } else if (res.errMsg == 'getLocation:fail auth deny') {
                    wx.showModal({
                        content: '订单下单需要获取您的位置，请开启定位功能',
                        showCancel: true,
                        success: (res) => {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: (res) => {
                                        if (res.authSetting['scope.userLocation']) {
                                            getLocation()
                                        }
                                    },
                                    fail: (res) => {
                                        console.log(res)
                                    }
                                })
                            }
                        }
                    })
                } else {
                    wx.showModal({
                        content: '系统没有打开定位功能，请前往设置打开定位，如有问题请前往"我的"联系客服',
                        showCancel: false,
                        success: (res) => {
                            console.log(res)
                        }
                    })
                }
            }
        })
    })
}
/**
 * @description 获取封装的分页参数
 */
export const getPageParam = (data) => {
    let page = {
        pageNo: Number(data.pageNo),
        pageSize: Number(data.pageSize),
        total: Number(data.total),
        hasNext: false
    }
    let totalPage = Math.ceil(page.total / page.pageNo)
    let hasNext = page.pageNo < totalPage
    page.hasNext = hasNext
    return page
}

export default {
    formatNumber,
    formatTime,
    dateFormat,
    getMathTime,
    timeAgo,
    getPage,
    getAuth,
    numberFormat,
    getLocation,
    getPageParam
}
