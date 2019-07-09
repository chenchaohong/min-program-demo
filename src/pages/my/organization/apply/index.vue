<template>
    <div class="page">
        <div class="head">
            <img :src="personInfo.imgUrl" alt="">
            <div class="desc">
                <span>{{personInfo.nickName}}</span>
                <span>{{personInfo.slogan}}</span>
            </div>
            <div class="btn">
                <span @click="$router.go(1)">取消</span>
                <span @click="submit">申请</span>
            </div>
        </div>
        <div class="form">
            <van-field title-width="120px" :value="formData.actualName" label="姓名" placeholder="请输入姓名" maxlength="20" required @change="onChange($event, 'actualName')" />
            <van-field title-width="120px" :value="temp.collegeName1" label="学院名称" placeholder="XX学院" maxlength="20" required @change="onChange($event, 'collegeName1', 'temp')" />
            <van-field title-width="120px" :value="temp.collegeName2" label="班级名称" placeholder="XX班" maxlength="20" required @change="onChange($event, 'collegeName2', 'temp')" />
            <van-field title-width="120px" :value="formData.studentNo" label="学号" placeholder="请输入学号" maxlength="20" required @change="onChange($event, 'studentNo')" />
            <van-field title-width="120px" :value="formData.birthday" label="出生年月" readonly placeholder="请选择出生年月" maxlength="20" required @click="pickerShow = true" @change="onChange($event, 'birthday')" />
            <van-field title-width="120px" :value="formData.mobile" label="手机号码" placeholder="请输手机号码" maxlength="11" required type="number" @change="onChange($event, 'mobile')" />
            <van-cell title-width="120px" title="性别" required>
                <view class="my-van-group">
                    <van-radio-group :value="formData.gender" @change="onChange($event, 'gender')">
                        <van-radio name="1">男</van-radio>
                        <van-radio name="2">女</van-radio>
                    </van-radio-group>
                </view>
            </van-cell>
            <van-field title-width="120px" :value="formData.branchName" label="部门" placeholder="请选择部门" required readonly is-link @click="popupShow = true"></van-field>
            <van-field title-width="120px" :value="formData.hobby" label="兴趣爱好" placeholder="请输入兴趣爱好" maxlength="100" @change="onChange($event, 'hobby')" />
            <van-field title-width="120px" :value="formData.remark" label="加入社团原因" placeholder="请输入加入社团原因" maxlength="200" type="textarea" autosize  @change="onChange($event, 'remark')"  />
        </div>
        <van-popup :show="popupShow" position="bottom">
            <van-picker :columns="columns" show-toolbar="true" @cancel="popupShow = false" @confirm="onClosePopup"/>
        </van-popup>
        <van-popup :show="pickerShow" position="bottom">
            <van-datetime-picker type="date" :min-date="minDate" :max-date="maxDate" :value="currentDate" @cancel="pickerShow = false" @confirm="pickerChange" />
        </van-popup>
        <van-toast id="van-toast" />
    </div>
</template>
<script>
import { dateFormat } from '@/utils/index'
export default {
    data () {
        return {
            popupShow: false,
            pickerShow: false,
            organizationId: '',
            formData: {
                actualName: "",
                collegeClasses: "", // 人民学院XX班 前端格式限制 xxx学院xxx班
                studentNo: "", // 学号
                birthday: "", // 出生年月
                mobile: "", // 手机号
                gender: "", // 0未知、1男、2女
                organizationId: "", // 社团编号
                branchId: "", // 部门编号
                branchName: "",
                hobby: "", // 兴趣爱好
                remark: ""// 加入社团原因
            },
            personInfo: {},
            branchsList: [],
            temp: {
                collegeName1: '',
                collegeName2: ''
            },
            columns: [],
            minDate: new Date('1970-01-01').getTime(),
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime()
        }
    },
    created () {
    },
    mounted () {
        this.organizationId = this.$route.query.organizationId
        this.personInfo = mpvue.getStorageSync('personInfo')
        this.cleanForm()
        this.getBranchsList()
    },
    methods: {
        getBranchsList () {
            this.$http.post('/organization/desc', {
                organizationId: this.organizationId
            }).then(data => {
                this.branchsList = data.data.branchs || []
                this.branchsList.forEach(branch => {
                    this.columns.push({
                        value: branch.branchId,
                        text: branch.branchName
                    })
                })
            })
        },
        onChange (e, name, obj) {
            if (obj) {
                this[obj][name] = e.mp.detail
            } else {
                this.formData[name] = e.mp.detail
            }
        },
        onClosePopup (e) {
            let detail = e.mp.detail
            this.formData.branchId = detail.value.value
            this.formData.branchName = detail.value.text
            this.popupShow = false
        },
        pickerChange (e) {
            this.formData.birthday = dateFormat(new Date(e.mp.detail))
            this.pickerShow = false
        },
        cleanForm () {
            this.formData = {
                actualName: "",
                collegeClasses: "",
                studentNo: "",
                birthday: "",
                mobile: "",
                gender: "",
                organizationId: "",
                branchId: "",
                branchName: "",
                hobby: "",
                remark: ""
            }
            this.temp = {
                collegeName1: '',
                collegeName2: ''
            }
        },
        validate () {
            if (!this.formData.actualName) {
                this.$toast('姓名不能为空')
                return false
            }
            if (!this.temp.collegeName1) {
                this.$toast('学院名称不能为空')
                return false
            }
            if (!this.temp.collegeName2) {
                this.$toast('班级名称不能为空')
                return false
            }
            if (!this.formData.studentNo) {
                this.$toast('学号不能为空')
                return false
            }
            if (!this.formData.birthday) {
                this.$toast('出生年月不能为空')
                return false
            }
            if (!this.formData.mobile) {
                this.$toast('手机号码不能为空')
                return false
            }
            if (!this.formData.gender) {
                this.$toast('性别不能为空')
                return false
            }
            if (!this.formData.branchId) {
                this.$toast('部门不能为空')
                return false
            }
            return true
        },
        submit () {
            if (!this.validate()) return
            this.formData.collegeClasses = this.temp.collegeName1 + this.temp.collegeName2
            this.$http.post('/user/baseInfo/modify', {
                ...this.formData
            }).then(data => {
                this.$toast({
                    type: 'success',
                    message: '信息修改成功',
                    duration: 1500,
                    onClose: () => {
                        this.$router.go(2)
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
    display: flex;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }
    .desc {
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        span {
            line-height: 30px;
            font-size: 14px;
        }
        span:nth-child(2) {
            color: #888;
        }
    }
    .btn {
        float: right;
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: flex-end;
        span {
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            width: 60px;
            text-align: center;
            border: 1px solid #eee;
            border-radius: 10px;
            margin-left: 10px;
        }
        span:nth-child(2) {
            background: #FF679B;
            color: #fff;
        }
    }
}
.form {
    .my-van-group {
        van-radio-group {
            display: flex;
            // justify-content: flex-end;
            van-radio {
                margin-right: 20px;
            }
        }
    }
}
</style>
