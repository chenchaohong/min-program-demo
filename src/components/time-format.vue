<!-- 时间格式显示 -->
<template>
    <span class="time-format">{{sTime[0]}} · {{sTime[1]}} · <label>{{sTime[2]}}</label> {{minute}}</span>
</template>

<script>
export default {
    name: 'timeFormat',
    props: ['time'],
    data () {
        return {
            sTime: [],
            minute: ''
        }
    },
    created () {
        let date = this.time.split(' ')
        this.minute = date[1]
        this.sTime = date[0].split('-')
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.time-format {
    font-size: 12px;
    color: #888;
    label {
        font-size: 16px;
        font-weight: bold;
        color: #000;
    }
}
</style>
