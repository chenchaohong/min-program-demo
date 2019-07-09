<template>
    <div class="page">
        <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
            <div class="part">
                <personCell round :data="friend" v-for="(friend, findex) in list" :key="findex" @click="toFriend(friend.userId)"></personCell>
            </div>
            <div class="loading" v-if="page.loading">
                <spinnerLoading></spinnerLoading>
            </div>
        </scroll-view>
    </div>
</template>

<script>
import spinnerLoading from '@/components/spinner-loading'
import personCell from '@/components/person-cell'
export default {
    components: {
        spinnerLoading,
        personCell
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
            this.$http.post('/user/baseInfo/myfans', {
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize
            }).then(data => {
                this.page.loading = false
                this.page.hasNext = data.page.hasNext
                this.list = this.list.concat(data.data)
            })
        },
        toFriend (id) {
            this.$router.push({
                path: '/pages/person/main',
                query: {
                    userId: id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>
