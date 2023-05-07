接口说明
● 基于 RESTful 规范
● 基于 JWT 身份认证
● 接口基础路径：/api/v1
● 使用 CORS 处理跨域
● 请求与响应均为 JSON 格式数据

## 用户登录

POST /users/login

请求体：
无需身份认证，返回数据如下：

```javascript
{
  "user": {
    "email": "lpzmail@163.com",
    "token": "jwt.token.here",
    "username": "lpz",
    "channelDescription": "I work at statefarm",
    "avatar": null
  }
}
```

必填字段：email、password

## 用户注册

POST /api/users/register
请求体：

```javascript
{
  "username": "lpz",
  "email": "lpzmail@163.com",
  "password": "123456"
}
// 无需身份认证，返回数据如下：
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "channelDescription": "I work at statefarm",
    "avatar": null
  }
}
```

必填字段：email、username 、password

获取当前登录用户
GET /api/user/getCurrentUser

需要身份验证，返回当前用户的用户。

```javascript
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
```

更新当前登录用户资料
POST /api/user/update

请求体示例：

```javascript
{
  "user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

接受的字段：
● email
● username
● password
● image
● bio

需要身份认证，返回更新之后的用户资料。

```javascript
{
"user": {
  "email": "jake@jake.jake",
  "token": "jwt.token.here",
  "username": "jake",
  "bio": "I work at statefarm",
  "image": null
  }
}
```

获取用户资料
GET /api/user/getUserDetail/:username

无需身份认证，返回用户资料。

包括用户信息，文章列表、关注人数量，粉丝数量

```javascript
{
  "profile": {
    "username": "jake",
    "bio": "I work at statefarm",
    "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
    "following": false,
  }
}
```

## 关注用户

POST /user/follow/:username

## 取消关注用户

DELETE /user/unfollow/:username

## 创建文章

POST /article/create

生成文章 id。

返回文章详情

## 更新文章

POST /article/update/:articleId

## 删除文章

POST /article/detelearticle/:articleId

## 获取文章详情

GET /article/datail/:articleId

## 评论文章

POST /article/comment/:articleId

## 回复评论

POST /article/comment/:articleId/:commentId

## 删除评论

GET GET /article/deleteComment:commentId

## 文章点赞

GET /article/:videoId/like
