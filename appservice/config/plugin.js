'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // config/plugin.js
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  // 验证
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
