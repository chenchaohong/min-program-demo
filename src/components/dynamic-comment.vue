<template>
    <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
        <div class="article-item" v-for="(comment, cIndex) in list" :key="cIndex">
            <cellComment :id="comment.articleId" :data="comment"></cellComment>
            <div class="other" v-for="(replie, rIndex) in comment.replies" :key="rIndex">
                <cellComment :id="replie.commentId" :data="replie"></cellComment>
            </div>
            <div class="all" v-if="!comment.page || (comment.page && comment.page.hasNext == true)" @click="getAll(comment.commentId, comment.replies, cIndex)">查看更多</div>
        </div>
        <div class="loading" v-if="page.loading">
            <spinnerLoading></spinnerLoading>
        </div>
    </scroll-view>
</template>

<script>
import spinnerLoading from '@/components/spinner-loading'
import cellComment from '@/components/cell-comment'

export default {
    name: 'dynamicComment',
    props: {
        dynamicId: {
            type: String
        }
    },
    components: {
        spinnerLoading,
        cellComment
    },
    data () {
        return {
            page: {
                pageIndex: 1,
                pageSize: 5,
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
        this.getList()
    },
    onPullDownRefresh () {
        this.page.loading = true
        this.page.pageIndex += 1
        this.getList()
    },
    methods: {
        getList () {
            this.$http.post('/article/comment/getAll', {
                articleId: this.dynamicId,
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize
            }).then(data => {
                this.page.loading = false
                this.page.hasNext = data.page.hasNext
                this.list = this.list.concat(data.data)
            })
        },
        getAll (commentId, replies, listIndex) {
            let newReplies = replies
            let newList = JSON.parse(JSON.stringify(this.list))
            if (!newList[listIndex].page) {
                newList[listIndex].page = {
                    pageIndex: 1,
                    hasNext: true
                }
            }
            this.$http.post('/article/comment/getAll', {
                articleId: this.dynamicId,
                commentId: commentId,
                pageIndex: newList[listIndex].page.pageIndex,
                pageSize: 5
            }).then(data => {
                this.page.loading = false
                newReplies = newReplies.concat(data.data)
                newList[listIndex].replies = newReplies
                // 追加分页数
                newList[listIndex].page.hasNext = data.page.hasNext
                newList[listIndex].page.pageIndex += Number(data.page.pageIndex)
                this.list = newList
            })
        }
    }
}
</script>

<style lang="less" scoped>
.article-item {
    padding: 15px 0;
    .other, .all {
        padding-top: 10px;
        margin-left: 20px;
        margin-top: 15px;
        border-top: 1px solid #eee;
    }
    .all {
        font-size: 14px;
    }
}
.article-item + .article-item {
    border-top: 1px solid #eee;
}
</style>
