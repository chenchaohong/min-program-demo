<template>
    <div class="page">
        <van-search :value="searchName" shape="round" placeholder="搜索社团" use-action-slot @change="searchChange">
            <view slot="action" @click="getSearch">搜索</view>
        </van-search>
        <div class="history" v-if="!searchName && searchList.length > 0">
            <div class="name">历史搜索</div>
            <span v-for="(name, sindex) in searchList" :key="sindex" @click="historyClick(name)">{{name}}</span>
        </div>
        <div class="d-search" v-if="orgList.length > 0">
            <span class="name">相关社团</span>
            <orgCell :data="org" v-for="(org, oIndex) in orgList" :key="oIndex" hideFollowBtn @click="toApply(org)"></orgCell>
        </div>
        <div class="d-search un-search" v-if="orgList.length < 1 && isClick">
            <span class="name">未找到相关社团</span>
        </div>
    </div>
</template>

<script>
import personHead from '@/components/person-head'
import personDynamic from '@/components/person-dynamic'
import orgCell from '@/components/org-cell'
export default {
    components: {
        personHead,
        personDynamic,
        orgCell
    },
    data () {
        return {
            searchName: '',
            searchList: [],
            orgList: [],
            isClick: false // 点击查询按钮
        }
    },
    created () {
    },
    mounted () {
        this.searchName = ''
        this.isClick = false
        this.orgList = []
        // this.getHistory()
    },
    methods: {
        historyClick (name) {
            this.searchName = name
            this.getSearch()
        },
        searchChange (e) {
            this.searchName = e.mp.detail
        },
        getSearch () {
            this.isClick = false
            if (!this.searchName) return
            this.isClick = true
            this.getOrgSearch()
        },
        getOrgSearch () {
            this.$http.post('/organization/list', {
                pageIndex: 1,
                pageSize: 10
            }).then(data => {
                this.orgList = data.data.organizations
            })
        },
        getHistory () {
            this.searchList = mpvue.getStorageSync('searchStorage') || []
        },
        setHistory () {
            if (!this.searchName) return
            let history = mpvue.getStorageSync('searchStorage') || []
            history.unshift(this.searchName)
            history = Array.from(new Set(history)) // 去重
            history.splice(4, 1) // 只保存最近4个
            mpvue.setStorageSync('searchStorage', history)
            this.searchList = history
        },
        cleanHistory () {
            mpvue.removeStorageSync('searchStorage')
            this.searchList = []
        },
        toApply (org) {
            this.$router.push({
                path: '/pages/my/organization/apply/main',
                query: {
                    organizationId: org.organizationId
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.d-search /deep/ .person-head {
    padding-top: 5px;
}
.history {
    margin-bottom: 10px;
    .name {
        font-size: 12px;
        margin-bottom: 5px;
    }
    span {
        color: #999;
        display: inline-block;
        font-size: 12px;
        width: 65px;
        height: 22px;
        line-height: 22px;
        border: 1px solid #eee;
        padding: 0 5px;
        border-radius: 10px;
        text-align: center;
    }
    span + span {
        margin-left: 15px;
    }
}
.d-search {
    span {
        font-size: 14px;
    }
}
.d-search + .d-search {
    border-top: 1px solid #999;
    margin-top: 10px;
    padding-top: 5px;
}
.un-search {
    text-align: center;
}
</style>
