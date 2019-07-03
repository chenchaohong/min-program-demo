<!-- 社团首页 文章 -->
<template>
    <div class="article-item" @click="toActicle(article.articleId)">
        <div class="top">
            <div class="left">
                <img :src="article.organizationImgurl" alt="">
            </div>
            <div class="right">
                <span class="title">{{article.organizationName}}</span>
                <span class="contant"><label>{{article.title}} | </label>{{article.content}}</span>
            </div>
        </div>
        <div class="img">
            <img :src="article.imgUrl" alt="">
        </div>
        <div class="bottom">
            <imgOverlay :list="article.imgurls"></imgOverlay>
            <div class="desc">
                <span>{{article.levingMsgs}} 回应</span>
                <span>{{article.beliked}} 喜欢</span>
                <span>{{article.checked}} 查看</span>
                <div class="m-like" @click.stop="changeLike(article)">
                    <van-icon name="like" class="like-active" v-if="article.clickLiked == '1'" /><!-- 是否已点喜欢 0否 1是 -->
                    <van-icon name="like-o" v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import imgOverlay from '@/components/img-overlay'
export default {
    name: 'articleItem',
    props: ['article'],
    components: {
        imgOverlay
    },
    data () {
        return {
        }
    },
    created () {
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
                    e.beliked += 1
                } else {
                    e.beliked -= 1
                }
                e.clickLiked = action
            })
        },
        toActicle (id) {
            this.$router.push({
                path: '/pages/association/acticleDetail/main',
                query: {
                    articleId: id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.article-item {
    .top {
        display: flex;
        .left {
            img {
                width: 60px;
                height: 60px;
                border-radius: 5px;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            font-size: 14px;
            overflow:hidden;
            .title {
                color: #888;
                height: 25px;
                font-size: 13px;
            }
            .contant {
                display: -webkit-box ;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            label {
                font-weight: bold;
            }
        }
    }
    .img {
        img {
            width: 100%;
            height: 120px;
        }
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        .desc {
            font-size: 14px;
            color: #888;
            span + span {
                margin-left: 10px;
            }
        }
        .m-like {
            float:right;
            padding: 0 5px;
            font-size: 16px;
            .like-active {
                color: red;
            }
        }
    }
}
</style>
