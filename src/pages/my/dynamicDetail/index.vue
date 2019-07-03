<template>
    <div class="page">
        <div class="head">
            <div class="left">
                <img :src="articleDetail.userImgUrl" alt="">
                <div class="name">
                    <span class="title">{{articleDetail.nickName}}</span>
                    <span class="desc">{{articleDetail.slogan}} · {{articleDetail.followeds}} 人关注</span>
                </div>
            </div>
            <followBtn :followId="articleDetail.userId" :followStatus="articleDetail.followStatus" type="0"></followBtn>
        </div>
        <div class="img">
            <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
                <block v-for="(item, index) in articleDetail.imgUrl" :index="index" :key="key">
                    <swiper-item>
                        <image :src="item" class="slide-image" mode="aspectFill"/>
                    </swiper-item>
                </block>
            </swiper>
        </div>
        <div class="contant">
            <span class="title">{{articleDetail.title}}</span>
            <span class="desc">{{articleDetail.content}}</span>
            <span class="time">{{articleDetail.createTime}}</span>
        </div>
        <div class="common">
            <span>{{articleDetailInfo.leavingMsgs}} 回应</span>
            <span> · {{articleDetailInfo.likes}} 喜欢</span>
            <span> · {{articleDetailInfo.read}} 查看</span>
        </div>
        <div class="dynamic">
            <van-tabs sticky tab-class="m-tab-class">
                <van-tab title="回应">
                    <dynamicComment :dynamicId="articleDetail.articleId"></dynamicComment>
                </van-tab>
                <van-tab title="喜欢">
                    <dynamicLike :dynamicId="articleDetail.articleId"></dynamicLike>
                </van-tab>
            </van-tabs>
        </div>
        <div class="dynamic-bottom">
            <div class="left">
                <img src="/static/images/kanade.png" alt="">
                <input class="van-field__input van-field__input" type="text" />
            </div>
            <div class="right">
                <div class="item" @click="changeLike">
                    <img v-if="!articleDetailInfo.beLiked" src="/static/images/like.png" alt="">
                    <img v-else src="/static/images/like2.png" alt="">
                    <span>喜欢</span>
                </div>
                <div class="item" @click="share(articleDetail)">
                    <img src="/static/images/share.png" alt="">
                    <span>转发</span>
                </div>
                <div class="item" @click="report(articleDetail)">
                    <img src="/static/images/report.png" alt="">
                    <span>举报</span>
                </div>
            </div>
        </div>
        <van-toast id="van-toast" />
    </div>
</template>

<script>
import followBtn from '@/components/follow-btn'
import dynamicComment from '@/components/dynamic-comment'
import dynamicLike from '@/components/dynamic-like'
export default {
    components: {
        followBtn,
        dynamicComment,
        dynamicLike
    },
    data () {
        return {
            articleId: '',
            articleDetail: {},
            articleDetailInfo: {
                beLiked: false,
                leavingMsgs: 0,
                likes: 0,
                read: 0
            }
        }
    },
    created () {
    },
    mounted () {
        this.articleId = this.$route.query.articleId
        this.detail()
    },
    methods: {
        detail () {
            this.$http.post('/user/article/detail', {
                articleId: this.articleId
            }).then(data => {
                this.articleDetail = data.data
                this.articleDetailInfo = data.data.articleDetailInfo
            })
        },
        changeLike () {
            let action = !this.articleDetailInfo.beLiked
            this.$http.post('/user/article/like', {
                objectId: this.articleId,
                action: action,
                type: '1' // 1-文章 2-评论
            }).then(() => {
                if (action) {
                    this.articleDetailInfo.likes += 1
                } else {
                    this.articleDetailInfo.likes -= 1
                }
                this.articleDetailInfo.beLiked = action
            })
        },
        share (e) {
            this.$toast('敬请期待')
        },
        report (e) {
            this.$toast('敬请期待')
        }
    }
}
</script>

<style lang="less" scoped>
.head {
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        img {
            height: 60px;
            width: 60px;
        }
        .name {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            span {
                font-size: 14px;
                height: 30px;
                line-height: 30px;
            }
            span:nth-child(2) {
                color: #888;
            }
        }
    }
}
.img {
    margin: 10px 0;
    swiper {
        text-align: center;
        height: 200px;
    }
}
.contant {
    padding-bottom: 20px;
    span {
        margin: 10px 0;
        display: block;
    }
    .title {
        font-size: 16px;
        font-weight: bold;
    }
    .desc {
        font-size: 14px;
        color: rgb(66, 65, 65);
    }
    .time {
        font-size: 12px;
        color: #888;
    }
}
.common {
    border-top: 1px solid #888;
    padding-top: 10px;
    font-size: 14px;
    color: #888;
}
.dynamic {
    padding-top: 20px;
}
div /deep/ .m-tab-class {
    width: 100px;
    flex:none;
}
.dynamic-bottom {
    position: fixed;
    display: flex;
    background: #000;
    height: 40px;
    line-height: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    .left {
        display: flex;
        align-items:center;
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 15px;
        }
        input {
            flex: 1;
            background: #888;
            padding: 2px 5px;
            height:20px;
            line-height: 20px;
            min-height:20px;
            font-size:14px;
        }
    }
    .right {
        display: flex;
        justify-content: space-around;
        .item {
            display: flex;
            flex-direction: column;
            padding-top: 5px;
            width: 60px;
            text-align: center;
            color: #fff;
            img {
                height: 16px;
                width: 16px;
                margin:auto;
            }
            span {
                font-size: 12px;
                height: 18px;
                line-height: 18px;
            }
        }
    }
}
.like-active {
    color: red;
}
</style>
