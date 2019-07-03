<template>
    <div class="m-img-cell" @click.stop="cellClick">
        <img :src="src" alt="" :class="{'round' : round}">
        <span class="text">{{text}}</span>
        <span class="cover" v-if="cover">{{cover}}</span>
    </div>
</template>

<script>
export default {
    name: 'cellImg',
    props: {
        src: String,
        text: String,
        round: Boolean,
        cover: String
    },
    methods: {
        cellClick () {
            this.$emit('click')
        }
    }
}
</script>

<style lang="less" scoped>
.m-img-cell {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 80px;
    text-align:center;
    img {
        margin: 5px auto;
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
    .round {
        border-radius: 50%;
    }
    span {
        font-size: 14px;
        color: #888;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .cover {
        position: absolute;
        background: #eee;
        color: #000;
        opacity: 0.9;
        width: 40px;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 11px;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
    }
}
</style>
