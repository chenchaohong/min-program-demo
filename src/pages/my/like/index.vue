<template>
    <div class="page">
        <scroll-view class="list" scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
            <div class="item" v-for="(item, index) in list" :key="index" @click="toArticle(item.articleId)">
                <img :class="{'round': item.type == '1'}" :src="item.image" alt="">
                <div class="desc">
                    <span>{{item.name}}</span>
                    <span v-if="item.type == '1'">{{item.content}}</span>
                    <span v-else>{{item.title}}</span>
                </div>
            </div>
            <div class="loading" v-if="page.loading">
                <spinnerLoading></spinnerLoading>
            </div>
        </scroll-view>
    </div>
</template>

<script>
import spinnerLoading from '@/components/spinner-loading'
export default {
    components: {
        spinnerLoading
    },
    data () {
        return {
            page: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: true,
                loading: false
            },
            list: [],
            styleHeight: ''
        }
    },
    created () {
        let _this = this
        wx.getSystemInfo({
            success: function (res) {
                let height = res.windowHeight
                _this.styleHeight = height
            }
        })
    },
    mounted () {
        this.followFriend()
    },
    onPullDownRefresh () {
        if (this.page.hasNext) {
            this.page.loading = true
            this.page.pageIndex += 1
            this.followFriend()
        }
    },
    methods: {
        followFriend () {
            this.$http.post('/user/baseInfo/mylikedlist', {
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize
            }).then(data => {
                this.page.loading = false
                this.page.hasNext = data.page.hasNext
                this.list = this.list.concat(data.data)
            })
        },
        toArticle (id) {
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
.list {
    .item {
        display: flex;
        img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
        }
        .round {
            border-radius: 50%;
        }
        .desc {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            overflow: hidden;
            flex: 1;
            span {
                font-size: 14px;
                line-height: 30px;
                color: #888;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            span:nth-child(1) {
                color: #000;
            }
        }
    }
    .item + .item {
        margin-top: 20px;
    }
}
</style>
