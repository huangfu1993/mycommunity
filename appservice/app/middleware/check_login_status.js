module.exports = () => {
  return async function checkLoginStatus(ctx, next) {
    // 获取请求头里面的信息
    const authorization = ctx.request.header['authorization'];
    const token = authorization ? authorization.replace('Bearer ', '') : null;
    if (!token) {
      ctx.throw(401);
    }

    //验证token
    try {
      const data = await ctx.service.user.verify(token);
      const user = await ctx.service.user.findUserByUsername(data);
      ctx.user = user;
    } catch {
      ctx.throw(401);
    }
    await next();
  };
};
