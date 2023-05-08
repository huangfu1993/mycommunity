const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }

  // 登录
  async login() {
    const data = await this.ctx.service.user.login();
    this.ctx.body = data;
    this.ctx.helper.writefile();
  }

  // 注册
  async register() {
    const body = this.ctx.request.body;
    // 数据验证
    this.ctx.validate({
      username: { type: 'string' },
      email: { type: 'email' },
      password: { type: 'string' },
    });

    const data = await this.ctx.service.user.register(body);
    this.ctx.body = data;
  }
}
module.exports = UserController;
