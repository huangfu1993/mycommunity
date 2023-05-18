// app/controller/news.js

const fs = require('fs').promises;
const path = require('path');

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async upload() {
    const data = await this.ctx.getFileStream();
    const imageType = path.extname(data.filename);
    const randomName = `${Math.random().toString(32).substring(2)}-${new Date()
      .valueOf()
      .toString(16)}`;
    const filepath = path.join(
      __dirname,
      `../public/image/${randomName}${imageType}`
    );

    await fs.writeFile(filepath, data);
    this.ctx.body = {
      success: true,
      response: {
        url: `http://127.0.0.1:8099/public/image/${randomName}${imageType}`,
      },
    };
    // const newsList = await ctx.service.uplateImg.uplate(page);
  }
}

module.exports = NewsController;
