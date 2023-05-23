/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1683426945125_3491';

  // add your middleware config here
  config.middleware = ['errorhandle'];

  //  渲染视图
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Mysql123456',
      // 数据库名
      database: 'mycommunity',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 测试接口
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  // https://www.eggjs.org/zh-CN/core/security
  // 关闭CSRF
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*', //注释掉，因为不支持cookie
    credentials: true, // 允许跨域请求携带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // jwt
  config.jwt = {
    secret: 'bd752b64-0bc8-4598-b222-38f3728e0551',
    expiresIn: '1d',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '127.0.0.1', // 0.0.0.0
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
