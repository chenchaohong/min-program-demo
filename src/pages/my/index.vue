<template>
    <div class="page">
        <span @click="clickHandle">111{{motto}}</span>
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
            motto: 'Hello miniprograme'
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
        clickHandle (ev) {
            console.log('clickHandle:', ev)
        }
    }
}
</script>

<style  lang="less" scoped>

</style>
