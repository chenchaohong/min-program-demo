<template>
    <div class="page">
        <div class="part info">
            <div class="left">
                <img class="org-logo" :src="orgInfo.organizationImgUrl" alt="">
                <div class="name">
                    <div class="title">{{orgInfo.organizationName}}</div>
                    <div class="staff">社长：<img :src="orgInfo.presidentImgurl" alt=""> {{orgInfo.presidentRealName}}</div>
                </div>
            </div>
            <shareBtn></shareBtn>
        </div>
        <div class="part members" v-if="orgInfo.secrecy != '1'">
            <div class="top" @click="showMember = !showMember">
                <span class="left">成员</span>
                <span class="right">
                    <van-icon name="arrow-down" v-if="showMember" />
                    <van-icon name="arrow-up" v-else />
                </span>
            </div>
            <div class="branch" v-if="showMember" v-for="(branch, bindex) in orgMember" :key="bindex">
                <div class="left">{{branch.branchName}}</div>
                <div class="right">
                    <div class="item" v-for="(member, mindex) in branch.members" :key="mindex">
                        <cellImg :src="member.imgUrl" :text="member.actualName" round :cover="member.position == 1 ? '部长' : ''" @click="toFriend(member.userId)"></cellImg>
                    </div>
                </div>
            </div>
        </div>
        <div class="part follow">
            <div class="item">
                <span>{{orgStatistics.followedCnt}}</span>
                <span>关注者</span>
            </div>
            <div class="item">
                <span>{{orgStatistics.belikedCnt}}</span>
                <span>被喜欢</span>
            </div>
            <div class="item">
                <span>{{orgStatistics.belookupCnt}}</span>
                <span>被浏览</span>
            </div>
            <div class="item">
                <span>{{orgStatistics.articles}}</span>
                <span>动态</span>
            </div>
            <followBtn :followStatus="orgInfo.followType" :followId="orgInfo.organizationId" type="1"></followBtn>
        </div>
        <div class="dynamic">
            <van-tabs :active="tabActive" sticky tab-class="m-tab-class" @change="onChange">
            <van-tab title="关注">
                <scroll-view scroll-y="true" :style="{height: styleHeight + 'px'}" bindscrolltolower="onPullDownRefresh">
                    <div class="article-item" v-for="(article, aIndex) in orgAarticle" :article="article" :key="aIndex" @click="toActicle(article.articleId)">
                        <timeFormat :time="article.createTime"></timeFormat>
                        <img :src="article.imgUrl" alt="">
                        <span class="title">{{article.title}}</span>
                    </div>
                    <div class="loading" v-if="page.loading">
                        <spinnerLoading></spinnerLoading>
                    </div>
                </scroll-view>
            </van-tab>
            <van-tab title="简介">
                <span class="b-part desc">{{orgDesc.organizationIntroduction}}</span>
                <span class="b-part title">部门</span>
                <div class="b-part branch" v-for="(branch, obIndex) in orgDesc.branchs" :key="obIndex">
                    <div class="b-title">{{branch.branchName}}</div>
                    <div class="b-desc">{{branch.branchIntroduction}}</div>
                </div>
            </van-tab>
        </van-tabs>
        </div>
    </div>
</template>

<script>

import cellImg from '@/components/cell-img'
import shareBtn from '@/components/share-btn'
import followBtn from '@/components/follow-btn'
import timeFormat from '@/components/time-format'

