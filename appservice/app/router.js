'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const checkLoginStatus = app.middleware.checkLoginStatus();

  const { router, controller } = app;
  router.post('/api/uploadImg/upload', controller.uploadImg.upload);
  router.get('/', controller.home.index);
  router.get('/get', controller.user.index);
  router.get('/new', controller.new.list);
  router.post('/api/users/login', controller.user.login);
  router.post('/api/users/register', controller.user.register);
  router.post('/api/users/update', checkLoginStatus, controller.user.update);
  router.get('/api/users/getCurrentUser', controller.user.getCurrentUser);
  router.get(
    '/api/user/follow/:username',
    checkLoginStatus,
    controller.user.follow
  );
  router.get(
    '/api/user/unfollow/:username',
    checkLoginStatus,
    controller.user.unfollow
  );

  router.post(
    '/api/article/create',
    checkLoginStatus,
    controller.article.create
  );

  router.post(
    '/api/article/update/:articleId',
    checkLoginStatus,
    controller.article.update
  );
};
