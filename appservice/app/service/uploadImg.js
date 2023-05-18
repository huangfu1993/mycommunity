// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async upload() {
    const data = await this.ctx.getFileStream();
    console.log(data);
  }
}

module.exports = NewsService;
