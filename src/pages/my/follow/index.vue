<template>
    <div class="page">
        <van-tabs :active="tabActive" sticky @change="onChange">
            <van-tab title="校友" class="custom-class">
                <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
                    <div class="part">
                        <personCell round :data="friend" v-for="(friend, findex) in friendList" :key="findex" @click="toFriend(friend.userId)"></personCell>
                    </div>
                    <div class="loading" v-if="pageFriend.loading">
                        <spinnerLoading></spinnerLoading>
                    </div>
                </scroll-view>
            </van-tab>
            <van-tab title="社团">
                <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
                    <div class="part">
                        <orgCell :data="org" v-for="(org, oIndex) in orgList" :key="oIndex" @click="toOrgDetail(org)"></orgCell>
                    </div>
                    <div class="loading" v-if="pageOrg.loading">
                        <spinnerLoading></spinnerLoading>
                    </div>
                </scroll-view>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import spinnerLoading from '@/components/spinner-loading'
import orgCell from '@/components/org-cell'
import personCell from '@/components/person-cell'

export default {
    components: {
        spinnerLoading,
        orgCell,
        personCell
    },
    data () {
        return {
            tabActive: 0,
            pageFriend: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: true,
                loading: false
            },
            pageOrg: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: true,
                loading: false
            },
            friendList: [],
            orgList: [],
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
        this.followOrg()
    },
    onPullDownRefresh () {
        if (this.tabActive === 0) {
            if (this.pageFriend.hasNext) {
                this.pageFriend.loading = true
                this.pageFriend.pageIndex += 1
                this.followFriend()
            }
        } else {
            if (this.pageOrg.hasNext) {
                this.pageOrg.loading = true
                this.pageOrg.pageIndex += 1
                this.followOrg()
            }
        }
    },
    methods: {
        onChange (event) {
            this.tabActive = event.mp.detail.index
        },
        followFriend () {
            this.$http.post('/user/baseInfo/myfollowlist', {
                type: '1',
                pageIndex: this.pageFriend.pageIndex,
                pageSize: this.pageFriend.pageSize
            }).then(data => {
                this.pageFriend.loading = false
                this.pageFriend.hasNext = data.page.hasNext
                this.friendList = this.friendList.concat(data.data.friends)
            })
        },
        followOrg () {
            this.$http.post('/user/baseInfo/myfollowlist', {
                type: '2',
                pageIndex: this.pageOrg.pageIndex,
                pageSize: this.pageOrg.pageSize
            }).then(data => {
                this.pageOrg.loading = false
                this.pageOrg.hasNext = data.page.hasNext
                this.orgList = this.orgList.concat(data.data.organizations)
            })
        },
        toFriend (id) {
            this.$router.push({
                path: '/pages/person/main',
                query: {
                    userId: id
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
        }
    }
}
</script>

<style lang="less" scoped>
.result-part {
    padding-top: 20px;
}
</style>
