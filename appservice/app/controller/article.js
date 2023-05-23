const { Controller } = require('egg');

class ArticleController extends Controller {
  // 创建文章
  async create() {
    const body = this.ctx.request.body;
    // 校验
    const user = this.ctx.user;
    const params = {
      ...body,
      username: user.username,
    };

    this.ctx.validate(
      {
        title: { type: 'string' },
        sub_title: { type: 'string' },
        url: { type: 'string' },
      },
      params
    );

    const data = await this.ctx.service.article.create(params);

    this.ctx.body = data;
  }

  修改文章;
  async update() {
    const body = this.ctx.request.body;
    const articleId = +this.ctx.params.articleId;
    // 校验
    const user = this.ctx.user;

    const params = {
      ...body,
      username: user.username,
      articleId,
    };

    this.ctx.validate(
      {
        title: { type: 'string' },
        sub_title: { type: 'string' },
        url: { type: 'string' },
        articleId: { type: 'number' },
      },
      params
    );

    const data = await this.ctx.service.article.update(params);

    this.ctx.body = data;
  }
}

module.exports = ArticleController;