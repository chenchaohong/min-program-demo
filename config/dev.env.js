var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var mockFlag = true // 开启mock

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    MOCKFLAG: mockFlag,
    BASEURL: '"https://m.youxiangdao.com"',
    imgHost: '"https://m.youxiangdao.com"'
})
