<template>
    <div class="page">
        <p @click="getHandle">{{get}}</p>
        <p @click="postHandle">{{post}}</p>
    </div>
</template>

<script>
export default {
    components: {
    },
    computed: {
    },
    data () {
        return {
            get: 'getHandle',
            post: 'postHandle'
        }
    },
    onLoad () {
    },
    created () {
    },
    mounted () {
    },
    onShow () {
    },
    methods: {
        getHandle () {
            this.$http.get('/yundong/changeSteps', {
                user: '923928480@qq.com',
                password: '123',
                step: 3
            }).then(res => {
                console.log(res)
            }).catch(() => {}).finally(() => {
                console.log('false')
            })
        },
        postHandle () {
            this.$http.post('/yundong/changeSteps', {
                user: '923928480@qq.com',
                password: '123',
                step: 3
            }).then(res => {
                console.log(res)
            }).catch(() => {}).finally(() => {
            })
        }
    }
}
</script>

<style  lang="less" scoped>

</style>
