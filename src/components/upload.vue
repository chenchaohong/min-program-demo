<template>
    <div class="upload">
        <div class="upload-head" v-if="imgHead" @click="chooseImage">
            <img :src="firstImg" alt="" @error="avatarError">
            <span class="cover" v-if="cover">{{cover}}</span>
        </div>
        <div class="upload-img" v-else>
            <div class="img preview" v-for="(list, index) in imgList" :key="index">
                <img :src="Config.apiPrefix + list" alt="">
                <span class="del" @click="removeImg(index)">删 除</span>
            </div>
            <div class="img def" v-if="imgList.length < 9" @click="chooseImage">
                <img src="/static/images/upload.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import Config from '@/config'
export default {
    name: 'uploadImg',
    props: {
        imgHead: String, // 当张 用于头像
        cover: String,
        list: Array, // 多张
        imgCount: {
            type: [String, Number],
            default: 9
        }
    },
    data () {
        return {
            firstImg: '',
            imgList: [],
            Config: Config,
            userId: '',
            errorImg: 'data:image/png;base64,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'
        }
    },
    created () {
        this.userId = '123456789'
    },
    methods: {
        avatarError (e) {
            this.firstImg = this.errorImg
        },
        chooseImage () {
            if (this.imgHead) {
                this.imgCount = 1
                this.imgList = []
            }
            wx.chooseImage({
                count: Number(this.imgCount), // 最多可以选择的图片总数
                sizeType: ['compressed'], // 可选择原图或压缩后的图片 'original', 'compressed'
                sourceType: ['album', 'camera'], // 可选择性开放访问相册、相机
                success: (res) => {
                    let temp = this.imgList.concat(res.tempFilePaths)
                    if (temp.length > Number(this.imgCount)) {
                        wx.showToast({
                            title: `最多只能上传${Number(this.imgCount)}张图片`,
                            icon: 'none'
                        })
                        return
                    } else {
                        // this.imgList = temp
                    }
                    var tempFilePaths = res.tempFilePaths
                    // 启动上传等待中...
                    wx.showToast({
                        title: '正在上传...',
                        icon: 'loading',
                        mask: true,
                        duration: 10000
                    })
                    var uploadImgCount = 0
                    for (var i = 0, h = tempFilePaths.length; i < h; i++) {
                        wx.uploadFile({
                            url: Config.apiPrefix + '/img/upload',
                            filePath: tempFilePaths[i],
                            name: 'file',
                            formData: {
                                'imgIndex': i
                            },
                            header: {
                                "Content-Type": "multipart/form-data",
                                "userId": this.userId
                            },
                            success: (res) => {
                                let result = JSON.parse(res.data)
                                if (result.code != '0000') {
                                    wx.hideToast()
                                    wx.showModal({
                                        title: '错误提示',
                                        content: result.message || '上传图片失败',
                                        showCancel: false,
                                        success: function (res) { }
                                    })
                                } else {
                                    uploadImgCount++
                                    this.imgList.push(result.data.imgUrl)
                                    this.$emit('change', this.imgList)
                                    // 如果是最后一张,则隐藏等待中
                                    if (uploadImgCount == tempFilePaths.length) {
                                        wx.hideToast()
                                    }
                                }
                            },
                            fail: (res) => {
                                wx.hideToast()
                                wx.showModal({
                                    title: '错误提示',
                                    content: '上传图片失败',
                                    showCancel: false,
                                    success: function (res) { }
                                })
                            }
                        })
                    }
                }
            })
        },
        removeImg (index) {
            wx.showModal({
                title: '',
                content: '是否删除该图片？',
                showCancel: true,
                success: (res) => {
                    if (res.confirm) {
                        this.imgList.splice(index, 1)
                    }
                }
            })
        }
    },
    watch: {
        list: {
            handler (n, o) {
                this.imgList = n
            },
            deep: true
        },
        imgHead: function (n, o) {
            this.firstImg = this.Config.apiPrefix + n
        }
    }
}
</script>

<style lang="less" scoped>
.upload-head {
    position: relative;
    display: inline-block;
    img {
        height: 80px;
        width: 80px;
        margin: auto;
        border-radius: 50%;
    }
    .cover {
        position: absolute;
        background: #fff;
        color: #000;
        font-size: 11px;
        opacity: 0.6;
        width: 80px;
        bottom: 5px;
        padding-bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
    }
}
.upload-img {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    .img {
        margin-right: 10px;
    } 
    .preview {
        position: relative;
        img {
            margin-top: 5px;
            width: 108px;
            height: 119px;
        }
        .del {
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            font-size: 12px;
            background: rgba(238, 238, 238, 0.7);
            text-align: center;
            color: #999;
        }
    }
    .def {
        position: relative;
        width: 105px;
        height: 118px;
        border: 2px solid #dbdbdb;
        margin-top: 5px;
        img {
            position: absolute;
            width: 40px;
            height: 40px;
            left: 50%;
            top: 48%;
            transform: translate(-50%, -50%)
        }
    }
}
</style>
