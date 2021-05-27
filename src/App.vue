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
    }
}
</script>

<style lang="less">
page {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;

    // padding-top: constant(safe-area-inset-top); // 为导航栏+状态栏的高度 88px
    // padding-top: env(safe-area-inset-top);
    // padding-left: constant(safe-area-inset-left); // 如果未竖屏时为0
    // padding-left: env(safe-area-inset-left);
    // padding-right: constant(safe-area-inset-right); // 如果未竖屏时为0
    // padding-right: env(safe-area-inset-right);
    // padding-bottom: constant(safe-area-inset-bottom); // 为底下圆弧的高度 34px
    // padding-bottom: env(safe-area-inset-bottom);
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
hr {
    background: #F6F6F6;
    height: 10px;
    margin: 0 -15px;
}
/* 超出隐藏 begin */
.ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.ellipsis--l2, .ellipsis--l3 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
}
.ellipsis--l2 {
    -webkit-line-clamp: 2;
}
.ellipsis--l3 {
    -webkit-line-clamp: 3;
}
/* 超出隐藏 end */
/* this rule will be remove */
* {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
}
</style>
