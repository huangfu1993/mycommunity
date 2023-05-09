// app/service/news.js
const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class NewsService extends Service {
  // 登录
  async login(params) {
    // 读取数据
    const user = await this.ctx.helper.readfile('user', params.username);
    // 对比密码
    if (!user) {
      this.ctx.throw(401);
    }

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
    params.id = new Date().valueOf().toString(16);
    // 存一个本地json文件
    await this.ctx.helper.writefile('user', params.username, params);
    params.token = await this.createToken({ username: params.username });
    delete params.password;
    return { user: params };
  }

  // 生成token

  async createToken(data) {
    const token = await jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
    return token;
  }
}

module.exports = NewsService;
