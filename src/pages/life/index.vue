<template>
    <div class="page">
        <div class="top">
            <img src="/static/images/life/banner.png" alt="">
        </div>
        <div class="row">
            <div class="r-title">校内服务</div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/kd.png" alt="">
                    <div class="right">
                        <span class="title">代拿快递</span>
                        <span class="desc">快递拿上楼，现在仅需1元，会员一月20元</span>
                    </div>
                </div>
            </div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/sw.png" alt="">
                    <div class="right">
                        <span class="title">失物招领</span>
                        <span class="desc">快速联系失主</span>
                    </div>
                </div>
            </div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/jz.png" alt="">
                    <div class="right">
                        <span class="title">寻找兼职</span>
                        <span class="desc">校内众包兼职，校外兼职</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="r-title">校内交易</div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/kj.png" alt="">
                    <div class="right">
                        <span class="title">会计考证、会计书籍</span>
                        <span class="desc">考证报名咨询，书籍购买</span>
                    </div>
                </div>
            </div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/es.png" alt="">
                    <div class="right">
                        <span class="title">二手物品、以物换物</span>
                        <span class="desc">可发布二手物品，以物换物</span>
                    </div>
                </div>
            </div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/hk.png" alt="">
                    <div class="right">
                        <span class="title">校园黑卡</span>
                        <span class="desc">学生特权，一月可省600元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="r-title">校内工具</div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/cj.png" alt="">
                    <div class="right">
                        <span class="title">成绩查询</span>
                        <span class="desc">成绩查询</span>
                    </div>
                </div>
            </div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/sl.png" alt="">
                    <div class="right">
                        <span class="title">四六级查询</span>
                        <span class="desc">四六级查询</span>
                    </div>
                </div>
            </div>
            <div class="part">
                <div class="item" @click="unDevelop">
                    <img src="/static/images/life/xf.png" alt="">
                    <div class="right">
                        <span class="title">学分统计</span>
                        <span class="desc">学分查询，一目了然</span>
                    </div>
                </div>
            </div>
        </div>
        <van-toast id="van-toast" />
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    created () {
    },
    methods: {
        unDevelop () {
            this.$toast('敬请期待')
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    // height: 100vh;
    // background: #fdbb5b;
    .top {
        text-align: center;
        img {
            height: 120px;
        }
    }
    .row + .row {
        margin-top: 25px;
    }
    .row {
        margin-top: 10px;
        .r-title {
            position: relative;
            font-size: 16px;
            font-weight: bolder;
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
        }
        .r-title::before {
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            height: 30px;
            width: 6px;
            background: red;
        }
        .part {
            margin-top: 15px;
            .item {
                display: flex;
                img {
                    height: 60px;
                    width: 60px;
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    margin-left: 15px;
                    span {
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px
                    }
                    .desc {
                        color: #888;
                    }
                }
            }
            .item + .item {
                margin-top: 10px;
            }
        }
    }
}
</style>
