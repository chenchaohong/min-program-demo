<template>
    <div class="page">
        <van-tabs :active="tabActive" sticky @change="onChange">
            <van-tab title="推荐" class="custom-class">
                <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
                    <div class="result-item" v-for="(recommend, rindex) in recommendList" :key="rindex">
                        <dynamic :data="recommend"></dynamic>
                    </div>
                    <div class="loading" v-if="pageRecommend.loading">
                        <spinnerLoading></spinnerLoading>
                    </div>
                </scroll-view>
            </van-tab>
            <van-tab title="关注">
                <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
                    <div class="result-item" v-for="(follow, rindex) in followList" :key="rindex">
                        <dynamic :data="follow"></dynamic>
                    </div>
                    <div class="loading" v-if="follow.loading">
                        <spinnerLoading></spinnerLoading>
                    </div>
                </scroll-view>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import spinnerLoading from '@/components/spinner-loading'
import dynamic from '@/components/dynamic'
export default {
    components: {
        spinnerLoading,
        dynamic
    },
    data () {
        return {
            tabActive: 0,
            pageRecommend: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: true,
                loading: false
            },
            pageFollow: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: true,
                loading: false
            },
            recommendList: [],
            followList: [],
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
        this.recommend()
        this.follow()
    },
    onPullDownRefresh () {
        if (this.tabActive === 0) {
            if (this.pageRecommend.hasNext) {
                this.pageRecommend.loading = true
                this.pageRecommend.pageIndex += 1
                this.recommend()
            }
        } else {
            if (this.pageFollow.hasNext) {
                this.pageFollow.loading = true
                this.pageFollow.pageIndex += 1
                this.follow()
            }
        }
    },
    methods: {
        onChange (event) {
            this.tabActive = event.mp.detail.index
        },
        recommend () {
            this.$http.post('/user/article/recommend', {
                type: '1',
                pageIndex: this.pageRecommend.pageIndex,
                pageSize: this.pageRecommend.pageSize
            }).then(data => {
                this.pageRecommend.loading = false
                this.pageRecommend.hasNext = data.page.hasNext
                this.recommendList = this.recommendList.concat(data.data)
            })
        },
        follow () {
            this.$http.post('/user/article/recommend', {
                type: '2',
                pageIndex: this.pageFollow.pageIndex,
                pageSize: this.pageFollow.pageSize
            }).then(data => {
                this.pageFollow.loading = false
                this.pageFollow.hasNext = data.page.hasNext
                this.followList = this.followList.concat(data.data)
            })
        }
    }
}
</script>

<style lang="less" scoped>
// div /deep/ .van-tabs__wrap {
//     position: fixed;
// }
.result-item {
    margin-top: 15px;
}
.result-item + .result-item  {
    border-top: 1px solid #eee;
    padding-top: 15px;
}
</style>
