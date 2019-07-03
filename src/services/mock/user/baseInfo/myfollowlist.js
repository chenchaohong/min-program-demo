module.exports = {
    "code": "0000",
    "message": "success",
    "data": {
        "organizations": [{
            "organizationId": "10001", // 社团ID
            "organizationName": "社团名称", // 社团名称
            "organizationSortName": "简介", // 社团简称
            "organizationImgurl": "/static/images/saber.png", // 社团logo
            "organizationIntroduction": "", // 社团简介
            "organizationSlogan": "社团口号", // 社团口号
            "followStatus": '1' // 关注状态 0-未关注 1-已关注 2-相互关注
        }, {
            "organizationId": "10001", // 社团ID
            "organizationName": "动漫社", // 社团名称
            "organizationSortName": "简介", // 社团简称
            "organizationImgurl": "/static/images/kanade.png", // 社团logo
            "organizationIntroduction": "", // 社团简介
            "organizationSlogan": "社团口号", // 社团口号
            "followStatus": '1' // 关注状态 0-未关注 1-已关注 2-相互关注
        }],
        "friends": [{
            "userId": "100001",
            "name": "kanade", // 校友昵称
            "imgUrl": "/static/images/kanade.png", // 校友头像 头像地址 /image/xxxxxxx.jpg
            "slogan": "个性签名", // 个性签名 -- 陈朝鸿改
            "followStatus": '1', // 关注状态 0-未关注 1-已关注 2-相互关注
            "enrollmentDate": "2019", // 2019 入学年份
            "universityName": "广东科学技术职业学院", // 学校名称
            "universitySortName": "科干", // 学校名称
            "collegeName": "计算机工程技术学院", // 学院名称
            "collegeSortName": "计算机", // 学院名称
            "constellation": "8"// 星座 默认1-12代表12星座
        }, {
            "userId": "100001",
            "name": "saber", // 校友昵称
            "imgUrl": "/static/images/saber.png", // 校友头像 头像地址 /image/xxxxxxx.jpg
            "slogan": "守护守护", // 个性签名 -- 陈朝鸿改
            "followStatus": '2', // 关注状态 0-未关注 1-已关注 2-相互关注
            "enrollmentDate": "2019", // 2019 入学年份
            "universityName": "广东科学技术职业学院", // 学校名称
            "universitySortName": "科干", // 学校名称
            "collegeName": "计算机工程技术学院", // 学院名称
            "collegeSortName": "计算机", // 学院名称
            "constellation": "5"// 星座 默认1-12代表12星座
        }, {
            "userId": "100001",
            "name": "kanade", // 校友昵称
            "imgUrl": "/static/images/kanade.png", // 校友头像 头像地址 /image/xxxxxxx.jpg
            "slogan": "个性签名", // 个性签名 -- 陈朝鸿改
            "followStatus": '1', // 关注状态 0-未关注 1-已关注 2-相互关注
            "enrollmentDate": "2019", // 2019 入学年份
            "universityName": "广东科学技术职业学院", // 学校名称
            "universitySortName": "科干", // 学校名称
            "collegeName": "计算机工程技术学院", // 学院名称
            "collegeSortName": "计算机", // 学院名称
            "constellation": "8"// 星座 默认1-12代表12星座
        }]
    },
    "page": {
        "pageIndex": "1", // 当前分页数
        "pageSize": "10", // 分页大小
        "hasNext": true // 是否下一页
    }
}
