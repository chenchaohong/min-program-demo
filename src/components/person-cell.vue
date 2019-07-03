<template>
    <div class="org-cell" @click.stop="cellClick">
        <div class="left">
            <img :class="{'round': round}" :src="data.imgUrl" alt="">
            <div class="desc">
                <span>{{data.name}}</span>
                <span>{{data.slogan}}</span>
            </div>
        </div>
        <span class="like">
            <followBtn :followId="data.userId" :followStatus="data.followStatus" type="0"></followBtn>
        </span>
    </div>
</template>

<script>
import followBtn from '@/components/follow-btn'
export default {
    name: 'personCell',
    props: {
        data: Object,
        round: Boolean
    },
    components: {
        followBtn
    },
    methods: {
        cellClick () {
            this.$emit('click')
        }
    }
}
</script>

<style lang="less" scoped>
.org-cell {
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        img {
            margin:auto;
            width: 60px;
            height: 60px;
        }
        .desc {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            span {
                font-size: 14px;
                line-height: 40px;
                color: #888;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
        }
    }
    .round {
        border-radius: 50%;
    }
}
</style>
