const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }

  // 登录
  async login() {
    const body = this.ctx.request.body;
    // 数据验证
    this.ctx.validate(
      {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      body
    );

    const data = await this.ctx.service.user.login(body);
    this.ctx.body = data;
    this.ctx.helper.writefile();
  }

  // 注册
  async register() {
    const body = this.ctx.request.body;
    // 用户名唯一
    if (await this.ctx.service.user.findUserByUsername(body)) {
      this.ctx.throw(422, '用户名已存在');
    }

    // 用户邮箱唯一
    if (await this.ctx.service.user.findUserByEmail(body)) {
      this.ctx.throw(422, '用户邮箱已存在');
    }
    // 数据验证
    this.ctx.validate(
      {
        username: { type: 'string' },
        email: { type: 'email' },
        password: { type: 'string' },
      },
      body
    );

    const data = await this.ctx.service.user.register(body);
    this.ctx.body = data;
  }

  // 获取用户信息
  async getCurrentUser() {
    const body = this.ctx.request.body;
    const data = await this.ctx.service.user.getCurrentUser(body);
    this.ctx.body = data;
  }
}
module.exports = UserController;
