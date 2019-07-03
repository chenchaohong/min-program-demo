<template>
    <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
        <div class="like-item">
            <img :src="item.imgurl" alt="" v-for="(item, aIndex) in list" :key="aIndex" @click="toFriend(item.userId)">
        </div>
        <div class="loading" v-if="page.loading">
            <spinnerLoading></spinnerLoading>
        </div>
    </scroll-view>
</template>

<script>
import spinnerLoading from '@/components/spinner-loading'
export default {
    name: 'dynamicLike',
    props: {
        dynamicId: {
            type: String
        }
    },
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
        this.getList()
    },
    onPullDownRefresh () {
        this.page.loading = true
        this.page.pageIndex += 1
        this.getList()
    },
    methods: {
        getList () {
            this.$http.post('/user/article/getBelikeds', {
                articleId: this.dynamicId,
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
.like-item {
    padding: 10px 0;
    img {
        height: 40px;
        width: 40px;
        margin: 5px;
        border-radius: 50%;
    }
}
</style>
