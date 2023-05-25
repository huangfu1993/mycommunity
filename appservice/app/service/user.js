// app/service/news.js
const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class NewsService extends Service {
  // 登录
  async login(params) {
    // 读取数据
    const user = await this.app.mysql.get('user', {
      username: params.username,
    });

    if (!user) {
      this.ctx.throw(401);
    }

    // 对比密码
    if (this.ctx.helper.md5(params.password) !== user.password) {
      this.ctx.throw(401);
    }

    delete user.password;

    user.token = await this.createToken({ username: params.username });

    return {
      user,
    };
  }

  // 注册
  async register(params) {
    params.password = this.ctx.helper.md5(params.password);
    const result = await this.app.mysql.insert('user', params);

    params.token = await this.createToken({ username: params.username });
    delete params.password;
    return { user: params };
  }

  // 获取用户信息
  async getCurrentUser(params) {
    const result = await this.app.mysql.get('user', {
      username: params.username,
    });
    delete params.password;
    return { user: result };
  }

  // 更新用户资料
  async update(params) {
    if (params.password) {
      params.password = this.ctx.helper.md5(params.password);
    }
    await this.app.mysql.update('user', params);

    delete params.password;
    return { user: { ...params } };
  }

  async findUserByUsername(params) {
    const result = await this.app.mysql.get('user', {
      username: params.username,
    });
    delete result.password;
    return result;
  }

  async findUserByEmail(params) {
    const result = await this.app.mysql.get('user', {
      email: params.email,
    });

    return result;
  }

  async getCurrentUser(params) {
    const result = await this.app.mysql.get('user', {
      username: params.username,
    });
    delete params.password;
    return { user: result };
  }

  // 生成token
  async createToken(data) {
    const token = await jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
    return token;
  }

  // 校验token是否有效
  async verify(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }

  // 关注
  async follow(data) {
    const params = {
      fensi: data,
      username: this.ctx.user.username,
    };
    await this.app.mysql.insert('follow', params);
    return params;
  }
  // 取消关注
  async unfollow(data) {
    const params = {
      fensi: data,
      username: this.ctx.user.username,
    };
    await this.app.mysql.delete('follow', params);
    return params;
  }

  // 获取其他用户详情
  async getUserDetail(data) {
    // 获取用户基本信息
    const user = await this.findUserByUsername({ username: data });

    // todo 获取文章列表
    // 互殴用户创建的文章
    const articles = await this.app.mysql.get('article', {
      username: data,
    });
    // todo 用户粉丝数量
    // 获取用户粉丝数量
    const fans = await this.app.mysql.get('follow', {
      username: data,
    });
    // todo 用户关注数量
    // 获取用户关注数量
    const interest = await this.app.mysql.get('follow', {
      fensi: data,
    });

    const response = {
      user,
      articles,
      fans,
      interest,
    };

    console.log(response, 'response');
    return response;
  }
}

module.exports = NewsService;
