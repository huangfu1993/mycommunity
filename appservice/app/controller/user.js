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

  // 更新用户资料
  async update() {
    const body = this.ctx.request.body;

    // 当前登录用户
    const user = this.ctx.user;
    // 用户名唯一
    const userByusername = await this.ctx.service.user.findUserByUsername(user);

    if (userByusername.id !== user.id) {
      this.ctx.throw(422, '用户名已存在');
    }

    // 用户邮箱唯一
    const userByEmail = await this.ctx.service.user.findUserByEmail(user);

    if (userByEmail.id !== user.id) {
      this.ctx.throw(422, '用户邮箱已存在');
    }

    const data = await this.ctx.service.user.update({ ...user, ...body });
    this.ctx.body = data;
  }

  // 关注用户
  async follow(ctx) {
    const fensi = ctx.params.username;
    const data = await ctx.service.user.follow(fensi);
    ctx.body = data;
  }

  // 取消关注用户
  async unfollow(ctx) {
    const fensi = ctx.params.username;
    const data = await ctx.service.user.unfollow(fensi);
    ctx.body = data;
  }

  // 获取其他用户详情
  async getUserDetail() {
    // 用户名称
    const username = this.ctx.query.username;
    console.log(username, 'username');
    const data = await this.ctx.service.user.getUserDetail(username);
    this.ctx.body = data;
  }
}
module.exports = UserController;