export default {
    components: {
        cellImg,
        shareBtn,
        followBtn,
        timeFormat
    },
    data () {
        return {
            tabActive: 0,
            showMember: true,
            organizationId: '',
            page: {
                pageIndex: 1,
                pageSize: 10,
                hasNext: false,
                loading: false
            },
            orgInfo: {},
            orgMember: [],
            orgStatistics: {},
            orgAarticle: [],
            orgDesc: [],
            styleHeight: ''
        }
    },
    created () {
        let _this = this
        wx.getSystemInfo({
            success: function (res) {
                let height = res.windowHeight
                _this.styleHeight = height
            }
        })
    },
    mounted () {
        this.organizationId = this.$route.query.organizationId
        this.getInfo()
        this.getMember()
        this.getStatistics()
        this.getAarticle()
        this.getDesc()
    },
    onPullDownRefresh () {
        if (this.page.hasNext) {
            this.page.loading = true
            this.page.pageIndex += 1
            this.getAarticle()
        }
    },
    methods: {
        // 社团基本信息
        getInfo () {
            this.$http.post('/organization/baseInfo/get', {
                organizationId: this.organizationId
            }).then(data => {
                this.orgInfo = data.data
            })
        },
        // 社团成员
        getMember () {
            this.$http.post('/organization/member/getAll', {
                organizationId: this.organizationId
            }).then(data => {
                this.orgMember = data.data.branchs
            })
        },
        // 社团统计
        getStatistics () {
            this.$http.post('/organization/baseInfo/statistics', {
                organizationId: this.organizationId
            }).then(data => {
                this.orgStatistics = data.data
            })
        },
        // 社团文章动态
        getAarticle () {
            this.$http.post('/organization/article/getAll', {
                organizationId: this.organizationId,
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize
            }).then(data => {
                this.page.loading = false
                this.page.hasNext = data.page.hasNext
                this.orgAarticle = this.orgAarticle.concat(data.data)
            })
        },
        // 社团简介
        getDesc () {
            this.$http.post('/organization/desc', {
                organizationId: this.organizationId
            }).then(data => {
                this.orgDesc = data.data
            })
        },
        toFriend (id) {
            this.$router.push({
                path: '/pages/person/main',
                query: {
                    userId: id
                }
            })
        },
        toActicle (id) {
            this.$router.push({
                path: '/pages/association/acticleDetail/main',
                query: {
                    articleId: id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.part + .part {
    border-top: 1px solid #eee;
    padding-top: 15px;
    margin-top: 15px;
}
.info {
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        .org-logo {
            height: 80px;
            width: 80px;
        }
        .name {
            padding-left: 10px;
            font-size: 14px;
            img {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                padding: 0 8px;
            }
            .title {
                font-size: 18px;
                font-weight: bold;
                line-height: 40px;
            }
            .staff {
                display: flex;
                align-items: center;
                color: #888;
                line-height: 40px;
            }
        }
    }
}
.members {
    .top {
        display: flex;
        justify-content: space-between;
        .left {
            padding-bottom: 10px;
            font-weight: bold;
        }
    }
    .branch {
        display: flex;
        font-size: 12px;
        color: #888;
        /deep/ .m-img-cell {
            width: 60px;
        }
        /deep/ .text{
            color: #000;
        }
        .left {
            display: inline-block;
            font-weight: bold;
            width: 55px;
            height: 55px;
            margin-top: 25px;
        }
        .right {
            display: flex;
            flex-wrap: wrap;
            flex: 1;
        }
    }
}
.follow {
    display: flex;
    margin-top: 0 !important;
    justify-content: space-between;
    .item {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        text-align: center;
        span:nth-child(1) {
            font-weight: bold;
        }
        span:nth-child(2) {
            color: #888;
        }
    }
}
.dynamic {
    padding-top: 15px;
    .article-item {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        img {
            padding: 5px 0;
            height: 100px;
        }
        .title {
            font-size: 15px;
            font-weight: bold;
        }
    }
    .b-part {
        display: block;
    }
    .desc {
        padding: 10px 0;
        font-size: 14px;
    }
    .title {
        padding: 10px 0;
        font-size: 16px;
        font-weight: bold;
    }
    .b-title {
        padding: 5px 0;
        font-size: 14px;
        font-weight: bold;
    }
    .b-desc {
        padding-bottom: 15px;
        font-size: 12px;
    }
}
div /deep/ .m-tab-class {
    width: 100px;
    flex:none;
}
</style>
