// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async login() {
    return {
      name: 'libai',
      age: 'hhh',
    };
  }
}

module.exports = NewsService;
