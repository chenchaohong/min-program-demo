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
export function getPage () {
    let pages = getCurrentPages() // 微信自带方法 获取当前页面
    let currentPage = pages[pages.length - 1]
    return currentPage
}

export default {
    formatNumber,
    formatTime,
    dateFormat,
    getPage
}
