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

POST /api/users
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
GET /api/user

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
PUT /api/user

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
GET /api/profiles/:username

无需身份认证，返回用户资料。

```javascript
{
  "profile": {
    "username": "jake",
    "bio": "I work at statefarm",
    "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
    "following": false
  }
}
```

## 订阅视频频道

POST /profiles/:username/follow

## 取消订阅视频频道

DELETE /profiles/:username/follow

## 获取视频列表

GET /videos

## 获取用户关注的频道视频列表

GET /videos/feed

## 获取用户发布的视频列表

GET /users/:userId/videos

## 获取用户喜欢的视频列表

GET /user/videos/liked

## 获取用户观看记录

GET /user/videos/history

## 创建视频

POST /videos

## 更新视频

PUT /articles/:videoId

## 删除视频

DELETE /videos/:videoId

## 添加视频评论

POST /videos/:videoId/comments

## 获取视频评论列表

GET /videos/:videoId/comments

## 删除视频评论

DELETE /videos/:videoId/comments/:commentId

## 视频点赞

DELETE /videos/:videoId/like
