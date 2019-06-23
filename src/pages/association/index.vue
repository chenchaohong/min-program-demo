<template>
    <div class="page">
        <van-tabs :active="active">
            <van-tab v-for="(tab, tabsIndex) in tabs" :key="tabsIndex" :title="tab.title">
                <div class="top-type">
                    <imgCell src="/static/tabs/association.png" :text="'图片' + tab.title" v-for="(i, tindex) in 4" :key="tindex"></imgCell>
                    <imgCell src="/static/images/right-square.png" text="查看全部"></imgCell>
                </div>
            </van-tab>
        </van-tabs>
        <van-search custom-class="my-search" :value="value" shape="round" placeholder="搜索社团或信息" />
    </div>
</template>

<script>

import imgCell from '@/components/img-cell'
export default {
    components: {
        imgCell
    },
    data () {
        return {
            active: 1,
            value: '',
            tabs: [
                {title: '社团', content: '内容一'},
                {title: '校组织', content: '内容二'},
                {title: '院组织', content: '内容三'},
                {title: '协会', content: '内容三'}
            ]
        }
    },
    created () {
        console.log(this.$http.post('/organization/desc'))
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.top-type {
    display: flex;
}
 div /deep/.my-search {
    padding: 20px 0;
}

</style>
