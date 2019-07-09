<!-- 推荐/关注 文章 -->
<template>
    <div class="dynamic">
        <div class="top">
            <div class="left" @click="toFriend(data.userId)">
                <img src="/static/images/kanade.png" alt="">
                <span class="name">{{data.actualName}}</span>
                <span class="time">{{ntime}}</span>
            </div>
            <span class="like">
                <followBtn :followId="data.userId" :followStatus="data.followStatus" type="0"></followBtn>
            </span>
        </div>
        <div class="contant" @click="toActicle(data.articleId)">
            <div class="top">
                <span class="title">{{data.title}}</span>
            </div>
            <div class="contant-bottom">
                <div class="desc">
                    <span>{{data.content}}</span>
                    <div class="bestCom" @click="toFriend(data.articleInfo.goodCommentId)">
                        <label class="name">{{data.articleInfo.goodCommentName}}：</label>
                        <label class="com">{{data.articleInfo.goodComment}}</label>
                    </div>
                </div>
                <img :src="data.imgUrl[0]" alt="">
            </div>
        </div>
        <div class="bottom">
            <div class="left" @click="toActicle(data.articleId)">
                <img src="/static/images/img-w.png" alt="">
                <span>添加评论...</span>
            </div>
            <div class="right">
                <div class="m-icon" :class="{'like-active': data.clickLiked == '1' }" @click="changeLike(data)"><!-- 是否已点喜欢 0否 1是 -->
                    <van-icon name="like" />
                    <span class="num">{{data.totalLikeCount}}</span>
                </div>
                <div class="m-icon" @click="toActicle(data.articleId)">
                    <van-icon name="more" />
                    <span class="num">{{data.totalLeavingMsgCount}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import followBtn from '@/components/follow-btn'
export default {
    name: 'dynamic',
    props: ['data'],
    components: {
        followBtn
    },
    data () {
        return {
            isLike: true,
            ntime: ''
        }
    },
    created () {
        this.ntime = this.timeForm(this.data.createTime)
    },
    methods: {
        changeLike (e) {
            let action = e.clickLiked == '0' ? '1' : '0'
            this.$http.post('/user/article/like', {
                objectId: e.articleId,
                action: action,
                type: '1' // 1-文章 2-评论
            }).then(() => {
                if (action == '1') {
                    e.totalLikeCount += 1
                } else {
                    e.totalLikeCount -= 1
                }
                e.clickLiked = action
            })
        },
        timeForm (time) {
            let timestamp = new Date(time.replace(/-/g, '/')).getTime()
            var mistiming = Math.round((Date.now() - timestamp) / 1000)
            var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
            var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
            for (var i = 0; i < arrn.length; i++) {
                var inm = Math.floor(mistiming / arrn[i])
                if (inm != 0) {
                    return inm + arrr[i] + '前'
                }
            }
        },
        toFriend (id) {
            this.$router.push({
                path: '/pages/person/main',
                query: {
                    userId: id
                }
            })
        },
        toActicle (id) {
            this.$router.push({
                path: '/pages/my/dynamicDetail/main',
                query: {
                    articleId: id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.dynamic {
    .top {
        display: flex;
        justify-content: space-between;
        .left {
            height: 30px;
            line-height: 30px;
            display: flex;
            span {
                padding-left: 10px;
            }
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            .name {
                font-size: 18px;
            }
            .time {
                font-size: 14px;
                color: #888;
            }
        }
        .like {
            margin-right: 5px;
        }
    }
    .contant {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        .top {
            .title {
                font-weight: bold;
                height: 25px;
                font-size: 16px;
            }
        }
        .contant-bottom {
            display: flex;
            .desc {
                flex: 1;
                span {
                    height: 40px;
                    display: -webkit-box ;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    font-size: 14px;
                }
                .bestCom {
                    font-size: 13px;
                    height: 20px;
                    line-height: 20px;
                    padding-left: 5px;
                    margin-top: 8px;
                    background: #eee;
                    padding-right: 3px;
                    display: flex;
                    .name {
                        font-weight: bolder;
                    }
                    .com {
                        flex: 1;
                        // width: 300px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
            img {
                width: 110px;
                height: 70px;
                margin-left: 10px;
                border-radius: 10px;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            font-size: 14px;
            color: #888;
            overflow:hidden;
        }
    }
    .bottom {
        margin-top: 15px;
        height: 20px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            img {
                height: 20px;
                width: 20px;
                border-radius: 50%;
            }
            span {
                font-size: 14px;
                padding-left: 5px;
            }
        }
        .right {
            padding-right: 30px;
            display: flex;
            .like-active {
                color: red;
            }
            .m-icon {
                position: relative;
                margin-left: 40px;
                .num {
                    position: absolute;
                    top: -12px;
                    right: -20px;
                    font-size: 12px;
                    text-align:center;
                }
            }
        }
    }
}
</style>
