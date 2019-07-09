<template>
    <div class="page">
        <van-tabs z-index="999" :active="active" @change="getOrganizationList">
            <van-tab v-for="(tab, tabsIndex) in tabs" :key="tabsIndex" :title="tab.title">
                <div class="top-type">
                    <cellImg :src="org.organizationImgurl" :text="org.organizationName" v-for="(org, tindex) in organizationList" :key="tindex" @click="toOrgDetail(org)"></cellImg>
                    <cellImg src="/static/images/right-square.png" text="查看全部" @click="toOrgAll"></cellImg>
                </div>
            </van-tab>
        </van-tabs>
        <div class="my-search" @click="toSearch">
            <van-icon name="search" size="15px" />
            <span class="placeholder">搜索社团或信息</span>
        </div>
        <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
            <articleItem v-for="(article, aIndex) in articleList" :article="article" :key="aIndex"></articleItem>
        </scroll-view>
    </div>
</template>

<script>

import cellImg from '@/components/cell-img'
import articleItem from '@/components/article-item'

export default {
    components: {
        cellImg,
        articleItem
    },
    data () {
        return {
            active: 0,
            tabs: [
                {title: '社团', id: '1'},
                {title: '校组织', id: '2'},
                {title: '院组织', id: '3'},
                {title: '协会', id: '4'}
            ],
            page: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: false,
                loading: false
            },
            organizationList: [],
            articleList: [],
            styleHeight: ''
        }
    },
    onShow () {
        console.log('onshow')
        if (mpvue.getStorageSync('isShow')) {
            this.getOrganizationList()
            this.getArticleAll()
            mpvue.removeStorageSync('isShow')
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
        this.getOrganizationList()
        this.getArticleAll()
    },
    onPullDownRefresh () {
        if (this.page.hasNext) {
            this.page.loading = true
            this.page.pageIndex += 1
            this.getArticleAll()
        }
    },
    methods: {
        toSearch () {
            this.$router.push('/pages/search/main')
        },
        toOrgDetail (org) {
            this.$router.push({
                path: '/pages/association/organizationDetail/main',
                query: {
                    organizationId: org.organizationId
                }
            })
        },
        toOrgAll () {
            this.$router.push({
                path: '/pages/association/organizationList/main',
                query: {
                    active: this.active
                }
            })
        },
        getOrganizationList (event) {
            this.active = event ? event.mp.detail.index : 0
            this.organizationList = []
            this.$http.post('/organization/list', {
                organizationType: this.active,
                pageIndex: 1,
                pageSize: 4
            }).then(data => {
                this.organizationList = data.data.organizations
            })
        },
        getArticleAll () {
            this.$http.post('/organization/article/getAll', {
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
div /deep/ .van-tabs__wrap {
    position: fixed;
}
.top-type {
    display: flex;
}
div /deep/ .article-item + .article-item {
    border-top: 1px solid #eee;
    margin-top: 15px;
    padding-top: 15px;
}

</style>
