module.exports = {
    "code": "0000",
    "message": "success",
    "data": {
        "organizations": [{
            "organizationId": "100001", // 社团ID
            "organizationName": "动漫社团", // 社团名称
            "organizationSortName": "动漫", // 社团简称
            "organizationImgurl": "/static/images/kanade.png", // 社团logo
            "organizationIntroduction": "动漫动漫动漫", // 社团简介
            "organizationSlogan": "社团口号社团口号社团口号", // 社团口号
            "followStatus": "0" // 0未关注 1已关注
        }],
        "organization_articles": [{
            "organizationId": "organizationId",
            "organizationName": "校报记者团",
            "organizationImgurl": "/static/images/kanade.png",
            "articleId": "articleId",
            "title": "科干共享记者招募会",
            "content": "召集内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
            "type": "1", // 文章类型1活动、2招新
            "createTime": "2019-06-23 20:54:20",
            "imgUrl": ["/static/images/img-w.png", "/static/images/kanade.png", "/static/images/img-w.png"], // 文章图片
            "levingMsgs": "150", // 多少条留言
            "imgurls": ["/static/images/img-w.png", "/static/images/kanade.png", "/static/images/kanade.png"], // 最近评论人头像
            "beliked": 70, // 被喜欢
            "checked": "1420", // 阅读量
            "clickLiked": "1" // 是否已点喜欢 0否 1是
        }],
        "friends": [{
            "userId": "100001",
            "actualName": "_雨痕",
            "nickName": "kanade",
            "slogan": "个性签名",
            "constellation": "8", // 星座 1-12
            "gender": "1", // 0未知、1男、2女
            "imgUrl": "/static/images/kanade.png",
            "enrollmentDate": "2019", // 入学时间
            "secrecy": 1, // 个人隐私保护 0真实姓名 1昵称
            "universityName": "广东科学技术职业学院", // 学校名称
            "universitySortName": "科干", // 学校名称
            "collegeName": "计算机工程技术学院", // 学院名称
            "collegeSortName": "计算机", // 学院名称
            "followStatus": "2", // 关注状态  0-未关注 1-已关注 2-相互关注
            "organization": [
                {
                    "organizationName": "计算机协会", // 计算机协会
                    "organizationSortName": "计协" // 计协
                },
                {
                    "organizationName": "动漫社",
                    "organizationSortName": "动漫"
                }
            ]
        }, {
            "userId": "100001",
            "actualName": "kanade",
            "nickName": "kanade",
            "slogan": "个性签名",
            "constellation": "9", // 星座 1-12
            "gender": "2", // 0未知、1男、2女
            "imgUrl": "/static/images/kanade.png",
            "enrollmentDate": "2018", // 入学时间
            "secrecy": 1, // 个人隐私保护 0真实姓名 1昵称
            "universityName": "广东科学技术职业学院", // 学校名称
            "universitySortName": "科干", // 学校名称
            "collegeName": "计算机工程技术学院", // 学院名称
            "collegeSortName": "计算机", // 学院名称
            "followStatus": "1", // 关注状态  0-未关注 1-已关注 2-相互关注
            "organization": [
                {
                    "organizationName": "动漫社",
                    "organizationSortName": "动漫"
                }
            ]
        }]
    },
    "page": {
        "pageIndex": "", // 当前分页数
        "pageSize": "", // 分页大小
        "hasNext": true // 是否下一页
    }
}
