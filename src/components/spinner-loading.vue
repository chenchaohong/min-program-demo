<template>
    <div class="my-loading">
        <van-loading type="spinner" />
        <span>{{text}}</span>
    </div>
</template>

<script>
export default {
    name: 'spinnerLoading',
    props: {
        text: {
            type: String,
            default: '正在载入更多...'
        }
    }
}
</script>

<style lang="less" scoped>
.my-loading {
    height: 25px;
    line-height: 25px;
    font-size:14px;
    color:#888;
    span {
        padding-left: 10px;
    }
}
div /deep/ .van-loading {
    height: 20px !important;
    width: 20px !important;
}
</style>