<!-- 社团首页 文章下面最新浏览者头像 -->
<template>
    <div class="img-overlay">
        <img :src="src" alt="" v-for="(src, index) in list" :key="index">
    </div>
</template>

<script>
export default {
    name: 'imgOverlay',
    props: ['list']
}
</script>

<style lang="less" scoped>
.img-overlay {
    img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
    img + img {
        margin-left: -10px;
    }
}
</style>
