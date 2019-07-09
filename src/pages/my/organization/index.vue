<template>
    <div class="page">
        <div v-if="organization.length > 0">
            <div class="part" v-for="(org, index) in organization" :key="index" @click="toDetail(org)">
                <img :src="org.organizationImgurl" alt="">
                <div class="item">
                    <span>{{org.organizationName}}</span>
                    <span>{{org.organizationSlogan}}</span>
                    <span>社长：{{org.presidentRealName}}</span>
                </div>
                <div class="status" :class="{'un-bg': org.auditStatus == '1'}">
                    <span v-if="org.auditStatus == '0'">审核中</span>
                    <span class="icon" v-if="org.auditStatus == '1'">
                        <van-icon name="arrow" />
                    </span>
                    <span v-if="org.auditStatus == '2'">离岗</span>
                </div>
            </div>
        </div>
        <div class="un-org" v-else>
            <span>你还未加入任何社团，快快提交申请加入吧</span>
        </div>
        <div class="btn">
            <van-button type="primary" size="large" round @click="apply">申请加入社团</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            organization: []
        }
    },
    created () {
    },
    mounted () {
        this.getOrgList()
    },
    onShow () {
        if (mpvue.getStorageSync('isShow')) {
            this.getOrgList()
            mpvue.removeStorageSync('isShow')
        }
    },
    methods: {
        getOrgList () {
            this.$http.post('/user/baseInfo/myorganization', {
            }).then(data => {
                this.organization = data.data.organization
            })
        },
        toDetail (org) {
            if (org.auditStatus == '1') {
                this.$router.push({
                    path: '/pages/association/organizationDetail/main',
                    query: {
                        organizationId: org.organizationId
                    }
                })
            }
        },
        apply () {
            this.$router.push({
                path: '/pages/my/organization/search/main'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.part {
    display: flex;
    img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
    .item {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 26px;
        line-height: 26px;
        padding-left: 15px;
        span:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
        }
        span:nth-child(2) {
            font-size: 14px;
        }
        span:nth-child(3) {
            font-size: 12px;
            color: #888;
        }
    }
    .status {
        display: flex;
        align-items: center;
        text-align: center;
        width: 20px;
        background: #eee;
        border-radius: 20px;
        span {
            font-size: 12px;
            color: #888;
        }
        .icon {
            font-size: 25px;
        }
    }
    .un-bg {
        background: none;
    }
}
.part + .part {
    margin-top: 15px;
}
.un-org {
    font-size: 14px;
    color: #888;
    text-align: center;
    padding-top: 20px;
}
.btn {
    margin: 40px
}
</style>
