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

  // 查找用户是否对文章操作过喜欢或者不喜欢
  async finduserIsLikeArticle(params) {
    const result = await this.app.mysql.get('like_and_dislike', {
      username: params.username,
    });

    return result;
  }

  // 文章点赞
  async like(body) {
    const likeArticle = await this.finduserIsLikeArticle(body);
    console.log(likeArticle, 'likeArticle');
    // 找不到就新增一条
    if (!likeArticle) {
      await this.app.mysql.insert('like_and_dislike', body);
    } else {
      // 否则就修改
      await this.app.mysql.update('like_and_dislike', {
        ...likeArticle,
        ...body,
      });
    }

    return body;
  }
}

module.exports = ArticleService;
