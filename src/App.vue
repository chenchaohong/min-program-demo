<script>
export default {
    created () {
    // 调用API从本地缓存中获取数据
    /*
        * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
        * 微信：mpvue === wx, mpvuePlatform === 'wx'
        * 头条：mpvue === tt, mpvuePlatform === 'tt'
        * 百度：mpvue === swan, mpvuePlatform === 'swan'
        * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
        */

        let logs
        if (mpvuePlatform === 'my') {
            logs = mpvue.getStorageSync({key: 'logs'}).data || []
            logs.unshift(Date.now())
            mpvue.setStorageSync({
                key: 'logs',
                data: logs
            })
        } else {
            logs = mpvue.getStorageSync('logs') || []
            logs.unshift(Date.now())
            mpvue.setStorageSync('logs', logs)
        }
    },
    log () {
        console.log(`log at:${Date.now()}`)
    }
}
</script>

<style lang="less">
.page {
    padding: 10px;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.my-search {
    border: 1px solid #eee;
    height: 30px;
    margin:10px 16px;
    border-radius: 20px;
    color: #999;
    display: flex;
    line-height: 30px;
    padding-left: 10px;
    .placeholder {
        padding-left: 5px;
        font-size: 14px;
        align-items: center;
    }
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
