<template>
    <div class="page">
        <van-tabs z-index="999" :active="active" @change="tabChange">
            <div class="my-search" @click="toSearch">
                <van-icon name="search" size="15px" />
                <span class="placeholder">搜索社团</span>
            </div>
            <van-tab v-for="(tab, tabsIndex) in tabs" :key="tabsIndex" :title="tab.title" :id="tab.id">
                <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
                    <orgCell :data="org" v-for="(org, oIndex) in organizationList" :key="oIndex" @click="toOrgDetail(org)"></orgCell>
                </scroll-view>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>

import orgCell from '@/components/org-cell'

export default {
    components: {
        orgCell
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
        this.active = this.$route.query.active
        this.getOrganizationList()
    },
    onPullDownRefresh () {
        if (this.page.hasNext) {
            this.page.loading = true
            this.page.pageIndex += 1
            this.getOrganizationList()
        }
    },
    methods: {
        toSearch () {
            this.$router.push({
                path: '/pages/search/main',
                query: {
                    isOrgSearch: true
                }
            })
        },
        toOrgDetail (org) {
            this.$router.push({
                path: '/pages/association/organizationDetail/main',
                query: {
                    organizationId: org.organizationId
                }
            })
        },
        tabChange (event) {
            this.active = event ? event.mp.detail.index : 0
            this.page.pageIndex = 1
            this.organizationList = []
            this.getOrganizationList()
        },
        getOrganizationList () {
            this.$http.post('/organization/list', {
                organizationType: this.active,
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize
            }).then(data => {
                this.page.loading = false
                this.page.hasNext = data.page.hasNext
                this.organizationList = this.organizationList.concat(data.data.organizations)
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
.my-search {
    border: 1px solid #eee;
    height: 30px;
    margin:10px 16px;
    border-radius: 20px;
    color: #999;
    display: flex;
    line-height: 30px;
    padding-left: 10px;
    .placeholder {
        padding-left: 5px;
        font-size: 14px;
        align-items: center;
    }
}

</style>
