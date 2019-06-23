export const CacheUtil = {
    getStorage (key) {
        let data = wx.getStorageSync(key)
        if (!data) {
            return null
        } else {
            let now = new Date().getTime()
            if (now >= parseInt(data.expired)) {
                wx.removeStorageSync(key)
                return null
            } else {
                return data.data
            }
        }
    },
    setStorage (key, data, expired) {
        let time = new Date().getTime() + expired
        wx.setStorageSync(key, {data: data, expired: time})
    },
    removeStorage (key) {
        wx.removeStorageSync(key)
    }
}
