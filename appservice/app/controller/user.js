const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }

  async login() {
    const data = await this.ctx.service.user.login();
    this.ctx.body = data;
  }
}
module.exports = UserController;
