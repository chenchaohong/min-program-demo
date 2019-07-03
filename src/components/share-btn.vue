<template>
    <div class="share-btn" @click.stop="share">
        {{defaultText}}
        <van-toast id="van-toast" />
    </div>
</template>

<script>
export default {
    name: 'shareBtn',
    props: {
        defaultText: {
            type: String,
            default: '分享给朋友'
        },
        url: {
            type: String
        }
    },
    data () {
        return {
        }
    },
    created () {
    },
    methods: {
        share () {
            this.$toast('敬请期待')
            // this.$http.post('/user/follow', {
            //     followId: this.followId,
            //     type: this.type, // 关注类型 0-人 1-社团
            //     action: action // 0-取消 1-关注
            // }).then(() => {
            //     if (this.isMutualFollow && action == '1') {
            //         action = '2'
            //     }
            //     this.followStatus = action
            // })
        }
    }
}
</script>

<style lang="less" scoped>
.share-btn {
    height: 25px;
    line-height: 25px;
    width: 100px;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
}
</style>
