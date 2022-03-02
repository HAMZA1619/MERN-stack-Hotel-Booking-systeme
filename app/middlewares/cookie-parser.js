module.exports = (req, res, next) => {
  if (req.headers.cookie) {
    const { cookie: cookieHeader } = req.headers;
    req.cookies = {};

    cookieHeader.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      const value = cookie.split("=")[1];
      req.cookies[name] = value;
    });
  }
  next();
};
