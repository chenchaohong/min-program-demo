<template>
    <div class="m-img-cell">
        <img :src="src" alt="">
        <span>{{text}}</span>
    </div>
</template>

<script>
export default {
    props: ['src', 'text']
}
</script>

<style lang="less" scoped>
.m-img-cell {
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 80px;
    text-align:center;
    img {
        margin:auto;
        width: 40px;
        height: 40px;
    }
    span {
        font-size: 14px;
        color: #888;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
}
</style>
