// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async login(params) {
    console.log(params);
    return {
      name: 'libai',
      age: 'hhh',
    };
  }
}

module.exports = NewsService;
