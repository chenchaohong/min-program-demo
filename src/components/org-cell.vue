<template>
    <div class="org-cell" @click.stop="cellClick">
        <div class="left">
            <img :src="data.organizationImgurl" alt="">
            <div class="desc">
                <span>{{data.organizationName}}</span>
                <span>{{data.organizationSlogan}}</span>
            </div>
        </div>
        <span class="like">
            <followBtn :followId="data.organizationId" :followStatus="data.followStatus" type="1"></followBtn>
        </span>
    </div>
</template>

<script>
import followBtn from '@/components/follow-btn'
export default {
    name: 'orgCell',
    props: ['data'],
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
            border-radius: 10px;
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
}
</style>
