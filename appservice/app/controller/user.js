const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }

  async login(params) {
    const data = await this.ctx.service.user.login(params);
    this.ctx.body = data;
  }
}
module.exports = UserController;
