export function toast (message, duration = 1500, icon = 'none') {
    wx.showToast({
        title: message,
        icon: icon,
        duration: duration,
        mask: true
    })
}
