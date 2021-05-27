function showLoading () {
    wx.showLoading({
        title: '加载中',
        mask: true
    })
}

function hideLoading () {
    wx.hideLoading()
}

export default {
    showLoading,
    hideLoading
}
