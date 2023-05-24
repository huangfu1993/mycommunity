// app/service/news.js
const Service = require('egg').Service;

class ArticleService extends Service {
  // 创建文章
  async create(body) {
    const result = await this.app.mysql.insert('article', body);
    return {
      articleId: result.insertId,
      ...body,
    };
  }

  // 修改文章
  async update(body) {
    await this.app.mysql.update('article', body, {
      where: {
        articleId: body.articleId,
      },
    });
    return body;
  }

  // 评论文章
  async commentArticle(body) {
    await this.app.mysql.insert('comment', body);
    return body;
  }
}

module.exports = ArticleService;
