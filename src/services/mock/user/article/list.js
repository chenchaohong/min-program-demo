module.exports = {
    "code": "0000",
    "message": "success",
    "data": [{
        "articleId": "100001", // 文章ID
        "title": "大大的标题", // 文章标题
        "content": "就在昨天，我看到学校有一个遗憾回收站的活动我觉得很有意义", // 文章内容
        "createTime": "2019-06-25 12:25", // 创建时间
        "fallow": "1", // 0未关注 1已关注
        "imgUrl": ["/static/images/discover/2.png", "/static/images/discover/1.png"] // 文章图片
    }, {
        "articleId": "100004", // 文章ID
        "title": "大大的标题", // 文章标题
        "content": "17栋栋楼下很多流浪小猫，下午看到，好可怜，脏脏了", // 文章内容
        "createTime": "2019-06-25 12:25", // 创建时间
        "fallow": "0", // 0未关注 1已关注
        "imgUrl": ["/static/images/discover/1.png", "/static/images/discover/2.png"] // 文章图片
    }],
    "page": {
        "pageIndex": "2", // 当前分页数
        "pageSize": "10", // 分页大小
        "hasNext": true // 是否下一页
    }
}
