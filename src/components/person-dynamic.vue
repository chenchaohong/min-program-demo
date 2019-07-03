<!-- 个人动态 -->
<template>
    <div class="person-dynamic" @click="toActicle(article.articleId)">
        <timeFormat :time="article.createTime"></timeFormat>
        <div class="img">
            <!-- <img :src="src" alt="" v-for="(src, index) in article.imgUrl" :key="index"> -->
            <img :src="article.imgUrl[0]" alt="">
        </div>
        <span class="contant">{{article.content}}</span>
    </div>
</template>

<script>
import timeFormat from '@/components/time-format'
export default {
    name: 'personDynamic',
    props: ['article'],
    components: {
        timeFormat
    },
    data () {
        return {
        }
    },
    created () {
    },
    methods: {
        toActicle (id) {
            this.$router.push({
                path: '/pages/my/dynamicDetail/main',
                query: {
                    articleId: id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.person-dynamic {
    width: 50%;
    .time {
        font-size: 12px;
        color: #888;
        label {
            font-size: 16px;
            font-weight: bold;
            color: #000;
        }
    }
    .img {
        display: flex;
        margin: 5px 0;
        img {
            height: 100px;
            margin:auto;
            border-radius: 5px;
            
        }
        // img + img {
        //     margin-left: -35px;
        // }
    }
    .contant {
        font-size: 12px;
    }
}
</style>
