"use strict";

module.exports = (User) => async (req, res, next) => {
  let data = await User.findOne({ where: { username: req.body.username } });
  if (!data) {
    req.user = await User.create(req.body);
    next();
  }
    next("username alerady exists");
};
