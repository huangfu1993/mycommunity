// app/service/news.js
const Service = require('egg').Service;

class ArticleService extends Service {
  async create(body) {
    const result = await this.app.mysql.insert('article', body);
    return {
      articleId: result.insertId,
      ...body,
    };
  }

  async update(body) {
    await this.app.mysql.update('article', body, {
      where: {
        articleId: body.articleId,
      },
    });
    return body;
  }
}

module.exports = ArticleService;
