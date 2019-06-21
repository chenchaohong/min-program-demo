<template>
    <div>
        <button @click="scan">扫码</button>
        <span>扫的码是：{{scanName}}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            scanName: ''
        }
    },
    created () {
    },
    methods: {
        scan () {
            wx.scanCode({
                success: (res) => {
                    this.scanName = res.result
                }
            })
        }
    }
}
</script>

<style>

</style>
