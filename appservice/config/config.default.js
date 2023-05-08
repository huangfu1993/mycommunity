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

  // jwt
  config.jwt = {
    secret: 'bd752b64-0bc8-4598-b222-38f3728e0551',
    expiresIn: '1d',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
