<template>
    <div class="page">
        <personHead :personInfo="personInfo" :statistics="statistics"></personHead>
        <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
            <shareBtn>分享给朋友</shareBtn>
            <personDynamic v-for="(article, aIndex) in articleList" :article="article" :key="aIndex"></personDynamic>
        </scroll-view>
    </div>
</template>

<script>
import personHead from '@/components/person-head'
import cellImg from '@/components/cell-img'
import personDynamic from '@/components/person-dynamic'
import shareBtn from '@/components/share-btn'

export default {
    components: {
        personHead,
        cellImg,
        personDynamic,
        shareBtn
    },
    data () {
        return {
            page: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: false,
                loading: false
            },
            userId: '',
            personInfo: {},
            statistics: {},
            articleList: [],
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
        this.userId = this.$route.query.userId
        this.getPersonInfo()
        this.getStatistics()
        this.getArticle()
    },
    onPullDownRefresh () {
        if (this.page.hasNext) {
            this.page.loading = true
            this.page.pageIndex += 1
            this.getArticle()
        }
    },
    methods: {
        getPersonInfo () {
            this.$http.post('/user/baseInfo/schoolfellow', {
                userId: this.userId
            }).then(data => {
                this.personInfo = data.data
            })
        },
        getStatistics () {
            this.$http.post('/user/baseInfo/statistics', {
                userId: this.userId
            }).then(data => {
                this.statistics = data.data
            })
        },
        getArticle () {
            this.$http.post('/user/article/list', {
                schoolFellowUserId: this.userId,
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize
            }).then(data => {
                this.page.loading = false
                this.page.hasNext = data.page.hasNext
                this.articleList = this.articleList.concat(data.data)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.my-team {
    display: flex;
    /deep/ .m-img-cell {
        width: 60px;
        height: 60px;
        img {
            width: 30px;
            height: 30px;
        }
        span {
            font-size: 12px;
        }
    }
}
div /deep/ .person-dynamic + .person-dynamic {
    margin-top: 15px;
}
</style>
