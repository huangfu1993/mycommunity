const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}
module.exports = UserController;
