// app/service/news.js
const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class NewsService extends Service {
  // 登录
  async login() {
    return {
      name: 'libai',
      age: 'hhh',
    };
  }

  // 注册
  async register(params) {
    params.password = this.ctx.helper.md5(params.password);
    params.id = new Date().valueOf().toString(16);
    params.token = await this.createToken({ username: params.username });
    // 存一个本地json文件
    console.log(params.username, 'params.username');
    await this.ctx.helper.writefile('user', params.username, params);
    delete params.password;
    return params;
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
