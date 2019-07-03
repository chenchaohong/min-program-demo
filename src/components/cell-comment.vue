<template>
    <div class="cell-comment">
        <div class="left">
            <img :src="data.image" alt="">
            <div class="desc">
                <span class="name">{{data.nickName}}</span>
                <span>{{data.comment}}</span>
            </div>
        </div>
        <div class="right">
            <span class="time">{{data.createTime}}</span>
            <div class="likes" @click.stop="changeLike(data)">
                <span class="counter">{{data.thumbsups}}</span>
                <!-- 0-未点赞 1-已点赞 -->
                <img v-if="data.isThumbsups == '0'" src="/static/images/good1.png" alt="">
                <img v-else src="/static/images/good2.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cellComment',
    props: {
        id: String,
        data: Object
    },
    data () {
        return {
        }
    },
    created () {
    },
    methods: {
        changeLike (e) {
            let action = e.isThumbsups == '0' ? '1' : '0'
            this.$http.post('/user/article/like', {
                objectId: this.id,
                action: action,
                type: '2' // 1-文章 2-评论
            }).then(() => {
                e.thumbsups = Number(e.thumbsups)
                if (action == '1') {
                    e.thumbsups += 1
                } else {
                    e.thumbsups -= 1
                }
                e.isThumbsups = action
            })
        }
    }
}
</script>

<style lang="less" scoped>
.cell-comment {
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
        }
        .desc {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            font-size: 14px;
            span {
                height: 30px;
                line-height: 30px;
            }
            .name {
                color: #888;
            }
        }
    }
    .right {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        .time {
            height: 30px;
            line-height: 30px;
        }
        .likes {
            display: flex;
            align-items:center;
            justify-content: flex-end;
            height: 30px;
            img {
                width: 20px;
                height: 20px;
            }
            .counter {
                height: 30px;
                line-height: 35px;
                padding-right: 10px;
            }
        }
    }
}
</style>
