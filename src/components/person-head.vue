<template>
    <div class="person-head">
        <div class="top" @click="clickHead">
            <img :src="personInfo.imgUrl" alt="">
            <div class="desc">
                <div class="name">
                    <span>{{personInfo.secrecy == '1' ? personInfo.nickName : personInfo.actualName}}</span>
                    <followBtn :followId="personInfo.userId" :followStatus="personInfo.followStatus" type="0" v-if="!isMy"></followBtn>
                </div>
                <span class="sex">
                    <img :src="'/static/images/sex.png'" alt="" v-if="personInfo.gender == '0'">
                    <img :src="'/static/images/male.png'" alt="" v-if="personInfo.gender == '1'">
                    <img :src="'/static/images/female.png'" alt="" v-if="personInfo.gender == '2'">
                    {{personInfo.enrollmentDate}} · {{personInfo.universityName}}
                </span>
                <span v-if="personInfo.constellation">
                    <img :src="'/static/images/constellation/' + personInfo.constellation + '.png'" alt="">
                    {{constellationMap[personInfo.constellation]}}
                </span>
                <span>
                    <img :src="'/static/images/org.png'" alt="">
                    {{organization}}
                </span>
                <div class="to-right" v-if="isMy">
                    <van-icon name="arrow" @click="update" />
                </div>
            </div>
        </div>
        <div class="signer" v-if="!uncom">
            <span>{{personInfo.slogan}}</span>
            <span class="com"><label>{{statistics.leavingMsgs}}</label>次发言 · 共收到<label>{{statistics.thumbsup}}</label>个赞</span>
        </div>
        <div class="bottom" v-if="!uncom">
            <div class="item" @click="toFollow">
                <span>{{statistics.follow}}</span>
                <span>关注中</span>
            </div>
            <div class="item" @click="toSufferFollow">
                <span>{{statistics.followed}}</span>
                <span>关注者</span>
            </div>
            <div class="item">
                <span>{{statistics.articles}}</span>
                <span>动态</span>
            </div>
            <div class="item" @click="toLike">
                <span>{{statistics.liked}}</span>
                <span>喜欢</span>
            </div>
            <div class="item" @click="toSufferLike">
                <span>{{statistics.beliked}}</span>
                <span>被喜欢</span>
            </div>
        </div>
        <hr v-if="!uncom" />
    </div>
</template>

<script>
import followBtn from '@/components/follow-btn'
export default {
    name: 'personHead',
    props: {
        isMy: Boolean,
        uncom: Boolean,
        personInfo: Object,
        statistics: Object
    },
    components: {
        followBtn
    },
    data () {
        return {
            constellationMap: {
                1: '白羊座',
                2: '金牛座',
                3: '双子座',
                4: '巨蟹座',
                5: '狮子座',
                6: '处女座',
                7: '天秤座',
                8: '天蝎座',
                9: '射手座',
                10: '魔蝎座',
                11: '水瓶座',
                12: '双鱼座'
            },
            organization: []
        }
    },
    created () {
        this.personInfo.organization && this.personInfo.organization.forEach(item => {
            this.organization.push(item.organizationName)
        })
    },
    methods: {
        clickHead () {
            this.$emit('clickHead')
        },
        update () {
            this.$router.push({
                path: '/pages/my/update/main',
                query: {
                    // userId: id
                }
            })
        },
        toFollow () {
            if (this.isMy) {
                this.$router.push({
                    path: '/pages/my/follow/main',
                    query: {
                        // userId: id
                    }
                })
            }
        },
        toSufferFollow () {
            if (this.isMy) {
                this.$router.push({
                    path: '/pages/my/sufferFollow/main',
                    query: {
                        // userId: id
                    }
                })
            }
        },
        toLike () {
            if (this.isMy) {
                this.$router.push({
                    path: '/pages/my/like/main',
                    query: {
                        // userId: id
                    }
                })
            }
        },
        toSufferLike () {
            if (this.isMy) {
                this.$router.push({
                    path: '/pages/my/sufferLike/main',
                    query: {
                        // userId: id
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.person-head {
    .top {
        display: flex;
        img {
            height: 80px;
            width: 80px;
            border-radius: 5px;
        }
        .desc {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1;
            padding-left: 5px;
            font-size: 12px;
            color: #999;
            .name {
                display: flex;
                justify-content: space-between;
                span {
                    font-size: 16px;
                    font-weight: bold;
                    color: #000;
                }
            }
            span {
                display: flex;
                    align-items: center;
                    padding-top: 3px;
                img {
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                }
            }
            .to-right {
                position: absolute;
                font-size: 25px;
                right: 10px;
                bottom: 0;
            }
        }
    }
    .signer {
        display: flex;
        justify-content: space-between;
        color: #888;
        font-size: 12px;
        padding: 10px 0;
        border-bottom: 1px solid #888;
        align-items: center;
        .com {
            color: #000;
            label {
                font-size: 16px;
                font-weight: bold;
                padding: 0 5px;
            }
        }
    }
    .bottom {
        display: flex;
        flex-direction: row;
        padding: 10px 0;
        .item {
            display: flex;
            flex-direction: column;
            flex: 1;
            text-align: center;
            font-size: 12px;
            line-height: 20px;
            span:nth-child(2) {
                color: #888;
            }
        }
    }
    hr {
        height: 8px;
        background: #eee;
        margin: 0 -10px;
    }
}
</style>
