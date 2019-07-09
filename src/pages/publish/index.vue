<template>
    <div class="page">
        <div class="top">
            <div class="left">
                <img :src="personInfo.imgUrl" alt="">
                <div class="desc">
                    <span>{{personInfo.nickName}}</span>
                    <span>{{personInfo.slogan}}</span>
                </div>
            </div>
            <div class="right">
                <van-button type="default" size="mini" round @click="toHome">取消</van-button>
                <van-button type="info" size="mini" round @click="submit">发布</van-button>
            </div>
        </div>
        <div class="contant">
            <div class="part">
                <textarea :value="value" class="weui-textarea" placeholder="有趣的文字和精致的照片能获得更多的喜欢与关注哦~" maxlength="200" placeholder-style="color:#b3b3b3;font-size:14px;" @input="onChange" />
                <span class="count">{{count}}/200</span>
            </div>
            <upload :list="imgList" @change="uploadChange"></upload>
        </div>
        <van-toast id="van-toast" />
    </div>
</template>

<script>
import upload from '@/components/upload'
export default {
    components: {
        upload
    },
    data () {
        return {
            personInfo: {},
            value: '',
            count: 0,
            imgList: []
        }
    },
    onShow () {
        this.clearAll()
    },
    created () {
    },
    mounted () {
        this.getPersonInfo()
    },
    methods: {
        onChange (e) {
            this.value = e.mp.detail.value
            this.count = this.value.length
        },
        uploadChange (e) {
            this.imgList = e
        },
        toHome () {
            this.clearAll()
            this.$router.push({
                path: '/pages/association/main',
                isTab: true
            })
        },
        getPersonInfo () {
            this.$http.post('/user/baseInfo/get', {
            }).then(data => {
                this.personInfo = data.data
            })
        },
        submit () {
            if (!this.value && this.imgList.length < 1) {
                this.$toast('请输要发布内容或图片')
                return
            }
            this.$http.post('/user/article/publish', {
                content: this.value,
                imgIds: this.imgList
            }).then(data => {
                this.$toast({
                    type: 'success',
                    message: '信息发布成功',
                    duration: 1500,
                    onClose: () => {
                        this.clearAll()
                        // 设置跳转我页面后刷新
                        mpvue.setStorageSync('isShow', true)
                        this.$router.push({
                            path: '/pages/my/main',
                            isTab: true
                        })
                    }
                })
            })
        },
        clearAll () {
            this.value = ''
            this.count = 0
            this.imgList = []
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    background: #eee;
    padding: 0;
    padding-bottom: 10px;
    min-height: 100vh;
}
.top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-top: 1px solid #eee;
    background: #fff;
    padding: 10px;
    align-items: center;
    .left {
        display: flex;
        img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
        }
        .desc {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            span {
                line-height: 20px;
                font-size: 16px;
            }
            span:nth-child(2) {
                color: #888;
                font-size: 14px;
            }
        }
    }
    .right {
        van-button {
            margin-left: 10px;
        }
    }
}
.contant {
    margin: 0 10px;
    .part {
        background: #fff;
        border-radius: 5px;
        textarea {
            width: auto;
            padding: 10px 10px 0;
            height: 180px;
        }
        .count {
            display: block;
            padding: 10px;
            text-align: right;
            font-size: 12px;
            color: #b3b3b3;
        }
    }
}
</style>
