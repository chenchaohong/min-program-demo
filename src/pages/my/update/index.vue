<template>
    <div class="page">
        <div class="head">
            <upload cover="编辑" :imgHead="personInfo.imgUrl" @change="uploadChange"></upload>
        </div>
        <div class="form">
            <van-field input-align="right" title-width="90px" :value="personInfo.nickName" label="用户名" placeholder="请输入用户名" maxlength="20" @change="onChange($event, 'nickName')" />
            <van-field input-align="right" title-width="90px" :value="personInfo.slogan" label="个性签名" placeholder="请输入个性签名" maxlength="20" @change="onChange($event, 'slogan')" />
            <van-field input-align="right" title-width="90px" :value="constellationName" label="星座" readonly is-link @click="popupShow = true"></van-field>
            <van-cell title="性别">
                <view class="my-van-group">
                    <van-radio-group :value="personInfo.gender" @change="onChange($event, 'gender')">
                        <van-radio name="1">男</van-radio>
                        <van-radio name="2">女</van-radio>
                    </van-radio-group>
                </view>
            </van-cell>
            <van-field input-align="right" title-width="90px" :value="personInfo.universityName" label="学校" placeholder="请输入学校" maxlength="20" readonly />
            <van-cell title-width="90px" title="社团" is-link @click="$router.push('/pages/my/organization/main')">
                <view class="my-cell-label" v-if="personInfo.organization && personInfo.organization.length > 0">
                    <span :class="{'span-red': org.auditStatus == '0', 'span-gray': org.auditStatus == '2' }" v-for="(org, index) in personInfo.organization" :key="index">{{org.organizationName}}</span>
                </view>
                <view class="my-cell-label" v-else>
                    无
                </view>
            </van-cell>
        </div>
        <van-button type="primary" size="large" @click="submit">保存</van-button>
        <van-popup :show="popupShow" position="bottom">
            <van-picker :columns="columns" show-toolbar="true" @cancel="popupShow = false" @confirm="onClosePopup"/>
        </van-popup>
        <van-toast id="van-toast" />
    </div>
</template>
<script>
import upload from '@/components/upload'
export default {
    components: {
        upload
    },
    data () {
        return {
            popupShow: false,
            personInfo: {},
            columns: [
                { text: '白羊座', value: "1" },
                { text: '金牛座', value: "2" },
                { text: '双子座', value: "3" },
                { text: '巨蟹座', value: "4" },
                { text: '狮子座', value: "5" },
                { text: '处女座', value: "6" },
                { text: '天秤座', value: "7" },
                { text: '天蝎座', value: "8" },
                { text: '射手座', value: "9" },
                { text: '摩羯座', value: "10" },
                { text: '水瓶座', value: "11" },
                { text: '双鱼座', value: "12" }
            ],
            constellationName: ''
        }
    },
    created () {
    },
    mounted () {
        this.personInfo = mpvue.getStorageSync('personInfo')
        this.getConstellation(null, this.personInfo.constellation)
    },
    methods: {
        uploadChange (e) {
            this.personInfo.imgUrl = e[0]
        },
        onChange (e, name) {
            this.personInfo[name] = e.mp.detail
        },
        onClosePopup (e) {
            let detail = e.mp.detail
            this.personInfo.constellation = detail.value.value
            this.getConstellation(detail.value.text)
            this.popupShow = false
        },
        getConstellation (name, index) {
            this.constellationName = name
            if (index) {
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].value == index) {
                        this.constellationName = this.columns[i].text
                        break
                    }
                }
            }
            this.constellationName = this.constellationName ? this.constellationName : '请选择星座'
        },
        submit () {
            this.$http.post('/user/baseInfo/modify', {
                // actualName: this.personInfo.actualName,
                nickName: this.personInfo.nickName,
                slogan: this.personInfo.slogan,
                // mobile: this.personInfo.mobile,
                constellation: this.personInfo.constellation,
                gender: this.personInfo.gender,
                imgUrl: this.personInfo.imgUrl
                // enrollmentDate: this.personInfo.enrollmentDate
                // secrecy: "1"
            }).then(data => {
                this.$toast({
                    type: 'success',
                    message: '信息修改成功',
                    duration: 1500,
                    onClose: () => {
                        this.$router.go(1)
                        // 设置跳转我页面后刷新
                        mpvue.setStorageSync('isShow', true)
                    }
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.head {
    text-align: center;
    padding: 15px 0;
}
.form {
    margin-bottom: 20px;
    .my-van-group {
        van-radio-group {
            display: flex;
            justify-content: flex-end;
            van-radio {
                margin-left: 20px;
            }
        }
    }
    .my-cell-label {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        span {
            display: inline-block;
            border: 1px solid #000;
            color: #000;
            width: 60px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 11px;
            margin: 3px;
            border-radius: 5px;
        }
        .span-red {
            color: red;
            border-color: red;
        }
        .span-gray {
            color: #ddd8d8;
            border-color: #ddd8d8;
        }
    }
}
</style>
