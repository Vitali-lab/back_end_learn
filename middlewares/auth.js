const { JWT_SECRET } = require("../constants");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;

  try {
    const vetifyResult = jwt.verify(token, JWT_SECRET);

    req.user = {
      email: vetifyResult.email,
    };

    next();
  } catch (err) {
    res.redirect("/login");
  }
}

module.exports = auth;
