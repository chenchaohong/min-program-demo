module.exports = {
    "code": "0000",
    "message": "success",
    "data": {
        "userId": "100001",
        "actualName": "_雨痕",
        "nickName": "kanade",
        "slogan": "个性签名",
        "constellation": "8", // 星座 1-12
        "gender": "1", // 0未知、1男、2女
        "imgUrl": "/static/images/organization/person/14.png",
        "enrollmentDate": "2019", // 入学时间
        "secrecy": 1, // 个人隐私保护 0真实姓名 1昵称
        "universityName": "广东科学技术职业学院", // 学校名称
        "universitySortName": "科干", // 学校名称
        "collegeName": "计算机工程技术学院", // 学院名称
        "collegeSortName": "计算机", // 学院名称
        "followStatus": "2", // 关注状态  0-未关注 1-已关注 2-相互关注
        "organization": [
            {
                "organizationId": "10001",
                "organizationName": "计算机协会", // 计算机协会
                "organizationSortName": "计协", // 计协
                "organizationImg": "/static/images/logo/logo1.png",
                "auditStatus": "0" // 审核状态: 0、待审核 1正常 2、离岗'
            },
            {
                "organizationId": "10002",
                "organizationName": "动漫社",
                "organizationSortName": "动漫",
                "organizationImg": "/static/images/logo/logo2.png",
                "auditStatus": "1" // 审核状态: 0、待审核 1正常 2、离岗'
            },
            {
                "organizationId": "10003",
                "organizationName": "社团3",
                "organizationSortName": "社团3",
                "organizationImg": "/static/images/logo/logo3.png",
                "auditStatus": "2" // 审核状态: 0、待审核 1正常 2、离岗'
            }
        ]
    }
}
