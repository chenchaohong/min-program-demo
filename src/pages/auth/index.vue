<!-- 授权  -->
<template>
    <div class="auth">
        <img :src="defImg" alt="">
        <div class="contant">
            <span>申请获取以下权限</span>
            <span>获得你的公开信息（昵称、头像等）</span>
            <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
        </div>
    </div>
</template>

<script>
import { getPage } from '@/utils/index'
export default {
    name: 'auth',
    props: [],
    data () {
        return {
            showAuth: false,
            defImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAOVBMVEUAAAAZrRgVrxUarRgarRgQrxAZrRgarBgarBkarRYYqxgZrRgZrRkarRkYrxgYrRgYrhgZrBkarRlytzC6AAAAEnRSTlMAwDCA8BDgoM9QQHCQ0CBgP7B4D/eOAAAB9klEQVRYw62X29KrIAxGCYSDAmrz/g+7nf0XFFOgStdVD5MlCX4Oil8xBUD6GoQwFeUz0G1gPuo9PWIdq9/x7/XTY/66gOcC+D9/GmDaBWFEEFIHIz0gcQDAAsS+AHcBXXh5mfZXz8p0DFcBKi1KpL0j2Ms5C3wrMLKWNPxKELWoIWNLwOs5OrYEvJ6zYE+Q+lfGrEfzDsNbLDsC9S5ZU8jyZcP7S2gKTLrmK9ly0CGNAVuCUDxcVnFa9iv9FVqC4+4FIisSiigueS8bAnPe8+W8fckst23DugBEiy04IgMApiqwjfLVEPi8EB8/ClT9BnJkl/IXe0cwYZT1ZPRbWCvqcBW4SgjJV82lgJaPEcT6cH0p+HylEEUdYFlgLKeEvnSKp5MpaFlQW0JIKZDHmPGYly0FyKeQnwtzFujTYmUpIKfZFpz6RZnTlbQilgKCi2GKp/3gn3ZtIeBrUCDaqKuAnBwUkBkRsEh40xEAF0x/z560C0uzXhMTYDoxOlA75JuClQvs5cDpmgLDBQGoxDdHyAQcrE9hppaA3VsMiVzQN/D6voCcrJxY2oLOuQmpJ+ic3CwT9HBh2qSQ22qdmfcWmOAWMOtCgHQb63J7vzhs2xGBHX7hSLF6SPzNS5dQA699QwZ/SveDOZi5DJiFW/tvJ/Ej/gG29aVQvCxCIwAAAABJRU5ErkJggg=='
        }
    },
    created () {
    },
    mounted () {
        wx.hideLoading()
    },
    methods: {
        bindGetUserInfo (e) {
            if (e.mp.detail.userInfo) {
                let url = getPage().options.backPage ? getPage().options.backPage : 'pages/association/main'
                mpvue.setStorageSync('userInfo', e.mp.detail.userInfo)
                // 跳转tab页面后刷新
                mpvue.setStorageSync('isShow', true)
                this.$router.push({ path: `/${url}`, reLaunch: true })
            } else {
                console.log('用户按了拒绝按钮')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.auth {
    padding-top: 40px;
    text-align: center;
    img {
        width: 64px;
        height: 64px;
    }
    .contant {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #eee;
        margin: 30px;
        padding-top: 20px;
        text-align: left;
        span {
            height: 45px;
            line-height: 45px;
            font-size: 16px;
        }
        span:nth-child(2) {
            font-size: 14px;
            color: #888;
        }
        button {
            width: 100%;
            margin-top: 30px;
            border-radius: 20px;
            background: #1aad19;
            color: #fff;
        }
    }
}
</style>
