'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/get', controller.user.index);
  router.get('/new', controller.new.list);
  router.post('/api/users/login', controller.user.login);
};
