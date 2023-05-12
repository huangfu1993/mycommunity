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
    // 存一个本地json文件
    const result = await this.app.mysql.insert('user', params);

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
