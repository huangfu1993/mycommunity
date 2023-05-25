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
  router.get(
    '/api/users/getCurrentUser',
    checkLoginStatus,
    controller.user.getCurrentUser
  );
  router.get('/api/users/getUserDetail', controller.user.getUserDetail);
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
    controller.article.createArticle
  );

  router.post(
    '/api/article/update/:articleId',
    checkLoginStatus,
    controller.article.update
  );

  router.post(
    '/api/article/comment/:articleId',
    checkLoginStatus,
    controller.article.commentArticle
  );

  router.get('/api/article/like', checkLoginStatus, controller.article.like);
};
