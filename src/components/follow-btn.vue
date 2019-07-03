<template>
    <div class="follow-btn" @click.stop="follow">
        <span v-if="followStatus == '0'">关注</span>
        <span v-if="followStatus == '1'">已关注</span>
        <span v-if="followStatus == '2'">相互关注</span>
    </div>
</template>

<script>
export default {
    name: 'followBtn',
    props: {
        followId: {
            type: String
        },
        followStatus: { // 0-取消 1-关注
            type: String
        },
        type: { // 关注类型 0-人 1-社团
            type: String
        }
    },
    data () {
        return {
            isMutualFollow: false // 互相关注状态 followStatus = 2
        }
    },
    created () {
    },
    methods: {
        follow () {
            if (this.followStatus == '2') {
                this.isMutualFollow = true
            }
            let action = this.followStatus == '0' ? '1' : '0'
            this.$http.post('/user/follow', {
                followId: this.followId,
                type: this.type, // 关注类型 0-人 1-社团
                action: action // 0-取消 1-关注
            }).then(() => {
                if (this.isMutualFollow && action == '1') {
                    action = '2'
                }
                this.followStatus = action
            })
        }
    }
}
</script>

<style lang="less" scoped>
.follow-btn {
    span {
        font-size: 12px;
        display: inline-block;
        width: 60px;
        height: 20px;
        line-height: 20px;
        border-radius: 40px;
        text-align: center;
        background: #888;
        color: #fff;
    }
}
</style>
